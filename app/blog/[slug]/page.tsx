import { fullBlog } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "next-sanity";
import Image from "next/image";

async function getData(slug: string) {
  const query = `
        *[_type == "blog" && slug.current == $slug] {
            "currentSlug": slug.current,
            title,
            content,
            titleImage
        }[0]
    `;
  const data = await client.fetch(query, { slug });
  return data;
}

export default async function BlogArticle({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params; // Access slug directly

  const data: fullBlog = await getData(slug);

  return (
    <div className="mt-8">
      <h1>
        <span className="block text-xl text-center text-primary font-semibold tracking-wide uppercase">
          Davie Muthama - Blog
        </span>
        <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
          {data.title}
        </span>
      </h1>

      <Image
        src={urlFor(data.titleImage).url()}
        width={800}
        height={800}
        alt="Title Image"
        priority
        className="rounded-lg mt-8 border"
      />
      <div className="mt-16 prose prose-blue prose-xl dark:prose-invert prose-li:marker:text-primary prose-a:text-primary">
          <PortableText value={data.content} />
      </div>
    </div>
  );
}