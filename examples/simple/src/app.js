import React, {Component} from 'react';
import {WurdText, WurdImage, WurdList, WurdMarkdown} from '../../../dist/wurd';

import Nav from './nav';


class App extends Component {

  render() {
    return (
      <div>
        <Nav />
        
        <WurdImage id="home.heroImage" width="100%" />

        <h2><WurdText id="home.welcome.title" /></h2>

        <WurdText 
          id="home.welcome.intro" 
          type="div"
          className="alert alert-info" 
          vars={{name: 'John'}}
        />

        <WurdMarkdown id="home.welcome.markdown" />

        <hr />

        <h2><WurdText id="home.team.title" /></h2>

        <WurdList id="home.team.members">
          <WurdImage id=".image" width="75" />
          <WurdText id=".name" />
        </WurdList>
      </div>
    );
  }

};


export default App;
