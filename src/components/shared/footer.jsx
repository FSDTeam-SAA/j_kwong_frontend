import Link from "next/link";
import { Facebook, Twitter, Youtube, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Footer() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/blogs?limit=4`
        );
        setBlogs(response.data.data); // Adjust based on API response structure
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);
  console.log(blogs);
  return (
    <footer className="py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="text-lg md:text-xl">The</div>
              <div className="text-xl md:text-2xl font-semibold">
                <span className="text-primary">Green</span> Cloister
              </div>
            </div>
            <p className="text-textPrimary text-sm md:text-base leading-relaxed">
              The Green Cloister is an independent environmental publication,
              created by passionate students from Winchester College. Our
              mission is to raise awareness and promote sustainability across
              campus and beyond.
            </p>
            <div className="flex gap-4 text-gray-400">
              <Link href="#" className="hover:text-primary transition-colors">
                <Facebook size={24} />
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <Twitter size={24} />
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <Youtube size={24} />
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <Linkedin size={24} />
              </Link>
            </div>
          </div>

          {/* Navigate Section */}
          <div className="space-y-4">
            <div className="flex border border-transparent gap-2 border-b-primary">
              <div className="h-[28px] w-2 bg-primary ml-[-1px]"></div>
              <h3 className="text-primary font-medium tracking-wide text-lg md:text-xl">
                NAVIGATE
              </h3>
            </div>
            <nav className="space-y-2">
              <Link
                href="/"
                className="block text-textPrimary hover:text-primary transition-colors text-sm md:text-base"
              >
                HOME
              </Link>
              <Link
                href="/article"
                className="block text-textPrimary hover:text-primary transition-colors text-sm md:text-base"
              >
                ARTICLES
              </Link>
              <Link
                href="/about"
                className="block text-textPrimary hover:text-primary transition-colors text-sm md:text-base"
              >
                ABOUT US
              </Link>
              <Link
                href="/contact"
                className="block text-textPrimary hover:text-primary transition-colors text-sm md:text-base"
              >
                CONTACT US
              </Link>
            </nav>
          </div>

          {/* Recent Posts Section */}
          <div className="space-y-4">
            <div className="flex border border-transparent gap-2 border-b-primary">
              <div className="h-[28px] w-2 bg-primary ml-[-1px]"></div>
              <h3 className="text-primary font-medium tracking-wide text-lg md:text-xl">
                RECENT POSTS
              </h3>
            </div>
            <nav className="space-y-2">
              {blogs.map((blog) => (
                <Link
                  key={blog._id}
                  href={`/article/${blog.slug}`}
                  className="block text-textPrimary hover:text-primary transition-colors text-sm md:text-base !line-clamp-2"
                >
                  {blog.title}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <div className="flex border border-transparent gap-2 border-b-primary">
              <div className="h-[28px] w-2 bg-primary ml-[-1px]"></div>
              <h3 className="text-primary font-medium tracking-wide text-lg md:text-xl">
                CONTACT
              </h3>
            </div>
            <div className="space-y-2 text-textPrimary text-sm md:text-base">
              <p>E-mail: thegreencloister@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
