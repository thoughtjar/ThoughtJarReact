import React, { Component } from "react";
import { Button, FormGroup } from "react-bootstrap";
import "./FillJar.css";
import cookie from 'react-cookies';
import { ShortAnswerResponse, LongAnswerResponse, NumberAnswerResponse, MultipleChoiceResponse } from "./ResponseQuestionTemplates.js";
import qs from 'qs';

export default class FillJar extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      questionContent: [],
      responseData: {}
    };
    this.url = "https://api.thoughtjar.net";
    //this.url = "http://localhost:5000";
    this.params = qs.parse(this.props.location.search.slice(1));
    this.getJars = this.getJars.bind(this);
    this.routeLoginPage = this.routeLoginPage.bind(this);
    this.handleDataChange = this.handleDataChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(){
    console.log(this.state.responseData);
    var response = {};
    for(var i=0; i<Object.keys(this.state.responseData).length; i++){
      response["Question"+(i+1).toString()] = this.state.responseData[i.toString()]
    }
    var data = {
      'access-token': cookie.load('access-token'),
      'response': response,
      'surveyId': this.params['identifier']
    };
    console.log(data);
    const url = this.url + '/respond';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).catch(error => console.error('Error:', error))
    .then(response => this.props.history.push('/filljars'));
  }

  handleDataChange(id, value){
    var updatedResponseData = Object.assign({}, this.state.responseData);
    updatedResponseData[id.toString()] = value;
    this.setState({
      responseData: updatedResponseData
    });
  }

  getJars(url){
    var data;
    if(this.params['magictoken'] === undefined){
      data = {
        "access-token": cookie.load('access-token'),
        "identifier": this.params["identifier"]
      };
    }else{
      //temporary magic token = 123456789
      data = {
        "identifier": this.params["identifier"],
        "magictoken": this.params["magictoken"]
      }
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
        var json = jsonres['surveyData'];
        var questions = json['questionList'];
        console.log(questions);
        var newQuestionContent = []
        var newResponseData = {};
        for(var i=0; i<questions.length; i++){
          if(questions[i]['questionType']==="shortanswer"){
            console.log("shortanswer");
            newResponseData[newQuestionContent.length.toString()] = '';
            newQuestionContent = newQuestionContent.concat(<ShortAnswerResponse id={newQuestionContent.length}
              key={newQuestionContent.length}
              title={questions[i]['questionField']}
              onUpdate={this.handleDataChange}/>);
          }else if(questions[i]['questionType']==="longanswer"){
            console.log("longanswer");
            newResponseData[newQuestionContent.length.toString()] = '';
            newQuestionContent = newQuestionContent.concat(<LongAnswerResponse id={newQuestionContent.length}
              key={newQuestionContent.length}
              title={questions[i]['questionField']}
              onUpdate={this.handleDataChange}/>)
          }else if(questions[i]['questionType']==="multiplechoice"){
            newResponseData[newQuestionContent.length.toString()] = '';
            newQuestionContent = newQuestionContent.concat(<MultipleChoiceResponse id={newQuestionContent.length}
              key={newQuestionContent.length}
              title={questions[i]['questionField']}
              options={questions[i]['answerOptions']}
              onUpdate={this.handleDataChange}/>)
          }else if(questions[i]['questionType']==="numberanswer"){
              newResponseData[newQuestionContent.length.toString()] = '';
              newQuestionContent = newQuestionContent.concat(<NumberAnswerResponse id={newQuestionContent.length}
                key={newQuestionContent.length}
                title={questions[i]['questionField']}
                onUpdate={this.handleDataChange}/>);
          };
        }
        this.setState({
          title: json['title'],
          questionContent: newQuestionContent,
          responseData: newResponseData
        });
      });
    }).catch(error => console.error('Error:', error))
    .then(response => console.log('Success'));
  }

  // go to login page
  routeLoginPage(){
    this.props.history.push("/login");
  }

  componentDidMount(){
    //this.getJars("http://ec2-54-165-205-67.compute-1.amazonaws.com:5000/getJars");
    this.getJars(this.url + "/fillJar");
  }

  render() {
    if((cookie.load('access-token') === undefined) && (this.params["magictoken"] === undefined)){
      return(
        <div className="RedirectLoginPage">
          <h1>Please login before filling jars.</h1>
          <Button bsSize="large" onClick={this.routeLoginPage}>Go to Login Page.</Button>
        </div>
      );
    }
    if(!this.state.title) return <h4>Loading ...</h4>
    return(
      <div className="FillJar">
        <div className="Header">
          <h2>{this.state.title}</h2>
        </div>
        <div className="Body">
          <FormGroup>
            {this.state.questionContent}
          </FormGroup>
        </div>
        <Button className="SubmitForm" bsSize="large" onClick={this.submitForm}>Submit</Button>
      </div>
    );
  }
}
