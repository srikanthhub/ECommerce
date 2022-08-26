import { Container, Divider, Paper, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export default function ServerError() {
  // const history= useNavigate();
  // const location = useLocation<>();
  // const {state} = location.state

  return (
    <Container component={Paper}>
      <Typography variant="h5" gutterBottom>
        Server Error
      </Typography>
    </Container>
  );
}
