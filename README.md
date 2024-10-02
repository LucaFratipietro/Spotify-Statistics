# 520 Project-_-MERN Stack Web Application
## Description: 
> This app provides information about some of the top songs from the past 50 years based from Spotify. Displaying the data through a graph, where individual genres and decades can be shown and the top songs from those criteria are shown through a list of generated data. under the fold.

## Contributors
> Adriano D'Alonzo 2035770

> Luca Fratipietro 2143068

## Structure
2 directories in the root of the project.

Express server: `server/`

React app: `client/`

The server responds to API calls and serves the built React app.

## Setup
### To install all the dependencies and build the React app, from the root of the project, run:

    npm run build

### Run Application

    npm run start 
    \
      -> runs the full-stack application on localhost:3001

## Deployment Steps
The application is currently deployed through AWS at `99.79.36.74`. Accessing this IP through the browser **(http://99.79.36.74/)** will show the current application deployed through AWS.

### To Redeploy:
> **NOTE** Assuming you have possesion of the private key to access the VPS on AWS, proceed to the next steps:

1. In one terminal, ssh to the VPS using the private key (`ssh -i <path to private key> bitnami@99.79.36.74`)
2. In the VPS, if there currently is a folder called `project`, remove it and its contents.
3. On your local machine, download the latest artifacts folder in GitLab (Build > Artifacts > Dropdown for **build-app-archive** job > Download **artifacts.zip**) 
4. Extract contents of the zip
5. In the location of where you downloaded the artifacts, `cd artifacts` and there should rest a folder called `project` 
6. Copy this folder into the VPS (`scp -r -i <path to private key> project/ bitnami@99.79.36.74:~`)
7. A new `project` folder should be in the working directory of the VPS
8. From the VPS, `cd project` and there should rest a `tar` file titled `release-520-project-dalonzo-fratipietro-<tag>-<commit_sha>.tar.gz` containing the compressed application.
9. Extract the contents of the tarball (`tar -xvf release-520-project-dalonzo-fratipietro-<tag>-<commit_sha>.tar.gz`)
10. In the home directory of the VPS, there contains a `.env` file containing all environment variables that the application requires to run. Copy this file to the `project` folder (`cp ~/.env ./`)
11. Run `forever list` and ensure there arent any other running processes on port 3001, or any commands currently running the application (something like `server/bin/www` or `bin/www`). If there exists a job running under these conditions, run `forever stop <id>` where `id` is the id of the job running to stop the process.

**ITS VERY IMPORTANT THAT YOU ARE IN THE `project` FOLDER UP TO THIS POINT! BY RUNNING `ls -al`, THERE SHOULD ONLY REST THE `client`, `server`, `.env` & `release....tar.gz` tarball**

12. Once the jobs are cleared in `forever`, you need to set the `NODE_ENV` variable to set the environment of the application and start the application using `forever`. Luckily, that is already set in the `.env` file, so all thats needed is to run the application (`forever start server/bin/www`)
13. Verify that the application started using `forever list` and see something along these lines:
    > data:    [`process index`] `job` /opt/bitnami/node/bin/node server/bin/www `forever pid`   `id`    /home/bitnami/.forever/`job`.log `runtime`

    **NOTE** if runtime isnt shown (in yellow) and shows STOPPED (in red), you can check the logs of the process by running `cat /home/bitnami/.forever/<job>.log` and see the output of the running command.
14. Apache is already setup to run on the port of the server, but restarting may be required in order to see new changes from the code coming in from the tag from your local machine. Restart Apache (`sudo /opt/bitnami/ctlscript.sh restart apache`)
15. If `Restarted apache` is returned to the console, then redeployment was successful and you can now access the application at **http://99.79.36.74/**
16. Enjoy the statistics!

## Attributions
>[Spotify Dataset](https://www.kaggle.com/datasets/naoh1092/spotify-genre-audio-features/) provided by Noah

>[Spotify Playlist Data](https://everynoise.com/everynoise1d.cgi) provided by Every Noise at Once API

## Dependencies
>Graph generated using [Chart.js](https://www.chartjs.org/)
