import React, { Component } from 'react';
import FamilyTree from './components/family-tree';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Family Tree App</h1>
        </header>
        <MuiThemeProvider>
          <FamilyTree />
        </MuiThemeProvider>


        </div>
    );
  }
}

export default App;
