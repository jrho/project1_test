import { connectionPool } from "../util/connection-util";
import { User } from "../model/user";
import { reimbConverter } from "../util/reimb-converter";
import { userConverter } from "../util/user-converter";

/**
 * Retreive all users from the DB along with all their remib
 */
export async function findAll(): Promise<User[]> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `SELECT * FROM army.army_users`);

    // extract the users and their reimb from the result set
    const users = [];
    resp.rows.forEach((user_result) => {
      const item = reimbConverter(user_result);
      const exists = users.some(existingUser => {
        if (user_result.user_id === existingUser.id) {
          item.id && existingUser.reimb.push(item);
          return true;
        }
      })
      if (!exists) {
        const newUser = userConverter(user_result);
        item.id && newUser.reimb.push(item);
        users.push(newUser);
      }
    })
    return users;
  } finally {
    client.release();
  }
}

/**
 * Retreive a single user by id, will also retreive all of that users reimbursement
 * @param id 
 */
export async function findById(id: number): Promise<User> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `SELECT * FROM army.army_users u
       NATURAL JOIN army.army_role
        WHERE u.army_userid = $1`, [id]);
    const user = userConverter(resp.rows[0]); // get the user data from first row

    // get the reimb from all the rows
    resp.rows.forEach((reimb) => {
      reimb.reimb_id && user.reimb.push(reimbConverter(reimb));
    })
    return user;
  } finally {
    client.release();
  }
}

/**
 * Retreive a single user by username and password, will also retreive all of that users movies
 * @param id 
 */
export async function findByUsernameAndPassword(username: string, password: string): Promise<User> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
       `SELECT * FROM army.army_users u
        NATURAL JOIN army.army_role
        WHERE u.sol_username = $1
        AND u.sol_password = $2`, [username, password]);
        if(resp.rows.length !== 0) {
          return userConverter(resp.rows[0]); // get the user data from first row
        }
        return null;
  } finally {
    client.release();
  }
}


/**
 * Add a new user to the DB
 * @param user 
 */
export async function create(user: User): Promise<number> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `INSERT INTO army.army_users
        (sol_username, sol_password, sol_firstname,sol_lastname,sol_email,sol_roleid)
        VALUES ($1,$2,$3,$4,$5,$6) 
        RETURNING army_userid`, [user.username, user.password, user.firstname, user.lastname, user.email, 2]);
    return resp.rows[0].army_userid;
  } finally {
    client.release();
  }
}

