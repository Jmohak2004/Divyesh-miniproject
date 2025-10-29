import { motion } from "motion/react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  MapPin, 
  Globe, 
  Camera, 
  Edit2, 
  Bell, 
  Shield, 
  CreditCard,
  LogOut,
  ChevronRight,
  Award,
  Briefcase,
  TrendingUp
} from "lucide-react";
import { toast } from "sonner@2.0.3";

export function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false
  });

  const [profileData, setProfileData] = useState({
    name: "John Anderson",
    email: "john.anderson@acmecorp.com",
    phone: "+1 (555) 123-4567",
    company: "ACME Corporation",
    position: "Chief Technology Officer",
    location: "San Francisco, CA",
    website: "www.acmecorp.com",
    bio: "Experienced technology leader with 15+ years in enterprise software development and business partnerships."
  });

  const stats = [
    { label: "Active Projects", value: "12", icon: Briefcase, color: "text-blue-600" },
    { label: "Partners", value: "45", icon: Award, color: "text-purple-600" },
    { label: "Success Rate", value: "96%", icon: TrendingUp, color: "text-green-600" }
  ];

  const handleSave = () => {
    toast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast.success(`${key} notifications ${value ? 'enabled' : 'disabled'}`);
  };

  return (
    <div className="min-h-screen bg-muted/30 pb-24 md:pb-8">
      {/* Header with avatar - Mobile optimized */}
      <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 pt-20 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center"
          >
            {/* Avatar with edit button */}
            <div className="relative mb-4">
              <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200" />
                <AvatarFallback>JA</AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="secondary"
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full shadow-lg"
                onClick={() => toast.info("Upload photo feature coming soon")}
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>

            <h1 className="text-2xl mb-1">{profileData.name}</h1>
            <p className="text-primary-foreground/80 mb-1">{profileData.position}</p>
            <p className="text-primary-foreground/70 text-sm">{profileData.company}</p>

            {/* Quick stats */}
            <div className="flex gap-6 mt-6">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Icon className="h-4 w-4" />
                      <span className="text-xl font-bold">{stat.value}</span>
                    </div>
                    <p className="text-xs text-primary-foreground/70">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-6 space-y-4">
        {/* Profile Information Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle>Profile Information</CardTitle>
              <Button
                variant={isEditing ? "outline" : "ghost"}
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit2 className="h-4 w-4 mr-2" />
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={profileData.company}
                      onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input
                      id="position"
                      value={profileData.position}
                      onChange={(e) => setProfileData({ ...profileData, position: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={profileData.website}
                      onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      rows={4}
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1" onClick={handleSave}>
                      Save Changes
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="truncate">{profileData.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p>{profileData.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Building2 className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground">Company</p>
                      <p className="truncate">{profileData.company}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p>{profileData.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground">Website</p>
                      <a href={`https://${profileData.website}`} className="text-primary hover:underline truncate block">
                        {profileData.website}
                      </a>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Bio</p>
                    <p className="text-sm leading-relaxed">{profileData.bio}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Notifications Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive updates via email</p>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive push notifications</p>
                </div>
                <Switch
                  checked={notifications.push}
                  onCheckedChange={(checked) => handleNotificationChange('push', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium">SMS Alerts</p>
                  <p className="text-sm text-muted-foreground">Important updates via SMS</p>
                </div>
                <Switch
                  checked={notifications.sms}
                  onCheckedChange={(checked) => handleNotificationChange('sms', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium">Marketing Emails</p>
                  <p className="text-sm text-muted-foreground">News and promotions</p>
                </div>
                <Switch
                  checked={notifications.marketing}
                  onCheckedChange={(checked) => handleNotificationChange('marketing', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Account Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Button
                variant="ghost"
                className="w-full justify-between h-auto py-4 px-6 rounded-none"
                onClick={() => toast.info("Security settings coming soon")}
              >
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <div className="text-left">
                    <p>Security & Privacy</p>
                    <p className="text-sm text-muted-foreground">Password, 2FA, privacy</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </Button>
              <Separator />
              <Button
                variant="ghost"
                className="w-full justify-between h-auto py-4 px-6 rounded-none"
                onClick={() => toast.info("Payment methods coming soon")}
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <div className="text-left">
                    <p>Payment Methods</p>
                    <p className="text-sm text-muted-foreground">Manage billing & payments</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </Button>
              <Separator />
              <Button
                variant="ghost"
                className="w-full justify-between h-auto py-4 px-6 rounded-none text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => {
                  if (confirm("Are you sure you want to logout?")) {
                    toast.success("Logged out successfully");
                    window.location.hash = '';
                  }
                }}
              >
                <div className="flex items-center gap-3">
                  <LogOut className="h-5 w-5" />
                  <p>Logout</p>
                </div>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Account Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-primary/50 bg-primary/5">
            <CardContent className="pt-6 text-center">
              <Badge className="mb-3 bg-gradient-to-r from-yellow-500 to-orange-500 border-0">
                ⭐ Premium Member
              </Badge>
              <p className="text-sm text-muted-foreground mb-4">
                Enjoying all premium features since January 2024
              </p>
              <Button variant="outline" size="sm" onClick={() => toast.info("Subscription management coming soon")}>
                Manage Subscription
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
