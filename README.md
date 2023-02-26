# Social Media Web Application

Social media platform for conversation , 
connecting friends and building relationships

## Live-App
Hey, check out the Live-App, just visit https://www.sanjaiuthupthomas.in

## Technical Goals
###### Posts, Comments, Chat, Marketplace:
Users will be able to custom tailor a ”post” to be accessible from other devices. A post will be described as image upload.
The author of the post as well as other users of the web application will be able to “comment” on existing posts. Comment defined as text.
Users can have chat other users on the app.
###### User Authentication:
Users will be able to login with their specific data to access posting, commenting.
We aim to utilize JWT for authentication rather than using external libraries such as Passport.js
User's data will be stored in a database(MongoDB tentatively) to allow for recalling of existing post and profile pages.

## Sample images
![Screenshot of login](https://imgur.com/ric7UAS.jpg)
![Screenshot of home](https://imgur.com/uU3nr3w.jpg)
![Screenshot of chat](https://imgur.com/B7eVm2T.jpg)
![Screenshot of notification](https://imgur.com/DmArVC3.jpg)
![Screenshot of edit profile](https://imgur.com/9e2NmyX.jpg)



Social media web application . This will include functionality of posting, commenting, user authentication and messaging.



## Languages/Frameworks
React.js
Node.js
Express.js
JavaScript
Socket.io

## Database
MongoDB

## Login Details

   | Email                        | Password | Role  |
   |------------------------------|----------|-------|
   | sanjaiuthupthomas@gmail.com  |  1234    | User  |
   
   ## Compiling assets


```bash
  cd client
  cd server
  cd socket
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  client:npm start
  server:npm start
  socket:npm start
```
