 import { Card, CardContent } from "@/components/ui/card";
import { simpleBlogCard } from "./lib/interface";
import { client, urlFor } from "./lib/sanity";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";


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
    <div className="grid grid-flow-cols-1 md:grid-cols-2 mt-5 gap-5">
  {data.map((post, idx) => (
    <Card key={idx}>
      {post.titleImage ? (
        <Image 
          src={urlFor(post.titleImage).url()} 
          alt="image" 
          width={800} 
          height={800} 
          className="rounded-t-lg h-[150px]"
        />
        
      ) : (
        <div style={{ width: 500, height: 500, backgroundColor: "#f0f0f0" }}>
          No Image
        </div>
      )}
      <CardContent className="mt-5">
          <h3 className="text-xl line-clamp-2 font-bold">{post.title}</h3>
          <p className="text-sm line-clamp-3 mt-2 text-gray-600 dark:text-gray-300">{post.smallDescription}</p>

          <Button asChild className="w-full mt-7" >
              <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
          </Button>
      </CardContent>
    </Card>
  ))}
</div>

  );
}
