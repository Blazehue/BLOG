import { Link } from "react-router-dom";
import { Moon, Sun, User, LogOut, LayoutDashboard, FileText, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/components/theme-provider";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="border-b border-border py-6 px-6 md:px-12 rounded-b-2xl bg-card">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center transition-smooth group-hover:scale-110">
            <span className="text-primary-foreground font-bold text-sm">B</span>
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight">BLOG</span>
        </Link>
        
        <div className="flex items-center gap-3">
          {isAuthenticated && (
            <nav className="hidden md:flex items-center gap-1 mr-2">
              <Link to="/dashboard">
                <Button variant="ghost" className="rounded-xl">Dashboard</Button>
              </Link>
              <Link to="/my-blogs">
                <Button variant="ghost" className="rounded-xl">My Blogs</Button>
              </Link>
            </nav>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="transition-smooth hover:bg-accent rounded-xl"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-10 w-10 rounded-full p-0">
                  <Avatar className="rounded-full">
                    <AvatarImage src={user.avatar} alt={user.username} />
                    <AvatarFallback className="rounded-full">
                      {user.fullName?.charAt(0) || user.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-xl">
                <div className="px-2 py-2">
                  <p className="text-sm font-medium">{user.fullName || user.username}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="cursor-pointer rounded-lg">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/my-blogs" className="cursor-pointer rounded-lg">
                    <FileText className="mr-2 h-4 w-4" />
                    My Blogs
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={`/profile/${user.username}`} className="cursor-pointer rounded-lg">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="cursor-pointer rounded-lg">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600 rounded-lg">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" className="rounded-xl">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

