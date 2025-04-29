CREATE DATABASE films_db;
USE films_db;

CREATE TABLE directors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(90) NOT NULL
);

CREATE TABLE films (
	id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(90) NOT NULL,
    year INT NOT NULL,
    rating FLOAT,
    fkDirector INT NOT NULL,
    FOREIGN KEY (fkDirector) REFERENCES directors (id)
);

INSERT INTO directors (name)
VALUES
	('Valerie Faris'),
    ('Ridley Scott'),
    ('Jason Reitman'),
    ('Greta Gerwig');


INSERT INTO films (title, year, rating, fkDirector)
VALUES
	('Little Miss Sunshine', 2006, 7.8, 1),
	('Thelma and Louise', 1991, 7.5, 2),
	('Juno', 2007, 7.4, 3),
    ('Lady Bird', 2017, 7.4, 4),
    ('Barbie', 2023, 7.0, 4);
    
SELECT films.id, films.title, films.year, films.rating, directors.name AS director FROM films, directors WHERE films.fkDirector = directors.id;

SELECT films.id, films.title, films.year, films.rating, directors.name AS director FROM films, directors WHERE films.fkDirector = directors.id AND films.id = 3;

INSERT INTO films (title, year, rating, fkDirector) VALUES ('Gladiator', 2000, 8.5, 2);

UPDATE films SET title = 'Pequeña Miss Sunshine', year = 2006, rating = 7.8, fkDirector = 1 WHERE id = 1;

DELETE FROM films WHERE id = 7;