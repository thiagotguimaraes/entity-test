import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import evolve from './evolve.js'

class App extends Component {

  constructor(props) {
    super(props);

    this.run = this.run.bind(this)
    this.render = this.render.bind(this)

    this.state = {
      running: null
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

  run() {
      // evolve.stats();
      this.setState({running: true})
      var result = evolve.run();  
      
      
      this.setState({running: false})
      console.log(result);
      
      window.result = result
  }

  render() {
    let {running} = this.state
    
    return (
      <div>
        <button onClick={this.run}>{running ? 'RUNNING...' : 'RUN'}</button>
        
      </div>
    );
  }
}

export default App;
