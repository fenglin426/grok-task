/** @type {import('next').NextConfig} */
//const isGitHubPages = process.env.DEPLOY_TARGET === 'github-pages';
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  // 只在 GitHub Pages 部署时添加 basePath
  ...(isGitHubPages && {
    basePath: '/grok-task',
    assetPrefix: '/grok-task',
  }),
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig

