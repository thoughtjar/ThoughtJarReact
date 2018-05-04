import React, { Component } from "react";
import "./Home.css";
import { Carousel } from "react-bootstrap";
import carousel from './carousel.png'

export default class Home extends Component {

  constructor(props, context) {
    super(props, context);
    this.activateLasers = this.activateLasers.bind(this);
  }

  activateLasers() {
    this.props.history.push('/login')
  }

  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Create Your Own Jar.</h1>
          <p>Choose your style.</p>
        </div>
        <button onClick={this.activateLasers}>
          Activate Lasers
        </button>
        <Carousel className="Templates">
          <Carousel.Item>
            <img width={900} height={500} alt="900x500" src={carousel} />
            <Carousel.Caption>
              <h3>Alligator</h3>
              <p>This is the alligator template.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img width={900} height={500} alt="900x500" src={carousel} />
            <Carousel.Caption>
              <h3>Baboon</h3>
              <p>This is the baboon template.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img width={900} height={500} alt="900x500" src={carousel} />
            <Carousel.Caption>
              <h3>Capybara</h3>
              <p>This is the capybara template.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}
