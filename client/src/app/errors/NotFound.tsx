import {
  Button,
  Container,
  Divider,
  Link,
  Paper,
  Typography,
} from "@mui/material";

export default function NotFound() {
  return (
    <Container component={Paper} sx={{ height: 20 }}>
      <Typography gutterBottom>Not Found Page</Typography>
      <Divider />
      <Button fullWidth variant="contained" href="/catalog">
        {" "}
        Go Back to Shop
      </Button>
    </Container>
  );
}
