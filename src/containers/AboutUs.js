import React from "react";
import "./AboutUs.css";
import { Glyphicon } from "react-bootstrap";

export default () =>
  <div className="AboutUs">
    <h2>About Us.</h2>
    <h3>Meet the Thought Jar Team.</h3>
    <br />
    <br />
    <p>Dave Ho - CTO & Founder</p>
    <p>Someswar Amujala - Founder</p>
    <p>Tejas Rao - COO</p>
    <p>Gordon Su - Web-Designer</p>
    <br />
    <br />
    <h3>Contact Us.</h3>
    <Glyphicon glyph="map-marker" /> San Jose
    <br />
    <Glyphicon glyph="earphone" /> +1(XXX)XXX-XXXX
    <br />
    <Glyphicon glyph="envelope" /> daveho@thoughtjar.io
  </div>;
