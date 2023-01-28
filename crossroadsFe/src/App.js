import React from "react";
import LoggedInApp from "./LoggedInApp";
import LoggedOutApp from "./LoggedOutApp";
import { createAuthProvider } from 'react-token-auth';
import localforage from "localforage";
import { CircularProgress } from "@mui/material";


export const { useAuth, authFetch, login, logout } = createAuthProvider({ 
    //getAccessToken
})

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            errorToken: "",
            loading: true
        }
        this.handleLogIn = this.handleLogIn.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.loadToken();
    }

    async loadToken() {
        try {
            const token = await localforage.getItem("authToken");
            this.setState({token: token});
            this.setState({loading: false});
        }
        catch {
            
        }

    }

    async handleLogIn(token) {
        
        try {
            const valueToken = await localforage.setItem({"authToken": token});
            this.setState({token: token});
        }
        catch (error) {
            this.setState({errorToken: "You entered something wrong ..." + error.message});
        }
        
    }

    async handleLogOut() {
        
        try {
            const valueToken = await localforage.removeItem("authToken");
            this.setState({token: ""});
        }
        catch (error) {
            this.setState({token: ""});
            this.setState({errorToken: "You logged out"});
        }
        
    }

    render () {
        if (this.state.loading) {
            return(<CircularProgress color="secondary" />);
        }
        else if (this.state.token !== "") {
            return (<LoggedInApp handleLogOut = {this.handleLogOut}/>);
        } else {
            return (<LoggedOutApp handleLogIn = {this.handleLogIn} errorToken = {this.state.errorToken}/>);
        }
    }
}

export default App;