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
    public class ActivitiesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ActivitiesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<IList<Activity>>> List()
        {
            return Ok(await _mediator.Send(new GetActivitiesList.Query()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> Details(Guid id)
        {
            return Ok(await _mediator.Send(new GetDetails.Query(id)));
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Add(CreateActivity.Command command)
        {
            return Ok(await _mediator.Send(command));
        }

        [HttpPut]
        public async Task<ActionResult<Unit>> Edit(EditActivity.Command command)
        {
            return Ok(await _mediator.Send(command));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return Ok(await _mediator.Send(new DeleteActivity.Command(id)));
        }

        [HttpGet("/Categories")]
        public async Task<ActionResult<IList<Activity>>> GetCategories()
        {
            return Ok(await _mediator.Send(new GetCategories.Query()));
        }
    }
}