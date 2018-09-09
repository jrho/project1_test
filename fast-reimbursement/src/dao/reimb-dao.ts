import { connectionPool } from "../util/connection-util";
import { Reimb } from "../model/reimb";
import { reimbConverter } from "../util/reimb-converter";
import { SqlReimb } from "../dto/sql-reimb";
import * as userDao from "../dao/user-dao";


export async function findAll(): Promise<Reimb[]> {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
            `SELECT * FROM army.army_reimbursement
            LEFT JOIN army.army_reimbursement_type USING(reimburse_type_id)
            LEFT JOIN army.army_reimbursement_status USING(reimburse_status_id);`
        )
        return resp.rows.map(reimbConverter);
    }
    finally {
        client.release();
    }
}


export async function applyReimb(reimb): Promise<number> {
    const client = await connectionPool.connect();
    let auth = await userDao.findByUsernameAndPassword(reimb.auth, reimb.password);
    try {
        const resp = await client.query(
            `INSERT INTO army.army_reimbursement(
                 reimburse_amount, reimburse_submitted, reimburse_description, reimburse_author, reimburse_status_id, reimburse_type_id)
                VALUES ($1,CURRENT_TIMESTAMP,$2,$3,$4,$5)
                RETURNING reimburse_id`,
            [reimb.amount, reimb.description, auth.id, 3, reimb.type]);

        return resp.rows[0].reimburse_id;
    }
    finally {
        client.release();
    }
}


export async function findById(id: number): Promise<Reimb[]> {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
            `SELECT * FROM army.army_reimbursement
             LEFT JOIN army.army_reimbursement_status USING (reimburse_status_id)
            LEFT JOIN army.army_reimbursement_type USING (reimburse_type_id)
            WHERE reimburse_author = $1`, [id]);
        return resp.rows.map(reimbConverter);
    }
    finally {
        client.release();
    }
}

export async function findByReimb(id:number): Promise<Reimb[]>{
    const client = await connectionPool.connect();

    try{
        const resp = await client.query(
            `SELECT * FROM army.army_reimbursement
            LEFT JOIN army.army_reimbursement_status USING(reimburse_status_id)
            LEFT JOIN army.army_reimbursement_type USING(reimburse_type_id)
            WHERE reimburse_id = $1`, [id]);
        return resp.rows.map(reimbConverter);
    }
    finally{
        client.release();
    }
}


export async function findStatus(status: number): Promise<Reimb[]> {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
            `SELECT * FROM army.army_reimbursement re
             LEFT JOIN army.army_reimbursement_status
             USING(reimburse_status_id)
             WHERE reimburse_status_id = $1;`, [status]);
        return resp.rows.map(reimbConverter);

    }
    finally {
        client.release();
    }
}
export async function approveReimb(id: number, user) {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
            `UPDATE army.army_reimbursement
             SET reimburse_status_id=1,
             reimburse_resolver =$1,
             reimburse_resolved=CURRENT_TIMESTAMP
             WHERE reimburse_id = $2`,
            [user.id, id]
        );
        return resp.rows.map(reimbConverter);
    }
    finally {
        client.release();
    }
}//end approve

export async function denyReimb(id: number, user) {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
            `UPDATE army.army_reimbursement
             SET reimburse_status_id=2,
             reimburse_resolver=$1,
             reimburse_resolved=CURRENT_TIMESTAMP
             WHERE reimburse_id =$2`,
            [user.id, id]
        );
        return resp.rows.map(reimbConverter);
    }
    finally {
        client.release();
    }
}

