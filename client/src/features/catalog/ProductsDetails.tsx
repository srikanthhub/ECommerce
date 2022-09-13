import { LineAxisOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { removeListener } from "process";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { idText } from "typescript";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { IProduct } from "../../app/models/product.types";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();

  const { basket, setBasket, removeItem } = useStoreContext();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const item = basket?.items.find((i) => i.productId === product?.id);

  useEffect(() => {
    if (item) setQuantity(item.quantity);

    agent.Catalog.details(parseInt(id!))
      .then((product) => setProduct(product))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [id, item]);

  function handleInputChange(event: any) {
    if (event.target.value >= 0) {
      setQuantity(event.target.value);
    }
  }

  function handleUpdateCart() {
    setSubmitting(true);

    if (!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      agent.Basket.addItem(product?.id!, updatedQuantity)
        .then((basket) => setBasket(basket))
        .finally(() => setSubmitting(false));
    } else {
      const updatedQuantity = item.quantity - quantity;

      agent.Basket.removeItem(product?.id!, updatedQuantity)
        .then(() => removeItem(product?.id!, updatedQuantity))
        .finally(() => setSubmitting(false));
    }
  }
  if (loading)
    return <LoadingComponent message="Loading Product details page...." />;

  if (!product) return <NotFound />;

  if (error) return <h3> {error}</h3>;

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: "100%" }}
        ></img>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">
          ${(product.price / 100).toFixed(2)}
        </Typography>

        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity in Stock</TableCell>
                <TableCell>{product.quanityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              onChange={handleInputChange}
              variant="outlined"
              type="number"
              label="Quantity in Stock"
              fullWidth
              value={quantity}
            />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              disabled={
                item?.quantity === quantity || (!item && quantity === 0)
              }
              onClick={handleUpdateCart}
              sx={{ height: "55px" }}
              color="primary"
              size="large"
              variant="contained"
              fullWidth
            >
              {item ? "Update Quanty" : "Add to Cart"}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
