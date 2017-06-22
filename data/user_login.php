<?php
header('Content-Type: application/json;charset=UTF-8');

@$n = $_REQUEST['uname'] or die('{"code":3, "msg":"uname required"}');
@$p = $_REQUEST['upwd'] or die('{"code":4, "msg":"upwd required"}');

$conn = mysqli_connect('127.0.0.1', 'root', '', 'mymovie', 3306);

$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql = "SELECT * FROM movie_user WHERE uname='$n' AND upwd='$p'";
$result = mysqli_query($conn,$sql);

$row = mysqli_fetch_assoc($result);
if($row===null){		
  $output=['code'=>2,'msg'=>'用户名或密码错误'];
}else {  
  $output = ['code'=>1,'uname'=>$n];
}
echo json_encode( $output );