
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";

function App() {

  const [darkMode, setDarkmode] = useState(false);

  const pallatType= darkMode ? 'dark':'light';
  const theme = createTheme({
    palette: {
      mode: pallatType,
      background:{
        default: pallatType==='light' ? '#eaeaea' : '#121212'
      }
    }
  })  

  function handleThemeChange(){
    setDarkmode(!darkMode);
  }

  return (
    <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
          <Container><Catalog /></Container>
    </ThemeProvider>
  );
}

export default App;
