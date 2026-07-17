# BookWise - Serverless Book Review Application
BookWise is a fully serverless web application that lets users browse books and submit reviews. Built entirely on AWS, it uses API Gateway, Lambda, DynamoDB, and Cognito to create a scalable, cost-effective solution with zero server management.

The frontend is hosted on S3 with CloudFront for fast global delivery. Users authenticate through Cognito, and the backend consists of three Lambda functions (getBooks, getBookById, addReview) that handle API requests and interact with DynamoDB tables for books and reviews. API Gateway exposes REST endpoints with CORS enabled for frontend access.

This project demonstrates modern cloud architecture principles: serverless computing, infrastructure as code, and security best practices
