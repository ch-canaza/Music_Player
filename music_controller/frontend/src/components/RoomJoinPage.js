import React, { Component } from 'react';
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";


export default class RoomJoinPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomCode: "",
            error: "",
        };
        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
        this.roomButtomPressed = this.roomButtomPressed.bind(this);
    }


    render() {
        return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography variant="h4" component="h4">
                    Join a Room
                </Typography>
            </Grid>
            <Grid item xs={12}align="center">
                <TextField
                    error="error"
                    label="code"
                    placeholder="Enter a Room Code"
                    calue={this.state.roomCode}
                    helperText={this.state.error}
                    variant="outlined"
                    onChange={this.handleTextFieldChange}
                />

            </Grid>
            <Grid item xs={12}align="center">
                <Button variant="contained" color="primary" onClick={this.roomButtomPressed}>
                    Enter Room
                </Button>
            
            </Grid>
            <Grid item xs={12}align="center">
                <Button variant="contained" color="secondary" to="/" component={Link}>
                    Back
                </Button>
            </Grid>
        </Grid>
        ); 
    }
  handleTextFieldChange(e) {
      this.setState({
          roomCode: e.target.value
      });
  }
  roomButtomPressed() {
      const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
              code: this.state.roomCode,
          }),
      };
      fetch("/api/join-room", requestOptions)
        .then((response) => {
            if (response.ok) {
                this.props.history.push(`/room/${this.state.roomCode}`); // redirect to the room
            } else {
                this.setState({ error: "Room not found." });
            }
        })
        .catch((error) => {
            console.log(error); // error if fetch fails
        });
    }
}
