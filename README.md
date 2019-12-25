WebProject

# Author

Ramzi AGOUGILE & Alexande AVAKIAN

The goal of this project was to create a fullstack application to train our backend skills.
At the same time, we used this project for the DevOps's project.

As you will see in the project, some features don't work, in fact we tried to late to use docker and travis,
and their use killed some features... (But docker and travis worked !) 
The features that stopped worked is the both used in the document.ready() with the Ajax request.
Please free to watch the function itself, it stopped worked with no reason (there is always a reason but...)
So let's try to enjoy even a bit this project and thank you

# Table of Contents

* [Prerequisites]
* [Installation]
* [Running]


## Prerequisites

Before you continue, ensure you meet the following requirements:

*You should have NodeJS(npm) installed on your PC.
*You should have docker installed on your PC.

## Installation

### Depedencies installation

To run our project there is no need to install something (except Docker and our project)
Just follow the next steps to run it.

## Running

So to run our project you must follow theses steps.
*Go on the docker CLI and go to the project folder.
*Where you're in the project folder you can run the project in "test mode" and in "running mode"

RUNNING MODE

*In the project folder, use the command "docker-compose up --build"
*This command will build the project and create our project image to run it after in a container
*Where the command is finished, you can go in your "localhost:8080" and the website will be here.
*Little warning => I used docker Toolbox and localhost was 192.168.99.100 and I could not changed it.
Hope there is nothing wrong with yours...

TEST MODE

*In the project folder, use the command "docker-compose -f docker-compose.test.yml up --build"
*This commande will build the project using an other dockerfile, which permit to run "npm run test"
*You can see the test in your CLI !

## How to use the routes

So the routes is basically interactive with the front.
First you need to login or register, and you can't access anything without being logged (middleware)
When you're connected, you'll be redirect to your homepage, and then you can't create, delete, update, and see your metrics
If you forget something about your account, there is a cheaty way to get it just for you
got to localhost:8080/AllUsers then check your account.

### Display metrics

To explain why there is two graphs. We wanted to create two type of metrics, one that the user can control and one independant of the user. 
The first one, is created whenever the user connect to the website, like that we can now after where is the time spike of the website.
The other is free for the user to use it and do whatever he wants with it.


## DEVOPS

Here is the link to Travis : https://travis-ci.com/RamziAgou/WebProject/jobs/270218935
The test is working but I still don't understand why it's repeating itself and never stopped...
But we achieve the link between docker, Travis and github so...
