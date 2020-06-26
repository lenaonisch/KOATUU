using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class LocalityNode
    {
        public long Id { get; set; }

        [ForeignKey("Parent")]
        public long? ParentId { get; set; }
        [JsonIgnore]
        public virtual Locality Parent { get; set; }

        [ForeignKey("Child")]
        public long? ChildId { get; set; }
        [JsonIgnore]
        public virtual Locality Child { get; set; }

        public int Separation { get; set; }
    }
}
