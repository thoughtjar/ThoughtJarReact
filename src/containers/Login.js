import React, { Component } from "react";
import { Button, Jumbotron } from "react-bootstrap";
import { GoogleLogin } from 'react-google-login';
import "./Login.css";
import cookie from 'react-cookies';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "NA",
      email: "NA"
    };
    this.responseGoogle = this.responseGoogle.bind(this);
    this.logout = this.logout.bind(this);

    console.log(cookie.load('access-token'));
    //cookie.save('access-token', 'token123', {path: '/'});
  }

  responseGoogle(response){
    console.log(response);
    const id_token = response.tokenId;
    var data = {"id_token": id_token};
    const url = "http://ec2-54-165-205-67.compute-1.amazonaws.com:5000/authenticate";
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => {
      //console.log(res.json());
      return res.json().then(json => {
        cookie.save('name', json['name'], { path: '/' });
        cookie.save('email', json['email'], { path: '/' });
        cookie.save('access-token', json['access-token'], { path: '/' });
        this.setState({
          name: json['name'].split(" ")[0],
          email: json['email']
        });
      });
    }).catch(error => console.error('Error:', error))
    .then(response => console.log('Success'));
  }

  logout(){
    var data = {
      'name': cookie.load('name'),
      'email': cookie.load('email'),
      'access-token': cookie.load('access-token')
    };
    const url = "http://ec2-54-165-205-67.compute-1.amazonaws.com:5000/logout";
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => {
      //console.log(res.json());
      return res.text().then(text => {
        console.log(text);
      });
    }).catch(error => console.error('Error:', error))
    .then(response => console.log('Success'));
    cookie.remove('name');
    cookie.remove('email');
    cookie.remove('access-token');
    this.setState({
      name: "NA",
      email: "NA"
    });
  }

  render() {
    if(cookie.load('access-token') === undefined){ //user is not logged in
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
    }else{ //user is already logged in
      return (
        <div className="AccountInfo">
          <Jumbotron>
            <h1>Welcome, {this.state.name}!</h1>
            <p>You are currently logged into Thought Jar with the account {this.state.email}.</p>
            <p>
              <Button bsSize="large" onClick={this.logout}>Log Out</Button>
            </p>
          </Jumbotron>
        </div>
      )
    }
  }
}
