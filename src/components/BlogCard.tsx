import { Link } from "react-router-dom";
import { Calendar, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readTime: string;
}

const BlogCard = ({ id, title, excerpt, image, author, date, readTime }: BlogCardProps) => {
  return (
    <Link to={`/post/${id}`} className="block group">
      <Card className="overflow-hidden border border-border hover:shadow-lg transition-smooth bg-card">
        <div className="aspect-[4/3] overflow-hidden bg-muted">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-smooth group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <h3 className="font-serif text-xl font-semibold mb-3 line-clamp-2 group-hover:text-muted-foreground transition-fast">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
            {excerpt}
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={author.avatar} alt={author.name} />
                <AvatarFallback>{author.name[0]}</AvatarFallback>
              </Avatar>
              <span className="text-xs font-medium">{author.name}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{date}</span>
              </div>
              <span>{readTime}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default BlogCard;
