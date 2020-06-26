using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class DeleteLocality
    {
        public class Command : IRequest 
        {
            public Command(long id)
            {
                Id = id;
            }

            public long Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var item = await _context.Localities.FindAsync(request.Id);
                if (item == null)
                {
                   throw new Exception($"Item with Id {request.Id} wasn't found");
                }

                _context.Localities.Remove(item);
                if (await _context.SaveChangesAsync() > 0)
                {
                    return Unit.Value;
                }
                throw new Exception("Problem on saving DB");
            }
        }
    }
}