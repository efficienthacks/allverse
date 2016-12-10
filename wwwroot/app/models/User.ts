
export class User
{
    isAuthenticated : boolean; 
    id : string; 
    name : string; 
    isMod : boolean; 

    log()
    {
        console.log("User ID: " + this.id + " isAuth: " + this.isAuthenticated + " Name: " + this.name); 
    }
}