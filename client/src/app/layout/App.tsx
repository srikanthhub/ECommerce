
import { useState, useEffect } from "react";
import Catalog from "../../features/catalog/Catalog";
import { IProduct } from "../models/product.types"
//import { IProduct } from "../models/product.types";


function App() {

  const [products, setProducts] = useState<IProduct[]>([]);

useEffect(()=> {
  fetch('http://localhost:5000/api/products')
  .then(response=>response.json())
  .then(data=>setProducts(data))
},[])

function addProducts (){
   setProducts(prevState=> [...prevState, 
    { id: prevState.length+101, 
      name: 'product' + (prevState.length+1), 
      description: 'some description', 
      price: (prevState.length*100 +100),
       pictureUrl: 'some url', 
       brand: 'some brand' 
      }
    ]
    )
 
  //  setProducts(prevState => [...prevState, {
  //   id: 101, 
  //   name: 'product' + '1'
  //  }])
}

  return (
    <div className="app">
          <h1>My-Store</h1>
          <Catalog products= {products} addProducts={addProducts}/>
          
    </div>
  );
}

export default App;
