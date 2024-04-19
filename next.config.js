/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    domains: [
      "medusa-public-images.s3.eu-west-1.amazonaws.com",
      "localhost",
      "picsum.photos",
      "kblab-kyc-staging.s3.ap-southeast-1.amazonaws.com",
      "cdn.dribbble.com",
      "tollgate-upload.s3.ap-southeast-1.amazonaws.com",
    ],
  },
};

export default config;
