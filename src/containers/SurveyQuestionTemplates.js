import React, { Component } from "react";
import "./SurveyQuestionTemplates.css";
import { FormControl, Row, Col, Button } from "react-bootstrap";

export class ShortAnswer extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.props.onUpdate("shortanswer", this.props.id, event.target.value);
    this.setState({value: event.target.value});
  }

  render() {
    return(
      <div className="ShortAnswer">
        <h4>Short Answer Question</h4>
        <div className="ShortQuestionInput">
          <Row>
            <Col xs={12} md={10}>
              <FormControl type="text" placeholder="Type in short-answer question." value={this.state.value} onChange={this.handleChange} />
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

export class LongAnswer extends Component {
  render() {
    return(
      <div className="LongAnswer">
        <h4>Long Answer Question</h4>
        <div className="LongQuestionInput">
          <Row>
            <Col xs={12} md={10}>
              <FormControl type="text" placeholder="Type in long-answer question." />
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
/*
export class MultipleChoice extends Component {
  constructor(props){
    super(props);
    this.options = []
    for(var i=0; i<this.props.numoptions; i++){
      this.options.
    }
  }

  render() {
    return(
      <div className="MultipleChoice">
        <h4>Multiple Choice Question</h4>
        <div className="MultipleChoiceQuestionInput">
          <Row>
            <Col xs={12} md={9}>
              <FormControl type="text" placeholder="Type in multiple-choice question." />
            </Col>
            <Col xs={6} md={1}>
              <Button onClick={this.props.delete}>Delete</Button>
            </Col>
            <>
          </Row>
        </div>
      </div>
    );
  }
}
*/
