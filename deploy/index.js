const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const envConfig = {
  NODE_ENV: process.env.NODE_ENV || 'production',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/mydb',
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || 'your_openai_api_key',
};

const writeEnvFile = () => {
  const envFilePath = path.join(__dirname, '.env');
  const envContent = Object.entries(envConfig)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  fs.writeFileSync(envFilePath, envContent, { encoding: 'utf8' });
};

const runPrismaMigrate = () => {
  return new Promise((resolve, reject) => {
    exec('npx prisma migrate deploy', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error during migration: ${stderr}`);
        return reject(error);
      }
      console.log(`Migration output: ${stdout}`);
      resolve();
    });
  });
};

const buildNextApp = () => {
  return new Promise((resolve, reject) => {
    exec('npm run build', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error during Next.js build: ${stderr}`);
        return reject(error);
      }
      console.log(`Build output: ${stdout}`);
      resolve();
    });
  });
};

const startServer = () => {
  return new Promise((resolve, reject) => {
    exec('npm start', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error starting server: ${stderr}`);
        return reject(error);
      }
      console.log(`Server output: ${stdout}`);
      resolve();
    });
  });
};

const deployApp = async () => {
  try {
    writeEnvFile();
    await runPrismaMigrate();
    await buildNextApp();
    await startServer();
  } catch (error) {
    console.error('Deployment failed:', error);
    process.exit(1);
  }
};

deployApp();