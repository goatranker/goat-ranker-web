import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, fade } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Tabs from './tabs.js'
import AccountBox from '@material-ui/icons/AccountBox'
import InputIcon from '@material-ui/icons/Input';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
// Material

// Formik
import { useFormik } from 'formik'


// This is all the user stuff
import { useContext } from 'react'
import { Link, useHistory, Redirect } from 'react-router-dom';
import UserContext from "../context/UserContext.js"

// Themes
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
const theme = createMuiTheme({
  palette: {  
  primary: {
      // light: will be calculated from palette.primary.main,
      main: '#280680',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#6d6d6d',
      main: '#424242',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function PersistentDrawerLeft(props) {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory()



  const searchResults = (values) => {history.push(`/search/${values.search}`)}
  const account = () => {history.push("/users/account"); handleDrawerClose()}
  const signup = () => {history.push("/users/signup"); handleDrawerClose()}
  const login = () => {history.push("/users/login"); handleDrawerClose()}
  const home = () => {history.push("/"); handleDrawerClose()}
  const logout = () => {
      setUserData({
          token: undefined,
          user: undefined,
          spotifyToken: undefined
      })
      localStorage.setItem('auth-token', '')
      history.push("/");
      handleDrawerClose();
  }




  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  const formik = useFormik({
    initialValues: {
      search: '',
    },
    onSubmit: values => {
      console.log('Form Data', values);
      home()
      searchResults(values)
    },
  });




  return (
      <ThemeProvider theme={theme}>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >

            <Toolbar>




          
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>



          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>

            <form onSubmit={formik.handleSubmit}>
            <InputBase
              name="search"
              value={formik.values.search}
              type="text"
              id="search"
              placeholder="Search…"
              onChange={formik.handleChange}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              />
              </form>
          </div> 

              {/* <Tabs /> */}

              </Toolbar>


      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        
        <Divider />

        {userData.user? 
        <>
        <List>
          <ListItem  >
            <ListItemIcon onClick={account} button key="Account"><AccountBox /></ListItemIcon>
            <ListItemText onClick={account} primary="Account" />
          </ListItem>
          <ListItem  >
            <ListItemIcon onClick={logout} button key="Logout"> <InputIcon /> </ListItemIcon>
            <ListItemText onClick={logout} primary="Logout" />
          </ListItem>
        </List>

        </>
            :
          <List>
            <ListItem  >
            <ListItemIcon onClick={signup} button key="Signup"><PersonAddIcon /></ListItemIcon>
            <ListItemText onClick={signup} primary="Signup" />
          </ListItem>
          <ListItem >
            <ListItemIcon onClick={login} button key="Login"> <MeetingRoomIcon /> </ListItemIcon>
            <ListItemText onClick={login} primary="Login"/>
          </ListItem>
          </List>


        }
      </Drawer>
    
    </div>
    </ThemeProvider>
      
  );
}



// {['Account', 'My Votes', 'Login', 'Signup'].map((text, index) => (
//   <ListItem button key={text}>
//     <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
//     <ListItemText primary={text} />
//   </ListItem>
// ))}