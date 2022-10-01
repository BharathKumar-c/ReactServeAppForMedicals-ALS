import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { makeStyles } from '@material-ui/core/styles';
import './Drawer.css';
import { Group, Book, ExitToApp, Settings, AddLocationRounded } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import {

  Edit,
  Delete,
  SupervisedUserCircleRounded } from '@material-ui/icons';
import AgGirdReact from '../AgGirdReact';
const drawerWidth = 240;

const openedMixin = theme => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
});

const closedMixin = theme => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
    padding: '0.5%'
  }
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  backgroundColor: '#0F585E',
  marginLeft:'1%',

  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open'
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme)
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme)
    })
  })
);
const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  },
  paper: {
    background: '#0F585E'
  },
  active: {
    background: 'white',
    borderRadius: 60
  },
  inactive: {
    background: 'black',
    borderRadius: 60
  },
  selected: {
    marginLeft: '-6%',
    marginTop:'-10%'
  },
  toolBar: {
    marginLeft: 'auto',

  }
});

const draweropen = {
  marginLeft: '5%', marginTop: '-12%'
}
const drawerclose = {
  marginLeft: '5%', marginTop: '12%'
}
export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectIndex, setSelectIndex] = React.useState(null);
  const [sidetitle,setSidetitle]=React.useState('Dashboard')
  const history = useHistory();

  const classes = useStyles();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const itemsList = [
    {
      text: 'Site',
      icon: <AddLocationRounded className='icon' />,
      to: '/Site'
    },
    {
      text: 'Users',
      icon: <Group className='icon' />,
      to: '/SignUp'
    },
    {
      text: 'Data',
      icon: <Book className='icon' />,
      to: '/SignUp'
    }
  ];
  const StyledList = styled(List)({
    // selected and (selected + hover) states
    '&& .Mui-selected, && .Mui-selected:hover': {
      backgroundColor: 'white',
      borderRadius: 15,
      width: '90%',
      marginLeft:'-6%',
      '&& .MuiListItemIcon-root': {
        color: 'black',
      }
    },
    '&& .MuiSvgIcon - root': {
        marginLeft:'-6'
  }
    // hover states
  });
  const handleClick = index => {
    console.log('index', index);
    if (index === 0) {
      setSelectIndex(index);
      setSidetitle('Site overview')
    } else if (index === 1) {
      setSelectIndex(index);
      setSidetitle('User overview')

    } else {
      console.log(index === 2);
      setSelectIndex(index);
      setSidetitle('Data overview')
    }
  };
  const logout = index => {
    setSelectIndex(index);
    console.log('logut');
    localStorage.removeItem('');
    history.push('/SignIn');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position='fixed' open={open} style={{ backgroundColor: 'white' }}  >
        <Toolbar className={classes.toolbar}>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' })
            }}
          >
            <MenuIcon style={{ color: '#0F585E' }} />

          </IconButton>


          <img src="assets/images/logotext.png" style={{marginLeft:'-20.5%',width:'14%'}} />
          <Typography variant="title" color="black" sx={{ marginLeft: '5%' }}>{sidetitle}</Typography>
          {sidetitle === 'Site overview' && 'Dashboard' ?
            <SupervisedUserCircleRounded style={{ flex:'auto', flexGrow: 1, marginLeft: '85.5%', width: '3%', color: 'black' }} /> :
            <SupervisedUserCircleRounded style={{ flex: 'auto', flexGrow: 1, marginLeft: '85%', width: '3%', color: 'black' }} />
          }

               {/* <hr
            style={{
              color: 'white',
              width: '19.5%',
              backgroundColor: 'white',
              height: 0.5,
              borderColor: 'white',
              marginLeft: '-15%',
              marginTop: '5%'
            }}
          /> */}

        </Toolbar>
      </AppBar>
      <Drawer
        variant='permanent'
        open={open}
        PaperProps={{
          sx: {
            backgroundColor: '#0F585E',
          }
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} style={{ color: 'white' }}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>

        <List>
          <Link to='/Site' className='link'>
            <StyledList>
              <ListItemButton selected={selectIndex === 0} onClick={() => handleClick(0)} style={open===false ? { marginLeft: '5%', marginTop: '1%' }:{ marginLeft: '5%', marginTop: '1%' }}>
                <ListItemIcon>
                  <AddLocationRounded
                    className='icon'
                    style={selectIndex === 0 ? { color: 'black',marginLeft: '-12%', } : { color: 'white',marginLeft: '-15%' }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary='Site'
                  style={selectIndex === 0 ? { color: 'black',marginLeft: '-10%' } : { color: 'white',marginLeft: '-10%' }}
                />
              </ListItemButton>
            </StyledList>
          </Link>
        </List>
        <List>
          <Link to={'/SignUp'+open} className='link'  >
            <StyledList>
              <ListItemButton selected={selectIndex === 1} onClick={() => handleClick(1)} style={open===false ? { marginLeft: '5%', marginTop: '-60%' }:{ marginLeft: '5%', marginTop: '-12%' }}>
                <ListItemIcon classes={classes.selected}>
                  <Group
                    className='icon'
                    style={selectIndex === 1 ? { color: 'black',marginLeft: '-12%' } : { color: 'white',marginLeft: '-15%' }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary='Users'
                  style={selectIndex === 1 ? { color: 'black',marginLeft: '-10%'  } : { color: 'white',marginLeft: '-10%' }}
                />
              </ListItemButton>
            </StyledList>
          </Link>
        </List>
        <List>
          <Link to='/Data' className='link'>
            <StyledList>
              <ListItemButton selected={selectIndex === 2} onClick={() => handleClick(2)} style={open===false ? { marginLeft: '5%', marginTop: '-60%' }:{ marginLeft: '5%', marginTop: '-12%' }}>
                <ListItemIcon>
                  <Book
                    className='icon'
                    style={selectIndex === 2  ? { color: 'black',marginLeft: '-12%'  } : { color: 'white',marginLeft: '-15%' }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary='Data'
                  style={selectIndex === 2 ? { color: 'black',marginLeft: '-10%'  } : { color: 'white',marginLeft: '-10%' }}
                />
              </ListItemButton>
            </StyledList>
          </Link>
        </List>
        <List style={{ marginTop: '80%' }}>
          {/* <Link to='/Data' className='link'> */}
            <StyledList>
            <ListItemButton selected={selectIndex === 3} onClick={() => logout(3)} style={open === false ? { marginLeft: '5%', marginTop: '600%' }:{marginLeft: '5%', marginTop: '80%'}}>
                <ListItemIcon>
                  <ExitToApp
                    className='icon'
                    style={selectIndex === 3 ? { color: 'black' } : { color: 'white',marginLeft: '-15%' }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary='LogOut'
                  style={selectIndex === 3 ? { color: 'black' } : { color: 'white',marginLeft: '-11%'}}
                />
              </ListItemButton>
            </StyledList>
          {/* </Link> */}
        </List>

        {/* <Divider /> */}
        {/* <List>
          {itemsList.map((text, index) => (
            <ListItem
              key={text}
              component={Link}
              disablePadding
              sx={{ display: 'block' }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5
                }}
                onClick={event => handleClick(index)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center'
                  }}
                >
                  {/* {icon && <ListItemIcon style={{ color: 'white' }}>{icon}</ListItemIcon>} */}

        {/* {index % 3 === 0 ? (
                    <AddLocationRounded className='icon' />
                  ) : index % 1 === 0 ? (
                    <Group className='icon' />
                  ) : (
                    <Book className='icon' />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <Box component='main' md={{ flexGrow: 1, p: 3 }}></Box>
      {/* <DrawerHeader />
      <AgGirdReact/> */}
    </Box>
  );
}
