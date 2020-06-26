using Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Data
{
    public class LocalityViewModel
    {
        public LocalityViewModel()
        {
            Children = new List<LocalityViewModel>();
        }
        public long Id { get; set; }
        public string Title { get; set; }
        public char? Category { get; set; }

        public List<LocalityViewModel> Children { get; set; }
    }
}
