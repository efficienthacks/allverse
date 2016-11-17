using System;
using Newtonsoft.Json; 
using NPoco; 

namespace WebApplication.Models.app
{
    [JsonObject(MemberSerialization.OptOut)]
    [TableName("comment")]
    [PrimaryKey("id")]   
    [ExplicitColumns]  
    class CommentModel
    {
        [Column] 
        Int64 id;
        [Column]  
        Int64 articleID;
        [Column]  
        Int64 parentCommentID;
        [Column]  
        string text;
        [Column] 
        string userID;
        [Column]  
        int votes;
        [Column] 
        bool isanon=false; 

    }
}
