using System;
using Newtonsoft.Json; 
using NPoco; 

namespace WebApplication.Models.app
{
    [JsonObject(MemberSerialization.OptOut)]
    [TableName("article")]
    [PrimaryKey("id")]   
    [ExplicitColumns]  
    class ArticleModel
    {
        [Column] 
        Int64 id;
        [Column]  
        string userID;
        [Column]  
        string title;
        [Column] 
        string link;
        [Column]  
        string text;
        [Column]  
        string subverse; 
        [Column]
        int votes; 
        [Column] 
        bool isanon=false; 

    }
}
