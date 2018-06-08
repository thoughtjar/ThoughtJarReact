import React, { Component } from "react";
import "./SurveyQuestionTemplates.css";
import { FormControl, ControlLabel } from "react-bootstrap";

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
        <div className="ShortQuestionInput">
          <FormControl type="text"
            value={this.state.value}
            onChange={this.handleChange}/>
        </div>
      </div>
    );
  }
}
