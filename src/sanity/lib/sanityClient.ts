// lib/sanityClient.ts
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Create Sanity client
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2021-08-31',
  useCdn: true, // Use CDN for fast access to public content
  token: process.env.SANITY_API_TOKEN, // If you need an authenticated token for certain operations
});

// Image URL builder
const builder = imageUrlBuilder(client);

// Helper function to generate image URLs
export const urlFor = (source: { asset: { _ref: string } }) => builder.image(source);

