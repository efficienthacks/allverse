
export class User
{
    isAuthenticated : boolean; 
    id : string; 
    name : string; 

    log()
    {
        console.log("User ID: " + this.id + " isAuth: " + this.isAuthenticated + " Name: " + this.name); 
    }
}