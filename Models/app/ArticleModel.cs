using System;
using Newtonsoft.Json; 
using NPoco; 

namespace WebApplication.Models.app
{
    [JsonObject(MemberSerialization.OptOut)]
    [TableName("article")]
    [PrimaryKey("id", AutoIncrement=false)]
    [ExplicitColumns]  
    public class ArticleModel
    {
        [Column] 
        public Int64 id;
        [Column]  
        public string userID;
        [Column]  
        public string title;
        [Column] 
        public string link;
        [Column]  
        public string text;
        [Column]  
        public string subverse; 
        [Column]
        public int votes; 
        [Column] 
        public int isanon=0; 

    }
}
