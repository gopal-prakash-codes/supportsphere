# SupportSphere ![Build Status](https://img.shields.io/badge/build-passing-brightgreen) ![Version](https://img.shields.io/badge/version-1.0.0-blue)

## Project Description
SupportSphere is an intelligent customer support platform that leverages AI to analyze customer queries and prioritize support tickets in real-time. It integrates seamlessly with a knowledge base to provide agents with contextual suggestions, enhancing response efficiency and customer satisfaction.

## Features
- 🤖 AI-driven customer query analysis
- ⏱️ Real-time support ticket prioritization
- 📚 Integrated knowledge base suggestions

## Tech Stack
### Frontend
- **Next.js** 🌐

### Backend
- **Node.js** 🚀
- **OpenAI Agent SDK** 🤖

### Database
- **PostgreSQL** 🗄️
- **Prisma** 🔗

### Caching
- **Redis** 🧊

## Installation
To set up the project locally, follow these steps:

- Clone the repository
bash
git clone https://github.com/gopal-prakash-codes/supportsphere.git
- Navigate into the project directory
bash
cd supportsphere
- Install the dependencies
bash
npm install
- Set up the environment variables (create a `.env` file based on `.env.example`)
bash
cp .env.example .env
- Run database migrations
bash
npx prisma migrate dev
- Start the development server
bash
npm run dev
## Usage
Once the server is running, you can access the application at `http://localhost:3000`. Follow the on-screen instructions to start using SupportSphere for your customer support needs.

## API Documentation
For detailed API documentation, please refer to the [API Documentation](https://github.com/gopal-prakash-codes/supportsphere/wiki/API-Documentation).

## Testing
To run the tests for this project, use the following command:
bash
npm test
## Deployment
For deploying SupportSphere, follow these steps:

- Build the application
bash
npm run build
- Start the production server
bash
npm start
- Ensure your environment variables are correctly set for production.

## Contributing
We welcome contributions! Please follow these guidelines:

- Fork the repository
- Create a new branch for your feature or bug fix
- Make your changes and commit them
- Push your branch and create a pull request

For more details, please refer to our [CONTRIBUTING.md](https://github.com/gopal-prakash-codes/supportsphere/blob/main/CONTRIBUTING.md). 

Thank you for your interest in SupportSphere! We look forward to your contributions.