import React, { Component } from "react";
import "./MyJars.css";

export default class MyJars extends Component {
  constructor(props){
    super(props);
    this.state = {
      requestFailed : false
    }
    this.getJars = this.getJars.bind(this);
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
    this.getJars("http://35.160.134.174/weather/kansas+city");
  }

  render() {

    if(this.state.requestFailed) return <h4>Failed!</h4>
    if(!this.state.data) return <h4>Loading ...</h4>
    return(
      <div className="MyJars">
        <h2>My Jar Dashboard</h2>
        {this.state.data.temperature}
      </div>
    );
  }
}
