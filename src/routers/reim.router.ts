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
reimRouter.get('/:reimbursementId', [
    authMiddleware,
    async (req, res) => {
        try {
            const reim = new(ReimDao);
            const reims = await reim.findById(+req.params.reimbursementId);
            res.json(reims);
        } catch (err) {
            res.sendStatus(500);
        }
    }
]);


//////////////////////////////////////////////////////////
// By author

reimRouter.get('/author/byuserId/:userId', [
    authMiddleware,
    async (req, res) => {
        try {
            const reim = new(ReimDao);
            const reims = await reim.findByAuthor(+req.params.userId);
            res.json(reims);
        } catch (err) {
            res.sendStatus(500);
        }
    }
]);

reimRouter.get('/author/userId/:userId', (req, res) => {
    res.sendFile(`${srcDir}/views/reimAuthor.html`);
});


//////////////////////////////////////////
reimRouter.get('/submit', (req, res) => {
    res.sendFile(`${srcDir}/views/reimSubmit.html`);
});


reimRouter.post('/submit', (req, res) => {
    const reim = new(ReimDao);
    console.log(req.session);
    reim.submit(req.session.user.userId, req.body.amount,
        req.body.description, req.body.type);
    res.redirect('/reimbursements');
});

