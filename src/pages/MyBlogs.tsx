import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useBlog, BlogStatus } from "@/contexts/BlogContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, MoreVertical, Edit, Eye, Trash2, Copy, FileText } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const MyBlogs = () => {
  const { user } = useAuth();
  const { getUserBlogs, deleteBlog } = useBlog();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<"all" | BlogStatus | "scheduled">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "oldest" | "views" | "az">("recent");
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);

  const userBlogs = user ? getUserBlogs(user.id) : [];

  // Filter blogs
  const filteredBlogs = userBlogs.filter((blog) => {
    if (activeTab !== "all" && blog.status !== activeTab) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        blog.title.toLowerCase().includes(query) ||
        blog.excerpt.toLowerCase().includes(query)
      );
    }
    return true;
  });

  // Sort blogs
  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      case "oldest":
        return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
      case "views":
        return b.views - a.views;
      case "az":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const handleDelete = (id: string) => {
    deleteBlog(id);
    setBlogToDelete(null);
    toast({
      title: "Blog deleted",
      description: "Your blog has been deleted successfully.",
    });
  };

  const handleDuplicate = (blog: any) => {
    // In a real app, this would create a copy of the blog
    toast({
      title: "Blog duplicated",
      description: "A copy of your blog has been created as a draft.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 px-6 md:px-12 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <h1 className="font-serif text-4xl md:text-5xl font-bold">My Blogs</h1>
            <Link to="/create-blog">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-6 rounded-xl"
              >
                <Plus className="mr-2 h-5 w-5" />
                New Blog
              </Button>
            </Link>
          </div>

          {/* Filters */}
          <div className="mb-8">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="mb-6">
              <TabsList className="bg-transparent border-b border-zinc-200 dark:border-zinc-800 rounded-none p-0 h-auto">
                <TabsTrigger
                  value="all"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-600 data-[state=active]:bg-transparent px-6 py-3"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="published"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-600 data-[state=active]:bg-transparent px-6 py-3"
                >
                  Published
                </TabsTrigger>
                <TabsTrigger
                  value="draft"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-600 data-[state=active]:bg-transparent px-6 py-3"
                >
                  Drafts
                </TabsTrigger>
                <TabsTrigger
                  value="scheduled"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-600 data-[state=active]:bg-transparent px-6 py-3"
                >
                  Scheduled
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search your blogs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 rounded-xl"
                />
              </div>

              {/* Sort */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-12 px-6 rounded-xl">
                    Sort: {sortBy === "recent" ? "Recent" : sortBy === "oldest" ? "Oldest" : sortBy === "views" ? "Most Viewed" : "A-Z"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-xl">
                  <DropdownMenuItem onClick={() => setSortBy("recent")}>
                    Recent
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("oldest")}>
                    Oldest
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("views")}>
                    Most Viewed
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("az")}>
                    A-Z
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Blog List */}
          {sortedBlogs.length === 0 ? (
            <Card className="p-12 text-center border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm">
              <FileText className="h-16 w-16 text-zinc-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {searchQuery ? "No blogs found" : "No blogs yet"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery
                  ? "Try adjusting your search query"
                  : "Start creating your first blog post"}
              </p>
              {!searchQuery && (
                <Link to="/create-blog">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Blog
                  </Button>
                </Link>
              )}
            </Card>
          ) : (
            <div className="space-y-4">
              {sortedBlogs.map((blog) => (
                <Card
                  key={blog.id}
                  className="p-0 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors overflow-hidden rounded-2xl shadow-sm"
                >
                  <div className="flex flex-col md:flex-row gap-4 p-6">
                    {/* Thumbnail */}
                    {blog.image && (
                      <div className="w-full md:w-32 h-32 md:h-20 flex-shrink-0">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="font-serif text-xl font-semibold line-clamp-1">
                          {blog.title}
                        </h3>
                        
                        {/* Actions Menu */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="flex-shrink-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link to={`/edit-blog/${blog.id}`} className="cursor-pointer">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            {blog.status === "published" && (
                              <DropdownMenuItem asChild>
                                <Link to={`/post/${blog.id}`} className="cursor-pointer">
                                  <Eye className="h-4 w-4 mr-2" />
                                  View
                                </Link>
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={() => handleDuplicate(blog)}>
                              <Copy className="h-4 w-4 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => setBlogToDelete(blog.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {blog.excerpt && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {blog.excerpt}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            blog.status === "published"
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                              : blog.status === "scheduled"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                              : "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
                          }`}
                        >
                          {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
                        </span>
                        <span>•</span>
                        {blog.status === "published" ? (
                          <>
                            <span>{format(new Date(blog.updatedAt), "MMM dd, yyyy")}</span>
                            <span>•</span>
                            <span>{blog.views} views</span>
                          </>
                        ) : (
                          <span>Last edited: {format(new Date(blog.updatedAt), "MMM dd, yyyy")}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!blogToDelete} onOpenChange={() => setBlogToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Blog?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your blog post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => blogToDelete && handleDelete(blogToDelete)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MyBlogs;
