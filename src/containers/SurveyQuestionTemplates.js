import React, { Component } from "react";
import "./SurveyQuestionTemplates.css";
import { FormControl, Row, Col, Button, ButtonGroup } from "react-bootstrap";

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
  constructor(props){
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.props.onUpdate("longanswer", this.props.id, event.target.value);
    this.setState({value: event.target.value});
  }

  render() {
    return(
      <div className="LongAnswer">
        <h4>Long Answer Question</h4>
        <div className="LongQuestionInput">
          <Row>
            <Col xs={12} md={10}>
              <FormControl type="text" placeholder="Type in long-answer question." value={this.state.value} onChange={this.handleChange} />
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

class MultipleChoiceOption extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    //this.props.onUpdate(this.props.id, event.target.value);
    this.setState({value: event.target.value});
  }

  render(){
    return(
      <div className="MultipleChoiceOption">
        <FormControl type="text" placeholder="Multiple Choice Option" value={this.state.value} onChange={this.handleChange} />
      </div>
    );
  }
}

export class MultipleChoice extends Component {
  constructor(props){
    super(props);
    this.state = {
      options: []
    }
    for(var i=0; i<this.props.numoptions; i++){
      this.state.options = this.state.options.concat(<MultipleChoiceOption id={this.state.options.length} key={this.state.options.length} />);
    }
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDel = this.handleDel.bind(this);
  }

  handleAdd(){
    this.props.addChoice(this.props.id);
  }

  handleDel(){
    this.props.delChoice(this.props.id);
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
            <Col xs={6} md={3}>
              <ButtonGroup>
                <Button onClick={this.handleAdd}> + </Button>
                <Button onClick={this.handleDel}> - </Button>
                <Button onClick={this.props.delete}>Delete</Button>
              </ButtonGroup>
            </Col>
          </Row>
          { this.state.options }
        </div>
      </div>
    );
  }
}
