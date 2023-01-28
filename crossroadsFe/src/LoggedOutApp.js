import { TextField, Button } from "@mui/material";
import React from "react";
import axios from "axios";

class LoggedOutApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            response: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
    }
    handleEmailChange(event) {
        this.setState({email: event.target.value})
    }
    async handleSubmit() {
        const response = await axios.post('http://localhost:8000/auth/email/', {email:this.state.email}, {headers: {"Access-Control-Allow-Origin": "http://localhost:8000", "Content-Type": "application/json", "Access-Control-Allow-Methods": "POST"}});
        this.setState({response: response});

    }
    render() {
        return (
            <div>
                <TextField id="email" value = {this.state.email} label="Email" variant="outlined" onChange = {this.handleEmailChange}/>
                <Button id = "submit" label = "Submit" variant = "contained" onClick = {this.handleSubmit}>Submit</Button>
                <div>{this.state.response}</div>
            </div>
        )
    }
}

export default LoggedOutApp;