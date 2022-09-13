using API.BusinessLogic;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
	[ApiController]
	public class BasketController : BaseApiController
	{

		private readonly IBasketBusinessLogic basketBusinessLogic;

		public BasketController(IBasketBusinessLogic basketBusinessLogic)
		{

			this.basketBusinessLogic = basketBusinessLogic;
		}

		[HttpGet(Name = "GetBasket")]
		public async Task<ActionResult<BasketDto>> GetBasket()
		{
			var basket = await this.basketBusinessLogic.GetBasket(Request.Cookies["buyerId"]);
			if (basket == null) return NotFound();

			return basket;
		}

		[HttpPost]
		public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
		{
			var basket = await this.basketBusinessLogic.GetBasket(Request.Cookies["buyerId"]);

			var newBuyerId = "";
			BasketDto result;

			if (basket == null)
			{
				newBuyerId = Guid.NewGuid().ToString();
				var cookieOptions = new CookieOptions { IsEssential = true, Expires = System.DateTime.Now.AddDays(30) };
				Response.Cookies.Append("buyerId", newBuyerId, cookieOptions);
				result = await this.basketBusinessLogic.AddBasketItem(productId, quantity, Request.Cookies["buyerId"], newBuyerId);
			}
			else
			{
				result = await this.basketBusinessLogic.AddBasketItem(productId, quantity, Request.Cookies["buyerId"], newBuyerId);
			}




			if (result != null) return CreatedAtRoute("GetBasket", result);

			return BadRequest(new ProblemDetails { Title = "Problem saving Item to basket" });

		}

		[HttpDelete]
		public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
		{

			var result = await this.basketBusinessLogic.RemoveBasketItem(productId, quantity, Request.Cookies["buyerId"]);
			if (result != null && result.Value > 0) return Ok();

			else return BadRequest(new ProblemDetails { Title = "Problem removing the item from Basket" }); ;
		}

	}
}
