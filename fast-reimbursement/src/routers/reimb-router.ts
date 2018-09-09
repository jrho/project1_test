import {Request, Response } from 'express';
import express from 'express';
import * as reimbDao from '../dao/reimb-dao';


export const reimbRouter = express.Router();
// find all 

reimbRouter.get('', async (req: Request, resp: Response) => {
    try {
        console.log('retrieving all reimbursement');
        let reimb = await reimbDao.findAll();
        resp.json(reimb);
    } catch (err) {
        console.log(err);
        resp.sendStatus(500);
    }
});

/**
 * Apply Reimbursement
 */

reimbRouter.post('',
    [ async (req, resp) => {
        try {
            const id = await reimbDao.applyReimb(req.body);
            resp.status(201);
            resp.json(id);
        } catch (err) {
            console.log(err);
            resp.sendStatus(500);
        }
    }]);

// reimbRouter.get('/:id', async (req, resp) => {
//     const id = +req.params.id; // convert the id to a number
//     console.log(`retrieving user with id  ${id}`);
//     try {
//         let reimb = await reimbDao.findById(id);
//         if (reimb !== undefined) {
//             resp.json(reimb);
//         } else {
//             resp.sendStatus(400);
//         }
//     } catch (err) {
//         resp.sendStatus(500);
//     }
// });


/**
 * Find reimbursement request by status
 */
reimbRouter.get('/status/:status', async (req, resp) => {
    const status = +req.params.status; // convert the id to a number
    try {
        let reimb = await reimbDao.findStatus(status);
        resp.json(reimb);
    } catch (err) {
        resp.sendStatus(500);
    }
});

/**
 * find reimb by user
 */

reimbRouter.get('/users/:id', async (req, resp) => {
    try{
        const id = +req.params.id;
        let requests = await reimbDao.findById(id);
        resp.json(requests);
    }
    catch (err) {
        console.log(err);
        resp.sendStatus(500);
    }
});

reimbRouter.put('/approve/:id', async (req,resp)=>{
    try{
        const user = req.session.user;
        const id =+req.params.id;
        await reimbDao.approveReimb(id,user);
        resp.json(true);
    }
    catch(err){
        console.log(err);
        resp.sendStatus(500);
    }
});

reimbRouter.put('/deny/:id', async(req,resp)=>{
    try{
        const user = req.session.user;
        const id =+req.params.id;
        await reimbDao.denyReimb(id,user);
        resp.json(true);
    }
    catch(err){
        console.log(err);
        resp.sendStatus(500);
    }

});

