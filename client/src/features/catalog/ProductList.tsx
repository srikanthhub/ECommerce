import {  Grid } from "@mui/material";
import { IProduct } from "../../app/models/product.types"
import  ProductCard  from "./ProductCard"

interface IProps{
    products :IProduct[];

}
export default function ProductList({products}: IProps){
    return(
        <Grid container spacing={5}>
              {products.map((product : IProduct) => (
                  <Grid item xs={3}> <ProductCard key={product.id} product={product} /> </Grid>
               
              ))}
       </Grid>

    )
}