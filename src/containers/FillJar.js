import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./FillJar.css";
import cookie from 'react-cookies';

const queryString = require('query-string');

export default class FillJar extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
    this.params = queryString.parse(this.props.location.search);
    this.getJars = this.getJars.bind(this);
    this.routeLoginPage = this.routeLoginPage.bind(this);
  }

  getJars(url){
    var data = {
      "access-token": cookie.load('access-token'),
      "identifier": this.params["identifier"]
    };
    console.log(data);
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => {
      return res.json().then(json => {
        console.log(json);
      });
    }).catch(error => console.error('Error:', error))
    .then(response => console.log('Success'));
  }

  // go to login page
  routeLoginPage(){
    this.props.history.push("/login");
  }

  componentDidMount(){
    //this.getJars("http://ec2-54-165-205-67.compute-1.amazonaws.com:5000/getJars");
    this.getJars("http://localhost:5000/fillJar");
  }

  render() {
    if(cookie.load('access-token') === undefined){
      return(
        <div className="RedirectLoginPage">
          <h1>Please login before filling jars.</h1>
          <Button bsSize="large" onClick={this.routeLoginPage}>Go to Login Page.</Button>
        </div>
      );
    }
    //if(!this.state.jarList) return <h4>Loading ...</h4>
    return(
      <div className="FillJar">
        <h2>Jar Title</h2>
      </div>
    );
  }
}
