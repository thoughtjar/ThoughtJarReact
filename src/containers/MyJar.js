import React, { Component } from "react";
import { Button, DropdownButton, Row, Col } from "react-bootstrap";
import "./MyJar.css";
import cookie from 'react-cookies';
import * as CSV from 'csv-string';

var queryString = require('query-string');

export default class MyJar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      oneVar: true,
      questionList: [],
      responseContent: []
    };
    this.params = queryString.parse(this.props.location.search);
    this.getResponseContent = this.getResponseContent.bind(this);
    this.downloadCSV = this.downloadCSV.bind(this);
  }

  downloadCSV(){
    console.log(this.state.responseContent);
    let csvContent = "data:text/csv;charset=utf-8,";
    this.state.responseContent.forEach(function(rowArray){
       let row = rowArray.join(",");
       csvContent += row + "\r\n";
    });
    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
    /*
    csv_export.export(this.state.responseContent,function(buffer){
      fileDownload(buffer, 'data.csv');
    });
    */
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
      return res.json().then(json => {
        console.log(json);
        this.setState({
          title: json["title"],
          questionList: json["questionList"],
          responseContent: CSV.parse(json["responseCSV"])
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
        <div className="MyJarHeader">
          <h2>{this.state.title}</h2>
        </div>
        <Row className="DataOptions">
          <Col xs={6} md={4}>
            <DropdownButton
              title="Analysis Type"
              key={1} />
          </Col>
          <Col xs={6} md={4}>
            <DropdownButton
              title="Analysis Type"
              key={1} />
          </Col>
          <Col xsHidden md={4}>
            <DropdownButton
              title="Analysis Type"
              key={1} />
          </Col>
        </Row>
        <Button className="ExportCSV" bsSize="large" onClick={this.downloadCSV}>Dowload As a CSV</Button>
      </div>
    );
  }
}
