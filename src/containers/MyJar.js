import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./MyJar.css";
import cookie from 'react-cookies';

var queryString = require('query-string');
var csv_export = require('csv-export');
var fs = require('fs');

export default class MyJar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      responseContent: {}
    };
    this.params = queryString.parse(this.props.location.search);
    this.getResponseContent = this.getResponseContent.bind(this);
    this.downloadCSV = this.downloadCSV.bind(this);
  }

  downloadCSV(){
    csv_export.export(this.state.responseContent,function(buffer){
      fs.writeFileSync('~/Downloads/data.zip', buffer);
    });
  }

  getResponseContent(url){
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
      return res.json().then(jsonres => {
        console.log(jsonres);
        this.setState({
          responseContent: jsonres['responseContent']
        });
      });
    }).catch(error => console.error('Error:', error))
    .then(response => console.log('Success'));
  }

  componentDidMount(){
    this.getResponseContent("http://localhost:5000/myJar");
  }

  render() {
    return(
      <div className="MyJar">
        <div className="Header">
          <h2>{this.state.title}</h2>
        </div>
        <div className="Body">
          <Button className="ExportCSV" bsSize="large" onClick={this.downloadCSV}>Dowload As CSV</Button>
        </div>
      </div>
    );
  }
}
