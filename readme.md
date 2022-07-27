## server requirements

## How to run
1. install node. At least v16 
2. Run `npm install`. 
3. change/update `mongo_connection_string` in /config/secrets.json
4. run `npm run start` to start server.
5. Make requests to server! Feel free to use postman collection & environment in the /postman folder for requests.
*Note - You'll need to register a new user first with auth/register*


## Assumptions
1. db has no pre-existing tables, and server would auto create collections/indices for `development` only. Other environments should have the collections/indices created upfront
2. In real world scenario, `secrets.json` should be added to `.gitignore` file. Included in repo for demo purposes.
3. FrontEnd would pass in the string value of the subject/stream/type on for training listing. 
4. GET requests will submit data vie query string.
5. POST requests will submit JSON data via body.


## Requirements
1. Registration - POST request auth/register. Set isAdmin = true for admin privileges;
2. Login - POST request /auth/login.
3. JWT Token - /auth/register & /auth/login will return a token. Include it in all subsequent requests as `token`.
4. Update password - POST request to /auth/changePassword.
5. Update Profile - POST request to /user/mes
6. Add new subject - POST /subject
7. Add new Training - POST /training
8. Get subject - GET /subject. send params in query string. 
limit - # of results
sort - ASC or DESC
9.  Get training - GEt /training. send params in query string.