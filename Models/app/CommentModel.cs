using System;
using Newtonsoft.Json; 
using NPoco; 

namespace WebApplication.Models.app
{
    [JsonObject(MemberSerialization.OptOut)]
    [TableName("comment")]
    [PrimaryKey("id")]   
    [ExplicitColumns]  
    public class CommentModel
    {
        [Column] 
        public Int64 id;
        [Column]  
        public Int64 articleID;
        [Column]  
        public Int64 parentCommentID;
        [Column]  
        public string text;
        [Column] 
        public string userID;
        [Column]  
        public int votes;
        [Column] 
        public bool isanon=false; 

    }
}
