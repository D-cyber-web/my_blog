import { simpleBlogCard } from "./lib/interface";
import { client } from "./lib/sanity";

async function getData() {
  const query = `*[_type == 'blog'] | order(_createdAt desc){
    title,
    smallDescription,
    "currentSlug": slug.current
  }`;
  const data = await client.fetch(query)

  return data;
}

export default async function Home() {
  const data: simpleBlogCard = await getData()

  console.log(data)
  return (
    <div>
      <h1 className="text-2xl">Hello Daudi Homepage.</h1>
    </div>
  );
}
