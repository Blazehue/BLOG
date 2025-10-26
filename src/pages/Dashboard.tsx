import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useBlog } from "@/contexts/BlogContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Eye, FileText, CheckCircle, Edit } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const { getUserBlogs } = useBlog();

  const userBlogs = user ? getUserBlogs(user.id) : [];
  const publishedBlogs = userBlogs.filter((blog) => blog.status === "published");
  const draftBlogs = userBlogs.filter((blog) => blog.status === "draft");
  const totalViews = publishedBlogs.reduce((sum, blog) => sum + blog.views, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 px-6 md:px-12 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
            <div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-2">
                Welcome back, {user?.fullName || user?.username}!
              </h1>
              <p className="text-muted-foreground text-lg">
                Manage your blogs and track your performance
              </p>
            </div>
            <Link to="/create-blog">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-6 rounded-xl"
              >
                <Plus className="mr-2 h-5 w-5" />
                Create New Blog
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="p-6 border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Total Blogs
                </p>
                <FileText className="h-5 w-5 text-zinc-400" />
              </div>
              <p className="text-4xl font-bold">{userBlogs.length}</p>
            </Card>

            <Card className="p-6 border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Total Views
                </p>
                <Eye className="h-5 w-5 text-zinc-400" />
              </div>
              <p className="text-4xl font-bold">{totalViews.toLocaleString()}</p>
            </Card>

            <Card className="p-6 border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Published
                </p>
                <CheckCircle className="h-5 w-5 text-emerald-600" />
              </div>
              <p className="text-4xl font-bold">{publishedBlogs.length}</p>
            </Card>

            <Card className="p-6 border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Drafts
                </p>
                <Edit className="h-5 w-5 text-zinc-400" />
              </div>
              <p className="text-4xl font-bold">{draftBlogs.length}</p>
            </Card>
          </div>

          {/* Published Blogs Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-3xl font-bold">Your Published Blogs</h2>
              <Link
                to="/my-blogs"
                className="text-primary hover:text-primary/90 font-medium flex items-center gap-1"
              >
                View All Blogs →
              </Link>
            </div>

            {publishedBlogs.length === 0 ? (
              <Card className="p-12 text-center border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm">
                <div className="max-w-md mx-auto">
                  <FileText className="h-16 w-16 text-zinc-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No published blogs yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Start creating and publishing your blog posts to share your stories with the world.
                  </p>
                  <Link to="/create-blog">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Your First Blog
                    </Button>
                  </Link>
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {publishedBlogs.map((blog) => (
                  <BlogCard key={blog.id} {...blog} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
