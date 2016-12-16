using System;
using Newtonsoft.Json; 
using NPoco; 

namespace WebApplication.Models.app
{
    [JsonObject(MemberSerialization.OptOut)]
    [TableName("bugorfeature")]
    [PrimaryKey("id" , AutoIncrement=true)]   
    [ExplicitColumns]  
    public class BugOrFeature
    {
        [Column]
        public int ID;
        [Column]
        public string text;
        [Column]
        public int isbug;
        [Column]
        public int isfeature; 

    }
}