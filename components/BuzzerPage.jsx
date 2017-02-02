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
    $("#buzzerButton").prop('disabled', true)
  }

  render(){
    const colconfig = {};
    colconfig[RESET] = red400;
    colconfig[WIN] = lightGreen300;
    colconfig[LOSE] = orange300;
    let temp = undefined;
    if(this.props.state.players != undefined && this.props.state.players[this.props.state.id] != undefined){
      temp = this.props.state.players[this.props.state.id].score;
    }
    if(this.props.state.buzzerState == RESET){
      $("#buzzerButton").prop('disabled', false)
    }
    let height = $(".flex").height()*0.9;
    let width = $(".flex").width()*0.9;
    return (<div style={{margin: "auto", height, width}}>
          <RaisedButton id="buzzerButton" label="" onTouchTap={this.buzz} className={"grow"} backgroundColor={colconfig[this.props.state.buzzerState]} style={{ height:"100%", width:"100%"}}/>

        <div style={{bottom:"0",left:"0", position:"fixed"}}>
          <Chip
          backgroundColor={lightBlue300}>
          {this.props.state.name}
          </Chip>
        </div>
        <div style={{bottom:"0",right:"0", position:"fixed"}}>
          <Chip style={{float:"right"}}
          backgroundColor={lightBlue300}>
          {temp}
          </Chip>
        </div>
      </div>
      );
    }
}

export default BuzzerPage;
