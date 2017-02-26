import React, { Component } from 'react';
import { Link } from 'react-router';

class App extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <nav>
            <Link
              to="/users/1"
              className="u-pull-right button"
              >Log In
            </Link>
            <Link
              to="/signup"
              className="u-pull-right button"
              >Sign Up
            </Link>
          </nav>
        </div>
        <hr />
        <div className="row">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
