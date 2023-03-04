import { TextField, Button } from "@mui/material";
import React from "react";
import axios from "axios";

class LoggedOutApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            response: '',
            token: '',
            errorMessage: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleTokenChange = this.handleTokenChange.bind(this);
        this.handleTokenSubmit = this.handleTokenSubmit.bind(this);
    }
    handleEmailChange(event) {
        this.setState({email: event.target.value})
    }
    handleTokenChange(event) {
        this.setState({token: event.target.value})
    }
    async handleSubmit() {
        try {
            const response = await axios.post('/auth/email/', {email:this.state.email});
            this.setState({response: response.data.detail});
        }
        catch (error) {
            this.setState({errorMessage: "There was an error with your email. " + error.message})
        }
        
    }
    async handleTokenSubmit() {
        const response = await axios.post('/auth/token/', {email:this.state.email, token:this.state.token});
        this.props.handleLogIn(response.data.token)
    }
    render() {
        if (this.state.response === '') {
            return (
                <div>
                    <TextField id="email" value = {this.state.email} label="Email" variant="outlined" onChange = {this.handleEmailChange}/>
                    <Button id = "submit" label = "Submit" variant = "contained" onClick = {this.handleSubmit}>Submit</Button>
                    <div>{this.state.response}</div>
                    <div>{this.state.errorMessage}</div>
                    <div>{this.props.errorToken}</div>
                </div>
            )
        }
        else {
            return (
                <div>
                    <TextField id="token" value = {this.state.token} label="Token" variant="outlined" onChange = {this.handleTokenChange}/>
                    <Button id = "continue" label = "Continue" variant = "contained" onClick = {this.handleTokenSubmit}>Continue</Button>
                    <div>{this.props.errorToken}</div>
                </div>
            )
        }
        
    }
}

export default LoggedOutApp;