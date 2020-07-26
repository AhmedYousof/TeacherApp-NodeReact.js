import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutuser } from "./actions/authActions";
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { clearCurrentProfile } from "./actions/profileActions";
import jwt_decode from "jwt-decode";

import store from "./store";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import "./App.css";
import StudentRegister from "./components/auth/StudentRegister";
import Login from "./components/auth/Login";
import TeacherRegister from "./components/auth/TeacherRegister";
import Dashboard from "./components/dashboard/Dashboard";
import Profiles from "./components/Teachers/Profiles";
import CourseInfo from "./components/Teachers/CourseInfo";
import Profile from "./components/profile/Profile";
import AdminRegister from "./components/admin/AdminRegister";
import EditProfile from "./components/profile/EditProfile";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);

  const decoded = jwt_decode(localStorage.jwtToken);

  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    store.dispatch(logoutuser());
    store.dispatch(clearCurrentProfile());
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route
                exact
                path="/students/register"
                component={StudentRegister}
              />
              <Route exact path="/register" component={TeacherRegister} />
              <Route
                exact
                path="/teachers/register"
                component={TeacherRegister}
              />
              <Route exact path="/teachers/profiles" component={Profiles} />
              <Route exact path="/dashboard" component={Dashboard} />

              <Route
                exact
                path="/teachers/teacher/:teacher_id"
                component={CourseInfo}
              />
              <Route exact path="/profile/:profile_id" component={Profile} />
              <Route exact path="/edit-profile" component={EditProfile} />
              <Route exact path="/admin/register" component={AdminRegister} />

              <Route exact path="/login" component={Login} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
