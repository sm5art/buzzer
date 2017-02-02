import React, { Component, PropTypes } from 'react';
import {SENT, RESET} from '../constants/states'
import {browserHistory} from 'react-router';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import TextField from 'material-ui/TextField'

import Chip from 'material-ui/Chip'
import {blue300, indigo900, orange300, red200, lightGreen300} from 'material-ui/styles/colors';

class NamePlate extends Component {
  constructor(props, context){
    super(props, context);
    this.addPoints = this.addPoints.bind(this)
    this.add4Points = this.add4Points.bind(this)
    this.kick = this.kick.bind(this)
    this.addNPoints = this.addNPoints.bind(this)
    this.add10Points = this.add10Points.bind(this)
    this.updateValue = this.updateValue.bind(this)
  }

  addPoints(amount){
    const { id, name, score, actions } = this.props;
    actions.update_score(id, amount)
  }

  add4Points(){
    this.addPoints(4)
  }

  add10Points(){
    this.addPoints(10)
  }

  kick(){
    this.props.actions.kick(this.props.id)
  }

  addNPoints(){
    let value = this.textValue
    if(value == "" || value == undefined){
      value = 0;
    }
    console.log( parseInt(value))
    this.addPoints(value)
  }

  updateValue(object, string){
    this.textValue = string;
  }

  render(){
    const { id, name, score, state, actions } = this.props;
    const colconfig = {};
    colconfig[-1] = red200;
    colconfig[0] = lightGreen300;
    colconfig[2] = orange300;
    let place = state.buzzers.indexOf(parseInt(id));
    if(place > 0){
      place = 2
    }
    return (
      <Paper className="grow" style={{backgroundColor: colconfig[place],display:"inline-block", height:"100px", width: "370px"}}>
        <FlatButton onTouchTap={this.add4Points} label="+4" primary={true} />
        <FlatButton onTouchTap={this.add10Points} label="+10" secondary={true} />
        <TextField
          onChange = {this.updateValue}
          style={{marginRight: "4px", width:"35px"}}
          id="amount"
        />
      <RaisedButton label="+" onTouchTap={this.addNPoints} secondary={true}/>
        <IconMenu style={{float: "right", verticalAlign:"top", display:"inline-block"}}
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
          >
            <MenuItem onTouchTap={this.kick} primaryText="Kick" />
          </IconMenu>
        <div style={{padding: "5px"}}>
          <div style={{width: "50%",verticalAlign:"top", display:"inline-block"}}>
            <Chip
            backgroundColor={blue300}>
            {name}
            </Chip>
          </div>
          <div style={{width: "50%", display:"inline-block"}}>
            <Chip className="grow" style={{float:"right"}}
            backgroundColor={blue300}>
            {score}
            </Chip>
          </div>
        </div>
      </Paper>
    );
  }
}

class AdminPage extends Component {
  constructor(props, context){
    super(props, context);
    this.reset = this.reset.bind(this);
  }

  componentDidMount(){
    socket.emit('init')
  }

  reset(){
    this.props.actions.reset();
  }

  render(){
    const {state, actions} = this.props;
    if(state.players != undefined){
      const ids = Object.keys(state.players)
      return (
        <div>
          <div>
            <RaisedButton onTouchTap={this.reset} label="Reset" primary={true}/>
          </div>
          {ids.map((id)=>{
            return <NamePlate id={id} name={state.players[id].name} score={state.players[id].score} state={state} actions={actions}/>
          })}
        </div>
        );
      }
      else {
        return (
          <div>
          </div>
        );
      }
    }
}

export default AdminPage;
