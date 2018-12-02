import React , { Component } from 'react';
import './pic.css';
import { connect } from 'react-redux';

class PicUI extends Component {
	constructor(){
		super();
		this.state = {
			mid : ''
		};
		this.handleToLyric = this.handleToLyric.bind(this);
	}
	render(){
		return (
			<div className="pic">
				<div ref="picElem" className="picMove" onTouchStart={ this.handleToLyric }>
					<img src= { "https://api.hibai.cn/music/Music/Music?id=" + this.state.mid + "&type=pic" } alt="" />
				</div>
			</div>
		);
	}
	componentDidMount(){
		this.props.handleIsIconBack();
		this.setState({
			mid : this.props.match.params.mid
		});

		if(this.props.isMusicPlay){
			this.playPic();
		}
		else{
			this.pausePic();
		}
	}
	componentDidUpdate(){
		if(this.props.isMusicPlay){
			this.playPic();
		}
		else{
			this.pausePic();
		}
	}
	playPic(){
		this.refs.picElem.style.animationPlayState = 'running';
	}
	pausePic(){
		this.refs.picElem.style.animationPlayState = 'paused';
	}
	handleToLyric(){
		this.props.history.push('/lyric/' + this.state.mid);
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
		}
	};
}


var Pic = connect(mapStateToProps , mapDispatchToProps)(PicUI);

export default Pic;