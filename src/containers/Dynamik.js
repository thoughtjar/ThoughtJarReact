import React, { Component } from "react";
import "./Dynamik.css";
import { FormControl, DropdownButton, MenuItem, ButtonToolbar, Row, Col, Button } from "react-bootstrap";

class ShortAnswer extends Component {
  render() {
    return(
      <div className="ShortAnswer">
        <h4>Short Answer Question</h4>
        <div className="ShortQuestionInput">
          <Row>
            <Col xs={12} md={10}>
              <FormControl type="text" placeholder="Type in the question here." />
            </Col>
            <Col xs={6} md={2}>
              <Button onClick={this.props.delete}>Delete</Button>
            </Col>
          </Row>
        </div>
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
    this.keycount = 1;
    this.createShortAnswer = this.createShortAnswer.bind(this);
    this.loadSurveyQuestions = this.loadSurveyQuestions.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
  }

  deleteQuestion(id) {
      var deleteIndex;
      for (var i=0; i<this.state.surveyquestions.length; i++){
        if (this.state.surveyquestions[i].props.id === id){
          deleteIndex = i;
          break;
        }
      }
      const updatedSurveyQuestions = [...this.state.surveyquestions];
      updatedSurveyQuestions.splice(deleteIndex, 1);
      this.setState({surveyquestions: updatedSurveyQuestions});
  }

  createShortAnswer() {
    const newSurveyQuestions = this.state.surveyquestions.concat(<ShortAnswer delete={() => this.deleteQuestion(this.state.surveyquestions.length + 1)} id={this.state.surveyquestions.length + 1} key={this.keycount} />);
    this.setState({surveyquestions: newSurveyQuestions});
    this.keycount += 1;
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
