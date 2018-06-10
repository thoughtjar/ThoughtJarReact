import React, { Component } from "react";
import "./SurveyQuestionTemplates.css";
import { FormControl, Row, Col, Button, ButtonGroup, Modal, ListGroup, ListGroupItem } from "react-bootstrap";

// Short Answer Template Class
export class ShortAnswer extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  // handle change to Short Answer QUESTION content
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

// Long Answer Template Class
export class LongAnswer extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  // handle change to QUESTION content
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

//Number Answer Template Class
export class NumberAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.props.onUpdate("numberanswer", this.props.id, event.target.value);
    this.setState({
      value: event.target.value
    });
  }

  render() {
    return(
      <div className="NumberAnswer">
        <h4>Number Answer Question</h4>
        <div className="NumberQuestionInput">
            <Row>
              <Col xs={12} md={10}>
                <FormControl type="text" placeholder="Type in number-answer question." value={this.state.value} onChange={this.handleChange} />
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

// Multiple Choice Template Class
export class MultipleChoice extends Component {
  constructor(props){
    super(props);
    this.state = {
      options: [],
      optionContent: '',
      value: '',
      showOptions: false
    };
    this.keycount = 1;
    this.handleEditOptions = this.handleEditOptions.bind(this);
    this.handleCloseOptions = this.handleCloseOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeOptionContent = this.handleChangeOptionContent.bind(this);
    this.saveOptionChanges = this.saveOptionChanges.bind(this);
  }

  // open up modal
  handleEditOptions(){
    this.setState({showOptions: true});
  }

  // hide modal
  handleCloseOptions(){
    this.setState({showOptions: false});
  }

  // handle multiple choice QUESTION change
  handleChange(event){
    this.props.onUpdateQuestion("multiplechoice", this.props.id, event.target.value);
    this.setState({
      value: event.target.value
    });
  }

  // handle multiple choice OPTION change
  handleChangeOptionContent(event){
    this.setState({
      optionContent: event.target.value
    });
  }

  // rerender options after save change
  saveOptionChanges(){
    const optionsList = this.state.optionContent.split(/\r?\n/);
    this.props.onUpdateMultipleChoiceOptions(this.props.id, optionsList);
    var newOptions = []
    for(var i=0; i<optionsList.length; i++){
      newOptions = newOptions.concat(<ListGroupItem key={this.keycount}>{optionsList[i]}</ListGroupItem>);
      this.keycount += 1;
    }
    this.setState({
      options: newOptions,
      showOptions: false
    });
  }

  render() {
    return(
      <div className="MultipleChoice">
        <h4>Multiple Choice Question</h4>
        <div className="MultipleChoiceQuestionInput">
          <Row className="MCQuestion">
            <Col xs={12} md={9}>
              <FormControl type="text" placeholder="Type in multiple-choice question." value={this.state.value} onChange={this.handleChange}/>
            </Col>
            <Col xs={6} md={3}>
              <ButtonGroup>
                <Button onClick={this.handleEditOptions}> Edit Options </Button>
                <Button onClick={this.props.delete}>Delete</Button>
              </ButtonGroup>
            </Col>
          </Row>
          <ListGroup>
            { this.state.options }
          </ListGroup>
          <Modal show={this.state.showOptions} onHide={this.handleCloseOptions}>
            <Modal.Header>
              <Modal.Title>Edit Multiple Choice Options</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Enter each option on a new line.</p>
              <FormControl
                componentClass="textarea"
                placeholder="type your options here"
                className="OptionsArea"
                value={this.state.optionContent}
                onChange={this.handleChangeOptionContent}/>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.saveOptionChanges}>Save Changes</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}
