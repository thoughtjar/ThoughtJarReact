import React, { Component } from "react";
import "./ResponseQuestionTemplates.css";
import { FormControl, ControlLabel, FormGroup, Radio } from "react-bootstrap";

// Short Answer Response Template Class
export class ShortAnswerResponse extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  // handle change to Short Answer QUESTION content
  handleChange(event){
    this.props.onUpdate(this.props.id, event.target.value);
    this.setState({value: event.target.value});
  }

  render() {
    return(
      <div className="ShortAnswerResponse">
        <ControlLabel>{this.props.title}</ControlLabel>
        <div className="ShortResponseInput">
          <FormControl type="text"
            value={this.state.value}
            onChange={this.handleChange}/>
        </div>
      </div>
    );
  }
}

// Long Answer Response Template Class
export class LongAnswerResponse extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.props.onUpdate(this.props.id, event.target.value);
    this.setState({value: event.target.value});
  }

  render() {
    return(
      <div className="LongAnswerResponse">
        <ControlLabel>{this.props.title}</ControlLabel>
        <div className="LongResponseInput">
          <FormControl componentClass="textarea"
            value={this.state.value}
            onChange={this.handleChange}/>
        </div>
      </div>
    );
  }
}

// Number Answer Response Template Class
export class NumberAnswerResponse extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.props.onUpdate(this.props.id, event.target.value);
    this.setState({value: event.target.value});
  }

  render() {
    return(
      <div className="NumberAnswerResponse">
          <ControlLabel>{this.props.title}</ControlLabel>
          <div className="NumberResponseInput">
            <FormControl type="number"
              value={this.state.value}
              onChange={this.handleChange}/>
          </div>
      </div>
    );
  }
}

// Multiple Choice Response Template class
export class MultipleChoiceResponse extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      options: []
    };
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  componentDidMount(){
    var newOptions = []
    for(var i=0; i<this.props.options.length; i++){
      var groupName = "MC "+this.props.id;
      newOptions = newOptions.concat(<Radio onClick={this.handleOptionChange.bind(this, this.props.options[i])}
        name={groupName}
        key={newOptions.length}>
          {this.props.options[i]}
        </Radio>);
    }
    this.setState({
      options: newOptions
    });
  }

  handleOptionChange(option){
    this.props.onUpdate(this.props.id, option);
  }

  render() {
    return(
      <div className="MultipleChoiceResponse">
        <ControlLabel>{this.props.title}</ControlLabel>
        <div className="MultipleChoiceOptions">
          <FormGroup>
            {this.state.options}
          </FormGroup>
        </div>
      </div>
    )
  }
}
