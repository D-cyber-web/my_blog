 import { Card } from "@/components/ui/card";
import { simpleBlogCard } from "./lib/interface";
import { client, urlFor } from "./lib/sanity";
import Image from "next/image";

async function getData() {
  const query = `*[_type == 'blog'] | order(_createdAt desc){
    title,
    smallDescription,
    "currentSlug": slug.current,
    titleImage
  }`;
  const data = await client.fetch(query);

  return data;
}

export default async function Home() {
  const data: simpleBlogCard[] = await getData();

  console.log(data);

  return (
    <div className="grid grid-flow-cols-1 lg:grid-cols-4 mt-5">
  {data.map((post, idx) => (
    <Card key={idx}>
      {post.titleImage ? (
        <Image 
          src={urlFor(post.titleImage).url()} 
          alt="image" 
          width={500} 
          height={500} 
        />
      ) : (
        <div style={{ width: 500, height: 500, backgroundColor: "#f0f0f0" }}>
          No Image
        </div>
      )}
    </Card>
  ))}
</div>

  );
}
