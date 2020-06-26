using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class CreateActivity
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime Date { get; set; }
            public string City { get; set; }
            public string Vanue { get; set; }
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
                var activity = _context.Activities.Add(
                    new Activity()
                    {
                        Title = request.Title,
                        Description = request.Title,
                        Category = request.Category,
                        Date = request.Date,
                        City = request.City,
                        Vanue = request.Vanue
                    });
                var success = await _context.SaveChangesAsync() > 0 ;

                if (success) return Unit.Value;

                throw new Exception("Error during saving changes");
            }
        }
    }
}