import {IProduct} from "../../app/models/product.types"

interface ICatalogProps {
    products : IProduct[];
    addProducts: ()=>void;
}

export default function Catalog({products, addProducts}: ICatalogProps) {

    return <>
    <ul>
              {products.map((product : IProduct) => (
                <li key = {product.id}> {product.name} - {product.price} - {product.pictureUrl} - {product.brand}</li>
              ))}
          </ul>
          <button onClick={addProducts}> Add Product</button>
    </>
}