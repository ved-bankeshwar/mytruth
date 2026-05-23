import { posts, type Post } from '#site/content';
import Link from 'next/link';

export default function Blog() {
  return (
    <main className="p-8">
      <h1 className="text-5xl font-bold">Blog</h1>
      <div className="grid gap-8 mt-8">
        {posts.map((post: Post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <div className="border p-4 rounded-lg">
              <h3 className="text-2xl font-bold">{post.title}</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mt-2">{post.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-zinc-500">{post.date}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
