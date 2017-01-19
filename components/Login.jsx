import React, { Component, PropTypes } from 'react';


import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory} from 'react-router'
import TextField from 'material-ui/TextField'
import {lightBlue300} from 'material-ui/styles/colors'

class Login extends Component {
  constructor(props, context){
    super(props, context)
    this.authenticate = this.authenticate.bind(this)
  }

  componentDidUpdate(){
    console.log(this.props.state)
    if(this.props.state.id != undefined && this.props.state.players[this.props.state.id] != undefined){
        browserHistory.push('/play');
    }
  }

  authenticate(){
    this.props.actions.dispatch_auth($("#playername").val())
    console.log('pressed')
    this.authenticate = undefined
  }

  render(){

    return (
        <div style={{margin:"auto", padding:"15% 20%"}}>
          <TextField style={{width: "100%"}} id="playername" hintText="nickname/memename" floatingLabelText="Nickname" errorText="This field is required"/>
          <br/>
          <br/>
          <RaisedButton onTouchTap = {this.authenticate} style={{width:'100%'}} labelColor={"#55BB72"} backgroundColor={lightBlue300}/>
        </div>
      );
    }
}

export default Login;
