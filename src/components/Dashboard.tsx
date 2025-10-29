import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { 
  User, 
  Search, 
  MessageSquare, 
  Settings,
  Plus,
  Building2,
  Users,
  TrendingUp,
  Heart,
  Calendar,
  Bell,
  Filter,
  MoreHorizontal,
  CheckCircle,
  Clock,
  AlertCircle,
  Star,
  MapPin,
  Phone,
  Mail,
  Edit,
  Eye
} from "lucide-react";
import { motion } from "motion/react";
import { BusinessRegistrationForm } from "./BusinessRegistrationForm";
import { VendorSearchForm } from "./VendorSearchForm";
import { ContactForm } from "./ContactForm";

interface DashboardStats {
  connections: number;
  activeProjects: number;
  pendingRequests: number;
  profileViews: number;
}

interface Connection {
  id: string;
  name: string;
  company: string;
  industry: string;
  location: string;
  rating: number;
  status: "active" | "pending" | "completed";
  lastContact: string;
  projectValue: string;
}

interface Notification {
  id: string;
  type: "connection" | "message" | "update" | "reminder";
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
}

const mockStats: DashboardStats = {
  connections: 24,
  activeProjects: 8,
  pendingRequests: 5,
  profileViews: 127
};

const mockConnections: Connection[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    company: "TechCorp Industries",
    industry: "Technology",
    location: "San Francisco, CA",
    rating: 4.9,
    status: "active",
    lastContact: "2 hours ago",
    projectValue: "$85K"
  },
  {
    id: "2",
    name: "Mike Chen",
    company: "Green Energy Solutions",
    industry: "Energy",
    location: "Denver, CO",
    rating: 4.7,
    status: "pending",
    lastContact: "1 day ago",
    projectValue: "$120K"
  },
  {
    id: "3",
    name: "Lisa Rodriguez",
    company: "Creative Marketing Hub",
    industry: "Marketing",
    location: "Los Angeles, CA",
    rating: 4.6,
    status: "completed",
    lastContact: "3 days ago",
    projectValue: "$45K"
  }
];

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "connection",
    title: "New Connection Request",
    description: "TechCorp Industries wants to connect with you",
    timestamp: "10 minutes ago",
    read: false
  },
  {
    id: "2",
    type: "message",
    title: "New Message",
    description: "Sarah Johnson sent you a message about the AI project",
    timestamp: "2 hours ago",
    read: false
  },
  {
    id: "3",
    type: "update",
    title: "Profile View",
    description: "Your profile was viewed by 5 companies today",
    timestamp: "4 hours ago",
    read: true
  }
];

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "completed": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "connection": return Users;
      case "message": return MessageSquare;
      case "update": return TrendingUp;
      case "reminder": return Clock;
      default: return Bell;
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (showRegistrationForm) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-8">
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="outline" 
              onClick={() => setShowRegistrationForm(false)}
            >
              ← Back to Dashboard
            </Button>
          </div>
          <BusinessRegistrationForm />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold">Business Dashboard</h1>
            <p className="text-muted-foreground">Manage your connections and grow your business network</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline"
              className="relative"
            >
              <Bell className="h-4 w-4 mr-2" />
              Notifications
              {unreadCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {unreadCount}
                </Badge>
              )}
            </Button>
            <Button onClick={() => setShowRegistrationForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Register Business
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Connections</p>
                  <p className="text-3xl font-bold">{mockStats.connections}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm text-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% from last month
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
                  <p className="text-3xl font-bold">{mockStats.activeProjects}</p>
                </div>
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm text-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +3 new projects
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Requests</p>
                  <p className="text-3xl font-bold">{mockStats.pendingRequests}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm text-yellow-600">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Requires attention
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Profile Views</p>
                  <p className="text-3xl font-bold">{mockStats.profileViews}</p>
                </div>
                <Eye className="h-8 w-8 text-primary" />
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm text-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +23% this week
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="connections">Connections</TabsTrigger>
              <TabsTrigger value="search">Find Partners</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your latest business interactions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockConnections.slice(0, 3).map((connection) => (
                      <div key={connection.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>
                              {connection.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{connection.name}</p>
                            <p className="text-sm text-muted-foreground">{connection.company}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(connection.status)}>
                            {connection.status}
                          </Badge>
                          <p className="text-sm text-muted-foreground mt-1">{connection.lastContact}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Notifications */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Notifications
                      <Badge variant="secondary">{unreadCount}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {notifications.slice(0, 4).map((notification) => {
                      const Icon = getNotificationIcon(notification.type);
                      return (
                        <motion.div
                          key={notification.id}
                          className={`p-3 border rounded-lg cursor-pointer transition-all ${
                            !notification.read ? 'bg-accent/50 border-primary/20' : ''
                          }`}
                          onClick={() => markAsRead(notification.id)}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="flex items-start space-x-3">
                            <Icon className={`h-4 w-4 mt-1 ${!notification.read ? 'text-primary' : 'text-muted-foreground'}`} />
                            <div className="flex-1">
                              <p className="font-medium text-sm">{notification.title}</p>
                              <p className="text-xs text-muted-foreground">{notification.description}</p>
                              <p className="text-xs text-muted-foreground mt-1">{notification.timestamp}</p>
                            </div>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-primary rounded-full" />
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks to grow your business network</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Button 
                      variant="outline" 
                      className="h-auto p-4 flex flex-col items-center space-y-2"
                      onClick={() => setActiveTab("search")}
                    >
                      <Search className="h-6 w-6" />
                      <span>Find Partners</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-auto p-4 flex flex-col items-center space-y-2"
                      onClick={() => setActiveTab("messages")}
                    >
                      <MessageSquare className="h-6 w-6" />
                      <span>Send Message</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-auto p-4 flex flex-col items-center space-y-2"
                      onClick={() => setShowRegistrationForm(true)}
                    >
                      <Plus className="h-6 w-6" />
                      <span>Add Business</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-auto p-4 flex flex-col items-center space-y-2"
                      onClick={() => setActiveTab("settings")}
                    >
                      <Settings className="h-6 w-6" />
                      <span>Settings</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Connections Tab */}
            <TabsContent value="connections" className="space-y-6 mt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">My Connections</h3>
                  <p className="text-sm text-muted-foreground">Manage your business relationships</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Connection
                  </Button>
                </div>
              </div>

              <div className="grid gap-4">
                {mockConnections.map((connection) => (
                  <Card key={connection.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback>
                              {connection.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">{connection.name}</h4>
                            <p className="text-sm text-muted-foreground">{connection.company}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Building2 className="h-3 w-3 mr-1" />
                                {connection.industry}
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <MapPin className="h-3 w-3 mr-1" />
                                {connection.location}
                              </div>
                              <div className="flex items-center text-sm">
                                <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                                {connection.rating}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(connection.status)}>
                            {connection.status}
                          </Badge>
                          <p className="text-sm text-muted-foreground mt-1">
                            Last contact: {connection.lastContact}
                          </p>
                          <p className="text-sm font-medium mt-1">
                            Project value: {connection.projectValue}
                          </p>
                          <div className="flex items-center space-x-2 mt-3">
                            <Button size="sm" variant="outline">
                              <Phone className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Mail className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <MessageSquare className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <MoreHorizontal className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Search Tab */}
            <TabsContent value="search" className="mt-6">
              <VendorSearchForm />
            </TabsContent>

            {/* Messages Tab */}
            <TabsContent value="messages" className="mt-6">
              <ContactForm />
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences and business profile</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Business Profile</h4>
                      <p className="text-sm text-muted-foreground">Update your business information and profile</p>
                    </div>
                    <Button variant="outline">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Notification Preferences</h4>
                      <p className="text-sm text-muted-foreground">Control how and when you receive notifications</p>
                    </div>
                    <Button variant="outline">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Privacy Settings</h4>
                      <p className="text-sm text-muted-foreground">Manage your privacy and data sharing preferences</p>
                    </div>
                    <Button variant="outline">
                      <Settings className="h-4 w-4 mr-2" />
                      Manage
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}