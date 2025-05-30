import { createClient } from 'next-sanity'

// import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId: "1ihuwax4",
  dataset: "production",
  // apiVersion: "2025-05-28",
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})


async function fetchSanity() {
  const res = await client.fetch(`*[_type == "product"]`)

console.log("Result ✅", res)
}

export default fetchSanity;

// //----------------------------------------------------------------------------
// async function fetchSanity() {
//   const res = await client.fetch(`*[_type == "product"] {
//   _id, 
//   name,
//   price,
//   originalPrice,
//   "image": image.asset->url,
//   category,
//   tags
// }`)

// console.log("Result ✅", res)
// return res
// }

// export default fetchSanity;