////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Make the mouse-tracking logic reusable by filling in the `withMouse`
//   higher-order component and returning a new component that renders the
//   given component with a `mouse` prop
//
// Got extra time?
//
// - Make a `withCat` HOC that shows a cat chasing the mouse around the screen!
////////////////////////////////////////////////////////////////////////////////
import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { render } from "less";

function withMouse(Component) {
  return class extends React.Component {
    state = { x: 0, y: 0 };

    handleMouseMove = event => {
      this.setState({ x: event.clientX, y: event.clientY });
    };

    render() {
      return (
        <div onMouseMove={this.handleMouseMove}>
          <Component mouse={this.state} {...this.props} />
        </div>
      );
    }

  }
}

class App extends React.Component {
  render() {
    const { x, y } = this.props.mouse;
    return (
      <div className="container">
        <h1>
          The mouse position is ({x}, {y})
        </h1>
      </div>
    );
  }
}

const AppWithMouse = withMouse(App);

ReactDOM.render(<AppWithMouse />, document.getElementById("app"));
