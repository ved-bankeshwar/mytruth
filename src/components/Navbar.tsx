import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="flex justify-center items-center space-x-4 p-4 bg-white dark:bg-black">
      <Link href="/" className="text-zinc-950 dark:text-zinc-50">Home</Link>
      <Link href="/blog" className="text-zinc-950 dark:text-zinc-50">Blog</Link>
      <Link href="/about" className="text-zinc-950 dark:text-zinc-50">About</Link>
    </nav>
  );
};

export default Navbar;
