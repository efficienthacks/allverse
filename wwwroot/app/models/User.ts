
export class User
{
    isAuthenticated : boolean; 
    ID : string; 
    Name : string; 

    log()
    {
        console.log("User ID: " + this.ID + " isAuth: " + this.isAuthenticated + " Name: " + this.Name); 
    }
}