//-------- App view main handler --------//
import React, { Component } from 'react';
import AddPort from './add_port';
import PortfolioList from './portfolio';

export default class App extends Component {

  render() {
    return (
        <div>
      <AddPort />
            <PortfolioList/>
        </div>
    );
  }
}
