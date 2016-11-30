using System;
using System.Collections.Generic; 
using Newtonsoft.Json; 
using NPoco; 

namespace WebApplication.Models.app
{
    [JsonObject(MemberSerialization.OptOut)]
    [TableName("comment")]
    [PrimaryKey("id", AutoIncrement=true)] 
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
        public string content;
        [Column] 
        public string userID;
        [Column] 
        public string userName;
        [Column]  
        public int votes;
        [Column] 
        public int isanon=0; 
        [Column]
        public int level=0; 

        public List<CommentModel> comments; 
        public CommentModel parent; 
    }
}
