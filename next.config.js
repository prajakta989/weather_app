/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env:{
    apiKey: '000d8dcac3msh0d7616e1e01d200p145157jsn5bee344c57a0'
  },
  images:{
    domains:["cdn.weatherapi.com"]
  }
  
}

module.exports = nextConfig
