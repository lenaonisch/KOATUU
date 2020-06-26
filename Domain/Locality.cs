using Newtonsoft.Json;
using System.Collections.Generic;

namespace Domain
{
    public class Locality
    {
        public long Id { get;set;}
        public string Title { get; set; }
        public char? Category { get; set; }

        [JsonIgnore]
        public virtual LocalityNode Ancestor { get; set; }
        [JsonIgnore]
        public virtual ICollection<LocalityNode> Children { get; set; }
    }
}