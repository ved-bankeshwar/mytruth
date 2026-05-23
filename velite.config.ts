import { defineConfig, s } from 'velite';

const posts = {
  name: 'Post',
  pattern: 'blog/**/*.mdx',
  schema: s.object({
    slug: s.path().transform((p) => p.replace(/^blog\//, '')),
    title: s.string(),
    description: s.string().optional(),
    date: s.string(),
    image: s.string().optional(),
    content: s.mdx(),
  }),
};

export default defineConfig({
  collections: { posts },
});
