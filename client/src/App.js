import './App.css';
import Report from './components/Report'
import '@progress/kendo-theme-default/dist/all.css';
import {Grid, Container, Button, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});



function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Grid container justifyContent="center" sx={{margin:"10px"}}>
      <Report />
      </Grid>
    </ThemeProvider>
  );
}

export default App;
