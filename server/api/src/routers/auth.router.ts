import express from 'express';
import { UserDao } from '../dao/user.dao';
import { srcDir } from '../../app';
import { URLSearchParams } from 'url';

export const authRouter = express.Router();
const user = new(UserDao);

// post for log in  ********
// TODO
// add checking password
// add assigning role
authRouter.post('/login', async (req, res) => {

    let users;
    try {
        users = await user.findAll();
    } catch (err) {
        res.sendStatus(500);
    }

    let isUser = false;

    users.map(eachUser => {
        if (eachUser.username === req.body.username) {
            isUser = true;
        }
    });

    let thisUser;

    if (isUser) {
        try {
            thisUser = await user.findByUsername(req.body.username);
            if ((thisUser.username === req.body.username) && (thisUser.password === req.body.password)) {
                isUser = true;
                if (isUser) {
                    req.session.user = thisUser;
                    console.log(thisUser);
                    res.json({
                        ...thisUser,
                        password: '',
                    });
                }
            }
        } catch (err) {
            res.sendStatus(500);
        }
    } else {
        res.sendStatus(401);
    }
});


// send user session data
authRouter.get('/session', (req, res) => {
    res.json(req.session.user);
});


authRouter.get('/logout', (req, res) => {
    req.session.destroy(function(err) {});
});
