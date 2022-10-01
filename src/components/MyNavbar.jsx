import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(10),
    display: "flex",
  },
 logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(5),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
     },

}));

function Navbar() {
  const classes = useStyles();

  return (
    <AppBar style={{ width: '100%',backgroundColor:'#0F585E'}} >
      <div className="navbar" >
        <img alt="" src='assets/images/brain.png' className="logo" style={{width:'5%',marginBottom:'-8%',marginLeft:'8%'}} />
</div>
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          <IconButton style={{color:'white'}}>
            <MenuIcon />
          </IconButton>
          <div style={{color:'gold',marginTop:'-5%',marginLeft:'6%'}}>
            PRICISION <div style={{color:'red',marginTop:'-4.5%',marginLeft:'20%'}}>ALS</div>
            </div>
        </Typography>
          <div className={classes.navlinks}>
            <Link to="/Registration" className={classes.link}>
              Registration
            </Link>
            <Link to="/ValidationOTP" className={classes.link}>
              Login
            </Link>
            {/* <Link to="/ChangePassword" className={classes.link}>
              ChangePassword
            </Link> */}
                     </div>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;