import { User } from '../models/user';
import { connectionPool } from '../util/connection-util';

export class UserDao {

    async findAll(): Promise<User[]> {
        const client = await connectionPool.connect();
        try {
            const result = await client.query(
                'SELECT * FROM "user" INNER JOIN "role" on "user"."role"="role".roleid;'
            );
            return result.rows.map(sqlUser => {
                return {
                    userId: sqlUser.userid,
                    username: sqlUser.username,
                    password: '', // don't send back the passwords
                    firstName: sqlUser.firstname,
                    lastName: sqlUser.lastname,
                    email: sqlUser.email,
                    role: sqlUser.role
                };
            });
        } finally {
            client.release(); // release connection
        }
    }

    async findAllWithRole(): Promise<User[]> {
        const client = await connectionPool.connect();
        try {
            const result = await client.query(
                'SELECT * FROM "user" INNER JOIN "role" on "user"."role"="role".roleid'
            );
            return result.rows.map(sqlUser => {
                return {
                    userId: sqlUser.userid,
                    username: sqlUser.username,
                    password: '', // don't send back the passwords
                    firstName: sqlUser.firstname,
                    lastName: sqlUser.lastname,
                    email: sqlUser.email,
                    role: sqlUser.role
                };
            });
        } finally {
            client.release(); // release connection
        }
    }

    async findById(id: number): Promise<User> {
        const client = await connectionPool.connect();
        try {
            const result = await client.query(
                'SELECT * FROM "user" INNER JOIN "role" on "user"."role"="role".roleid  WHERE "user".userid = $1',
                [id]
            );
            const sqlUser = result.rows[0]; // there should only be 1 record
            if (sqlUser) {
                return {
                    userId: sqlUser.userid,
                    username: sqlUser.username,
                    password: '', // don't send back the passwords
                    firstName: sqlUser.firstname,
                    lastName: sqlUser.lastname,
                    email: sqlUser.email,
                    role: sqlUser.role
                };
            } else {
                return undefined;
            }
        } finally {
            client.release(); // release connection
        }
    }

    async findByUsername(username: string): Promise<User> {
        const client = await connectionPool.connect();
        try {
            const result = await client.query(
                'SELECT * FROM "user" INNER JOIN "role" on "user"."role"="role".roleid  WHERE "user".username = $1',
                [username]
            );
            const sqlUser = result.rows[0]; // there should only be 1 record
            if (sqlUser) {
                return {
                    userId: sqlUser.userid,
                    username: sqlUser.username,
                    password: sqlUser.password,
                    firstName: sqlUser.firstname,
                    lastName: sqlUser.lastname,
                    email: sqlUser.email,
                    role: sqlUser.role
                };
            } else {
                return undefined;
            }
        } finally {
            client.release(); // release connection
        }
    }

    async findByRole(role: number): Promise<User[]> {
        const client = await connectionPool.connect();
        try {
            const result = await client.query(
                'SELECT * FROM "user" WHERE "role" = $1',
                [role]
            );
            return result.rows.map(sqlUser => {
                return {
                    userId: sqlUser.userid,
                    username: sqlUser.username,
                    password: '', // don't send back the passwords
                    firstName: sqlUser.firstname,
                    lastName: sqlUser.lastname,
                    email: sqlUser.email,
                    role: sqlUser.role
                };
            });
        } finally {
            client.release(); // release connection
        }
    }


    async update(reqbody) {
        const client = await connectionPool.connect();
        const querySQL = `UPDATE "user" set username = $1,
                firstname = $2, lastname = $3,
                email = $4, "role" = $5
                WHERE userid = $6 returning *;`;
        const querySQLParams = [reqbody.username, reqbody.firstname,
                                reqbody.lastname, reqbody.email,
                                reqbody.role, reqbody.userid];

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
                    const user = result.rows[0];
                    return ({
                        userId: user.userid,
                        username: user.username,
                        password: '',
                        firstName: user.firstname,
                        lastName: user.lastname,
                        email: user.email,
                        role: user.role
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








