import { TestChart } from "./Chart";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import PrintIcon from "@mui/icons-material/Print";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import BarChartIcon from '@mui/icons-material/BarChart';
import { exportVisual } from "@progress/kendo-react-charts";
import "@progress/kendo-theme-default/dist/all.css";
import { exportPDF } from "@progress/kendo-drawing";
import { saveAs } from "@progress/kendo-file-saver";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Container,
  Button,
} from "@mui/material";
import {useRef, useState } from "react";
import './Report.css'
export default function Report() {
  const [_chart, set_chart] = useState("");
  const generateReportGreen = "#66BB6B";
  const printReportBlue = "#29B6F7";
  const dropDownLabelGrey = "#AFBDD1";
  const backgroundBlue = "#2B3648";
  const ref = useRef()

  function onPDFExportClick() {
    const chartVisual = exportVisual(_chart);

    if (chartVisual) {
      exportPDF(chartVisual, {
        paperSize: "auto",
        landscape: true,
      }).then((dataURI) => saveAs(dataURI, "chart.pdf"));
    }
  }

  function ExportPDFBtn() {
    return (
      <Button
        variant="contained"
        startIcon={<PictureAsPdfIcon />}
        onClick={onPDFExportClick}
        sx={{ color: "black", backgroundColor: printReportBlue }}
      >
        PDF
      </Button>
    );
  }

  function PrintChartBtn () {
    return (
        <ReactToPrint content={() => ref.current}>
          <PrintContextConsumer>
            {({ handlePrint }) => (
              <Button
                variant="contained"
                startIcon={<PrintIcon />}
                onClick={handlePrint}
                sx={{ color: "black", backgroundColor: printReportBlue }}
              >
                PRINT
              </Button>
            )}
          </PrintContextConsumer>
        </ReactToPrint>
    )
  }

  return (
    <Container fixed sx={{ backgroundColor: backgroundBlue, padding: 3 }}>
      <Box display="flex" justifyContent="space-around">
        <DropDown title="Standard Reports" />
        <DropDown title="Duration" />
        <DropDown title="From" />
        <DropDown title="To" />
        <Button
          variant="contained"
          startIcon={<BarChartIcon />}
          sx={{ color: "black", backgroundColor: generateReportGreen }}
        >
          Generate Report
        </Button>
        <PrintChartBtn />
        <ExportPDFBtn />
      </Box>
      <Box ref={ref} display="grid" justifyContent="center" margin="10px">
        <Box
          position="relative"
          backgroundColor="white"
          height="450px"
          width="700px"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <p
            style={{
              position: "absolute",
              color: "black",
              top: 0,
              right: 0,
              margin: 2,
            }}
          >
            Duration
          </p>
          <p
            style={{
              position: "absolute",
              color: "black",
              top: 0,
              left: 0,
              margin: 2,
            }}
          >
            Report Type: Usage
          </p>
          <p
            style={{
              position: "absolute",
              color: "black",
              bottom: 0,
              right: 0,
              margin: 2,
            }}
          >
            Report created on DATE
          </p>
          <p
            style={{
              position: "absolute",
              color: "black",
              bottom: 0,
              left: 0,
              margin: 2,
            }}
          >
            Agency: SPF
          </p>
          <TestChart set_chart={set_chart} />
        </Box>
      </Box>
    </Container>
  );
}
function DropDown({ title }) {
  return (
    <FormControl sx={{ minWidth: 120 }} variant="filled" size="small">
      <InputLabel id="demo-simple-select-label">{title}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={0}
        label={title}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
}
