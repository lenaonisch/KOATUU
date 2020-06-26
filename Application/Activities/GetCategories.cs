using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Persistence;

public class GetCategories
{
    public class Query : IRequest<IList<string>> {}
    public class Handler : IRequestHandler<Query, IList<string>>
    {
        private readonly DataContext _dataContext;

        public Handler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<IList<string>> Handle(Query request, CancellationToken cancellationToken)
        {
            var data = _dataContext.Activities.Select(a => a.Category);
            var list = await data.Distinct().ToListAsync();
            return list;
        }
    }
}