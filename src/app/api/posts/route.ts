import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'content/blog');

// Function to create a slug from a title
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Remove duplicate hyphens
}

export async function POST(req: NextRequest) {
  try {
    const { title, content } = await req.json();

    if (!title || !content) {
      return NextResponse.json({ message: 'Title and content are required' }, { status: 400 });
    }

    const slug = createSlug(title);
    const filePath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContent = `---
title: "${title}"
date: "${new Date().toISOString().split('T')[0]}"
---

${content}`;

    await fs.writeFile(filePath, fileContent);

    return NextResponse.json({ message: 'Post created successfully', slug }, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ message: 'Error creating post' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { slug } = await req.json();

    if (!slug) {
      return NextResponse.json({ message: 'Slug is required' }, { status: 400 });
    }

    const filePath = path.join(postsDirectory, `${slug}.mdx`);

    try {
      await fs.unlink(filePath);
      return NextResponse.json({ message: 'Post deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting post file:', error);
        // This is a bit of a workaround for when the file doesn't exist.
        // A better implementation would check if the file exists first.
        return NextResponse.json({ message: 'Post not found or already deleted' }, { status: 404 });
    }

  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ message: 'Error deleting post' }, { status: 500 });
  }
}
