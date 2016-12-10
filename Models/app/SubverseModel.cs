using System;
using Newtonsoft.Json; 
using NPoco; 

namespace WebApplication.Models.app
{
    [JsonObject(MemberSerialization.OptOut)]
    [TableName("subverse")]
    [PrimaryKey("id" , AutoIncrement=true)]   
    [ExplicitColumns]  
    public class SubverseModel
    {
        [Column] 
        public Int64 id;
        [Column]  
        public string name;
        [Column] 
        public bool isdefault=false; 

    }
}
