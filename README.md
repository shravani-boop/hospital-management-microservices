# Hospital Management Microservices

A containerized Hospital Management System built using a microservices architecture. The application provides separate services for managing patients, doctors, and appointments.

## Project Overview

This project demonstrates a microservices-based application deployed using Docker and Kubernetes on an AWS EC2 instance. Nginx is used as a reverse proxy to expose the application.

## Architecture


                    User Browser
                         |
                         v
                  AWS EC2 Public IP
                         |
                         v
                     Nginx :80
                         |
                         v
                     Minikube
                         |
          +--------------+--------------+
          |              |              |
          v              v              v
     Patient Service Doctor Service Appointment Service
        Node.js         Node.js          Node.js
        Port 3001       Port 3002        Port 3003
          |              |              |
          +--------------+--------------+
                         |
                         v
                      MongoDB
                       :27017
```

## Technologies Used

* AWS EC2
* Ubuntu Linux
* Docker
* Kubernetes
* Minikube
* Node.js
* Express.js
* MongoDB
* React
* Nginx
* Git
* GitHub

## Project Structure


hospital-management-microservices/
│
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
│
├── services/
│   ├── patient-service/
│   ├── doctor-service/
│   └── appointment-service/
│
├── k8s/
│   ├── mongodb.yaml
│   ├── patient-deployment.yaml
│   ├── doctor-deployment.yaml
│   ├── appointment-deployment.yaml
│   └── frontend.yaml
│
└── README.md
```

## Microservices

### Patient Service

* Port: `3001`
* Health: `/health`
* Get patients: `GET /patients`
* Add patient: `POST /patients`

### Doctor Service

* Port: `3002`
* Health: `/health`
* Get doctors: `GET /doctors`
* Add doctor: `POST /doctors`

### Appointment Service

* Port: `3003`
* Health: `/health`
* Get appointments: `GET /appointments`
* Add appointment: `POST /appointments`

## Docker

Backend services are containerized using Docker.

Example:


docker build -t patient-service ./services/patient-service

Frontend Docker image:


docker build -t hospital-frontend ./frontend


## Kubernetes Deployment

Minikube is used to run the Kubernetes cluster.

Start Minikube:


minikube start --driver=docker --memory=2048mb --cpus=2


Deploy MongoDB:


kubectl apply -f k8s/mongodb.yaml


Deploy the services:


kubectl apply -f k8s/patient-deployment.yaml
kubectl apply -f k8s/doctor-deployment.yaml
kubectl apply -f k8s/appointment-deployment.yaml


Deploy the frontend:


kubectl apply -f k8s/frontend.yaml


Check pods:


kubectl get pods

Check services:


kubectl get svc


## Nginx Reverse Proxy

Nginx is configured on the AWS EC2 host to route requests to the Kubernetes services.


/api/patients/      -> Patient Service
/api/doctors/       -> Doctor Service
/api/appointments/  -> Appointment Service
/                   -> React Frontend


Nginx listens on port 80.

## AWS Deployment

The application is deployed on an Ubuntu AWS EC2 instance.


GitHub
   |
   v
AWS EC2
   |
   v
Docker
   |
   v
Minikube / Kubernetes
   |
   v
Nginx
   |
   v
React Frontend + Microservices


## API Verification

Check Kubernetes pods:

kubectl get pods


Check Kubernetes services:


kubectl get svc


Test the frontend:


curl http://localhost/


Test the Patient API:


curl http://localhost/api/patients/patients


Test the Doctor API:


curl http://localhost/api/doctors/doctors


Test the Appointment API:


curl http://localhost/api/appointments/appointments


## Features

* Patient management
* Doctor management
* Appointment management
* REST APIs
* MongoDB database
* React dashboard
* Docker containerization
* Kubernetes deployment
* Nginx reverse proxy
* AWS EC2 deployment

## DevOps Concepts Demonstrated

* Microservices architecture
* Docker containerization
* Kubernetes Deployments
* Kubernetes Services
* Minikube cluster management
* AWS EC2 deployment
* Nginx reverse proxy
* Linux server administration
* Git and GitHub
* REST API integration

## Author

**Shravani Boop**

GitHub: https://github.com/shravani-boop

