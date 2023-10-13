# CLEAN api

This is a small api template I made following the interpretation I can currently give to a Clean architecture.

I splited into different middleware and helper functions some of the standard functionalities of a REST api 
so its easier to switch or add new technologies without compromising everything in the way. Feel free to clone the repo,
if so, give it a star and you'll make me really happy :P

# Get it going

npm install and .env as follows is enough to get the rest api going and connected to your mongoDB
MONGO_URL=
HOST_URL=
JWT_ISSUER=
JWT_SECRET=

# Features

Rest api's are one of the most common backend applications, with this template you can:

- Register users and authenticate them (jwt)
- Add jwtMiddleware to a route to make it private
- Add centralized Error handling in a middleware
- Use tryCatch utility function for effortless error handling.
- invoke all basic CRUD operations on the models that you create by using the functions in the services folder and receive
meaningfull errors if something happens.



