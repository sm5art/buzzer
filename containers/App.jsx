import React, { Component, PropTypes } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import * as MainActions from '../actions/MainActions';
import { Link } from 'react-router';

// For Customization Options, edit  or use
// './src/material_ui_raw_theme_file.jsx' as a template.
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import * as Colors from 'material-ui/styles/colors'
import theme from '../src/material_ui_raw_theme_file'
import Paper from 'material-ui/Paper'

class App extends Component {
  constructor(props, context){
    super(props, context)
  }

  render() {

    const { state, actions } = this.props;
    const renderedChildren = React.Children.map(this.props.children, function (child) {
      return React.cloneElement(child, {state, actions});
    });
    return (
      <div style={{height:"100%"}}>
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
          <div className="flexbox" style={{height:"100%"}}>
            <Header state={state} actions={actions}/>
            <div className="flex" style={{ backgroundColor: Colors.grey200,paddingTop:"5%",paddingBottom:"5%"}}>
                {renderedChildren}
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

App.propTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    state: state.MainReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(MainActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
