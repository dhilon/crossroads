import React from "react";
import LoggedInApp from "./LoggedInApp";
import LoggedOutApp from "./LoggedOutApp";
import localforage from "localforage";
import { CircularProgress } from "@mui/material";
import { SWRConfig } from 'swr'
import axios from "axios";
import { swrFetcher } from "./apiClient";
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

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
    }




    componentDidMount() {
        this.loadToken();
    }

    enableLogin(token) {
        axios.defaults.headers.common['Authorization'] = "Token " + token;
        this.setState({ token: token })
    }

    disableLogin() {
        delete axios.defaults.headers.common.Authorization;
        this.setState({ token: '' })
    }

    async loadToken() {
        try {
            let token = await localforage.getItem("authToken");
            if (token == null) {
                this.disableLogin()
            } else {
                this.enableLogin(token);
            }
            this.setState({ loading: false });
        }
        catch {
            // do nothing because we are still loading 
        }

    }

    async handleLogIn(token) {
        try {
            await localforage.setItem("authToken", token);
            this.enableLogin(token);
        }
        catch (error) {
            this.setState({ errorToken: "You entered something wrong ..." + error.message });
        }

    }

    async handleLogOut() {
        try {
            await localforage.removeItem("authToken");
            this.disableLogin();
        }
        catch (error) {
            this.disableLogin();
        }

    }

    render() {
        if (this.state.loading) {
            return (<CircularProgress color="secondary" />);
        }
        else if (this.state.token !== "") {
            return (<SWRConfig value={{
                fetcher: swrFetcher
            }}>
                <LoggedInApp handleLogOut={this.handleLogOut} />
            </SWRConfig>);
        } else {
            return (<LoggedOutApp handleLogIn={this.handleLogIn} errorToken={this.state.errorToken} />);
        }
    }
}

export default App;