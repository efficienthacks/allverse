using System;
using Newtonsoft.Json; 
using NPoco; 

namespace WebApplication.Models.app
{
    [JsonObject(MemberSerialization.OptOut)]
    [TableName("uservotes")]
    [PrimaryKey("id" , AutoIncrement=true)]   
    [ExplicitColumns]  

    public class VoteModel
    {
        [Column]
        public Int64 id; 
        [Column]
        public string userid; 
        [Column]
        public Int64 commentid; 
        [Column]
        public Int64 articleid; 
        [Column]
        public int vote; 
    }
}