import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-dvh bg-[url('/bg.png')] bg-no-repeat bg-center bg-cover bg-fixed">
      <section className="min-h-dvh bg-black/80 flex items-center justify-center">
        <div className="text-white lg:w-2/3 space-y-7 p-4">
          <h1 className="text-2xl font-semibold uppercase">This is <span className="text-amber-600">CodeCache</span>. Programming made easy.</h1>
          <p className="text-lg font-light">
            CodeCache is a collection of reusable, polished components designed to help developers build faster and smarter. 
            Explore a growing set of tools and UI elements that make programming simpler,
             more efficient, and more consistent—so you can focus on creating great experiences instead of reinventing the basics.
          </p>

          <div className="flex max-md:flex-col items-center gap-5">
            <Link href={"#"} className="bg-amber-600 rounded-md px-8 py-3 hover:bg-amber-700 transition-all duration-200 max-md:w-full text-center">Explore Components</Link>
            <Link href={"/auth/signin"} className="border border-amber-600 rounded-md px-8 py-3 hover:bg-black/50 transition-all duration-200 max-md:w-full text-center">Sign Up for Free</Link>
          </div>
        </div>
      </section>
    </main>
  );
}