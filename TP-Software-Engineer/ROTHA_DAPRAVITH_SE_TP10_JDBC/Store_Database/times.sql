CREATE DATABASE times;

use times;

CREATE table date_history (
       id int not null auto_increment,
       date_start DATE,
       date_end DATE,
       n_days int not null,
       operation_type VARCHAR(30) not null,
       changed_date Timestamp,
       primary key (id)
);

INSERT into date_history(id,date_start, date_end, n_days, operation_type, changed_date) VALUES('?','?','?','?','?','?');

SELECT * FROM date_history;

SELECT MAX(id) AS LAST FROM date_history;