import React, { Component } from "react";
import "./Dynamik.css";
import { FormControl, DropdownButton, MenuItem, ButtonToolbar } from "react-bootstrap";

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
  constructor (props) {
    super(props);
    this.state = {
      surveyquestions: []
    };
    this.createShortAnswer = this.createShortAnswer.bind(this);
    this.loadSurveyQuestions = this.loadSurveyQuestions.bind(this);
  }

  createShortAnswer() {
    const newSurveyQuestions = this.state.surveyquestions.concat(<ShortAnswer key={this.state.surveyquestions.length + 1} />);
    this.setState({surveyquestions: newSurveyQuestions});
  }

  loadSurveyQuestions() {
    return (this.state.surveyquestions);
  }

  render() {
    return(
      <div className="Dynamik">
        <div className="DynamikHeader">
          <h2>Welcome To Dynamik.</h2>
        </div>
        {this.loadSurveyQuestions()}
        <ButtonToolbar className="add-question">
          <DropdownButton bsSize="large" title="Add" id="dropdown-size-large" dropup pullRight>
            <MenuItem eventKey="1" onClick={this.createShortAnswer}>Short Answer Question</MenuItem>
            <MenuItem eventKey="2">Long Answer Question</MenuItem>
            <MenuItem eventKey="3">Number Question</MenuItem>
            <MenuItem eventKey="4">Multiple Choice Question</MenuItem>
          </DropdownButton>
        </ButtonToolbar>
      </div>
    );
  }
}
