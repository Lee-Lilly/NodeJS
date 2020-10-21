CREATE TABLE movies (
  id serial PRIMARY KEY,
  title VARCHAR (200) NOT NULL,
  director VARCHAR (200) NOT NULL, 
  year INTEGER NOT NULL 
);

INSERT INTO movies (title, year, director) VALUES ('Star Wars: Episode IX - The Rise of Skywalker', 2019,'J.J. Abrams');
INSERT INTO movies (title, year, director) VALUES ('The Irishman', 2019, 'Martin Scorsese');
INSERT INTO movies (title, year, director) VALUES ('Harry Potter and the Sorcerers Stone', 2001, 'Chris Columbus');

SELECT * FROM movies;