import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useBlog } from "@/contexts/BlogContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Upload, X } from "lucide-react";

const categories = ["Technology", "Lifestyle", "Travel", "Food", "Design", "Business", "Health", "Other"];

const CreateBlog = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createBlog } = useBlog();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: "",
    coverImage: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string>("");

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (formData.title || formData.content) {
        handleSaveDraft(true);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, upload to server/CDN
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, coverImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveDraft = async (isAutoSave = false) => {
    if (!user || !formData.title) return;

    setIsSaving(true);

    try {
      createBlog({
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        image: formData.coverImage,
        category: formData.category || "Other",
        tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
        status: "draft",
        slug: "",
        userId: user.id,
        author: {
          name: user.fullName || user.username,
          avatar: user.avatar || "",
        },
        date: new Date().toISOString(),
        readTime: `${Math.ceil(formData.content.split(" ").length / 200)} min read`,
      });

      const time = new Date().toLocaleTimeString();
      setLastSaved(time);

      if (!isAutoSave) {
        toast({
          title: "Draft saved",
          description: "Your blog has been saved as a draft.",
        });
        navigate("/my-blogs");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save draft",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!user || !formData.title || !formData.content) {
      toast({
        title: "Missing information",
        description: "Please fill in title and content before publishing.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    try {
      createBlog({
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        image: formData.coverImage,
        category: formData.category || "Other",
        tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
        status: "published",
        slug: "",
        userId: user.id,
        author: {
          name: user.fullName || user.username,
          avatar: user.avatar || "",
        },
        date: new Date().toISOString(),
        readTime: `${Math.ceil(formData.content.split(" ").length / 200)} min read`,
      });

      toast({
        title: "Blog published!",
        description: "Your blog has been published successfully.",
      });
      
      navigate("/my-blogs");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to publish blog",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-zinc-900">
      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 sticky top-0 z-10">
        <div className="px-6 md:px-12 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <h1 className="font-serif text-2xl font-bold">New Blog</h1>
            </div>

            <div className="flex items-center gap-3">
              {lastSaved && (
                <span className="text-sm text-muted-foreground hidden md:block">
                  Saved at {lastSaved}
                </span>
              )}
              <Button
                variant="outline"
                onClick={() => handleSaveDraft()}
                disabled={isSaving}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button
                className="bg-orange-600 hover:bg-orange-700 text-white"
                onClick={handlePublish}
                disabled={isSaving}
              >
                Publish
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Editor */}
      <main className="px-6 md:px-12 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Cover Image */}
          <div className="space-y-2">
            <Label>Cover Image</Label>
            {formData.coverImage ? (
              <div className="relative h-[300px] rounded overflow-hidden border-2 border-zinc-200 dark:border-zinc-800">
                <img
                  src={formData.coverImage}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setFormData({ ...formData, coverImage: "" })}
                  className="absolute top-2 right-2 p-2 bg-white dark:bg-zinc-800 rounded-full shadow-lg hover:bg-zinc-100 dark:hover:bg-zinc-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-[300px] border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded cursor-pointer hover:border-orange-500 dark:hover:border-orange-500 transition-colors bg-white dark:bg-zinc-800">
                <Upload className="h-12 w-12 text-zinc-400 mb-2" />
                <p className="text-sm text-muted-foreground">
                  Drag & drop or click to upload
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Recommended: 1200x630px
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Input
              name="title"
              placeholder="Enter your blog title..."
              value={formData.title}
              onChange={handleChange}
              className="text-4xl font-serif font-bold border-0 border-b border-zinc-200 dark:border-zinc-800 rounded-none px-0 focus-visible:ring-0 focus-visible:border-orange-600"
            />
            <p className="text-xs text-muted-foreground">
              {formData.title.length}/100 characters
            </p>
          </div>

          {/* Excerpt */}
          <div className="space-y-2">
            <Textarea
              name="excerpt"
              placeholder="Add a short description..."
              value={formData.excerpt}
              onChange={handleChange}
              className="text-lg resize-none"
              rows={2}
              maxLength={160}
            />
            <p className="text-xs text-muted-foreground">
              {formData.excerpt.length}/160 characters
            </p>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label>Content</Label>
            <Textarea
              name="content"
              placeholder="Write your blog content here..."
              value={formData.content}
              onChange={handleChange}
              className="min-h-[500px] text-lg leading-relaxed font-serif"
            />
            <p className="text-xs text-muted-foreground">
              {formData.content.split(" ").filter(Boolean).length} words •{" "}
              {Math.ceil(formData.content.split(" ").filter(Boolean).length / 200)} min read
            </p>
          </div>

          {/* Settings */}
          <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h3 className="text-xl font-semibold mb-6">Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  name="tags"
                  placeholder="tag1, tag2, tag3"
                  value={formData.tags}
                  onChange={handleChange}
                />
                <p className="text-xs text-muted-foreground">
                  Separate tags with commas
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateBlog;
