using System;
using Newtonsoft.Json; 
using NPoco; 

namespace WebApplication.Models.app
{
    [JsonObject(MemberSerialization.OptOut)]
    [TableName("usersubs")]
    [PrimaryKey("id")]   
    [ExplicitColumns]  
    public class UserSubsModel
    {
        [Column] 
        public Int64 id;
        [Column]  
        public string userID;
        [Column]  
        public string subverseID;
        [Column] 
        public bool ismod=false; 

    }
}
