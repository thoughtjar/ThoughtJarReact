import React, { Component } from "react";
import { Button, DropdownButton, ButtonGroup, MenuItem, Grid, Row, Col, Image } from "react-bootstrap";
import "./MyJar.css";
import cookie from 'react-cookies';
import * as CSV from 'csv-string';
import qs from 'qs';

export default class MyJar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      oneVar: true,
      analysisType: "Analysis Type",
      firstQuestionName: "Question 1",
      secondQuestionName: "Question 2",
      firstQuestions: [],
      secondQuestions: [],
      questionList: [],
      responseContent: [],
      graphs: []
    };
    this.url = "https://api.thoughtjar.net";
    //this.url = "http://localhost:5000";
    this.params = qs.parse(this.props.location.search.slice(1));
    this.getResponseContent = this.getResponseContent.bind(this);
    this.downloadCSV = this.downloadCSV.bind(this);
    this.getAnalysis = this.getAnalysis.bind(this);
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

  changeAnalysisType(type){
    if(type === "Two Variable Analysis"){
      this.setState({
        analysisType: type,
        oneVar: false
      });
    }else{
      this.setState({
        analysisType: type,
        oneVar: true
      });
    }
  }

  firstQuestionClick(qContent){
    this.setState({
      firstQuestionName: qContent
    });
  }

  secondQuestionClick(qContent){
    console.log(qContent);
    this.setState({
      secondQuestionName: qContent
    });
  }

  getAnalysis(){
    console.log(this.state.questionList);
    //alert them if the values are off
    var firstQuestionId = parseInt(this.state.firstQuestionName.split(".")[0], 10)-1;
    console.log(firstQuestionId);
    console.log(this.state.questionList[firstQuestionId]);
    var firstQuestionType = this.state.questionList[firstQuestionId]["questionType"];
    var secondQuestionType;
    var secondQuestionId;
    if(this.state.secondQuestionName !== "Question 2"){
      console.log(this.state.secondQuestionName);
      secondQuestionId = parseInt(this.state.secondQuestionName.split(".")[0], 10)-1;
      secondQuestionType = this.state.questionList[secondQuestionId]["questionType"];
    }
    var data = {
      "access-token": cookie.load('access-token'),
      "identifier": this.params["identifier"],
      "oneVar": this.state.oneVar,
      "firstQuestionType": firstQuestionType,
      "firstResponseId": "Question"+(firstQuestionId+1),
      "secondQuestionType": secondQuestionType,
      "secondResponseId": "Question"+(secondQuestionId+1)
    }
    console.log(data);
    const url = this.url + "/myJarAnalysis";
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => {
      return res.json().then(json => {
        console.log(json);
        var newGraphs = [];
        for(var i=0; i<json["src"].length; i++){
          newGraphs = newGraphs.concat(<Image className="GraphImage" rounded key={i} src={"data:image/png;base64,"+json["src"][i]} />);
        }
        this.setState({
          graphs: newGraphs
        });
      });
    }).catch(error => console.error('Error:', error))
    .then(response => console.log('Success'));
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
        var firstQuestionList = [];
        var secondQuestionList = [];
        for(var i=0; i< json["questionList"].length; i++){
          var qContent1 = (i+1) + ". " +  json["questionList"][i]["questionField"];
          firstQuestionList = firstQuestionList.concat(
            <MenuItem key={i} eventKey={"2."+(i+1)} onClick={this.firstQuestionClick.bind(this, qContent1)}>{qContent1}</MenuItem>
          );
        };
        for(var j=0; j< json["questionList"].length; j++){
          var qContent2 = (j+1) + ". " +  json["questionList"][j]["questionField"];
          secondQuestionList = secondQuestionList.concat(
            <MenuItem key={j} eventKey={"3."+(j+1)} onClick={this.secondQuestionClick.bind(this, qContent2)}>{qContent2}</MenuItem>
          );
        };
        console.log(parseInt(json["responsesSoFar"], 10) < parseInt(json["reqResponses"], 10));
        var campaignComplete = parseInt(json["responsesSoFar"], 10) >= parseInt(json["reqResponses"], 10);
        this.setState({
          title: json["title"],
          questionList: json["questionList"],
          isCampaignComplete: campaignComplete,
          responsesSoFar: parseInt(json["responsesSoFar"], 10),
          reqResponses: parseInt(json["reqResponses"], 10),
          responseContent: CSV.parse(json["responseCSV"]),
          firstQuestions: firstQuestionList,
          secondQuestions: secondQuestionList
        });
      });
    }).catch(error => console.error('Error:', error))
    .then(response => console.log('Success'));
  }

  componentDidMount(){
    this.getResponseContent(this.url + "/myJar");
  }

  render() {
    if(this.state.isCampaignComplete === undefined){
      return(
        <div className="MyJar">
          Loading
        </div>
      );
    }else if(this.state.isCampaignComplete === false){
      return(
        <div className="MyJar">
          <div className="MyJarHeader">
            <h2>Jar Title: {this.state.title}</h2>
          </div>
          <h4>Campaign is not complete</h4>
          <h5>{"Reponses Collected: " + this.state.responsesSoFar}</h5>
          <h5>{"Reponses Requested: " + this.state.reqResponses}</h5>
          <Button className="ExportCSV" bsSize="large" onClick={this.downloadCSV}>Dowload Results As CSV</Button>
        </div>
      );
    }else{
      return(
        <div className="MyJar">
          <div className="MyJarHeader">
            <h2>Jar Title: {this.state.title}</h2>
          </div>
          <ButtonGroup className="AnalysisOptions">
            <DropdownButton
              title={this.state.analysisType}
              key={1}
              id="analysis-type">
              <MenuItem eventKey="1.1" onClick={this.changeAnalysisType.bind(this, "One Variable Analysis")}>One Variable Analysis</MenuItem>
              <MenuItem eventKey="1.2" onClick={this.changeAnalysisType.bind(this, "Two Variable Analysis")}>Two Variable Analysis</MenuItem>
            </DropdownButton>
            <DropdownButton
              title={this.state.firstQuestionName}
              key={2}
              id="first-question">
              {this.state.firstQuestions}
            </DropdownButton>
            <DropdownButton
              title={this.state.secondQuestionName}
              disabled={this.state.oneVar}
              key={3}
              id="second-question">
              {this.state.secondQuestions}
            </DropdownButton>
            <Button
             onClick={this.getAnalysis}>
             Get Analysis
            </Button>
          </ButtonGroup>
          <Grid>
            <Row>
              <Col xs={6} md={6}>
                {this.state.graphs[0]}
              </Col>
              <Col xs={6} md={6}>
                {this.state.graphs[1]}
              </Col>
            </Row>
            <Row>
              <Col xs={6} md={6}>
                {this.state.graphs[2]}
              </Col>
            </Row>
          </Grid>
          <Button className="ExportCSV" bsSize="large" onClick={this.downloadCSV}>Dowload Results As CSV</Button>
        </div>
      );
    }
  }
}
