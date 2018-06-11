import React, { Component } from "react";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";
import "./MyJars.css";
import cookie from 'react-cookies';

export default class MyJars extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
    this.getJars = this.getJars.bind(this);
    this.routeLoginPage = this.routeLoginPage.bind(this);
  }

  getJars(url){
    var data = {
      "access-token": cookie.load('access-token')
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
        var surveyList = json["jars"];
        var updatedJarList = [];
        for(var i=0; i<surveyList.length; i++){
          const routePath = "/myjar?identifier="+surveyList[i]["identifier"];
          console.log(routePath);
          updatedJarList = updatedJarList.concat(<ListGroupItem href={routePath} identifier={surveyList[i]["identifier"]} key={updatedJarList.length} header={surveyList[i]["title"]}>{surveyList[i]["description"]}</ListGroupItem>);
        };
        console.log(updatedJarList);
        this.setState({
          jarList: updatedJarList
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
    if(cookie.load('access-token') !== undefined){
        this.getJars("http://localhost:5000/myJars");
    }
  }

  render() {

    if(cookie.load('access-token') === undefined){
      return(
        <div className="RedirectLoginPage">
          <h1>Please login before creating jars.</h1>
          <Button bsSize="large" onClick={this.routeLoginPage}>Go to Login Page.</Button>
        </div>
      );
    }
    if(!this.state.jarList) return <h4>Loading ...</h4>
    if(this.state.jarList.length === 0){
      return(
        <div className="MyJars">
          <h2>My Jar Dashboard</h2>
          <p>Looks like you haven't created any jars.</p>
        </div>
      );
    };
    return(
      <div className="MyJars">
        <h2>My Jar Dashboard</h2>
        <ListGroup>
          {this.state.jarList}
        </ListGroup>
      </div>
    );
  }
}
