# Orion IoT Web Application Front-end
The front-end of the web application for the Orion-IoT project

To start this webapp front-end with Docker and Apache web server then go to the "app" folder and run the following 2 commands:

docker build -t orion-iot-webapp-frontend .

docker run -dit --name orion-iot-webapp-frontend-running -p 8081:80 orion-iot-webapp-frontend
