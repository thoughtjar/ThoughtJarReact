import React, { Component } from "react";
import "./Dynamik.css";
import { ShortAnswer } from "./SurveyQuestionTemplates.js";
import { LongAnswer } from "./SurveyQuestionTemplates.js";
import { MultipleChoice } from "./SurveyQuestionTemplates.js";
import { NumberAnswer } from "./SurveyQuestionTemplates.js";
import { DropdownButton, MenuItem, ButtonToolbar, Button, ButtonGroup, Well, FormControl, Modal } from "react-bootstrap";
import cookie from 'react-cookies';

export default class Dynamik extends Component {

  constructor (props) {
    super(props);
    this.state = {
      surveyquestions: [],
      questioncontent: {},
      numberresponses: 1,
      priceestimate: 0.0,
      showDetails: false,
      jarTitle: "",
      jarDescription: ""
    };
    this.keycount = 1;
    this.createShortAnswer = this.createShortAnswer.bind(this);
    this.createLongAnswer = this.createLongAnswer.bind(this);
    this.createNumberAnswer = this.createNumberAnswer.bind(this);
    this.createMultipleChoice = this.createMultipleChoice.bind(this);
    this.loadSurveyQuestions = this.loadSurveyQuestions.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.onUpdateQuestion = this.onUpdateQuestion.bind(this);
    this.onUpdateMultipleChoiceOptions = this.onUpdateMultipleChoiceOptions.bind(this);
    this.handleChangeNumberResponses = this.handleChangeNumberResponses.bind(this);
    this.handleChangeJarTitle = this.handleChangeJarTitle.bind(this);
    this.handleChangeJarDescription = this.handleChangeJarDescription.bind(this);
    this.handleCloseDetails = this.handleCloseDetails.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.uploadJar = this.uploadJar.bind(this);
    this.routeLoginPage = this.routeLoginPage.bind(this);
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
        var updatedPriceEstimate
        // update price estimate depending on question type and other state variables
        if(this.state.questioncontent[id.toString()][0] === "shortanswer"){
          updatedPriceEstimate = this.state.priceestimate - (0.15 * this.state.numberresponses);
        }else if(this.state.questioncontent[id.toString()][0] === "longanswer"){
          updatedPriceEstimate = this.state.priceestimate - (0.25 * this.state.numberresponses);
        }else if(this.state.questioncontent[id.toString()][0] === "multiplechoice"){
          updatedPriceEstimate = this.state.priceestimate - (0.10 * this.state.numberresponses);
        }else if(this.state.questioncontent[id.toString()][0] === "numberanswer"){
          updatedPriceEstimate = this.state.priceestimate - (0.05 * this.state.numberresponses);
        }
        this.setState({
          surveyquestions: updatedSurveyQuestions,
          questioncontent: updatedQuestionContent,
          priceestimate: updatedPriceEstimate
        });
      }
  }

  //handle final creation of survey [submit button]
  submitForm() {
    this.setState({
      showDetails: true
    });
  }

  // upload jar to server
  uploadJar() {
    for(const [key, value] of Object.entries(this.state.questioncontent)) {
      console.log(key, value);
    }
    //const url = "http://172.20.10.8:5000/createSurvey";
    const data = {
      'title': this.state.jarTitle,
      'description': this.state.jarDescription,
      'reqResponses': this.state.numberresponses,
      'access-token': cookie.load('access-token'),
      'questionsList': this.state.questioncontent
    }
    const url ="http://localhost:5000/createSurvey";
    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    }).catch(error => console.error('Error:', error))
    .then(response => this.props.history.push("/myjars"));
  }

  // handle number of responses change
  handleChangeNumberResponses(event){
    console.log(event.target.value);
    console.log(event.target.value > 0);
    var updatedEstimatedPrice;
    if (event.target.value > 0){
      if (this.state.numberresponses > 0){
        updatedEstimatedPrice = this.state.priceestimate * ((event.target.value * 1.0)/this.state.numberresponses);
      }else{
        updatedEstimatedPrice = this.state.priceestimate * (event.target.value);
      }
      this.setState({
        numberresponses: event.target.value,
        priceestimate: updatedEstimatedPrice
      });
    } else {
      this.setState({
        numberresponses: event.target.value,
        priceestimate: (this.state.priceestimate/this.state.numberresponses)
      });
    }
  }

  // handle jar title change
  handleChangeJarTitle(event){
    this.setState({
      jarTitle: event.target.value
    });
  }

  // handle jar description change
  handleChangeJarDescription(event){
    this.setState({
      jarDescription: event.target.value
    });
  }

  // update question in content dictionary
  onUpdateQuestion(type, id, value) {
    const updatedQuestionContent = Object.assign({}, this.state.questioncontent);
    if(type==="multiplechoice"){
      if(!(id.toString() in updatedQuestionContent)){
        updatedQuestionContent[id.toString()] = [type, value, []];
      }else{
        updatedQuestionContent[id.toString()][1] = value;
      }
    }else{
      updatedQuestionContent[id.toString()] = [type, value];
    }
    this.setState({
      questioncontent: updatedQuestionContent
    });
  }

  // update option content of multiple choice question in content dictionary
  onUpdateMultipleChoiceOptions(id, optionsList){
    const updatedQuestionContent = Object.assign({}, this.state.questioncontent);
    updatedQuestionContent[id.toString()][2] = optionsList;
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
      priceestimate: this.state.priceestimate + (this.state.numberresponses * 0.15)
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

  // create number answer and update corresponding variables
  createNumberAnswer() {
    const deleteId = this.keycount;
    const newSurveyQuestions = this.state.surveyquestions.concat(<NumberAnswer
      delete={() => this.deleteQuestion(deleteId)}
      id={deleteId}
      key={this.keycount}
      onUpdate={this.onUpdateQuestion}/>);
    this.onUpdateQuestion("numberanswer", deleteId, "NA");
    this.keycount += 1;
    this.setState({
      surveyquestions: newSurveyQuestions,
      priceestimate: this.state.priceestimate + (this.state.numberresponses * 0.05)
    });
  }


  // create multiple choice answer and update corresponding variables
  createMultipleChoice() {
    const deleteId = this.keycount;
    const newSurveyQuestions = this.state.surveyquestions.concat(<MultipleChoice
      delete={() => this.deleteQuestion(deleteId)}
      id={deleteId}
      key={this.keycount}
      onUpdateQuestion={this.onUpdateQuestion}
      onUpdateMultipleChoiceOptions={this.onUpdateMultipleChoiceOptions}
      addChoice={this.addMultipleChoiceOption}
      delChoice={this.delMultipleChoiceOption}
      numoptions="1"/>);
    this.onUpdateQuestion("multiplechoice", deleteId, "NA");
    this.keycount += 1;
    this.setState({
      surveyquestions: newSurveyQuestions,
      priceestimate: this.state.priceestimate + (this.state.numberresponses * 0.10)
    });
  }

  // go to login page
  routeLoginPage(){
    this.props.history.push("/login");
  }

  // return render of all survey questions
  loadSurveyQuestions() {
    return (this.state.surveyquestions);
  }

  // hide close details modal for surveys
  handleCloseDetails() {
    this.setState({showDetails: false});
  }

  render() {
    if(cookie.load('access-token') === undefined){
      return(
        <div className="RedirectLoginPage">
          <h1>Please login before creating surveys.</h1>
          <Button bsSize="large" onClick={this.routeLoginPage}>Go to Login Page.</Button>
        </div>
      );
    }else{
      return(
        <div className="Dynamik">
          <div className="DynamikHeader">
            <h2>Welcome To Dynamik.</h2>
            <p>Click Add to start building.</p>
          </div>
          {this.loadSurveyQuestions()}
          <Well className="EstimatedPrice">Estimated Price: ${Math.round(100*this.state.priceestimate)/100}</Well>
          <FormControl
            className="num-responses"
            type="number"
            placeholder="Number of Desired Responses."
            value={this.state.numberresponses}
            onChange={this.handleChangeNumberResponses} />
          <ButtonToolbar className="add-question">
            <ButtonGroup>
              <Button bsSize="large" onClick={this.submitForm}>Create Survey</Button>
              <DropdownButton bsSize="large" title="Add" id="dropdown-size-large" dropup pullRight>
                <MenuItem eventKey="1" onClick={this.createShortAnswer}>Short Answer Question</MenuItem>
                <MenuItem eventKey="2" onClick={this.createLongAnswer}>Long Answer Question</MenuItem>
                <MenuItem eventKey="3" onClick={this.createNumberAnswer}>Number Answer Question</MenuItem>
                <MenuItem eventKey="4" onClick={this.createMultipleChoice}>Multiple Choice Question</MenuItem>
              </DropdownButton>
            </ButtonGroup>
          </ButtonToolbar>
          <Modal show={this.state.showDetails} onHide={this.handleCloseDetails}>
            <Modal.Header>
              <Modal.Title>Edit Jar Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormControl
                type="text"
                placeholder="Enter Title of Jar"
                className="JarTitle"
                value={this.state.jarTitle}
                onChange={this.handleChangeJarTitle}/>
              <FormControl
                componentClass="textarea"
                placeholder="Describe your Jar."
                className="JarDescription"
                value={this.state.jarDescription}
                onChange={this.handleChangeJarDescription}/>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.uploadJar}>Create</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  }
}
