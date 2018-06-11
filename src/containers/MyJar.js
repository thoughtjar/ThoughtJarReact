import React, { Component } from "react";
import {  } from "react-bootstrap";
import "./MyJar.css";
import cookie from 'react-cookies';

var queryString = require('query-string');
var csv_export = require('csv-export');

export default class MyJar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      responseContent: {}
    };
  }

  render() {
    return(
      <div className="MyJar">
        <div className="Header">
          <h2>{this.state.title}</h2>
        </div>
        <div className="Body">
          Body Content
        </div>
      </div>
    );
  }
}
