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
    this.leave = this.leave.bind(this)
  }

  reroute(){
    console.log(this.props.state)
    if(this.props.state.id == undefined){
        browserHistory.push('/')
    }

  }

  componentDidMount(){
    socket.on('kick', (data)=>{
      window.location = '/logout'
    })
    this.reroute()
  }

  buzz(){
    if(this.disabled == false){
      this.props.actions.send_buzzer(this.props.state.id);
    }
    this.disabled = true;
  }

  leave(){
    window.location = '/logout'
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
      this.disabled = false;
    }
    let place = 0
    if(this.props.state.buzzers != undefined){
      place = this.props.state.buzzers.indexOf(parseInt(this.props.state.id));
      if(place > 0){
        place = 2
        this.disabled = true
      }
      else if (place == 0) {
        place = 1
        this.disabled = true
      }
      else if(place == -1){
        place = 0
      }
    }

    let height = $(".flex").height()*0.9;
    let width = $(".flex").width()*0.9;
    return (<div style={{margin: "auto", height, width}}>
          <RaisedButton disabled={this.disabled} label="" onTouchTap={this.buzz} className={"grow"} disabledBackgroundColor={colconfig[place]} backgroundColor={colconfig[place]} style={{ height:"100%", width:"100%"}}/>

        <div style={{bottom:"0",left:"0", position:"fixed"}}>
          <Chip
          backgroundColor={lightBlue300}>
          {this.props.state.name}
          </Chip>
        </div>
        <div style={{bottom:"0",right:"0", position:"fixed"}}>
          <RaisedButton label="Leave" onTouchTap={this.leave} primary={true}/>
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
