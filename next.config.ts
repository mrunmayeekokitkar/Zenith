// next.config.ts
//
// Required for CesiumJS to work in a Next.js build. Cesium ships its
// Workers/, Assets/, ThirdParty/, and Widgets/ directories as static files
// that must be served from the public root at runtime (it fetches them via
// relative URLs, not bundled imports). copy-webpack-plugin copies them into
// /public/cesium at build time; CESIUM_BASE_URL tells Cesium where to find
// them in the browser.
//
// npm install --save-dev copy-webpack-plugin

// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {}, // explicit empty config silences the webpack/Turbopack warning
};

export default nextConfig;
