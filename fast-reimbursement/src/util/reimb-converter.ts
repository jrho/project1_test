import { SqlReimb } from "../dto/sql-reimb";
import { Reimb } from "../model/reimb";


/**
 * This is used to convert a sql user into an actual user
 */

export function reimbConverter(reimb: SqlReimb){
    return new Reimb(reimb.reimburse_id,reimb.reimburse_amount,reimb.reimburse_submitted,reimb.reimburse_resolved,
    reimb.reimburse_description,reimb.reimburse_resolver,reimb.reimburse_author,
    reimb.reimburse_status_id,reimb.reimburse_type_id,reimb.reimburse_status_type,reimb.reimburse_type);
}