import React, { Component } from 'react';
import './lyric.css';
import { connect } from 'react-redux';
import axios from 'axios';

class LyricUI extends Component {
  constructor(){
  	super();
  	this.state = {
  		lyricList : [],
  		isActive : -1
  	};
  	this.handleToPic = this.handleToPic.bind(this);
  }	
  render() {
    return (
      	<div id="musicLyric">
			<ul ref="lyricUl" onTouchStart={ this.handleToPic }>
				{
					this.state.lyricList.map((item,index)=>{
						return <li key={index} className={ this.state.isActive === index ? 'active' : '' }>{ item.lyric }</li>;
					})
				}
			</ul>
		</div>
    );
  }
  componentDidMount(){
	this.props.handleIsIconBack();
	var mid = this.props.match.params.mid;

	
	this.props.handleMusicId(mid);
	this.props.handleIsMusicPlay();
	

	axios.get('/music/Music/Music?id='+mid+'&type=lrc').then((res)=>{
		//console.log(res);
		this.setState({
			lyricList : this.formatLyric(res.data)
		});
		
		if( this.props.isMusicPlay ){
			this.playLyric();
		}
		else{
			this.pauseLyric();
		}
	});
  }
  componentWillUnmount(){
	this.pauseLyric();
  }
  formatLyric(data){
	var result = [];
	var re = /\[([^\]]+)\]([^[]+)/g;
	
	data.replace(re,($0,$1,$2)=>{
		result.push( { time : this.formatTimeToSec($1) , lyric : $2 } );
	})

	//console.log(result);

	return result;	
  }
  formatTimeToSec(time){
		var timeArr = time.split(':');
		return (parseFloat(timeArr[0] * 60) + parseFloat(timeArr[1])).toFixed(2);
  }
  playLyric(){
  	this.lyricRunning();
	this.timer = setInterval( this.lyricRunning.bind(this) , 500 );
  }
  pauseLyric(){
	clearInterval(this.timer);
  }
  lyricRunning(){
	  	var lyricList = this.state.lyricList;
	  	var lyricUl = this.refs.lyricUl;
	  	var lyricUlLi = lyricUl.children[0];
	  	var audioElem = document.getElementById('audioElem');
	  	
	  	for(var i=0;i<lyricList.length;i++){
			if( audioElem.currentTime > lyricList[i].time && audioElem.currentTime < lyricList[i+1].time ){
				
				this.setState({
					isActive : i
				});

				if( i > 5 ){
					lyricUl.style.top = - (i - 5) * (lyricUlLi.offsetHeight + 15) + 'px'
				}

			}
	  	}
  }
  handleToPic(){
  	this.props.history.push('/pic/'+this.props.match.params.mid);
  }
}

function mapStateToProps(state){
	return {
		isMusicPlay : state.isMusicPlay
	};
}
function mapDispatchToProps(dispatch){
	return {
		handleIsIconBack(){
			dispatch({ type : 'IS_ICON_BACK' , payload : true });
		},
		handleMusicId(id){
			dispatch({ type : 'MUSIC_ID' , payload : id });
		},
		handleIsMusicPlay(){
			dispatch({ type : 'IS_MUSIC_PLAY' , payload : true });	
		}
	};
}


var Lyric = connect(mapStateToProps , mapDispatchToProps)(LyricUI);

export default Lyric;