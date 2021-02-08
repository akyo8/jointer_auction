import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';


import auction from './pages/auction/auction';
// import EmailVerification from "./pages/userProfile/EmailVerification";
// import Login from "./pages/userProfile/Login";
import Profile from "./pages/userProfile/Profile";
import JNTR_Note from "./pages/jntr_note/jntr_note";
import JNTR_About from "./pages/jntr_about/jntr_about";


const DefaultRouter = () => (
  <Router basename={"/jointerauction"}>
    <Switch>
      {/* <Route path="/email-verification" component={EmailVerificationRouter} />
        <Route path="/login" component={LoginRouter} />*/}
      <Route exact path="/" component={auction} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/jntr_note" component={JNTR_Note} />
      <Route exact path="/jntr_about" component={JNTR_About} />
    </Switch>
  </Router>
)

export default DefaultRouter;
