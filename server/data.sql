CREATE DATABASE joke_collection;

CREATE TABLE users(  
    id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE jokes(  
    id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    creator int NOT NULL,
    created_at DATE NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category_id int
);

CREATE TABLE category(  
    id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL

);

CREATE TABLE bookmark(  
    user_id int NOT NULL,
    joke_id int NOT NULL

);

INSERT INTO category(name) VALUES('粵語');
INSERT INTO category(name) VALUES('粵港');
INSERT INTO category(name) VALUES('普通話');
INSERT INTO category(name) VALUES('中式');
INSERT INTO category(name) VALUES('American');
INSERT INTO category(name) VALUES('English');


