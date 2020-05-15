import { createMuiTheme } from "@material-ui/core/styles";

const Poppins = {
  fontFamily: "Poppins-Regular",
  fontStyle: "normal",
  src: `
    local('Poppins-Regular'),
  url('https://fonts.googleapis.com/css2?family=Poppins&display=swap') format("truetype")`,
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
    info: {
      main: "#C0D9C9",
    },
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
    button: {
      textTransform: "none",
    },
    h4: {
      // title bold
      fontWeight: 800,
    },
    body1: {
      fontWeight: 800,
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
