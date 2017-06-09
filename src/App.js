import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import evolve from './evolve.js'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
    }
  }

  printOutputs(result) {
    return result.outputs.map(x=>{
      return (<p>
        <span>{x.input}</span>
        <span>{x.target}</span>
        <span>{x.output}</span>
      </p>);
    })
  }

  render() {
    // evolve.stats();
    var result = evolve.run();
    console.log(result);
    
    return (
      <div>
        {this.printOutputs(result)}
      </div>
    );
  }
}

export default App;
