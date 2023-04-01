  
  
CREATE DATABASE tp15_userdb;

USE tp15_userdb;

CREATE TABLE IF NOT EXISTS users(
    id INT AUTO_INCREMENT NOT NULL,
    username VARCHAR (20) NOT NULL,
    `password` VARCHAR (20) NOT NULL,
    gmail VARCHAR (30),
    PRIMARY KEY (id)
);