import React, { PropTypes, Component } from 'react';
import IconButton from 'material-ui/IconButton';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import ReOrder from 'material-ui/svg-icons/action/reorder';
import ActionInput from 'material-ui/svg-icons/action/input';
import Chip from 'material-ui/Chip'

import Paper from 'material-ui/Paper';
import {Link} from 'react-router'
import * as Colors from 'material-ui/styles/colors'

class Header extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {open: false};
    this.handleToggle = this.handleToggle.bind(this)
  }

  componentDidMount(){
    const { state, actions } = this.props;
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    const {state, actions} = this.props;
    let players = []
    if(state.players != undefined){
      players = Object.keys(state.players).map(function(key) {
    return state.players[key];
});

    }

    return (
    <div style={{backgroundColor: Colors.lightBlue300}}>
      <div>
        <IconButton onTouchTap={this.handleToggle} tooltip="scores of others" touch={true} tooltipPosition="bottom-right">
        <ReOrder color={Colors.white}/>
        </IconButton>
        <Drawer open={this.state.open}>
          <div>
            <IconButton onTouchTap={this.handleToggle} tooltip="exit" touch={true} tooltipPosition="bottom-right">
            <ActionInput color={Colors.grey400}/>
            </IconButton>
          </div>
          {players.map((ele)=>{
            return (<MenuItem>
              <span style={{ color: Colors.grey800}}>{ele.name}</span>
              <span style={{paddingLeft:"50%", color: Colors.grey500}}>{ele.score}</span>
            </MenuItem>)
          })}
        </Drawer>
      </div>
      <div style={{backgroundColor: Colors.lightBlue300,paddingTop:"10%",paddingBottom:"10%"}}>
        <h1 style={{textAlign:"center", color: Colors.white}}>Science Bowl</h1>
      </div>
    </div>
    );
  }
}

Header.propTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default Header;
