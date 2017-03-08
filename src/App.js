import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentInfo: []
    }

    this.facts = [
      ['gabriel', 'endereço', 'av rio branco, 109', true],
      ['joão', 'endereço', 'rua alice, 10', true],
      ['joão', 'endereço', 'rua bob, 88', true],
      ['joão', 'telefone', '234-5678', true],
      ['joão', 'telefone', '91234-5555', true],
      ['joão', 'telefone', '234-5678', false],
      ['gabriel', 'telefone', '98888-1111', true],
      ['gabriel', 'telefone', '56789-1010', true],
    ]

    this.schema = [
      ['endereço', 'cardinality', 'one'],
      ['telefone', 'cardinality', 'many']
    ];

  }

  componentDidMount() {
    this.setCurrentInfo(this.facts, this.schema);
    this.setState({ currentInfo: this.state.currentInfo })
    console.log(this.state.currentInfo);
  }

  lookForName(name) {
    let idArray = [];
    for (let j = 0; j < this.state.currentInfo.length; j++) {
      if (this.state.currentInfo[j][0].indexOf(name) != -1) {
        idArray.push(j);
      }
    }
    return idArray;
  }

  lookForCardinality(schema, type) {
    for (let i = 0; i < schema.length; i++) {
      if (schema[i][0] == type) {
        return schema[i][2];
      }
    }
  }

  lookForType(idArray, type) {
    for (let i = 0; i < idArray.length; i++) {
      let id = idArray[i];
      if (this.state.currentInfo[id][1] == type) {
        return id;
      }
    }
  }

  checkReplacement(idArray, info) {
    for (let i = 0; i < idArray.length; i++) {
      let id = idArray[i];
      if (this.state.currentInfo[id][2] == info) {
        return id;
      }
    }
  }

  pushToCurrentInfo(line) {
    this.state.currentInfo.push(line);
  }

  setCurrentInfo(facts, schema) {
    for (let i = 0; i < facts.length; i++) {

      let line = facts[i];
      let name = facts[i][0];
      let type = facts[i][1];
      let info = facts[i][2];
      let added = facts[i][3];

      let idArray = this.lookForName(name);
      if (idArray.length > 0) {
        let remove_id = this.checkReplacement(idArray, info);
        if (remove_id && !added) {
          this.state.currentInfo.splice(remove_id, 1);
        } else {
          let cardinal = this.lookForCardinality(schema, type);
          if (cardinal == "one") {
            let type_id = this.lookForType(idArray, type);
            this.state.currentInfo.splice(type_id, 1, line);
          } else {
            this.pushToCurrentInfo(line);
          }
        }
      } else {
        added ? this.pushToCurrentInfo(line) : null;
      }
    }
  }

  render() {
    return (
      <div>
        <div>CURRENT INFO</div>
        {this.state.currentInfo.map((item, index) => {
          index++;
          return <div key={index} className="line type center">{item + ',  '}</div>
        })}
        <br />
        <div>FACTS</div>
        {this.facts.map((item, index) => {
          index++;
          return <div key={index} className="line type center">{item + ',  '}</div>
        })}
        <br />
        <div>SCHEMA</div>
        {this.schema.map((item, index) => {
          index++;
          return <div key={index} className="line type center">{item + ',  '}</div>
        })}
        <br />
      </div>
    );
  }
}

export default App;
