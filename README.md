                                                                DESCRIPTION
                This git allows users to add and access games in this database as well as favorite the the games they like in this database.


    SETUP INSTRUCTIONS


Step 1: 
Open terminal mkdir then cd into created folder.

Step 2:
In your terminal copy/paste 
git clone git@github.com:Jcasanova1990/Users_FavGames_API.git---Then hit enter.

Step 3: 
Then cd into cloned folder, then touch gitignore  and .env 

Step 4: 
Then type code . to open VSCODE 

Step 5: 
 Add MONGO_URI and SECRET=Hash password to .env file. Then in your .gitignore file type node_modules and .env to hide current files.

Step 6:
npm i to install all packages in package.json, then npm run test to test everything 

Step 7:
then run npm run dev to start server and type http://localhost:3006/ in your browser

Step 8:
git init then create a repository on git hub then Create a github repository then follow git steps to addremote/add-A/commit to -m/push -u 



                                                        ----IMPORTANT----
        "THIS GIT USES BCRYPTJS AND DOES NOT USE MONGODBMEMORYSERVER IF ADDED TO MONGODB IT WILL SEND ALL TEST FILES THERE"