window.onload=function  () {
	var closeList=document.getElementById('close_list');
	var openList=document.getElementById('open_list');
	var musicList=document.getElementById('music_list'),
	    lyrDisabled=document.getElementById('lyrics_disabled'),
	    lyrBg=document.getElementById('lyrics_bg'),
	    kge=document.getElementById('btn_kge'),
	    keyCode=document.getElementById('key_code'),
		btnplay=document.getElementById('btn_play'),
		volume=document.getElementById('volume'),
		volumeRe=document.getElementById('volume_regulate'),
        volumeBar=document.getElementById('volume_bar'),
	    volumeOp=document.getElementById('volume_op'),
	    playerBar=document.getElementById('player_bar'),
	    currentBar=document.getElementById('current_bar'),
	    progressOp=document.getElementById('progress_op'),
	    volumeIcon=document.getElementById('volume_icon'),
	    btnFold=document.getElementById('btn_fold'),
	    model=document.getElementById('model'),
	    musicOp=document.getElementById('music_op'),
	    kaiguan=true;
	
	btnFold.onclick=(function(){
		var kaiguan=true;
		return function(){
			if(kaiguan==true){
		    	musicList.style.display='none';
		    	myplayer.style.marginLeft='-542px';
		    	console.log(audio.onplay);
		    	if(btnplay.getAttribute('class')=='btn_pause'){
		    		this.style.backgroundPosition='-44px 0';
		    	}else{
		    		this.style.backgroundPosition='-22px 0';
		    	}
		    	kaiguan=false;
		    }else{
		    	musicList.style.display='block';
		    	myplayer.style.marginLeft='0';
		    	this.style.backgroundPosition='0 0';
		    	kaiguan=true;
		    }
		}
		
    })();
	// k歌------------------
	kge.onmouseover=function(){
		keyCode.style.display='block';
	};
	
	kge.onmouseout=function(){
		keyCode.style.display='none';
	};
	// 打开关闭列表----------------
	var kaiguan=true;
	document.onmousedown=function(e){
		e.preventDefault();
	};
	openList.onclick=function(){
		if(kaiguan){
			musicList.style.display='none';
			kaiguan=false;
		}else{
			musicList.style.display='block';
			kaiguan=true;
		}
	};
	closeList.onclick=function(){
		musicList.style.display='none';
		kaiguan=false;
	}

	// 打开关闭歌词---------------
	lyrDisabled.onclick=(function(){
		var i=0;
		return function(){
			if(i%2==0){
				lyrBg.style.display='block';
				this.style.backgroundPosition='-475px 0';
			}else{
				lyrBg.style.display='none';
				this.style.backgroundPosition='-452px 0';
			}
			i++;
		}
		
	})();
	var cpSelect=document.getElementById('cp_select');
	

	model.onclick=function(){
		cpSelect.style.display='block';
	};
// 切换播放模式
	cpSelect.onclick=function(e){
		var el=e.target;
		if(el.getAttribute('class')=='ordered_hover'){
			cpSelect.style.display='none';
			model.setAttribute('class','ordered_now model');
			
		}
		if(el.getAttribute('class')=='unordered_hover'){
			cpSelect.style.display='none';
			model.setAttribute('class','unordered_now model');
		
		}
		if(el.getAttribute('class')=='single_hover'){
			cpSelect.style.display='none';
			model.setAttribute('class','single_now model');
		}
		if(el.getAttribute('class')=='cycle_hover'){
			cpSelect.style.display='none';
			model.setAttribute('class','cycle_now model');
		}
		
	};
	cpSelect.onmouseout=function(e){
		var el=e.target;
		if(el.getAttribute('class')=='ordered_hover'){
			el.setAttribute('class','ordered_bt');;
			
		}
		if(el.getAttribute('class')=='unordered_hover'){
			el.setAttribute('class','unordered_bt');
		
		}
		if(el.getAttribute('class')=='single_hover'){
			el.setAttribute('class','single_bt');
		}
		if(el.getAttribute('class')=='cycle_hover'){
			el.setAttribute('class','cycle_bt');
		}
	};
	cpSelect.onmouseover=function(e){
		var el=e.target;
		if(el.getAttribute('class')=='ordered_bt'){
			el.setAttribute('class','ordered_hover');
			
		}
		if(el.getAttribute('class')=='unordered_bt'){
			el.setAttribute('class','unordered_hover');
		
		}
		if(el.getAttribute('class')=='single_bt'){
			el.setAttribute('class','single_hover');
		}
		if(el.getAttribute('class')=='cycle_bt'){
			el.setAttribute('class','cycle_hover');
		}
	};
	
	// -------------------------------------------

	// 播放歌曲
	var database=[],dblist=[],lists;
	btnplay.onclick=function(){
		if (this.getAttribute('class')=='btn_play') {
			if(database.length&&audio.currentTime==0){
				audio.play();
				onmusicchange(0);
				currentIndex=0;
				return;
			}else if(!database.length&&audio.currentTime==0){
				audio.pause();
				return;
			}
			audio.play();
		}else{
			audio.pause();
		}
	};
	audio.onplay=function(){
		musicOp.style.display='block';
		btnplay.setAttribute('title','暂停');
		btnplay.setAttribute('class','btn_pause');
	};
	audio.onpause=function () {
		btnplay.setAttribute('title','播放(P)');
		btnplay.setAttribute('class','btn_play');
	}
	
	audio.ontimeupdate=function(){
		var t=this.currentTime/this.duration;
		currentBar.style.width=(t*100)+'%';
		progressOp.style.left=(t*100)+'%';
		if (audio.ended) {
			if(model.getAttribute('class')=='cycle_now model'){
				currentIndex+=1;
				currentIndex=(currentIndex==database.length)?0:currentIndex;
			}
			if(model.getAttribute('class')=='ordered_now model'){
				currentIndex+=1;
				if(currentIndex==database.length){
					audio.pause();
				}
			}
			if(model.getAttribute('class')=='unordered_now model'){
				currentIndex=Math.floor(Math.random()*12);	
			}
			if(model.getAttribute('class')=='single_now model'){

			}
			console.log(currentIndex);
			onmusicchange(currentIndex);
		};
	};


	
	// 音量
	audio.onvolumechange=function(){
		volumeBar.style.width=(this.volume*100)+'%';
		volumeOp.style.left=(this.volume*100)+'%';
		if(this.volume==0){
			volumeIcon.setAttribute('class','volume_mute');
		}else{
			volumeIcon.setAttribute('class','volume_icon');
		}
	};
	volumeOp.onclick=function(e){
		e.stopPropagation();
	};
	volumeOp.onmousedown=function(e){
		document.onmousemove=function(e){
			volumeOp.style.backgroundPosition='-366px  -16px';
			volumeBar.style.backgroundPosition='-291px -22px';	
			if(e.clientX<volumeRe.getBoundingClientRect().left){
			    audio.volume=0;
			}else if(e.clientX>volumeRe.getBoundingClientRect().left+volumeRe.offsetWidth){
				audio.volume=1;
			}else{
				audio.volume=(e.clientX-volumeRe.getBoundingClientRect().left)/volumeRe.offsetWidth;
			}
		};
	};
	
	// ----静音
	volumeIcon.onclick=(function(){
		var pre;
		return function(){
			if(this.getAttribute('class').indexOf('icon')!=-1){
				this.setAttribute('class','volume_mute');
				pre=audio.volume;
				audio.volume=0;
			}else{
				this.setAttribute('class','volume_icon');
				audio.volume=pre;
				
			}
		};
	})();
	volumeRe.onclick=function(e){
		audio.volume=e.layerX/volumeRe.offsetWidth;
	}

	var timeshow=document.getElementById('timeshow');
	var nowtime=document.getElementById('time_show');
	
	// ---------进度条
	audio.onseeked=function(){
		currentBar.style.width=(this.currentTime/audio.duration*100)+'%';
		progressOp.style.left=(this.currentTime/audio.duration*100)+'%';
	};
	playerBar.onclick=function(e){
		audio.currentTime=e.layerX/playerBar.offsetWidth*audio.duration;
	}
	progressOp.onmousedown=function(){
		document.onmousemove=function(e){
			audio.currentTime=e.clientX/playerBar.offsetWidth*audio.duration;
		};
	};
	document.onmouseup=function(e){
		volumeOp.style.backgroundPosition='-366px  0';
		volumeBar.style.backgroundPosition='-291px 0';
		document.onmousemove=null;
	};
	playerBar.onmousemove=function(e){
		if(musicName.innerHTML!='听我想听的歌'){
			timeshow.style.display='block';
			timeshow.style.left=e.clientX-22+'px';
			var time=e.clientX/playerBar.offsetWidth*audio.duration;
			nowtime.innerHTML=jindu(time);
		}
	};
	playerBar.onmouseout=function(e){
			timeshow.style.display='none';
	};
	
	progressOp.onclick=function(e){
		e.stopPropagation();
	};
	
	var jindu=(function(){
		var min,sec;
		return function(time){
			min=Math.floor(time/60);
			sec=Math.floor(time%60);
			if(sec<10){
				sec='0'+sec;
			}
			if(min<10){
				min='0'+min;
			}
			return min+':'+sec;
		};
	})();
	
	// 歌曲库
	var playList=document.getElementById('play_list'),
		musicName=document.getElementById('music_name'),
	    singerName=document.getElementById('singer_name'),
	    playTime=document.getElementById('play_time'),
	    times=document.getElementsByClassName('play_time'),
	    albumPic=document.getElementById('album_pic'),
		listNum=document.getElementById('list_num'),
		liebiao=document.getElementById('liebiao');
	var	li,preSong=null,currentIndex;
	
	
	 
	var ajax=function(o){
		var req=new XMLHttpRequest();
		req.open('get',o.url);
		req.send();
		req.onreadystatechange=function(){
			if(this.readyState==this.DONE&&this.status==200){
				o.onsuccess(this.response);
			}
		};

	};
	ajax({
		url:'http://localhost:3000/song',
		onsuccess:function(data){
			data=JSON.parse(data);
			var j=k=0;
			for(var i=0;i<data.length;i++){
				var list=document.createElement('div');
				var add=document.createElement('div');
				add.setAttribute('class','add');
				list.setAttribute('class','addsong');
				list.innerHTML=data[i];
				liebiao.appendChild(list);
				list.appendChild(add);
				dblist.push(data[i]);	
			}
			var dblists=document.getElementsByClassName('addsong');
			var bofang=document.getElementById('bofang');
			var tianjia=document.getElementById('tianjia');
			var btnDel,k=0;
			// tianjia.onclick=function(){
			// 	for(var i=0;i<dblists.length;i++){
			// 	var xx=dblist[i].lastIndexOf('.'),
			// 		yy=dblist[i].indexOf('-'),
			// 		li=document.createElement('li');
			// 		li.setAttribute('class','song');
			// 		li.setAttribute('index',j++);
			// 		li.innerHTML='<div class="music_name">'+dblist[i].slice(yy+1,xx)+'</div><div class="singer_name">'+dblist[i].slice(0,yy)+'</div> <div class="list_more"> <div class="btn_like" ></div> <div class="btn_share"></div> <div class="btn_fav"></div> <div class="btn_del"></div> </div> ';
			// 		database.push(dblist[i]);
			// 		playList.appendChild(li);
			// 		lists=document.getElementsByClassName('song');
			// 		listNum.innerHTML=lists.length;
			// 	}
			// };
			// bofang.onclick=function(){
			// 	tianjia.onclick();

			// 	onmusicchange(0);
			// };
			var add=document.getElementsByClassName('add');
			for(var i=0;i<add.length;i++){
				add[i].index=i;
				dblists[i].onmouseover=function(){
					this.style.background='#000000';
					this.style.color='white';
				}
				dblists[i].onmouseout=function(){
					this.style.background='none';
					this.style.color='#595959';
				}
				add[i].onclick=function(){
				var xx=dblist[this.index].lastIndexOf('.'),
					yy=dblist[this.index].indexOf('-'),
					li=document.createElement('li');
					li.setAttribute('class','song');
					li.setAttribute('index',j++);
					li.innerHTML='<div class="music_name">'+dblist[this.index].slice(yy+1,xx)+'</div><div class="singer_name">'+dblist[this.index].slice(0,yy)+'</div> <div class="list_more"> <div class="btn_like" ></div> <div class="btn_share"></div> <div class="btn_fav"></div> <div class="btn_del"></div> </div> ';
					database.push(dblist[this.index]);
					playList.appendChild(li);
					lists=document.getElementsByClassName('song');
					listNum.innerHTML=lists.length;
					for(var i=0;i<lists.length;i++){
						lists[i].index=i;
						// document.onclick=function(e){
						// 	if(e.target.className=='music_name'||e.target.className=='singer_name'){
						// 		index=Number(lists[i].getAttribute('index'));
						// 		// console.log(e.target.getAttribute('index'),1);
						// 		currentIndex=index;
						// 		onmusicchange(index);
						// 	}
						// };
					
						lists[i].onclick=function(){
							// index=Number(this.getAttribute('index'));
							// currentIndex=index;
							// onmusicchange(index);
						};
						lists[i].onmouseover=function(){
							this.setAttribute('id','play_hover');
							this.firstElementChild.setAttribute('id','play_hover');
							this.style.background='#000';
							// times[this.index].style.display='none';
							this.lastElementChild.style.display='block';
						};
						lists[i].onmouseout=function(){
							this.removeAttribute('id','play_hover ');
							this.firstElementChild.removeAttribute('id','play_hover');
							this.style.background='#1B1B1B';
							// times[this.index].style.display='block';
							this.lastElementChild.style.display='none';
						};

					}
					
					
					// 删除列表项
					var btnDel=document.getElementsByClassName('btn_del');
					for(var i=0;i<lists.length;i++){
						btnDel[i].index=i;

						btnDel[i].onclick=function(){
							
							if(this.index==database.length-1){
								playList.removeChild(lists[this.index]);
								database.pop();
								index=Number(lists[database.length-1].getAttribute('index'));
								console.log(this.index);
							}else{
								delete database[this.index];
								playList.removeChild(lists[this.index]);
								for(var i=0;i<lists.length;i++){	
									lists[i].setAttribute('index',i);	
								}
								for(var i=this.index;i<database.length;i++){
									database[i]=database[i+1];
								}

								database.pop();
								// index=Number(lists[this.index].getAttribute('index'));
								// console.log(database,2);
								// onmusicchange(index);
							}	
							listNum.innerHTML=lists.length;
						};

					}
				}

			}
		}
	});
		// 清空列表
	// 		removeClass = function(el,s){
	// 	var tmp = el.getAttribute('class').split(' ');
	// 	var dict = {};
	// 	for(i=0;i<tmp.length;i++){
	// 		dict[tmp[i]] = true;
	// 	}
	// 	delete dict[s];
	// 	var ns = '';
	// 	for(var name in dict){
	// 		ns += ' ' +  name;
	// 	}
	// 	el.setAttribute('class',ns);
	// }
		var clearList=document.getElementById('clear_list');
		clearList.onclick=function(){
			for(var i=0;i<lists.length;){
				playList.removeChild(lists[0]);
				database=[];
				audio.src='';
				musicName.innerHTML='听我想听的歌';
				singerName.innerHTML='QQ音乐';
				audio.onseeked();

			}
             listNum.innerHTML= '';
		}
		// 切歌
		var onmusicchange=function(index){
			console.log(index);
			if(audio.src==''){return;}
			audio.src='./musics/'+database[index];
			audio.play();
			if(preSong){
				preSong.setAttribute('class','song');
				preSong.firstElementChild.setAttribute('class','music_name');
			}
			lists[index].setAttribute('class','song current_play');
			lists[index].firstElementChild.setAttribute('class','music_name current_play');
			preSong=lists[index];
			// albumPic.style.backgroundImage='url('+database[index].pic+')';
			var xx=database[index].lastIndexOf('.'),
				yy=database[index].indexOf('-');

			musicName.innerHTML=database[index].slice(yy+1,xx);
			singerName.innerHTML=database[index].slice(0,yy);
			// playTime.innerHTML=database[index].duration;
			
		};
		
		var btnPre=document.getElementById('btn_pre');
		var btnNext=document.getElementById('btn_next');
		
		btnPre.onclick=function(index){
			
			currentIndex-=1;
			onmodelchange();
			currentIndex=(currentIndex==-1)?database.length-1:currentIndex;
			onmusicchange(currentIndex);
		};
		btnNext.onclick=function(index){
			currentIndex+=1;
			onmodelchange();
			currentIndex=(currentIndex==database.length)?0:currentIndex;
			onmusicchange(currentIndex);
		};
		var onmodelchange=function(){
			if(model.getAttribute('class').indexOf('ordered_now')!=-1&&currentIndex==database.length){
				audio.onpause();
				return;
			}else if(model.getAttribute('class').indexOf('unordered_now')!=-1){
				currentIndex=Math.floor(Math.random()*12);
				onmusicchange(currentIndex);
				return;
			}
		}
		document.onkeydown=function(e){
			if(e.keyCode==32){
				btnplay.onclick();
			}
			if(e.keyCode==37){
				btnPre.onclick();
			}
			if(e.keyCode==39){
				btnNext.onclick();
			}
		}

	
	
	



// ---------------------------------------------------------------------
	// console.log(audio.src);//src是歌曲的路径，src可读可设置
	// audio.src='./musics/G.E.M.邓紫棋-泡沫.mp3';
	// audio.play;
	// console.log(audio.duration);// duration是以秒为单位的歌曲长度，

	// console.log(audio.currentTime);//以秒为单位的歌曲当前已播放的长度
	// audio.currentTime=45;

	// console.log(audio.volume);//音量
	// audio.volume=0;

	// src duration currentTime  volume
	// paused(暂停 返回true、false) ended(结束 返回true、false)

	// play()   pause()
	// 播放过程中
	// audio.ontimeupdate=function(){
	// 	console.log(audio.currentTime);
	// 	var kaiguan=true;
	// 	if(audio.ended){
	// 		alert(1);
	// 	}
	// 	if(audio.currentTime>5&&kaiguan){
	// 		audio.pause();
	// 		kaiguan=false;
	// 		setTimeout(function(){
	// 			audio.play();
	// 		},2000);
			
	// 	}	
	// };
	// audio.onplay=function(){
		
	// };
	//播放的时候

	// audio.onpause=function(){
	
	// };
	//暂停的时候












	
};