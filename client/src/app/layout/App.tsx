import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import { Route, Router, Routes, useRoutes } from "react-router-dom";
import AboutPage from "../../features/about/Aboutpage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductsDetails";
import ContactPage from "../../features/contact/ContactPage";
import Contact from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import Header from "./Header";

function App() {
  const [darkMode, setDarkmode] = useState(false);

  const pallatType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: pallatType,
      background: {
        default: pallatType === "light" ? "#eaeaea" : "#121212",
      },
    },
  });

  function handleThemeChange() {
    setDarkmode(!darkMode);
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<ProductDetails />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
