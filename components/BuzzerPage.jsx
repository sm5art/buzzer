import React, { Component, PropTypes } from 'react';
import {WIN, LOSE, RESET} from '../constants/states'
import {browserHistory} from 'react-router';

import {lightBlue300, indigo900, orange300, red400, lightGreen300} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import Paper from 'material-ui/Paper'

class BuzzerPage extends Component {
  constructor(props, context){
    super(props, context);
    this.buzz = this.buzz.bind(this);
    this.reroute = this.reroute.bind(this);
  }

  reroute(){
    console.log(this.props.state)
    if(this.props.state.id == undefined){
        browserHistory.push('/')
    }

  }

  componentDidMount(){
    this.reroute()
  }

  buzz(){
    this.props.actions.send_buzzer(this.props.state.id);
  }

  render(){
    const colconfig = {};
    colconfig[RESET] = red400;
    colconfig[WIN] = lightGreen300;
    colconfig[LOSE] = orange300;
    let temp = undefined
    if(this.props.state.players != undefined){
      temp = this.props.state.players[this.props.state.id].score;
    }
    let func = this.props.state.buzzerState === RESET ? this.buzz : undefined;
    return (
      <div style={{height:"100%", display:"flex", flexFlow:"column"}}>
        <div style={{flex:"1", padding:"15% 25%"}}>
          <RaisedButton onTouchTap={func} className={"grow"} backgroundColor={colconfig[this.props.state.buzzerState]} style={{margin: "auto", display:"block", height:"100%", width:"100%"}}/>
        </div>
        <div>
          <div style={{width: "50%",verticalAlign:"top", display:"inline-block"}}>
            <Chip
            backgroundColor={lightBlue300}>
            {this.props.state.name}
            </Chip>
          </div>
          <div style={{width: "50%", display:"inline-block"}}>
            <Chip style={{float:"right"}}
            backgroundColor={lightBlue300}>
            {temp}
            </Chip>
          </div>
        </div>
      </div>
      );
    }
}

export default BuzzerPage;
