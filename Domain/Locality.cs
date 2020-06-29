using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class Locality
    {
        public Locality()
        {
            Children = new List<Locality>();
        }
        public long Id { get; set; }
        public string LocalityName { get; set; }
        public char? Category { get; set; }

        public virtual IEnumerable<Locality> Children { get; set; }

        [ForeignKey("Parent")]
        public long? ParentId { get; set; }
       
        public virtual Locality Parent { get; set; }
    }
}