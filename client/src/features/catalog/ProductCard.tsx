import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { IProduct } from "../../app/models/product.types";


interface IProps{
product:IProduct

}
export default function ProductCard({product}:IProps) {
    return(

        <Card>
          <CardHeader 
          avatar={<Avatar sx={{bgcolor:'secondary.main'}}>{product.name.charAt(0).toUpperCase()}</Avatar>}
          title={product.name}
          titleTypographyProps={{sx: {fontWeight:'bold', color:'secondary.main'}}}
          />            
         
      <CardMedia
        component="img"
        sx={{height:140, backgroundSize:'contain', bgcolor:'primary.light'}}        
        image={product.pictureUrl}
        alt="green iguana"
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color={'secondary'} variant="h5">
          ${(product.price/100 ).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">ADD TO CART</Button>
        <Button size="small">VIEW</Button>
      </CardActions>
    </Card>
    )
}