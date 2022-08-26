using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace API.Controllers
{
	[ApiController]
	public class BuggyController : ControllerBase
	{

		[HttpGet("not-found")]
		public ActionResult GetNotFound()
		{
			return NotFound();
		}

		[HttpGet("unauthorized")]
		public ActionResult GetUnAuthorized()
		{
			return Unauthorized();
		}

		[HttpGet("bad-request")]
		public ActionResult GetBadRequest()
		{
			return BadRequest("This is Bad request");
		}

		[HttpGet("validation-error")]
		public ActionResult GetValidationError()
		{
			ModelState.AddModelError("error1", "This is first error");
			ModelState.AddModelError("error2", "This is second error");
			return ValidationProblem();
		}

		[HttpGet("server-error")]
		public ActionResult GetServerError()
		{
			throw new System.Exception("this is server error");
		}

	}
}