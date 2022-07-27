import { TestChart } from "./Chart";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import PrintIcon from "@mui/icons-material/Print";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import BarChartIcon from '@mui/icons-material/BarChart';
import "@progress/kendo-theme-default/dist/all.css";
import { savePDF } from "@progress/kendo-react-pdf";
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

export default function Report() {
  const [_chart, set_chart] = useState("");
  const printReportBlue = "#29B6F7";
  const backgroundBlue = "#2B3648";
  const ref = useRef()

    // Uses savePDF from kendoreact
  function onPDFExportClick() {
    let element = ref.current || document.body;
    savePDF(element, {
      paperSize: "auto",
      margin: 40,
      fileName: `Report for ${new Date().getFullYear()}`,
    });
  }
    
    // exports the component rendered at ref
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

    // prints the component rendered at ref
    // Uses react to print package
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
        <GenerateReportForm />
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

// Selecting report using dropdown not implemented 
// This is placeholder UI element
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

function GenerateReportForm() {
  const generateReportGreen = "#66BB6B";
  return (
    <>
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
    </>
  );
}
