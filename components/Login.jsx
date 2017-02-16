import React, { Component, PropTypes } from 'react';


import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory} from 'react-router'
import TextField from 'material-ui/TextField'
import {lightBlue300} from 'material-ui/styles/colors'

class Login extends Component {
  constructor(props, context){
    super(props, context)
    this.authenticate = this.authenticate.bind(this)
    this.getCookie = this.getCookie.bind(this)
    this.disabled = false
  }

  componentDidMount(){
    if(this.getCookie('auth')!= ""){
      const auth = JSON.parse(this.getCookie('auth'));
      socket.emit('auth',{id: auth.id})
      this.props.actions.auth(auth);
    }
  }

  componentDidUpdate(){
    console.log(this.props.state)
    if(this.props.state.id != undefined && this.props.state.players != undefined){
        browserHistory.push('/play');
    }
  }
  getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

  authenticate(){
    this.props.actions.dispatch_auth($("#playername").val())
    console.log('pressed')
    this.disabled = true
  }

  render(){

    return (
        <div style={{margin:"auto", padding:"15% 20%"}}>
          <TextField style={{width: "100%"}} id="playername" hintText="nickname/memename" floatingLabelText="Nickname" errorText="This field is required"/>
          <br/>
          <br/>
          <RaisedButton disabled={this.disabled} label="" onTouchTap = {this.authenticate} style={{width:'100%'}} labelColor={"#55BB72"} backgroundColor={lightBlue300}/>
        </div>
      );
    }
}

export default Login;
