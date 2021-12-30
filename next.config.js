/** @type {import('next').NextConfig} */
require('dotenv').config();
module.exports = {
  reactStrictMode: true,
  env: {
    // Reference a variable that was defined in the .env file and make it available at Build Time
    API: process.env.API,
  },
};
