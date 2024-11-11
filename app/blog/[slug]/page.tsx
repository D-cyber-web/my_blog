import { fullBlog } from "@/app/lib/interface";
import { client } from "@/app/lib/sanity";

async function getData(slug: string) {
  const query = `
        *[_type == "blog" && slug.current == '${slug}'] {
            "currentSlug": slug.current,
            title,
            content,
            titleImage
        }[0]
    `;
  const data = await client.fetch(query);
  return data;
}

export default async function BlogArticle({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullBlog = await getData(params.slug);

  return (
    <div>
        <h1>
            <span className="block text-base text-center text-primary">Davie Muthama - Blog</span>
        </h1>
    </div>
  )
}
