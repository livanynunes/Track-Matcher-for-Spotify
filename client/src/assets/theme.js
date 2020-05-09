import { createMuiTheme } from "@material-ui/core/styles";
import PoppinsRegular from "./assets/fonts/Poppins/Poppins-Bold.ttf";
const Poppins = {
  fontFamily: "Poppins-Regular",
  fontStyle: "normal",
  src: `
    local('Poppins-Regular'),
  url(${PoppinsRegular}) format("truetype")`,
  unicodeRange:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#678A74",
    }, //verde agua
    secondary: {
      main: "#EC625F", //rosa
    },
    background: {
      default: "#ffeadb",
    },
    text: {
      secondary: "#EC625F", //rosa
    },
    info: {
      main: "#C0D9C9",
    },
  },
  typography: {
    fontFamily: ["Poppins"].join(","),
    button: {
      textTransform: "none",
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [Poppins],
      },
    },
  },
});

export default theme;
