
export class BugOrFeature
{
    isbug : number;
    isfeature : number; 
    text : string; 

    constructor(isbug : number, isfeature : number, text : string)
    {
        this.isbug = isbug;
        this.isfeature = isfeature; 
        this.text = text; 
    }
}