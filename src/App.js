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
              >Profile
            </Link>
            <Link
              to="/"
              className="u-pull-right button"
              >Logout
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
