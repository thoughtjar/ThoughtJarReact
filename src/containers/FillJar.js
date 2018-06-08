import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./FillJar.css";
import cookie from 'react-cookies';
import { ShortAnswerResponse } from "./ResponseQuestionTemplates.js";

const queryString = require('query-string');

export default class FillJar extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      questionContent: [],
      responseData: {}
    };
    this.params = queryString.parse(this.props.location.search);
    this.getJars = this.getJars.bind(this);
    this.routeLoginPage = this.routeLoginPage.bind(this);
    this.handleDataChange = this.handleDataChange.bind(this);
  }

  handleDataChange(id, value){
    console.log(value);
    var updatedResponseData = Object.assign({}, this.state.responseData);
    updatedResponseData[id.toString()] = value;
    this.setState({
      responseData: updatedResponseData
    });
  }

  getJars(url){
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
        var questions = json['questionList'];
        console.log(questions);
        var newQuestionContent = []
        var newResponseData = {};
        for(var i=0; i<questions.length; i++){
          if(questions[i]['questionType']==="shortanswer"){
            console.log("shortanswer");
            //newQuestionContent = newQuestionContent.concat(<ControlLabel key={newQuestionContent.length}>{questions[i]['questionField']}</ControlLabel>);
            newQuestionContent = newQuestionContent.concat(<ShortAnswerResponse id={newQuestionContent.length}
              key={newQuestionContent.length}
              title={questions[i]['questionField']}
              onUpdate={this.handleDataChange}/>);
            newResponseData[newQuestionContent.length.toString()] = '';
          }else if(questions[i]['questionType']==="longanswer"){
            console.log("longanswer");
            newQuestionContent = newQuestionContent.concat(<ControlLabel key={newQuestionContent.length}>{questions[i]['questionField']}</ControlLabel>);
            newQuestionContent = newQuestionContent.concat(<FormControl componentClass="textarea" key={newQuestionContent.length} />);
          }else if(questions[i]['questionType']==="multiplechoice"){
            console.log("multiplechoice");
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
    this.getJars("http://localhost:5000/fillJar");
  }

  render() {
    if(cookie.load('access-token') === undefined){
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
      </div>
    );
  }
}