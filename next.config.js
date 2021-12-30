/** @type {import('next').NextConfig} */
require('dotenv').config();
module.exports = {
  reactStrictMode: true,
  env: {
    REACT_APP_API: process.env.REACT_APP_API,
  },
};
