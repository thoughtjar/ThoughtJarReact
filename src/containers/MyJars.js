import React, { Component } from "react";
import "./MyJars.css";

export default class MyJars extends Component {
  constructor(props){
    super(props);
    this.state = {
      value : []
    }
    this.keycount = 0;
    this.getJars = this.getJars.bind(this);
  }

  getJars(url){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
  }

  componentDidMount(){
    const response = this.getJars("http://35.160.134.174/weather/kansas+city");
    const newValue = this.state.value.concat(<p key={this.keycount}>{response}</p>);
    this.keycount += 1;
    this.setState({value: newValue});
  }

  render() {
    return(
      <div className="MyJars">
        <h2>My Jar Dashboard</h2>
        {this.state.value}
      </div>
    );
  }
}
