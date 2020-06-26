using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class EditLocality
    {
        public class Command : IRequest
        {
            public long Id { get; set; }
            public string Title { get; set; }
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
                var locality = await _context.Localities.FindAsync(request.Id);
                if (locality == null)
                {
                   throw new Exception($"Can't find locality with Id {request.Id}");
                }

                locality.Title = request.Title ?? locality.Title;
                locality.Category = request.Category ?? locality.Category;
                locality.ParentId = request.ParentId ?? locality.ParentId;
                
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Error during saving changes");
            }
        }
    }
}