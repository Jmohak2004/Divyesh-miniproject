import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Building2, Store, Check } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface AuthModalsProps {
  signInTrigger: React.ReactNode;
  signUpTrigger: React.ReactNode;
}

export function AuthModals({ signInTrigger, signUpTrigger }: AuthModalsProps) {
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [businessType, setBusinessType] = useState<"enterprise" | "small-business">("enterprise");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Welcome back! You've been signed in successfully.");
    setSignInOpen(false);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Account created successfully! Welcome to BizConnect.");
    setSignUpOpen(false);
  };

  return (
    <>
      {/* Sign In Modal */}
      <Dialog open={signInOpen} onOpenChange={setSignInOpen}>
        <DialogTrigger asChild>
          {signInTrigger}
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Welcome Back</DialogTitle>
            <DialogDescription>Sign in to your BizConnect account to continue</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signin-email">Email</Label>
              <Input 
                id="signin-email" 
                type="email" 
                placeholder="Enter your email"
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signin-password">Password</Label>
              <Input 
                id="signin-password" 
                type="password" 
                placeholder="Enter your password"
                required 
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm">Remember me</Label>
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
            <div className="text-center">
              <Button variant="link" className="text-sm">
                Forgot your password?
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Sign Up Modal */}
      <Dialog open={signUpOpen} onOpenChange={setSignUpOpen}>
        <DialogTrigger asChild>
          {signUpTrigger}
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Join BizConnect</DialogTitle>
            <DialogDescription>Create your account to start connecting with business partners</DialogDescription>
          </DialogHeader>
          
          <Tabs value={businessType} onValueChange={(value) => setBusinessType(value as any)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="enterprise" className="flex items-center space-x-2">
                <Building2 className="h-4 w-4" />
                <span>Enterprise</span>
              </TabsTrigger>
              <TabsTrigger value="small-business" className="flex items-center space-x-2">
                <Store className="h-4 w-4" />
                <span>Small Business</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="enterprise" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    <span>Enterprise Registration</span>
                  </CardTitle>
                  <CardDescription>
                    Connect with verified small business partners
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" placeholder="John" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" placeholder="Doe" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input id="company" placeholder="Acme Corporation" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Work Email</Label>
                        <Input id="email" type="email" placeholder="john@acme.com" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" placeholder="Create a password" required />
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox id="terms" required />
                      <Label htmlFor="terms" className="text-sm leading-relaxed">
                        I agree to the Terms of Service and Privacy Policy
                      </Label>
                    </div>
                    <Button type="submit" className="w-full">
                      Create Enterprise Account
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="small-business" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Store className="h-5 w-5 text-primary" />
                    <span>Small Business Registration</span>
                  </CardTitle>
                  <CardDescription>
                    Get discovered by enterprise clients
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="sb-first-name">First Name</Label>
                        <Input id="sb-first-name" placeholder="Jane" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sb-last-name">Last Name</Label>
                        <Input id="sb-last-name" placeholder="Smith" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sb-company">Business Name</Label>
                      <Input id="sb-company" placeholder="Smith Consulting LLC" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sb-services">Primary Services</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="What services do you offer?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="consulting">Consulting</SelectItem>
                          <SelectItem value="development">Software Development</SelectItem>
                          <SelectItem value="design">Design Services</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="logistics">Logistics</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="sb-email">Business Email</Label>
                        <Input id="sb-email" type="email" placeholder="jane@smithconsulting.com" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sb-phone">Phone Number</Label>
                        <Input id="sb-phone" type="tel" placeholder="+1 (555) 987-6543" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sb-employees">Company Size</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Number of employees" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-5">1-5 employees</SelectItem>
                          <SelectItem value="6-25">6-25 employees</SelectItem>
                          <SelectItem value="26-50">26-50 employees</SelectItem>
                          <SelectItem value="51-100">51-100 employees</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sb-password">Password</Label>
                      <Input id="sb-password" type="password" placeholder="Create a password" required />
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox id="sb-terms" required />
                      <Label htmlFor="sb-terms" className="text-sm leading-relaxed">
                        I agree to the Terms of Service and Privacy Policy
                      </Label>
                    </div>
                    <Button type="submit" className="w-full">
                      Create Business Account
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}