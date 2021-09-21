import React from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile"
import Navigation from "components/Navigation"

//props = {isLoggedIn : false}
//{isLoggedin} = {isLoggedIn : false}
//구조분해 핟랑으로 인해 isLoggedin = false 가 된다.
const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      {/* 로그인이 되어있지 않다면 isLoggedIn은 false인 상태이기 때문에 Auth컴포넌트에서는 아무것도 안보임 하지만
      로그인이 성공하여 isLoggedIn이 트루가 되는순간  아래 예시처럼 <Navigation />이 실행됨.*/}
      {/* var a5 = "Cat" && "Dog";    // t && t returns Dog*/}
      {/* var a3 = false && true;     // f && t returns false*/}
      <Switch>
        {isLoggedIn ?
          <>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Redirect from="*" to="/" />
          </>
          :
          <Route exact path="/">
            <Auth />
          </Route>}
        <Redirect from="*" to="/" />
      </Switch>
    </Router>)
}

export default AppRouter;