# Securities React Exercise
  The exercise is divided by two standalone components, to garantee higher testability of each individual aspect:

  **back-end-app**: Contains all back-end and database logic;
  **front-end-app**: Contains front-end single page application;

## Requirements
  - npm (https://nodejs.org/en/download/current/)
  - serve (https://github.com/vercel/serve)
  
## Back-end 
To run the back-end server take these steps

### Installation
Enter *back-end-app* file directory and using npm we will install all necessary dependencies using 
```
npm install 
```
### Running the Server 
To run the server perform the following script
```bash
npm run start [-- -p=<hostPort>]
-p; --port : configure which port do you want the server to be hosted
ex: npm run start -- -p=8000
```
if you want to run in a **development setting**:
```bash
npm run dev [-- -p=<hostPort>]
-p; --port : configure which port do you want the server to be hosted
ex: npm run dev -- -p=8000
```
Once it is running, the server will be up in localhost:<hostPort>
if no port was chosen, the server will run in default localhost:8080  and it will expose the **/securities** endpoint, where the info is going to be retrieved.


  
 ### Configuring Database
 
 The database is hosted in a cloud cluster on MongoDB
 However, you can configure the server to connect to another database and/or collection using the **.env.[prod|dev]** files.
This is the default layout of .env.prod file:
```bash
    DB_DATABASE_CONNSTRING= "mongodb+srv://Guest:Guest@databo-duhsh.mongodb.net/test?retryWrites=true&w=majority"
    DB_DATABASE_NAME= "BOData"
    DB_COLLECTION_NAME= "Data"
```

## Front-End
To run the front-end application take these steps

### Installation
Enter *front-end-app* file directory and using npm we will install all necessary dependencies using 
```
npm install 
```
### Running the App
- **Production**:

	To run in a production environment run the following commands
	```bash
	npm run build
	after build is complete (make sure you install serve):
	serve -s build
	```
it will create a static file server and it will be hosted by default at **localhost:5000**, if by any chance port :5000 is ocupied, it will randomize a new port.

- **Development**:
	To run in a development environment run the following commands

	```bash
	npm run start
	after build is complete (make sure you install serve):
	serve -s build
	```
it will create a runtime development environment and it will be hosted by default at **localhost:3000**
### Configure Information Provider

 You can configure which server to retrieve information in the **.env.[production|development]** files.
This is the default layout of .env.production file:
```bash
REACT_APP_FE_PROVIDER_URL="http://localhost:8000"
```

  
  
   
  
