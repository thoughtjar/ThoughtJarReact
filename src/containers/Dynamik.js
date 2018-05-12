import React, { Component } from "react";
import "./Dynamik.css";
import { FormControl } from "react-bootstrap";

class ShortAnswer extends Component {
  render() {
    return(
      <div className="ShortAnswer">
        <h4>Short Answer Question</h4>
        <FormControl
          type="text"
          placeholder="Type in the question here."
          className= "QuestionInput"
        />
      </div>
    );
  }
}

export default class Dynamik extends Component {
  render() {
    return(
      <div className="Dynamik">
        <div className="DynamikHeader">
          <h2>Welcome To Dynamik.</h2>
        </div>
        <ShortAnswer />
        <ShortAnswer />
      </div>
    );
  }
}
