## Description
This project is a Web development allows user post some jokes to the database and view all jokes uploaded by all users.
Logined users can bookmark the jokes they liked.

The frontend is created by React providing GUI for user (inside folder **browser**).
The backend is created by node.js providing API service (inside folder **server**).

## How to run the program
To run the project, you need to have node.js and postgreSQL installed.
After download the project folder, please follows below steps for frontend:
1. open terminal and go into **browser** folder
2. type `npm i to install required modules
3. type `npm run dev` to run. After a while, a new page will open in your web browser with web address http://localhost:7000/.

follows below steps for backend:
1. open another terminal and go into **server** folder
2. type `npm i` to install required modules
3. change postgresql config in */config/default.jscon* according to your setting
4. refer to *data.sql* file to create postgresql table
5. type `node index.js` to run server. Now the server can response request.


## Frontend
The home page will display all jokes created by all users. It is setted to display max. 5 jokes in a page (you can modify it
by changing the value of constant variable *DEFAULT_PAGE_SIZE* in **/src/pages/Home.jsx** ). You can view others pages by clicking the "Go" button.
The bookmark icon is only applicable after logined. User click on the buttons on top right corner to sign up a account or sign in.
![Home Page](/screenshot/HomePage.png)\

After sign in, the bookmark icon is filled if the user have bookmarked a joke before.\
![Home Page after signin](/screenshot/homepage_after_signin.png)\

User can also find all their bookmarked jokes by clicking the **save jokes** on top right corner of webpage.\
![webpage shows all bookmarked jokes](/screenshot/bookmarked_jokes.png)\

Click the **add joke** text to add a new joke into the server. \
![webpage to create a joke: input title and content](/screenshot/create_joke.png)\

User can find all the jokes that they created before. Click the **trash** icon to delete that joke forever.
![webpage to create a joke: input title and content](/screenshot/create_joke.png)\


## Backend
The server provides following API service \
| method | path | function |
| --- | --- | --- |
| `POST` | /login | Server authenticate the user identity with username and password provided by a client |
| `POST` | /register | Server record the username and pasword provided by a client as a user |
| `POST` | /logout | Server clear the session record when Client inform the user has logout. |
| `GET` | /jokes | Server return jokes created by all user |
| `POST` | /create | Server receive the title and content of the joke provided by a client to save into database.|
| `GET` | /myjokes | Server return the jokes that login client create before. |
| `DELETE` | /joke | Server delete the joke specified by the user who creates it. |
| `GET` | /savedjokes | Server return the jokes that the user had bookmarked before. |
| `POST` | /savedjokes | Server record the user has bookmarked the joke |
| `DELETE` | /savedjokes | Server delete bookmarked record |

Server return an object in JSON format to the client. The object has 3 property
| property name | content |
| --- | --- |
| data | the data that client requested |
| statusCode | indicate the request fulfilled(200), fail by incorrect information from client (400) or server problem (500) |
| message | a string that descript the failure reason |

### POST /login
Client provide credentials (username and password) and server return username in property data if authentication success. \
**credential** \
username - username that client has registered before \
password - password that client input in regisstration \
**data** \
object has a property "username" which value is user name \
![server return username in properpty data  and 200 in properpty statusCode](/screenshot/user_login_success.png)


### POST /register
Client provide username and password in transition **body**. Server return username in property data if registration success. \
**body** \
username - username that client claim himself \
password - password that used for login \
**data** \
object has a property "username" which value is user name \
![server return username in properpty data  and 200 in properpty statusCode](/screenshot/user_signin.png) \

The password has encrypted by **bcrypt** module. The database only store the username and encrypted password \
![content of database user table](/screenshot/database_user_table.png) \


### POST /register
Client does not need to provide any information as the server use **Session** to keep user identity. Server will clear the user session record.
![server response with statusCode 200](/screenshot/user_logout.png)


### GET /jokes
Server return jokes that created by all users. Client can provide pageNumber and pageSize in **query** to specify how many (pageSize) and which jokes [offseted by ((pageNumber - 1) * pageSize) from the most recent jokes created]. \
**query** \
pageNumber - Postivie integer. Otherwise **default 1** in server side \
pageSize - Postivie integer. Otherwise **default 5** in server side \
**data** \
return a list of jokes object \
![server return jokes with pageNumber and pageSize provioded](/screenshot/server_return_jokes.png) \

If client call GET /jokes after sign in, the returned jokes object will have a property name "user_id". Its value is null if the user did not bookmark that joke before. \
![server return jokes with a column user_id](/screenshot/server_return_jokes_when_user_signin.png) \



### POST /joke
Client has to sign in before call this API. Client provides title and content in **body** section and server save them into database. Server will return the id that database table assigned to this joke. \
**body** \
title - title of the joke \
content - content of the joke \
**data** \
object has a property "id" representing the "id" of the joke assigned by the database table \
![server return the id of joke assigned by the database table](/screenshot/create_joke_after_login.png) \
It will return statusCode 400 if client all the API without sigining in. \
![server return failure statusCode with reason in message](/screenshot/create_joke_before_login.png) \


### GET /myjokes
Client has to sign in before and server return jokes that created by the sign-in user. Client can provide pageNumber and pageSize in **query** to specify how many (pageSize) and which jokes [offseted by ((pageNumber - 1) * pageSize) from the most recent jokes created]. \
**query** \
pageNumber - Postivie integer. Otherwise **default 1** in server side \
pageSize - Postivie integer. Otherwise **default 5** in server side \
**data** \
return a list of jokes object that created by the client \
![server returns a list of jokes object created by the client](/screenshot/server_return_jokes_created_by_a_user.png) \


### DELETE /myjokes
Client has to sign in before and provide the jokeId that represents the joke to be deleted.
Server only delete the joke which creator is the client. Server always return statusCode 200 even though no joke has been deleted.
**body** \
jokeId - id, assigned by database, that represented the joke \
**data** \
null. StatusCode 200 represents the joke has been deleted.
![server returns statusCode 200 for result](/screenshot/User_delete_a_joke_with_jokeId.png) \


### GET /savedjokes
Client has to sign in before and server return jokes that the user has bookmarked. Client can provide pageNumber and pageSize in **query** to specify how many (pageSize) and which jokes [offseted by ((pageNumber - 1) * pageSize) from the most recent jokes created]. \
**query** \
pageNumber - Postivie integer. Otherwise **default 1** in server side \
pageSize - Postivie integer. Otherwise **default 5** in server side \
**data** \
return a list of jokes object that the client has bookmarked \
![server returns a list of jokes object that the client has bookmarked](/screenshot/server_return_bookmarked_jokes.png) \


### POST /savedjokes
Client has to sign in before and provide joke id representing the joke that user want to bookmark \
**body** \
jokeId - id, assigned by database, that represented the joke \
**data** \
null. StatusCode 200 represents the joke has been bookmarked. \
![server return statusCode 200 representing the joke has been bookmarked](/screenshot/server_return_statusCode_after_bookmark_a_joke.png) \

### DELETE /savedjokes
Client has to sign in before and provide joke id representing the joke that user want to cancel the bookmark. The server will only delete (user id, joke id) pair in database *bookmark* table \
**body** \
jokeId - id, assigned by database, that represented the joke \
**data** \
null. StatusCode 200 represents the server has delete the bookmark record. \
![server return statusCode 200](/screenshot/server_delete_bookmard_record.png) \
