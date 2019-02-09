import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { srcDir } from '../../app';
import { ReimDao } from '../dao/reim.dao';

export const reimRouter = express.Router();

// /users - find all
reimRouter.get('', [
    authMiddleware,
    async (req, res) => {
        try {
            const reim = new(ReimDao);
            const reims = await reim.findAll();
            res.json(reims);
        } catch (err) {
            res.sendStatus(500);
        }
    }
]);

///////////////////////////////////////////////////
// By status
reimRouter.get('/status/:reimStatus', [
    authMiddleware,
    async (req, res) => {
        try {
            const reim = new(ReimDao);
            const reims = await reim.findByStatus(+req.params.reimStatus);
            res.json(reims);
        } catch (err) {
            res.sendStatus(500);
        }
    }
]);


//////////////////////////////////////////////////////////
// By author
reimRouter.get('/author/userId/:userId', async (req, res) => {
        try {
            const thisUser = req.session.user;
            const reim = new(ReimDao);
            const reimsByAuthor = await reim.findByAuthor(+req.params.userId);
            if (thisUser.userId === +req.params.userId ||
                thisUser.role === ('Admin' || 'Finance-Manager')) {
               console.log(reimsByAuthor);
               res.json(reimsByAuthor);
           } else {
               res.sendStatus(401);
           }
        } catch (err) {
            res.sendStatus(500);
        }
});

//////////////////////////////////////////
reimRouter.post('/submit', (req, res) => {
    const reim = new(ReimDao);
    reim.submit(req.session.user.userId, req.body.amount,
        req.body.description, req.body.type);
    res.redirect('/reimbursements');
});

