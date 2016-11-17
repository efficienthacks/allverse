using System;
using Newtonsoft.Json; 
using NPoco; 

namespace WebApplication.Models.app
{
    [JsonObject(MemberSerialization.OptOut)]
    [TableName("subverse")]
    [PrimaryKey("id")]   
    [ExplicitColumns]  
    class SubverseModel
    {
        [Column] 
        Int64 id;
        [Column]  
        string name;
        [Column] 
        bool isdefault=false; 

    }
}
