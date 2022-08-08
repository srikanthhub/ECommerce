import { AppBar, Switch, Toolbar, Typography } from "@mui/material";
import  { useState } from "react";

interface IHeaderProps {
    darkMode: boolean
    handleThemeChange: () => void;
}

export default function Header ({darkMode, handleThemeChange} : IHeaderProps){
    const [checked, setChecked] = useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
      };

    return(
        <AppBar position="static" sx={{mb: 4}}>
            <Toolbar>
                <Typography variant="h5">
                    MY-STORE
                </Typography>
<Switch
  checked={darkMode}
  onChange={handleThemeChange}
  inputProps={{ 'aria-label': 'controlled' }}
/>

            </Toolbar>
        </AppBar>
    )
}