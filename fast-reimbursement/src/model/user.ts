import {Reimb} from "./Reimb";

export class User {
  id = 0;
  username = '';
  password = '';
  firstname='';
  lastname='';
  email='';
  role=0;
  reimb: Reimb[] = [];

  constructor(id:number,username:string,password:string,firstname?:string,lastname?:string,
               email?:string,role?:number, reimb?:Reimb[]){
    
        id && (this.id = id);
        username && (this.username = username);
        password && (this.password = password);
        firstname && (this.firstname = firstname);
        lastname && (this.lastname = lastname);
        email && (this.email = email);
        role && (this.role = role);
        reimb && (this.reimb=reimb);
    

  }
}