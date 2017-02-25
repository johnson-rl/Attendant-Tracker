import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>Hi I'm Shiv!!!</h1>
        {this.props.children}
      </div>
    );
  }
}

export default App;
