import { Github, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="border-t border-border py-8 px-6 md:px-12 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Powered by</span>
            <span className="font-serif font-semibold">@blogsite</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full hover:bg-accent transition-smooth"
              asChild
            >
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-4 w-4" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full hover:bg-accent transition-smooth"
              asChild
            >
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full hover:bg-accent transition-smooth"
              asChild
            >
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground">
            @blogsite.com
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
