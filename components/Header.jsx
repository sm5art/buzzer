import React, { PropTypes, Component } from 'react';

import Paper from 'material-ui/Paper';
import {Link} from 'react-router'
import * as Colors from 'material-ui/styles/colors'

class Header extends Component {
  constructor(props, context){
    super(props, context);
  }

  componentDidMount(){
    const { state, actions } = this.props;
  }

  render() {
    return (
      <div style={{backgroundColor: Colors.lightBlue300,paddingTop:"10%",paddingBottom:"10%"}}>
        <h1 style={{textAlign:"center", color: Colors.white}}>Science Bowl</h1>
      </div>
    );
  }
}

Header.propTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default Header;
