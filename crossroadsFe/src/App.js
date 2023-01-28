import React from "react";
import LoggedInApp from "./LoggedInApp";
import LoggedOutApp from "./LoggedOutApp";
import { createAuthProvider } from 'react-token-auth';

export const { useAuth, authFetch, login, logout } = createAuthProvider({ 
    //getAccessToken
})

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            token: ""
        }
        this.handleLogIn = this.handleLogIn.bind(this)
    }

    handleLogIn(email, token) {

    }

    render () {
        if (this.state.loggedIn) {
            return (<LoggedInApp />);
        } else {
            return (<LoggedOutApp />);
        }
    }
}

export default App;