import React, { Component } from 'react';
import './header.css';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class HeaderUI extends Component {
  render() {
    return (
      <div id="musicHeader">
      { this.props.isIconBack && <NavLink to="/list">&lt;</NavLink> } {this.props.musicName}
	  </div>
    );
  }
}

function mapStateToProps(state){
	return {
		isIconBack : state.isIconBack,
    musicName : state.musicName
	};
}
function mapDispatchToProps(dispatch){
	return {};
}


var Header = connect(mapStateToProps , mapDispatchToProps)(HeaderUI);

export default Header;