import React, { Component } from "react";
//import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { GoogleLogin } from 'react-google-login';
import "./Login.css";
import cookie from 'react-cookies';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.responseGoogle = this.responseGoogle.bind(this);
  }

  responseGoogle(response){
    console.log(response);
    const id_token = response.tokenId;
    var data = {"id_token": id_token};
    const url = "http://172.20.10.8:5000/authenticate";
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(function(res){
      console.log(res.json());
      //save the name of the user to cookies
      //save the email of the user to cookies
      //save the access_token of the user to cookies
      /*
      console.log(cookie.load('token'));
      cookie.save('token', "token123", { path: '/' });
      console.log(cookie.load('token'));
      */
    }).catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
  }

  render() {
    return (
      <div className="Login">
        <GoogleLogin
          clientId="665725879844-0prbhschdv3mdh2ignucocl9cq3em3dm.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          />
      </div>
    );
  }
}
