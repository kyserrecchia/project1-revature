import express from 'express';
import { UserDao } from '../dao/user.dao';
import { srcDir } from '../../app';

export const authRouter = express.Router();

// post for log in  ********
// TODO
// add checking password
// add assigning role
authRouter.post('/login', async (req, res) => {

    let thisUser;

    try {
        const user = new(UserDao);
        thisUser = await user.findByUsername(req.body.username);
    } catch (err) {
        res.sendStatus(500);
    }

    let isUser = false;

    if ((thisUser.username === req.body.username) && (thisUser.password === req.body.password)) {
        isUser = true;
        req.session.user = thisUser;
        res.json({
            ...thisUser,
            password: '',
        });
    }
    if (!isUser) {
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
