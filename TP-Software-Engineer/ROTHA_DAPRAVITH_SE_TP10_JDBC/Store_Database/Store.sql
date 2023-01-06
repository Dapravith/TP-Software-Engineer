CREATE DATABASE Store;

USE store;

CREATE TABLE Shop (
	order_id INT PRIMARY KEY AUTO_INCREMENT,
	customer_no INT NOT NULL,
	order_status TEXT,
	duration_serving TIME
);



ALTER TABLE Shop MODIFY COLUMN date_entering TIMESTAMP 

INSERT INTO Shop(order_id,customer_no, order_status,duration_serving)
VALUES('1','001','wating food','15:00');

TRUNCATE TABLE Shop;
