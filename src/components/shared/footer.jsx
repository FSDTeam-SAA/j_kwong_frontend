import Link from "next/link";
import { Facebook, Twitter, Youtube, Linkedin } from "lucide-react";

export default function Footer() {
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
              Welcome to [College Name]'s Student-Run Environmental Publication,
              a platform created and managed by students passionate about
              protecting our planet. Our mission is to raise awareness and
              promote sustainability.
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
                href="#"
                className="block text-textPrimary hover:text-primary transition-colors text-sm md:text-base"
              >
                HOME
              </Link>
              <Link
                href="#"
                className="block text-textPrimary hover:text-primary transition-colors text-sm md:text-base"
              >
                ARTICLES
              </Link>
              <Link
                href="#"
                className="block text-textPrimary hover:text-primary transition-colors text-sm md:text-base"
              >
                ABOUT US
              </Link>
              <Link
                href="#"
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
              <Link
                href="#"
                className="block text-textPrimary hover:text-primary transition-colors text-sm md:text-base"
              >
                Jeremy Clarkson: Diddy Squat the Environment?
              </Link>
              <Link
                href="#"
                className="block text-textPrimary hover:text-primary transition-colors text-sm md:text-base"
              >
                The Environmental Impact of Common Land in the UK
              </Link>
              <Link
                href="#"
                className="block text-textPrimary hover:text-primary transition-colors text-sm md:text-base"
              >
                The Paris Olympics: How Sustainable Were They?
              </Link>
              <Link
                href="#"
                className="block text-textPrimary hover:text-primary transition-colors text-sm md:text-base"
              >
                Why Nuclear Power Hasn't Taken Over the Energy Industry... Yet
              </Link>
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
              <p>Company address</p>
              <p>e-mail: example@gmail.com</p>
              <p>Contact: 4654444</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
