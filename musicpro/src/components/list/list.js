import React, { Component } from 'react';
import './list.css';
import { connect } from 'react-redux';
import axios from 'axios';
import Loading from '../loading/loading.js';
import { setSessionStorage , getSessionStorage } from '../../tools/index.js';

// https://api.hibai.cn/api/demo/index : 音乐的数据

class ListUI extends Component {
  constructor(){
  	super();
  	this.state = {
  		songs : [],
  		isLoading : false
  	};
  	this.isMove = false;
  	this.handleTouchMove = this.handleTouchMove.bind(this);
  	this.handleTouchEnd = this.handleTouchEnd.bind(this);
  }		
  render() {
    return (
      	<div id="musicList">
			{
				this.state.isLoading ? <ul>
					{
						this.state.songs.map((item,index)=>{
							return (
								<li className={ this.props.musicId === item.id ? 'active' : '' } key={ item.id } onTouchMove={this.handleTouchMove} onTouchEnd={()=>this.handleTouchEnd(item.id , item.title)}>
									<div className="listOrder">{ index + 1 }</div>
									<div className="listName">
										<h3>{ item.title }</h3>
										<p>{ item.author }</p>
									</div>
								</li>
							);
						})
					}
				</ul> : <Loading />
			}
		</div>
    );
  }
  componentDidMount(){
  	this.props.handleIsIconBack();
	
	var data = getSessionStorage('songList');

	if(data){
		this.setState({
			songs : JSON.parse(data),
			isLoading : true
		});
	}
	else{
		axios.post('/api/index/index',{
			"TransCode":"020111",
			"OpenId":"Test",
			"Body":{"SongListId":"141998290"}
		}).then((res)=>{
			//console.log(res);
			var ErrCode = res.data.ErrCode;
			if( ErrCode === 'OK' ){
				this.setState({
					songs : res.data.Body.songs,
					isLoading : true
				});
				setSessionStorage('songList' , JSON.stringify(res.data.Body.songs));
			}
		});
	}

  }
  handleTouchMove(){
	this.isMove = true;
  }
  handleTouchEnd(id , musicName){
	if(this.isMove){  //滑动
		this.isMove = false;
	}
	else{   //点击
		//console.log(123);
		this.props.handleMusicId(id);
		this.props.handleIsMusicPlay();
		this.props.handleMusicName(musicName);
		//this.props.history.push('/lyric/'+id);
		this.props.history.push('/pic/' + id);
	}
  }
}

function mapStateToProps(state){
	return {
		musicId : state.musicId
	};
}
function mapDispatchToProps(dispatch){
	return {
		handleIsIconBack(){
			dispatch({ type : 'IS_ICON_BACK' , payload : false });
		},
		handleMusicId(id){
			dispatch({ type : 'MUSIC_ID' , payload : id });
		},
		handleIsMusicPlay(){
			dispatch({ type : 'IS_MUSIC_PLAY' , payload : true });	
		},
		handleMusicName(musicName){
			dispatch({ type : 'MUSIC_NAME' , payload : musicName });	
		}
	};
}


var List = connect(mapStateToProps , mapDispatchToProps)(ListUI);

export default List;