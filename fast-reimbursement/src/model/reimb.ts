export class Reimb{
    id = 0;
    amount = 0;
    submitted = '';
    resolved = '';
    description = '';
    author = 0;
    resolver = 0;
    status_id = 0;
    type_id = 0;
    status='';
    type='';

    constructor(id: number, amount?: number, submitted?: string, resolved?: string, description?: string, resolver?: number, author?: number, status_id?: number, type_id?: number, status?:string, type?:string){
        id && (this.id = id);
        amount && (this.amount = amount);
        submitted && (this.submitted = submitted);
        resolved && (this.resolved = resolved);
        description && (this.description = description);
        author && (this.author = author);
        resolver && (this.resolver = resolver);
        status_id && (this.status_id = status_id);
        type_id && (this.type_id = type_id);
        status && (this.status = status);
        type && (this.type = type);
      
        
    }

}