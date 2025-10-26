import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";

const Settings = () => {
  const { user, updateUser, logout } = useAuth();
  const { toast } = useToast();

  const [profileData, setProfileData] = useState({
    fullName: user?.fullName || "",
    bio: user?.bio || "",
    website: user?.website || "",
    twitter: user?.socialLinks?.twitter || "",
    linkedin: user?.socialLinks?.linkedin || "",
    github: user?.socialLinks?.github || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleProfileUpdate = () => {
    updateUser({
      fullName: profileData.fullName,
      bio: profileData.bio,
      website: profileData.website,
      socialLinks: {
        twitter: profileData.twitter,
        linkedin: profileData.linkedin,
        github: profileData.github,
      },
    });

    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      });
      return;
    }

    // In a real app, verify current password and update
    toast({
      title: "Password changed",
      description: "Your password has been updated successfully.",
    });

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      logout();
      toast({
        title: "Account deleted",
        description: "Your account has been deleted.",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 px-6 md:px-12 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-8">Settings</h1>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card className="p-6 border-zinc-200 dark:border-zinc-800">
                <h2 className="text-2xl font-semibold mb-6">Profile Settings</h2>

                <div className="space-y-6">
                  {/* Avatar */}
                  <div className="space-y-2">
                    <Label>Profile Picture</Label>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={user?.avatar} alt={user?.username} />
                        <AvatarFallback className="text-2xl">
                          {user?.fullName?.charAt(0) || user?.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <Button variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload New Photo
                      </Button>
                    </div>
                  </div>

                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={profileData.fullName}
                      onChange={(e) =>
                        setProfileData({ ...profileData, fullName: e.target.value })
                      }
                    />
                  </div>

                  {/* Bio */}
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) =>
                        setProfileData({ ...profileData, bio: e.target.value })
                      }
                      placeholder="Tell us about yourself..."
                      rows={4}
                    />
                    <p className="text-xs text-muted-foreground">
                      {profileData.bio.length}/200 characters
                    </p>
                  </div>

                  {/* Website */}
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      value={profileData.website}
                      onChange={(e) =>
                        setProfileData({ ...profileData, website: e.target.value })
                      }
                      placeholder="https://yourwebsite.com"
                    />
                  </div>

                  {/* Social Links */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Social Media Links</h3>

                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter</Label>
                      <Input
                        id="twitter"
                        value={profileData.twitter}
                        onChange={(e) =>
                          setProfileData({ ...profileData, twitter: e.target.value })
                        }
                        placeholder="@username"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        value={profileData.linkedin}
                        onChange={(e) =>
                          setProfileData({ ...profileData, linkedin: e.target.value })
                        }
                        placeholder="linkedin.com/in/username"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="github">GitHub</Label>
                      <Input
                        id="github"
                        value={profileData.github}
                        onChange={(e) =>
                          setProfileData({ ...profileData, github: e.target.value })
                        }
                        placeholder="github.com/username"
                      />
                    </div>
                  </div>

                  <Button
                    className="bg-orange-600 hover:bg-orange-700 text-white"
                    onClick={handleProfileUpdate}
                  >
                    Save Changes
                  </Button>
                </div>
              </Card>
            </TabsContent>

            {/* Account Tab */}
            <TabsContent value="account">
              <div className="space-y-6">
                {/* Email */}
                <Card className="p-6 border-zinc-200 dark:border-zinc-800">
                  <h2 className="text-2xl font-semibold mb-4">Email Address</h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Current Email</Label>
                      <Input value={user?.email} disabled />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Contact support to change your email address
                    </p>
                  </div>
                </Card>

                {/* Password */}
                <Card className="p-6 border-zinc-200 dark:border-zinc-800">
                  <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) =>
                          setPasswordData({ ...passwordData, currentPassword: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) =>
                          setPasswordData({ ...passwordData, newPassword: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) =>
                          setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                        }
                      />
                    </div>

                    <Button
                      className="bg-orange-600 hover:bg-orange-700 text-white"
                      onClick={handlePasswordChange}
                    >
                      Update Password
                    </Button>
                  </div>
                </Card>

                {/* Delete Account */}
                <Card className="p-6 border-red-200 dark:border-red-900/50">
                  <h2 className="text-2xl font-semibold mb-4 text-red-600 dark:text-red-400">
                    Danger Zone
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <Button variant="destructive" onClick={handleDeleteAccount}>
                    Delete Account
                  </Button>
                </Card>
              </div>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences">
              <Card className="p-6 border-zinc-200 dark:border-zinc-800">
                <h2 className="text-2xl font-semibold mb-6">Preferences</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Theme</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Choose your preferred color theme. You can also toggle between light and dark
                      mode using the button in the header.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3">Notifications</h3>
                    <p className="text-sm text-muted-foreground">
                      Notification preferences will be available in a future update.
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Settings;
