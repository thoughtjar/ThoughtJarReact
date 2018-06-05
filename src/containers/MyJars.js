import React, { Component } from "react";
import "./MyJars.css";
import cookie from 'react-cookies';

export default class MyJars extends Component {
  constructor(props){
    super(props);
    this.state = {
      requestFailed : false
    }
    this.getJars = this.getJars.bind(this);
    console.log(cookie.load('token'));
  }

  getJars(url){
    fetch(url)
      .then(response => {
        if(!response.ok) {
          throw Error("Network Request Failed")
        }
        return response
      })
      .then(d => d.json())
      .then(d => {
        this.setState({
          data: d
        })
      }, () => {
        this.setState({
          requestFailed: true
        })
      })
  }

  componentDidMount(){
    this.getJars("https://api.github.com/users/xeliot");
  }

  render() {

    if(this.state.requestFailed) return <h2 className="network-failed">Could Not Connect to the Network.</h2>
    if(!this.state.data) return <h4>Loading ...</h4>
    return(
      <div className="MyJars">
        <h2>My Jar Dashboard</h2>
        {this.state.data.name}
      </div>
    );
  }
}
