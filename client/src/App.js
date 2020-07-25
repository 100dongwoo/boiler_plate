import React from 'react';


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom"
import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import Auth from './hoc/auth'


function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={Auth(LandingPage,null) }/>
                    <Route exact path="/login" component={Auth(LoginPage,false) }/>
                    <Route exact path="/register" component={Auth(RegisterPage,false) }/>
                </Switch>
            </div>
        </Router>
    );
}


//Auth 이걸로 감싼걸 보게되면 export default function (SpecificComponent, option, adMinRoute )
//이형식으로 감싼것이다 HOC형식
//adminRoute 는 일단기본값


export default App;
