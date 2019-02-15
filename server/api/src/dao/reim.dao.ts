import { User } from '../models/user';
import { connectionPool } from '../util/connection-util';
import { Reimbursement } from '../models/reimbursement';

export class ReimDao {

    async findByStatus(status: number): Promise<Reimbursement[]> {
        const client = await connectionPool.connect();
        try {
            const result = await client.query(
                `SELECT reimbursementid, author, authorname.username as authorname,
                        resolvername.username as resolver, amount, datesubmitted, dateresolved,
                        description, statusid, reimbursementstatus.status ,reimbursement."type",
                        reimbursementtype."type"
                FROM reimbursement
                        left join reimbursementtype on reimbursement."type" = reimbursementtype.typeid
                        left join reimbursementstatus on reimbursement.status = reimbursementstatus.statusid
                        left join "user"as authorname  on reimbursement.author = authorname.userid
                        left join"user" as resolvername on reimbursement.resolver = resolvername.userid
                        WHERE reimbursementstatus.statusid = $1
                ORDER BY reimbursement.datesubmitted;`,
                [status]
            );
            return result.rows.map(reim => {
                return {
                    reimbursementId: reim.reimbursementid,
                    author: reim.authorname,
                    amount: reim.amount,
                    dateSubmitted: reim.datesubmitted,
                    dateResolved: reim.dateresolved,
                    description: reim.description,
                    resolver: reim.resolver,
                    status: reim.status,
                    type: reim.type
                };
            });
        } finally {
            client.release(); // release connection
        }
    }

    async findAll(): Promise<Reimbursement[]> {
        const client = await connectionPool.connect();
        try {
            const result = await client.query(
                `SELECT reimbursementid, author, authorname.username as authorname,
                        resolvername.username as resolver, amount, datesubmitted, dateresolved,
                        description, statusid, reimbursementstatus.status ,reimbursement."type",
                        reimbursementtype."type"
                FROM reimbursement
                        left join reimbursementtype on reimbursement."type" = reimbursementtype.typeid
                        left join reimbursementstatus on reimbursement.status = reimbursementstatus.statusid
                        left join "user"as authorname  on reimbursement.author = authorname.userid
                        left join"user" as resolvername on reimbursement.resolver = resolvername.userid
                ORDER BY reimbursement.datesubmitted;`
            );
            return result.rows.map(reim => {
                return {
                    reimbursementId: reim.reimbursementid,
                    author: reim.authorname,
                    amount: reim.amount,
                    dateSubmitted: reim.datesubmitted,
                    dateResolved: reim.dateresolved,
                    description: reim.description,
                    resolver: reim.resolver,
                    status: reim.status,
                    type: reim.type
                };
            });
        } finally {
            client.release(); // release connection
        }
    }

    async findById(id: number): Promise<Reimbursement> {
        const client = await connectionPool.connect();
        try {
            const result = await client.query(
                `SELECT reimbursementid, author, authorname.username as authorname,
                    resolvername.username as resolver, amount, datesubmitted, dateresolved,
                    description, statusid, reimbursementstatus.status ,reimbursement."type",
                    reimbursementtype."type"
                FROM reimbursement
                    left join reimbursementtype on reimbursement."type" = reimbursementtype.typeid
                    left join reimbursementstatus on reimbursement.status = reimbursementstatus.statusid
                    left join "user"as authorname  on reimbursement.author = authorname.userid
                    left join"user" as resolvername on reimbursement.resolver = resolvername.userid
                WHERE reimbursement.reimbursementid = $1
                ORDER BY reimbursement.datesubmitted;`,
                [id]
            );
            const reim = result.rows[0]; // there should only be 1 record
            if (reim) {
                return {
                    reimbursementId: reim.reimbursementid,
                    author: reim.authorname,
                    amount: reim.amount,
                    dateSubmitted: reim.datesubmitted,
                    dateResolved: reim.dateresolved,
                    description: reim.description,
                    resolver: reim.resolver,
                    status: reim.status,
                    type: reim.type
                };
            } else {
                return undefined;
            }
        } finally {
            client.release(); // release connection
        }
    }

    async findByAuthor(author: number): Promise<Reimbursement[]> {
        const client = await connectionPool.connect();
        try {
            const result = await client.query(
                `SELECT reimbursementid, author, authorname.username as authorname,
                    resolvername.username as resolver, amount, datesubmitted, dateresolved,
                    description, statusid, reimbursementstatus.status ,reimbursement."type",
                    reimbursementtype."type"
                FROM reimbursement
                    left join reimbursementtype on reimbursement."type" = reimbursementtype.typeid
                    left join reimbursementstatus on reimbursement.status = reimbursementstatus.statusid
                    left join "user"as authorname  on reimbursement.author = authorname.userid
                    left join"user" as resolvername on reimbursement.resolver = resolvername.userid
                WHERE author = $1
                ORDER BY reimbursement.datesubmitted;`,
                [author]
            );
            return result.rows.map(reim => {
                return {
                    reimbursementId: reim.reimbursementid,
                    author: reim.author,
                    amount: reim.amount,
                    dateSubmitted: reim.datesubmitted,
                    dateResolved: reim.dateresolved,
                    description: reim.description,
                    resolver: reim.resolver,
                    status: reim.status,
                    type: reim.type
                };
            });
        } finally {
            client.release(); // release connection
        }
    }

    async submit(
        author: number,
        amount: number,
        description: string,
        type: number) {
        const client = await connectionPool.connect();
        const text = `INSERT INTO reimbursement (author, amount, datesubmitted, dateresolved,
            description, resolver, status, "type")
            VALUES  (
                ${author}, ${+amount}, ${Math.round((new Date()).getTime() / 1000)}, 0,
                '${description}', 4, 1, ${type});`;
        // console.log(text);
        try {
            const result = await client.query(text);
        } catch (err) {
            console.log(err.stack);
        } finally {
            client.release(); // release connection
        }
    }


    async update(reqbody) {
        const client = await connectionPool.connect();
        const querySQL = `UPDATE reimbursement set
                dateresolved = $1, status = $2
                WHERE reimbursementid = $3 returning *;`;
        const querySQLParams = [Math.floor(Date.now() / 1000), reqbody.status, reqbody.reimbursementId];

        // TODO
        // instead, query for userbyid and insert old values if any new value null - put inside try below
        // make sure no values are null
        let hasNull = false;
        Object.values(reqbody).map(val => {
            if (val === null) {
                hasNull = true;
            }
        });

        if (!hasNull) {
            try {
                const result = await client.query(querySQL, querySQLParams);
                if (result.rows[0]) {
                    const reim = result.rows[0];
                    return ({
                        ...reim,
                        dateResolved: reqbody.dateresolved,
                        type: reqbody.type
                    });
                }
            } catch (err) {
                console.log(err.stack);
            } finally {
                client.release(); // release connection
            }
        }
    }

}








