import './App.css';
import { TestChart } from './components/Chart';
import { exportVisual } from '@progress/kendo-react-charts';
import '@progress/kendo-theme-default/dist/all.css';
import { exportPDF } from "@progress/kendo-drawing";
import { saveAs } from "@progress/kendo-file-saver";
import { Button } from '@mui/material';
import { useState } from 'react';

function App() {
  const [_chart,set_chart] = useState("")
  
  function onPDFExportClick() {
    const chartVisual = exportVisual(_chart);

    if (chartVisual) {
      exportPDF(chartVisual, {
        paperSize: "A4",
        landscape: true,
      }).then((dataURI) => saveAs(dataURI, "chart.pdf"));
    }
  };
  return (
    <div style={{ display: 'flex' }}>
      <h1>test react chart</h1>
      <TestChart set_chart={set_chart} />
      <Button variant="outlined" onClick={onPDFExportClick}>Print PDF</Button>
    </div>
  );
}

export default App;
