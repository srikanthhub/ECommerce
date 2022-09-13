using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.BusinessLogic
{
	public class BasketBusinessLogic : IBasketBusinessLogic
	{
		private readonly StoreContext _context;
		public BasketBusinessLogic(StoreContext context)
		{
			_context = context;
		}

		public async Task<ActionResult<BasketDto>> GetBasket(string buyerID)
		{
			var basket = await RetriveBasket(buyerID);

			if (basket == null) return null;
			BasketDto basketDto = MapBasketToDto(basket);

			return basketDto;
		}

		public async Task<BasketDto> AddBasketItem(int productId, int quantity, string buyerID, string newBuyerId)
		{


			var basket = await RetriveBasket(buyerID);

			if (basket == null) basket = CreateBasket(newBuyerId);

			var product = await _context.Products.FindAsync(productId);

			if (product == null) return null;

			if (product != null) basket.AddItem(product, quantity);

			var result = await _context.SaveChangesAsync() > 0;
			if (result) return MapBasketToDto(basket);

			return null;

		}

		public async Task<ActionResult<int>> RemoveBasketItem(int productId, int quantity, string buyerId)
		{
			//get basket

			var basket = await RetriveBasket(buyerId);
			if (basket == null) return null;



			//remove item or remove quantity 
			basket.RemoveItem(productId, quantity);

			//save
			return await _context.SaveChangesAsync();

		}


		private Basket CreateBasket(string buyerId)
		{


			var basket = new Basket { BuyerId = buyerId };
			_context.Baskets.Add(basket);

			return basket;
		}

		private async Task<Basket> RetriveBasket(string buyerID)
		{
			return await _context.Baskets
				.Include(i => i.Items)
				.ThenInclude(p => p.Product)
				.FirstOrDefaultAsync(x => x.BuyerId == buyerID);
		}

		private BasketDto MapBasketToDto(Basket basket)
		{
			return new BasketDto
			{
				Id = basket.ID,
				BuyerId = basket.BuyerId,
				Items = basket.Items.Select(item => new BasketItemDto
				{
					ProductId = item.ProductId,
					Name = item.Product.Name,
					Price = item.Product.Price,
					PictureUrl = item.Product.PictureUrl,
					Brand = item.Product.Brand,
					Quantity = item.Quantity,
					Type = item.Product.Type
				}).ToList()
			};
		}
	}
}
