import { posts, type Post } from '#site/content';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Mdx } from '@/components/mdx-components';

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = posts.find((post) => post.slug === resolvedParams.slug);
  if (!post) {
    return {};
  }
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      images: post.image ? [post.image] : ['/og-image.png'],
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = posts.find((post) => post.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="prose dark:prose-invert mx-auto p-8">
      <h1 className="text-5xl font-bold">{post.title}</h1>
      {post.description && <p className="text-xl mt-4 text-zinc-600 dark:text-zinc-400">{post.description}</p>}
      <hr className="my-4" />
      <Mdx code={post.content} />
    </article>
  );
}
