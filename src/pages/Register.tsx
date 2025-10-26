import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Loader2, Check } from "lucide-react";
import { useTheme } from "next-themes";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const getPasswordStrength = (password: string): { strength: string; color: string; width: string } => {
    if (!password) return { strength: "", color: "", width: "0%" };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return { strength: "Weak", color: "bg-red-600", width: "25%" };
    if (score === 2) return { strength: "Fair", color: "bg-yellow-600", width: "50%" };
    if (score === 3) return { strength: "Good", color: "bg-blue-600", width: "75%" };
    return { strength: "Strong", color: "bg-emerald-600", width: "100%" };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };

    switch (name) {
      case "fullName":
        if (!value) {
          newErrors.fullName = "Full name is required";
        } else if (value.length < 2) {
          newErrors.fullName = "Name must be at least 2 characters";
        } else {
          delete newErrors.fullName;
        }
        break;

      case "username":
        if (!value) {
          newErrors.username = "Username is required";
        } else if (value.length < 3) {
          newErrors.username = "Username must be at least 3 characters";
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          newErrors.username = "Username can only contain letters, numbers, and underscores";
        } else {
          delete newErrors.username;
        }
        break;

      case "email":
        if (!value) {
          newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = "Please enter a valid email";
        } else {
          delete newErrors.email;
        }
        break;

      case "password":
        if (!value) {
          newErrors.password = "Password is required";
        } else {
          const requirements = [];
          if (value.length < 8) requirements.push("8 characters");
          if (!/[A-Z]/.test(value)) requirements.push("one uppercase letter");
          if (!/[0-9]/.test(value)) requirements.push("one number");
          if (!/[^A-Za-z0-9]/.test(value)) requirements.push("one special character");

          if (requirements.length > 0) {
            newErrors.password = `Password needs: ${requirements.join(", ")}`;
          } else {
            delete newErrors.password;
          }
        }
        break;

      case "confirmPassword":
        if (!value) {
          newErrors.confirmPassword = "Please confirm your password";
        } else if (value !== formData.password) {
          newErrors.confirmPassword = "Passwords do not match";
        } else {
          delete newErrors.confirmPassword;
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key as keyof typeof formData]);
    });

    if (!agreeToTerms) {
      toast({
        title: "Terms required",
        description: "You must agree to the Terms of Service and Privacy Policy",
        variant: "destructive",
      });
      return;
    }

    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsLoading(true);

    try {
      await register({
        fullName: formData.fullName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      toast({
        title: "Account created!",
        description: "Welcome to BLOG. Your account has been created successfully.",
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const passwordsMatch = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-stone-50 dark:bg-zinc-900">
      <div className="absolute top-6 right-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? "🌞" : "🌙"}
        </Button>
      </div>

      <div className="w-full max-w-[440px]">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link to="/" className="inline-block">
            <h1 className="font-serif text-3xl font-bold">BLOG</h1>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-8 md:p-12 rounded-2xl shadow-lg">
          <h2 className="font-serif text-3xl font-bold text-center mb-8">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                className={`h-12 ${errors.fullName ? "border-red-600" : ""} rounded-xl`}
              />
              {errors.fullName && (
                <p className="text-sm text-red-600">{errors.fullName}</p>
              )}
            </div>

            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="johndoe"
                value={formData.username}
                onChange={handleChange}
                className={`h-12 ${errors.username ? "border-red-600" : ""} rounded-xl`}
              />
              {errors.username && (
                <p className="text-sm text-red-600">{errors.username}</p>
              )}
              {!errors.username && formData.username.length >= 3 && (
                <p className="text-sm text-emerald-600 flex items-center gap-1">
                  <Check size={14} /> Username available
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                className={`h-12 ${errors.email ? "border-red-600" : ""} rounded-xl`}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`h-12 pr-10 ${errors.password ? "border-red-600" : ""} rounded-xl`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 dark:text-zinc-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
              {/* Password Strength Bar */}
              {formData.password && (
                <div>
                  <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${passwordStrength.color} transition-all duration-300`}
                      style={{ width: passwordStrength.width }}
                    />
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                    Password strength: {passwordStrength.strength}
                  </p>
                </div>
              )}

              {errors.password && (
                <p className="text-sm text-red-600">{errors.password}</p>
              )}

              {/* Password Requirements */}
              <div className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1 mt-2">
                <p>Password must contain:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li className={formData.password.length >= 8 ? "text-emerald-600" : ""}>
                    Minimum 8 characters
                  </li>
                  <li className={/[A-Z]/.test(formData.password) ? "text-emerald-600" : ""}>
                    One uppercase letter
                  </li>
                  <li className={/[0-9]/.test(formData.password) ? "text-emerald-600" : ""}>
                    One number
                  </li>
                  <li className={/[^A-Za-z0-9]/.test(formData.password) ? "text-emerald-600" : ""}>
                    One special character
                  </li>
                </ul>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`h-12 pr-10 ${errors.confirmPassword ? "border-red-600" : ""} rounded-xl`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 dark:text-zinc-400"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-600">{errors.confirmPassword}</p>
              )}
              {passwordsMatch && (
                <p className="text-sm text-emerald-600 flex items-center gap-1">
                  <Check size={14} /> Passwords match
                </p>
              )}
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start space-x-2 pt-2">
              <Checkbox
                id="terms"
                checked={agreeToTerms}
                onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                className="mt-1"
              />
              <label
                htmlFor="terms"
                className="text-sm cursor-pointer leading-relaxed peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the{" "}
                <Link to="/terms" className="text-orange-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-orange-600 hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Register Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium mt-6 rounded-xl"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>

            {/* Sign In Link */}
            <div className="text-center pt-4 border-t border-zinc-200 dark:border-zinc-700 mt-6">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-orange-600 hover:text-orange-700 font-medium hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
