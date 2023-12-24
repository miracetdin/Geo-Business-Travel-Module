import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Login from './components/Login/index';
import Signup from './components/Signup/index';
import Navbar from './components/Navbar/index';
import Profile from './components/Profile/index';
import { useEffect, useState } from 'react';
import { TokenProvider } from './contexts/tokenContext';

function App() {
  const [currentPath, setCurrentPath] = useState("/");
  const [click, setClick] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [showHome, setShowHome] = useState(true);

  const handleClick = () => {
    setClick(!click);
  };

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, [click]);

  console.log(currentPath);

  useEffect(() => {
    (currentPath !== "/login" && currentPath !== "/signup" && currentPath !== "/logout") ? setShowNavbar(true) : setShowNavbar(false);
    (currentPath === "/") ? setShowHome(true) : setShowHome(false);
  }, [currentPath]);

  return (
    <div className="App">
      <TokenProvider>
        <Router>
          <div>
          {showNavbar && <Navbar />}
            {
              showHome &&
              <div>
                <div className="container" style={{ marginTop: "6rem" }}>
                  <div className="row">
                    <h1>Geo-Business Travel</h1>
                  </div>
                  <div className="row d-flex justify-content-between" style={{ marginTop: "10rem" }}>
                    <div className="col-6 d-flex justify-content-end">
                      <Link style={{ width: "100%", height: "100%" }} to="/login" onClick={handleClick}><button style={{ width: "50%", height: "180%" }}>Login</button></Link>
                    </div>
                    <div className="col-6 d-flex justify-content-start">
                      <Link style={{ width: "100%", height: "100%" }} to="/signup" onClick={handleClick}><button style={{ width: "50%", height: "180%" }}>Sign Up</button></Link>
                    </div>
                  </div>
                </div>
              </div>
            }

            <Switch>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>
            </Switch>
          </div>
        </Router>
      </TokenProvider>

    </div>
  );
}

export default App;
