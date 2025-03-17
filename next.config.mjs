/** @type {import('next').NextConfig} */
import withPWA from '@ducanh2912/next-pwa'
const nextConfig = withPWA({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development', 
    register: true,
    skipWaiting: true,
    fallbacks:{
      document:"/"
    }
  })

export default nextConfig;
