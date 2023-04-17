

# Backend

This directory is to contain the server and database components that will make up our backend.

# Prequisites:

need to find out what we need to install, need to confirm but likely need to install:
- homebrew:
    - install homebrew here: https://brew.sh/
- node js:
    - install nodejs on Mac: "brew install node"
- postgres:
    - to install postgres on a Mac, run "brew install postgresql"
    
# Structure

- /database - directory that maintains the logic for the postgres database
    - to start the postgres service locally, run
    `brew services start postgresql@14` (when you want to stop database, the function is the same)
    - add your database by running 
    - `psql -h localhost`
    - `CREATE DATABASE project;`
    - to load the table structure in your postgres, run (from this directory)
    `psql -h localhost -d project -U "$(whoami)" -p 5432 -a -q -f ./database/database-init.sql`
    - node-pg postgres POC:
        - to show how to interface with the database using node library node-pg


- /server - directory that maintains the logic for the server, the server
            exposes an API and interfaces with the database
