using System;
using Newtonsoft.Json; 
using NPoco; 

namespace WebApplication.Models.app
{
    [JsonObject(MemberSerialization.OptOut)]
    [TableName("usersubs")]
    [PrimaryKey("id" , AutoIncrement=true)]     
    [ExplicitColumns]  
    public class UserSubsModel
    {
        [Column] 
        public Int64 id;
        [Column]  
        public string userID;
        [Column]  
        public string subverseName;
        [Column] 
        public int ismod=0; 
        [Column] 
        public int isSubscribed=0; 
        [Column]
        public string userName; 
    }
}
