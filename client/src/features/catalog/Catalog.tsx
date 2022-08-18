import { useEffect, useState } from "react";
import { IProduct } from "../../app/models/product.types";
import ProductList from "./ProductList";

export default function Catalog() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <>
      <ProductList products={products} />
    </>
  );
}
