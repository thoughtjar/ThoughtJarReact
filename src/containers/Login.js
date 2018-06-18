import React, { Component } from "react";
import { Jumbotron } from "react-bootstrap";
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import "./Login.css";
import cookie from 'react-cookies';

export default class Login extends Component {
  constructor(props) {
    super(props);

    if(cookie.load('access-token') === undefined){
      this.state = {
        name: "NA",
        email: "NA"
      };
    }else{
      this.state = {
        name: cookie.load('name'),
        email: cookie.load('email')
      }
    }
    this.url = "http://localhost:5000";
    this.responseGoogle = this.responseGoogle.bind(this);
    this.logout = this.logout.bind(this);
    //this.forceLogoutGoogle = this.forceLogoutGoogle.bind(this);
    console.log(cookie.load('access-token'));
    //cookie.save('access-token', 'token123', {path: '/'});
  }

  responseGoogle(response){
    console.log(response);
    const id_token = response.tokenId;
    var data = {"id_token": id_token};
    //const url = "http://ec2-54-165-205-67.compute-1.amazonaws.com:5000/authenticate";
    const url = this.url + "/authenticate";
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => {
      //console.log(res.json());
      return res.json().then(json => {
        console.log(json);
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
  /*
  forceLogoutGoogle(){
    cookie.remove('G_AUTHUSER_H');
    if (window.gapi) {
      const auth2 = window.gapi.auth2.getAuthInstance()
      if (auth2 != null){
        auth2.signOut().then(
          auth2.disconnect().then(this.logout())
        )
      }
    };
    this.forceUpdate();
  }
  */
  logout(){
    console.log(cookie.loadAll());
    var data = {
      'name': cookie.load('name'),
      'email': cookie.load('email'),
      'access-token': cookie.load('access-token'),
    };
    //const url = "http://ec2-54-165-205-67.compute-1.amazonaws.com:5000/logout";
    const url = this.url + "/authenticate";
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
          <h1>Login to Thought Jar with Google.</h1>
          <p>
            <img src="https://cdn.vox-cdn.com/thumbor/Pkmq1nm3skO0-j693JTMd7RL0Zk=/0x0:2012x1341/1200x800/filters:focal(0x0:2012x1341)/cdn.vox-cdn.com/uploads/chorus_image/image/47070706/google2.0.0.jpg"
              className="GoogleLogo"
              alt="google_logo"/>
          </p>
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
              <GoogleLogout
                buttonText="Logout"
                onLogoutSuccess={this.logout} />
            </p>
          </Jumbotron>
        </div>
      )
    }
  }
}
