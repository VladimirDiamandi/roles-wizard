import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import {hot} from "react-hot-loader";
import "./App.css";
import { connect } from 'react-redux';

import LoginPage from './pages/Login.page';
import MainPage from './pages/Main.page';

const App = ({ isAuth }) => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login">
            { isAuth ?
                <Redirect
                  to={{
                    pathname: "/",
                  }}
                />
                :
                <LoginPage />
            }
          </Route>
          <Route path="/">
            { isAuth ?
              <MainPage />
              :
              <Redirect
                to={{
                  pathname: "/login",
                }}
              />
            }
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.token,
  };
};

export default connect(mapStateToProps, null)(hot(module)(App));