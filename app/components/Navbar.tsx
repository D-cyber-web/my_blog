import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full relative flex items-center justify-between max-w-6xl mx-auto px-4 py-5">
      <Link href="/" className="font-bold text-4xl">
        Muthama<span className="text-blue-500">Blog</span>
      </Link>
    </nav>
  );
}
 