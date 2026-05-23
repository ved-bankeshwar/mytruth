import { posts } from '#site/content';
import Link from 'next/link';

export default function Home() {
  const sortedPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className="p-8">
      {/* Hero Section */}
      <section className="text-center my-16">
        <h1 className="text-5xl font-bold">TheTruth</h1>
        <p className="text-xl mt-4 text-zinc-600 dark:text-zinc-400">Welcome to my corner of the internet.</p>
      </section>

      {/* Blog Post List */}
      <section>
        <h2 className="text-3xl font-bold mb-8">Recent Posts</h2>
        <div className="grid gap-8">
          {sortedPosts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="block border p-4 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <h3 className="text-2xl font-bold">{post.title}</h3>
              {post.description && <p className="text-zinc-600 dark:text-zinc-400 mt-2">{post.description}</p>}
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-zinc-500">{new Date(post.date).toLocaleDateString()}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

