"use server"
import { client } from '../sanity/lib/client';

async function fetchSanity() {
  const res = await client.fetch(`*[_type == "product"]`)

console.log("Result ✅", res)
}

export default fetchSanity;