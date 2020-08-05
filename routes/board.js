var express = require('express');
var router = express.Router();
var axios=require("axios");


/* 게시판 글쓰기 폼 요청 처리 */
router.get('/registForm', function(request, response, next) {
  response.render("board/registForm",{});
});

/* 게시판 등록 요청 처리*/
router.post('/regist', function(request, response, next) {
  console.log("글쓰기 요청");

  var title = request.body.title;
  var writer = request.body.writer;
  var content = request.body.content;

  console.log("title ",request.body.title );
  console.log("writer ",request.body.writer );
  console.log("content ",request.body.content);

  
  axios.post("http://localhost:7777/rest/board",{
    title:title,
    writer:writer, 
    content:content
  })
  .then(function(res){
    response.writeHead(200,{"Content-Type":"text/html"})
    response.end(res.data.toString());          
  })
  .catch(function(error){
    console.log(error);
  });
  //headers:{"Content-Type":"application/x-www-form-urlencoded"},


});


/* 게시판 목록 요청 처리 */
router.get('/list', function(request, response, next) {
  axios.get("http://localhost:7777/rest/board")
  .then(function(res){
    //console.log("목록 데이터 결과는 ", res.data);
    response.render("board/list", {
    records:JSON.stringify(res.data)
    });
  })
  .catch(function(error){
    console.log(error);
  })
});



/* 게시판 상세보기 요청 처리*/
router.get('/detail', function(request, response, next) {
  console.log("상세보기 요청");
  var board_id = request.query.board_id;
  
  //REST한 호출
  axios.get("http://localhost:7777/rest/board/"+board_id)
    .then(function(res){
      console.log(res.data);
      response.render("board/detail", {
        board:res.data
      });
    })
    .catch(function(error){
      console.log(error);
    });  
});

/* 게시판 수정 요청 처리*/
router.post('/edit', function(request, response, next) {
  console.log("수정 요청");
  console.log("board_id ",request.body.board_id );
  console.log("title ",request.body.title );
  console.log("writer ",request.body.writer );
  console.log("content ",request.body.content);

  axios({
    method:"put",
    url:"http://localhost:7777/rest/board/",    
    data:{
      board_id:request.body.board_id, 
      title:request.body.title,
      writer:request.body.writer, 
      content:request.body.content
    }
  })
  .then(function(res){
    response.writeHead(200,{"Content-Type":"text/html"})
    response.end(res.data.toString());          
  })
  .catch(function(error){
    console.log(error);
  });

});


/* 게시판 삭제 요청 처리*/
router.get('/delete', function(request, response, next) {
  console.log("삭제 요청");
  var board_id = request.query.board_id;  

  axios({
    method:"delete",
    url:"http://192.168.0.16:7777/rest/board/"+board_id
  })
  .then(function(res){
    console.log(res.data);
    response.writeHead(200,{"Content-Type":"text/html"})
    response.end(res.data.toString());          
  })
  .catch(function(error){
    console.log("에러: ",error);
  });  
});

module.exports = router;





