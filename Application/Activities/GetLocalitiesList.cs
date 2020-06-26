using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Data;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class GetLocalitiesList
    {
        public class Query: IRequest<IList<LocalityViewModel>> {}

        public class Handler : IRequestHandler<Query, IList<LocalityViewModel>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<IList<LocalityViewModel>> Handle(Query request, 
                CancellationToken cancellationToken)
            {
                var res = await _context.Localities
                    .Include(x => x.Children)
                    .Where(x=>x.Ancestor == null)
                    .Select(t=> new LocalityViewModel()
                    {
                        Id = t.Id,
                        Category = t.Category,
                        Title = t.Title,
                        Children = new List<LocalityViewModel>(t.Children.Select(c=>new LocalityViewModel() { Id = c.Child.Id, Title = c.Child.Title, Category = c.Child.Category }))
                    })
                    .ToListAsync();
                return res;
            }
        }
    }
}