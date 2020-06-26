using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LocalitiesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public LocalitiesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public  ActionResult<IList<Locality>> List()
        {
            List<Locality> res = new List<Locality>()
            {
                new Locality() 
                {
                    Id = 1, Title = "Title1", Children = new List<Locality>()
                    {
                        new Locality() { Id = 11, Title = "Child11"},
                        new Locality() { Id = 12, Title = "Child12"}
                    }
                },
                new Locality() 
                {
                    Id = 2, Title = "Title2", Children = new List<Locality>()
                    {
                        new Locality() { Id = 21, Title = "Child21"},
                        new Locality() { Id = 22, Title = "Child22"}
                    }
                }
            };
            return Ok(res);
        }
    }
}
