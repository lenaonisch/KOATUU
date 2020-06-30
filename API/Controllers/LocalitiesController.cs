using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Application.Activities;
using Application.PDF;
using DinkToPdf;
using DinkToPdf.Contracts;
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
        private readonly IConverter _converter;

        public LocalitiesController(IMediator mediator, IConverter converter)
        {
            _mediator = mediator;
            _converter = converter;
        }

        [HttpGet]
        public async Task<ActionResult<IList<Locality>>> ListAsync()
        {
            return Ok(await _mediator.Send(new GetLocalitiesList.Query()));
        }

        [HttpPost]
        public async Task<ActionResult<MediatR.Unit>> Add(CreateLocality.Command command)
        {
            return Ok(await _mediator.Send(command));
        }

        [HttpPut]
        public async Task<ActionResult<MediatR.Unit>> Edit(EditLocality.Command command)
        {
            return Ok(await _mediator.Send(command));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<MediatR.Unit>> Delete(string id)
        {
            return Ok(await _mediator.Send(new DeleteLocality.Command(id)));
        }

        [HttpGet()]
        [Route("/export")]
        public async Task<IActionResult> FileAsync([FromQuery] string[] locality)
        {
            var localities = await _mediator.Send(new GetExport.Query(locality));

            var globalSettings = new GlobalSettings
            {
                ColorMode = ColorMode.Color,
                Orientation = Orientation.Portrait,
                PaperSize = PaperKind.A4,
                Margins = new MarginSettings { Top = 10 },
                DocumentTitle = "PDF Report"
            };

            var objectSettings = new ObjectSettings
            {
                PagesCount = true,
                HtmlContent = TemplateGenerator.GetHTMLString("Search results report",localities),
                WebSettings = { DefaultEncoding = "utf-8", UserStyleSheet = Path.Combine(Directory.GetCurrentDirectory(), "assets", "styles.css") },
                HeaderSettings = { FontName = "Arial", FontSize = 9, Right = "Page [page] of [toPage]", Line = true },
                FooterSettings = { FontName = "Arial", FontSize = 9, Line = true, Center = "Report Footer" }
            };

            var pdf = new HtmlToPdfDocument()
            {
                GlobalSettings = globalSettings,
                Objects = { objectSettings }
            };

            var file = _converter.Convert(pdf);
            return File(file, "application/pdf", "filename.pdf");
        }
    }
}
