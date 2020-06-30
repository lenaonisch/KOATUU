using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
namespace Application.Activities
{
    public class GetExport
    {
        public class Query : IRequest<IList<Locality>>
        {
            public Query(long[] ids)
            {
                ids.CopyTo(Ids, 0);
            }

            public long[] Ids { get; set; }
        }

        public class Handler : IRequestHandler<Query, IList<Locality>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<IList<Locality>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                return await _context.Localities.ToListAsync();
            }
        }
    }
}
