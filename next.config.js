/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    // this includes files from the monorepo base two directories up
    // outputFileTracingRoot: path.join(__dirname, '../../'),
    outputFileTracing: true,
  },
}
