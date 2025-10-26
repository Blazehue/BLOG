import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useBlog } from "@/contexts/BlogContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Eye, FileText, CheckCircle, Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";

const Dashboard = () => {
  const { user } = useAuth();
  const { getUserBlogs } = useBlog();

  const userBlogs = user ? getUserBlogs(user.id) : [];
  const publishedBlogs = userBlogs.filter((blog) => blog.status === "published");
  const draftBlogs = userBlogs.filter((blog) => blog.status === "draft");
  const totalViews = publishedBlogs.reduce((sum, blog) => sum + blog.views, 0);

  const recentBlogs = userBlogs
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

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

          {/* Recent Blogs */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-3xl font-bold">Your Blogs</h2>
              <Link
                to="/my-blogs"
                className="text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1"
              >
                View All →
              </Link>
            </div>

            {recentBlogs.length === 0 ? (
              <Card className="p-12 text-center border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm">
                <div className="max-w-md mx-auto">
                  <FileText className="h-16 w-16 text-zinc-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No blogs yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Start creating your first blog post and share your stories with the world.
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
              <div className="space-y-4">
                {recentBlogs.map((blog) => (
                  <Card
                    key={blog.id}
                    className="p-6 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors rounded-2xl shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-serif text-xl font-semibold truncate">
                            {blog.title}
                          </h3>
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
                              blog.status === "published"
                                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                : blog.status === "scheduled"
                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                : "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
                            }`}
                          >
                            {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-2">
                          {blog.status === "published" ? (
                            <>
                              <span>Published: {format(new Date(blog.updatedAt), "MMM dd, yyyy")}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                {blog.views} views
                              </span>
                            </>
                          ) : (
                            <span>Last edited: {format(new Date(blog.updatedAt), "MMM dd, yyyy")}</span>
                          )}
                        </div>

                        {blog.excerpt && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {blog.excerpt}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <Link to={`/edit-blog/${blog.id}`}>
                          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/90 rounded-lg">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </Link>
                        {blog.status === "published" && (
                          <Link to={`/post/${blog.id}`}>
                            <Button variant="ghost" size="sm" className="rounded-lg">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </Card>
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
