import React, { Component } from "react";
import "./FillJars.css";
import cookie from 'react-cookies';

export default class FillJars extends Component {
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
        console.log(d);
        //transform data to list of components
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
    //this.getJars("http://ec2-54-165-205-67.compute-1.amazonaws.com:5000/getJars");
    this.getJars("http://localhost:5000/getJars");
  }

  render() {

    if(this.state.requestFailed) return <h2 className="network-failed">Could Not Connect to the Network.</h2>
    if(!this.state.data) return <h4>Loading ...</h4>
    return(
      <div className="FillJars">
        <h2>My Jar Dashboard</h2>
        {this.state.data.name}
      </div>
    );
  }
}
