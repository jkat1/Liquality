import React from "react";
import { render } from "react-dom";
import dotenv from 'dotenv'
import App from "./App"
dotenv.config()
import "./index.scss"

class AppWrapper extends React.Component {
  render() {
    return (
      <div>Hi
        {this.props.children}
      </div>
    );
  }
}


render(
  <App />, document.getElementById("app"));
