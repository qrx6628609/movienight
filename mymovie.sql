SET NAMES UTF8;
DROP DATABASE IF EXISTS mymovie;
CREATE DATABASE mymovie CHARSET=UTF8;
USE mymovie;

CREATE TABLE movie_user(
   uid INT(16) PRIMARY KEY AUTO_INCREMENT,
   uname VARCHAR(32),
   upwd INT(16)
   );
INSERT INTO movie_user VALUES
(null,'star','123456'),
(null,'king','123456')
;





