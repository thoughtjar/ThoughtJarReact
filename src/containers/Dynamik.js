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

  //handle survey question delete
  deleteQuestion(id) {
      var deleteIndex = -1;
      //cycle through survey questions and get delete index
      for (var i=0; i<this.state.surveyquestions.length; i++){
        if (this.state.surveyquestions[i].props.id === (id)){
          deleteIndex = i;
          break;
        }
      }
      // if delete index found delete from state variable
      if(deleteIndex !== -1){
        // delete question from copy of render array
        const updatedSurveyQuestions = [...this.state.surveyquestions];
        updatedSurveyQuestions.splice(deleteIndex, 1);
        // delete question from copy of content dictionary
        const updatedQuestionContent = Object.assign({}, this.state.questioncontent);
        delete updatedQuestionContent[id.toString()];
        // update price estimate depending on question type and other state variables
        if(this.state.questioncontent[id.toString()][0] === "shortanswer"){
          this.setState({
            surveyquestions: updatedSurveyQuestions,
            questioncontent: updatedQuestionContent,
            priceestimate: this.state.priceestimate - (0.10 * this.state.numberresponses)
          });
        }else if(this.state.questioncontent[id.toString()][0] === "longanswer"){
          this.setState({
            surveyquestions: updatedSurveyQuestions,
            questioncontent: updatedQuestionContent,
            priceestimate: this.state.priceestimate - (0.25 * this.state.numberresponses)
          });
        }
      }
  }

  //handle final creation of survey [submit button]
  submitForm() {
    for(const [key, value] of Object.entries(this.state.questioncontent)) {
      console.log(key, value);
    }
  }

  // update question in content dictionary
  onUpdateQuestion(type, id, value) {
    const updatedQuestionContent = Object.assign({}, this.state.questioncontent);
    updatedQuestionContent[id.toString()] = [type, value];
    this.setState({
      questioncontent: updatedQuestionContent
    });
  }

  // create short answer and update corresponding variables
  createShortAnswer() {
    const deleteId = this.keycount;
    const newSurveyQuestions = this.state.surveyquestions.concat(<ShortAnswer
      delete={() => this.deleteQuestion(deleteId)}
      id={deleteId}
      key={this.keycount}
      onUpdate={this.onUpdateQuestion}/>);
    this.onUpdateQuestion("shortanswer", deleteId, "NA");
    this.keycount += 1;
    this.setState({
      surveyquestions: newSurveyQuestions,
      priceestimate: this.state.priceestimate + (this.state.numberresponses * 0.10)
    });
  }

  // create long answer and update corresponding variables
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

  // return render of all survey questions
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
        <FormControl className="num-responses" type="text" placeholder="Number of Desired Responses." value={this.state.value} onChange={this.handleChange} />
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
