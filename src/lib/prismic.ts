import * as prismic from "@prismicio/client";

/**
 * Prismic repository name – matches your Prismic dashboard URL:
 * https://prismicapp.prismic.io
 */
const REPO_NAME = import.meta.env.VITE_PRISMIC_REPO_NAME || "website-content-repo";

/**
 * Permanent access token generated in Prismic → API & Security → Permanent access tokens
 */
const ACCESS_TOKEN = import.meta.env.VITE_PRISMIC_ACCESS_TOKEN || "";

/**
 * Returns a configured Prismic client instance.
 * Call this anywhere you need to query your CMS.
 */
export function createClient() {
  return prismic.createClient(REPO_NAME, {
    accessToken: ACCESS_TOKEN,
    // You can also pass routes here for link resolution if needed later.
  });
}

export { prismic };
