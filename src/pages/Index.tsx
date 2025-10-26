import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { blogPosts } from "@/data/blogPosts";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 px-6 md:px-12 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">Latest Updates</h1>
            <p className="text-muted-foreground text-lg">
              Thoughts, ideas, and stories from our community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} {...post} />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
