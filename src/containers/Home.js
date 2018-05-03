import React, { Component } from "react";
import "./Home.css";
import { Carousel } from "react-bootstrap";
import carousel from './carousel.png'

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Create Your Own Survey.</h1>
          <p>Choose your cup of tea.</p>
        </div>
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
