import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { blogPosts } from "@/data/blogPosts";
import { useBlog } from "@/contexts/BlogContext";

const Index = () => {
  const { getPublishedBlogs } = useBlog();
  
  // Get all published blogs from users
  const userPublishedBlogs = getPublishedBlogs();
  
  // Combine sample blogs with user-created published blogs
  const allBlogs = [...blogPosts, ...userPublishedBlogs];
  
  // Sort by date (newest first)
  const sortedBlogs = allBlogs.sort((a, b) => {
    const dateA = new Date((a as any).date || (a as any).updatedAt || (a as any).createdAt || Date.now()).getTime();
    const dateB = new Date((b as any).date || (b as any).updatedAt || (b as any).createdAt || Date.now()).getTime();
    return dateB - dateA;
  });

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
            {sortedBlogs.map((post) => (
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
