using System;
using Newtonsoft.Json; 
using NPoco; 

namespace WebApplication.Models.app
{
    [JsonObject(MemberSerialization.OptOut)]
    [TableName("usersubs")]
    [PrimaryKey("id")]   
    [ExplicitColumns]  
    class UserSubsModel
    {
        [Column] 
        Int64 id;
        [Column]  
        string userID;
        [Column]  
        string subverseID;
        [Column] 
        bool ismod=false; 

    }
}
