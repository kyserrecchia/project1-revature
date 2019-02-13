import express from 'express';
import { UserDao } from '../dao/user.dao';
import { authMiddleware } from '../middleware/auth.middleware';
import { authAdminMiddleware } from '../middleware/auth.admin.middleware';

// get user and role dao
const user = new(UserDao);
// const role = new(RoleDao);


// we will assume all routes defined with this router
// start with '/users'
export const userRouter = express.Router();

// GETS ALL USERS ******
userRouter.get('', [
    authMiddleware,
    async (req, res) => {
        try {
            const users = await user.findAll();
            res.json(users);
        } catch (err) {
            res.sendStatus(500);
        }
    }
]);

userRouter.get('/roles', [
    authMiddleware,
    async (req, res) => {
        try {
            const users = await user.findAllWithRole();
            res.json(users);
        } catch (err) {
            res.sendStatus(500);
        }
    }
]);

//////////////////////////////////////////////////
// GOOD *****
userRouter.get('/:userId', async (req, res) => {
        try {
            const thisUser = req.session.user;
            const userById = await user.findById(+req.params.userId);
            if (thisUser.username === userById.username ||
                 (thisUser.role === 'Admin') || (thisUser.role === 'Finance-Manager')) {
                res.json(userById);
            } else {
                res.sendStatus(401);
            }
        } catch (err) {
            res.sendStatus(500);
        }
});

userRouter.get('/name/:username', async (req, res) => {
    try {
        const thisUser = req.session.user;
        const userById = await user.findByUsername(req.params.username);
        if (thisUser.username === userById.username ||
             (thisUser.role === 'Admin') || (thisUser.role === 'Finance-Manager')) {
            res.json(userById);
        } else {
            res.sendStatus(401);
        }
    } catch (err) {
        res.sendStatus(500);
    }
});

////////////////////////////////////////////////////

// PATCH
userRouter.patch('', [
    authAdminMiddleware,
    async (req, res) => {
        try {
            console.log(req.body);
            const userData = await user.update(req.body);
            res.json(userData);
        } catch (err) {
            res.sendStatus(500);
        }
    }
]);

