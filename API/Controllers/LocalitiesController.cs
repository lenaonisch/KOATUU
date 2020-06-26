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
        public async Task<ActionResult<IList<Locality>>> ListAsync()
        {
            return Ok(await _mediator.Send(new GetLocalitiesList.Query()));
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Add(CreateLocality.Command command)
        {
            return Ok(await _mediator.Send(command));
        }

        [HttpPut]
        public async Task<ActionResult<Unit>> Edit(EditLocality.Command command)
        {
            return Ok(await _mediator.Send(command));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(long id)
        {
            return Ok(await _mediator.Send(new DeleteLocality.Command(id)));
        }
    }
}
