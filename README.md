# Introduction

Welcome to "Amits store", your one-stop destination for high-quality clothes.
my store is built with technology  including React, Typescript, Redux, SQLite3, Django, JWT, and Django Rest Framework.

# Features

Login + Register 
Active Cart + PayPal Sandbox API.
Admin Panel using Django Administration.
User Profile + Updating Information.

# Browser Support
internet explorer, safari, google chrome, opera, edge and firefox browser's.

# Technologies Used
React, Typescript, Redux, SQLite3, Django, JWT, and Django Rest Framework, python and docker.

# Installation
Deployments
The client-side portion of this project is hosted on Netlify and database management is handled by Render

For Docker deployment / testing on your device, the following instructions are provided. Please note some modifications in the code may be required.

# Pre-requisites
Please ensure you have the following installed on your local machine:

Python 3.x
Node.js and npm
pip
Django
Django Rest Framework
React
Redux

# backend
Please clone the project, using the following command:

git clone https://github.com/AmitShok/amitsfinalproj.git
Once you have cloned the project, navigate to the following directory:

cd /final-project/backend/
Now you need install virtual environment

pip install virtualenv
Now for create virtual environment in Windows

py -m virtualenv venv
In Mac

virtualenv env
To use virtual environment in Windows

.\env\Scripts\activate
In Mac

source env/bin/activate
Install the Python requirements:

pip install -r requirements.txt
In the first Terminal window, run the following command to start the Django backend server:

Mac
(env) python manage.py runserver
Windows

(env) py manage.py runserver
Defult admin user
# To access the admin panel of Django, please use the following credentials:

Username: Amit
Password: 123
Open the file titled 'globalVar.ts' and change the following line:

in render deploy

export const SERVER = "https://amitstore.onrender.com/"
# docker
to docker:
export const SERVER = "http://0.0.0.0:8000"
# Docker Installation
Before getting started, please ensure that Docker Desktop is installed on your system. If you haven't already, you can download and install Docker Desktop by following this link.

Once you have cloned the Git repository, enter the following command to change the directory to the project directory:

cd final-project/
Start the containers using the Docker Compose conmmand:

docker compose up

# LINK to MY WEBSITE
https://animated-crepe-7e116c.netlify.app/

# FRONT
Once you have cloned the project, navigate to the following directory:

cd /final-project/frontend/ecommerce
Now you need unstall al the packege for run app

npm i
Ater all the installation finish

npm start
