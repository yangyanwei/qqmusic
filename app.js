var express=require('express');
var app=express();
var http=require('http').Server(app);

var database={};
var fs=require('fs');
fs.readdir('./public/musics',function(err,files){
	musiclist=files;
})

app.use(express.static('public'));
app.get('/',function(req,res){
	res.sendFile(__dirname+'/index.html');
});
app.get('/song',function(req,res){
	console.log(musiclist);
	res.json(musiclist);
	
	
});
http.listen(3000,function(){
	console.log('listening on *:3000');
});
// req.json()是用来发送这种形式 ->{}   []  [{}]  {[]}
// req.send() -> 14 '字符串'
// req.sendfile() ->让用户打开 文件
