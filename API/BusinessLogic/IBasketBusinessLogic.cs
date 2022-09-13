using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.BusinessLogic
{
	public interface IBasketBusinessLogic
	{
		Task<ActionResult<BasketDto>> GetBasket(string buyerID);
		Task<BasketDto> AddBasketItem(int productId, int quantity, string buyerId, string newBuyerId);
		Task<ActionResult<int>> RemoveBasketItem(int productId, int quantity, string v);
	}
}
