'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// Since Velite updates #site/content statically at build/dev time,
// we might not get immediate updates in client components without a refresh,
// but for simplicity we will handle it locally.

export default function AdminPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [slugToDelete, setSlugToDelete] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Adding post...');
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
      if (res.ok) {
        setMessage('Post added successfully!');
        setTitle('');
        setContent('');
        setTimeout(() => router.refresh(), 1000);
      } else {
        const error = await res.json();
        setMessage(`Error: ${error.message}`);
      }
    } catch (err) {
      setMessage('Failed to add post.');
    }
  };

  const handleDeletePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Deleting post...');
    try {
      const res = await fetch('/api/posts', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: slugToDelete }),
      });
      if (res.ok) {
        setMessage('Post deleted successfully!');
        setSlugToDelete('');
        setTimeout(() => router.refresh(), 1000);
      } else {
        const error = await res.json();
        setMessage(`Error: ${error.message}`);
      }
    } catch (err) {
      setMessage('Failed to delete post.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-[50vh] p-8 max-w-4xl mx-auto space-y-12">
      <h1 className="text-4xl font-bold">Admin Dashboard</h1>
      {message && <div className="p-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full text-center font-bold text-zinc-900 dark:text-zinc-100">{message}</div>}

      <div className="w-full bg-white dark:bg-zinc-900 p-6 rounded-lg shadow border border-zinc-200 dark:border-zinc-800">
        <h2 className="text-2xl font-semibold mb-4">Add New Post</h2>
        <form onSubmit={handleAddPost} className="flex flex-col space-y-4">
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-zinc-300 dark:border-zinc-700 p-2 rounded bg-transparent dark:text-white"
              placeholder="Post title"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Content (Markdown)</label>
            <textarea
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-zinc-300 dark:border-zinc-700 p-2 rounded h-48 bg-transparent dark:text-white font-mono"
              placeholder="Write your markdown content here..."
            />
          </div>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors w-32">
            Add Post
          </button>
        </form>
      </div>

      <div className="w-full bg-white dark:bg-zinc-900 p-6 rounded-lg shadow border border-zinc-200 dark:border-zinc-800">
        <h2 className="text-2xl font-semibold mb-4 text-red-600">Danger Zone: Delete Post</h2>
        <form onSubmit={handleDeletePost} className="flex flex-col space-y-4">
          <div>
            <label className="block mb-1 font-medium">Post Slug</label>
            <input
              type="text"
              required
              value={slugToDelete}
              onChange={(e) => setSlugToDelete(e.target.value)}
              className="w-full border border-zinc-300 dark:border-zinc-700 p-2 rounded bg-transparent dark:text-white"
              placeholder="e.g. my-awesome-post"
            />
          </div>
          <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors w-32">
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}