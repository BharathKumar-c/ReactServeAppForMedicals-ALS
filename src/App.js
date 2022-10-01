import React from 'react';
import { ToastContainer } from 'react-toastify';
// import { useSelector } from "react-redux";
import { HashRouter, Redirect, Route, Router, Routes, Switch } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
// import { routes } from '../src/router';
import SignIn from './pages/SignIn/SignIn';
import ChangePassword from './pages/ChangePassword/ChangePassword';
import SignUp from './pages/SignUp/SignUp';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Dashboard from './pages/Dashboard/Dashboard';
import { useSelector } from 'react-redux';
import Appbar from './components/Appbar/Appbar';
import Sidebar from './components/Sidebar/Sidebar';
import Site from './pages/Site/Site';
import EmailOTP from './pages/EmailOTP/EmailOTP';
import Drawerbar from './components/Drawerbar/Drawerbar'

const App = () => {
  // const { theme } = useSelector((state) => state.ui);
  const tokenSlice = useSelector(state => state.onboardingSliceReducer);
  console.log('tockenSlice', tokenSlice.emailToken);
  return (
    <HashRouter>
      <ToastContainer />
      <Switch>
        <Route exact path='/' render={() => <Redirect to='/SignIn' />} />
        <Route path='/SignIn' component={SignIn} />
        <Route path='/EmailOTP' component={EmailOTP}/>
        <Route path='/ForgotPassword' component={ForgotPassword} />
        <Route path='/ChangePassword' component={ChangePassword} />

        {localStorage.getItem('token') && (
          <>
            <Drawerbar />
            <Route path='/Site' component={Site} />
            <Route path='/SignUp:value' component={SignUp} />
          </>
        )}
      </Switch>
    </HashRouter>
  );
  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          localStorage.getItem('token') ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  };

  // function PublicRoute({ component, ...rest }) {
  //   return (
  //     <Route
  //       {...rest}
  //       render={props =>
  //         isAuthenticated ? (
  //           <Redirect
  //             to={{
  //               pathname: '/',
  //             }}
  //           />
  //         ) : (
  //           React.createElement(component, props)
  //         )
  //       }
  //     />
  //   );
  // }
};

export default App;
