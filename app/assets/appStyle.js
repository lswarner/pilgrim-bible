const appStyle = theme => ({
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh"
  },
  mainPanel: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`
    },
    overflow: "auto",
    position: "relative",
    float: "right",
    maxHeight: "100%",
    width: "100%",
    overflowScrolling: "touch"
  },
  content: {
    marginTop: "70px",
    padding: "30px 15px",
    minHeight: "calc(100vh - 123px)"
  },
  container: {
    paddingRight: "15px",
    paddingLeft: "15px",
    marginRight: "auto",
    marginLeft: "auto"
  },
  typography: {
   useNextVariants: true,
 },
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginTop: defaultTheme.spacing.unit * 3,
    marginLeft: defaultTheme.spacing.unit * 3,
    marginRight: defaultTheme.spacing.unit * 3,
    [defaultTheme.breakpoints.up(600 + defaultTheme.spacing.unit * 3 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: defaultTheme.spacing.unit * 3,
    marginBottom: defaultTheme.spacing.unit * 3,
    padding: defaultTheme.spacing.unit * 2,
    [defaultTheme.breakpoints.up(600 + defaultTheme.spacing.unit * 3 * 2)]: {
      marginTop: defaultTheme.spacing.unit * 6,
      marginBottom: defaultTheme.spacing.unit * 6,
      padding: defaultTheme.spacing.unit * 3,
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: defaultTheme.spacing.unit * 3,
    marginLeft: defaultTheme.spacing.unit,
  },
  palette: {
    primary: {
      light: orange[200], // same as '#FFCC80',
      main: '#FB8C00', // same as orange[600]
      dark: '#EF6C00',
      contrastText: 'rgb(0,0,0)'
    }
  }
});

export default appStyle;
