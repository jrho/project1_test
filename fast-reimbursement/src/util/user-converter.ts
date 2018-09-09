
import {User} from "../model/User";
import { SqlUser } from "../dto/sql-user";

/**
 * This is used to convert a sql user into an actual user
 */

export function userConverter(user: SqlUser){
    return new User(user.army_userid, user.sol_username,user.sol_password,user.sol_firstname,
    user.sol_lastname,user.sol_email,user.sol_roleid);
}