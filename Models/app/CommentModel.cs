using System;
using System.Collections.Generic; 
using Newtonsoft.Json; 
using NPoco; 

namespace WebApplication.Models.app
{
    [JsonObject(MemberSerialization.OptIn)]
    [TableName("comment")]
    [PrimaryKey("id", AutoIncrement=true)] 
    [ExplicitColumns]  
    public class CommentModel
    {
        [Column] 
        [JsonPropertyAttribute]
        public Int64 id;
        [Column]  
        [JsonPropertyAttribute]
        public Int64 articleID;
        [Column]  
        [JsonPropertyAttribute]
        public Int64 parentCommentID;
        [Column]  
        [JsonPropertyAttribute]
        public string content;
        [Column] 
        [JsonPropertyAttribute]
        public string userID;
        [Column] 
        [JsonPropertyAttribute]
        public string userName;
        [Column]  
        [JsonPropertyAttribute]
        public int votes;
        [Column] 
        [JsonPropertyAttribute]
        public int isanon=0; 
        [Column]
        [JsonPropertyAttribute]
        public int level=0; 
        [JsonPropertyAttribute]
        public List<CommentModel> comments; 
        public CommentModel parent; 
    }
}
