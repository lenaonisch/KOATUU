using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class CreateLocality
    {
        public class Command : IRequest
        {
            public long Id { get; set; }
            public string LocalityName { get; set; }
            public char? Category { get; set; }
            public long? ParentId { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            public Handler(DataContext context)
            {
                _context = context;
            }

            private DataContext _context { get; }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = _context.Localities.Add(
                   new Locality()
                   {
                       Id = request.Id,
                       LocalityName = request.LocalityName,
                       Category = request.Category,
                       ParentId = request.ParentId
                   });
                var success = await _context.SaveChangesAsync() > 0 ;

                if (success) return Unit.Value;

                throw new Exception("Error during saving changes");
            }
        }
    }
}