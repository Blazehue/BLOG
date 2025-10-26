import { useEffect, useState } from "react";

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [logoVisible, setLogoVisible] = useState(false);

  useEffect(() => {
    // Show logo with fade in
    const showTimer = setTimeout(() => {
      setLogoVisible(true);
    }, 100);

    // Hide logo and splash screen
    const hideTimer = setTimeout(() => {
      setLogoVisible(false);
      
      // Wait for fade out animation to complete
      setTimeout(() => {
        setIsVisible(false);
        onComplete();
      }, 500);
    }, 2000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-500 ${
        logoVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`flex flex-col items-center gap-6 transition-all duration-700 ${
          logoVisible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        }`}
      >
        {/* Logo Circle */}
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
          <div className="relative w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-2xl">
            <span className="text-primary-foreground font-bold text-4xl">B</span>
          </div>
        </div>

        {/* Brand Name */}
        <div className="flex flex-col items-center gap-2">
          <h1 className="font-serif text-5xl font-bold tracking-tight">BLOG</h1>
          <div className="h-1 w-16 bg-primary rounded-full" />
          <p className="text-muted-foreground text-sm tracking-widest uppercase">
            Editorial Magazine
          </p>
        </div>

        {/* Loading Animation */}
        <div className="flex gap-2 mt-4">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
