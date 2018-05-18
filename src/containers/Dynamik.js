import React, { Component } from "react";
import "./Dynamik.css";
import { ShortAnswer } from "./SurveyQuestionTemplates.js";
import { LongAnswer } from "./SurveyQuestionTemplates.js";
import { DropdownButton, MenuItem, ButtonToolbar, Button, ButtonGroup, Well, FormControl } from "react-bootstrap";

export default class Dynamik extends Component {
  constructor (props) {
    super(props);
    this.state = {
      surveyquestions: [],
      questioncontent: {},
      numberresponses: 1,
      priceestimate: 0.0
    };
    this.keycount = 1;
    this.createShortAnswer = this.createShortAnswer.bind(this);
    this.createLongAnswer = this.createLongAnswer.bind(this);
    this.loadSurveyQuestions = this.loadSurveyQuestions.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.onUpdateQuestion = this.onUpdateQuestion.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  deleteQuestion(id) {
      var deleteIndex = -1;
      for (var i=0; i<this.state.surveyquestions.length; i++){
        if (this.state.surveyquestions[i].props.id === (id)){
          deleteIndex = i;
          break;
        }
      }
      if(deleteIndex !== -1){
        const updatedSurveyQuestions = [...this.state.surveyquestions];
        updatedSurveyQuestions.splice(deleteIndex, 1);
        const updatedQuestionContent = Object.assign({}, this.state.questioncontent);
        delete updatedQuestionContent[id.toString()];
        this.setState({
          surveyquestions: updatedSurveyQuestions,
          questioncontent: updatedQuestionContent
        });
      }
  }

  submitForm() {
    for(const [key, value] of Object.entries(this.state.questioncontent)) {
      console.log(key, value);
    }
  }

  onUpdateQuestion(type, id, value) {
    //make copy of existing dictionary
    const updatedQuestionContent = Object.assign({}, this.state.questioncontent);
    //add new value to
    updatedQuestionContent[id.toString()] = [type, value];
    //setstate copy
    this.setState({
      questioncontent: updatedQuestionContent
    });
  }

  createLongAnswer() {
    const deleteId = this.keycount;
    const newSurveyQuestions = this.state.surveyquestions.concat(<LongAnswer
      delete={() => this.deleteQuestion(deleteId)}
      id={deleteId}
      key={this.keycount}
      onUpdate={this.onUpdateQuestion}/>);
    this.onUpdateQuestion("longanswer", deleteId, "NA");
    this.keycount += 1;
    this.setState({
      surveyquestions: newSurveyQuestions,
      priceestimate: this.state.priceestimate + (this.state.numberresponses * 0.25)
    });
  }

  createShortAnswer() {
    const deleteId = this.keycount;
    const newSurveyQuestions = this.state.surveyquestions.concat(<ShortAnswer
      delete={() => this.deleteQuestion(deleteId)}
      id={deleteId}
      key={this.keycount}
      onUpdate={this.onUpdateQuestion}/>);
    this.onUpdateQuestion("ShortAnswer", deleteId, "NA");
    this.keycount += 1;
    this.setState({
      surveyquestions: newSurveyQuestions,
      priceestimate: this.state.priceestimate + (this.state.numberresponses * 0.10)
    });
  }

  loadSurveyQuestions() {
    return (this.state.surveyquestions);
  }

  render() {
    return(
      <div className="Dynamik">
        <div className="DynamikHeader">
          <h2>Welcome To Dynamik.</h2>
          <p>Click Add to start building.</p>
        </div>
        {this.loadSurveyQuestions()}
        <Well className="EstimatedPrice">Estimated Price: ${this.state.priceestimate}</Well>
        <FormControl type="text" placeholder="Type in short-answer question." value={this.state.value} onChange={this.handleChange} />
        <ButtonToolbar className="add-question">
          <ButtonGroup>
            <Button bsSize="large" onClick={this.submitForm}>Create Survey</Button>
            <DropdownButton bsSize="large" title="Add" id="dropdown-size-large" dropup pullRight>
              <MenuItem eventKey="1" onClick={this.createShortAnswer}>Short Answer Question</MenuItem>
              <MenuItem eventKey="2" onClick={this.createLongAnswer}>Long Answer Question</MenuItem>
              <MenuItem eventKey="3">Number Answer Question</MenuItem>
              <MenuItem eventKey="4">Multiple Choice Question</MenuItem>
            </DropdownButton>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
    );
  }
}
