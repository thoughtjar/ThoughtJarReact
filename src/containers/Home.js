import React, { Component } from "react";
import "./Home.css";
import { Carousel, Thumbnail, Grid, Row, Col, Button } from "react-bootstrap";
import carousel from './carousel.png'

export default class Home extends Component {

  constructor(props, context) {
    super(props, context);
    this.isMobile = this.isMobile.bind(this);
  }

  isMobile () {
    if( /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      return true;
    }
  }

  render() {
    if( this.isMobile()) {
      return(
        <div className="HomeMobile">
          <div className="landerMobile">
            <h1>Create Your Own Jar.</h1>
            <p>Choose your style.</p>
          </div>
          <Grid className="TemplateList">
            <Row>
              <Thumbnail src={carousel} alt="900x500">
                <Button block> Create Alligator Template </Button>
              </Thumbnail>
            </Row>
            <Row>
              <Thumbnail src={carousel} alt="900x500">
                <Button block> Create Baboon Template </Button>
              </Thumbnail>
            </Row>
            <Row>
              <Thumbnail src={carousel} alt="900x500">
                <Button block> Create Capybara Template </Button>
              </Thumbnail>
            </Row>
          </Grid>
        </div>
      );
    } else {
      return (
        <div className="Home">
          <div className="lander">
            <h1>Create Your Own Jar.</h1>
            <p>Choose your style.</p>
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
}
