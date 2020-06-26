using System.Collections.Generic;

namespace Domain
{
    public class Locality
    {
        public long Id { get;set;}
        public string Title {get;set;}
        public bool Expanded { get { return true; } }
        public List<Locality> Children { get; set; }

        public long? ParentId { get; set; }
    }
}