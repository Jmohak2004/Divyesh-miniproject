import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin 
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner@2.0.3";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Successfully subscribed to newsletter!");
      setEmail("");
      setIsSubscribing(false);
    }, 1000);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const footerLinks = {
    platform: [
      { name: "How It Works", action: () => scrollToSection("how-it-works") },
      { name: "Features", action: () => scrollToSection("features") },
      { name: "Pricing", action: () => scrollToSection("pricing") },
      { name: "Success Stories", action: () => scrollToSection("success-stories") }
    ],
    businesses: [
      { name: "For Enterprise", action: () => toast.info("Enterprise portal coming soon!") },
      { name: "For Small Business", action: () => toast.info("Small business portal coming soon!") },
      { name: "Partner Directory", action: () => toast.info("Partner directory coming soon!") },
      { name: "Resource Center", action: () => toast.info("Resource center coming soon!") }
    ],
    support: [
      { name: "Help Center", action: () => toast.info("Help center coming soon!") },
      { name: "Contact Us", action: () => toast.info("Contact form coming soon!") },
      { name: "API Documentation", action: () => toast.info("API docs coming soon!") },
      { name: "System Status", action: () => toast.success("All systems operational!") }
    ],
    company: [
      { name: "About Us", action: () => toast.info("About page coming soon!") },
      { name: "Careers", action: () => toast.info("Careers page coming soon!") },
      { name: "Press", action: () => toast.info("Press page coming soon!") },
      { name: "Blog", action: () => toast.info("Blog coming soon!") }
    ]
  };

  const socialLinks = [
    { icon: Facebook, action: () => toast.info("Follow us on Facebook!") },
    { icon: Twitter, action: () => toast.info("Follow us on Twitter!") },
    { icon: Linkedin, action: () => toast.info("Connect on LinkedIn!") },
    { icon: Instagram, action: () => toast.info("Follow us on Instagram!") }
  ];

  const contactInfo = [
    { icon: Mail, text: "contact@bizconnect.com", action: () => window.open("mailto:contact@bizconnect.com") },
    { icon: Phone, text: "1-800-BIZ-CONN", action: () => window.open("tel:1-800-249-2666") },
    { icon: MapPin, text: "San Francisco, CA", action: () => toast.info("Visit our SF office!") }
  ];

  const legalLinks = [
    { name: "Privacy Policy", action: () => toast.info("Privacy policy coming soon!") },
    { name: "Terms of Service", action: () => toast.info("Terms of service coming soon!") },
    { name: "Cookie Policy", action: () => toast.info("Cookie policy coming soon!") }
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="py-12 border-b border-primary-foreground/20">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Stay Connected</h3>
              <p className="text-primary-foreground/80">
                Get the latest updates on partnerships, success stories, and platform features.
              </p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
              <Input 
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white text-foreground flex-1"
                required
              />
              <Button 
                type="submit" 
                variant="secondary" 
                className="whitespace-nowrap"
                disabled={isSubscribing}
              >
                {isSubscribing ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        {/* Links Section */}
        <div className="py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {/* Company Info */}
            <div className="col-span-2">
              <h2 className="text-2xl font-bold mb-4">BizConnect</h2>
              <p className="text-primary-foreground/80 mb-6">
                Bridging the gap between enterprise companies and innovative small businesses 
                to create meaningful partnerships that drive mutual growth.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <Button 
                    key={index}
                    variant="ghost" 
                    size="sm" 
                    className="text-primary-foreground hover:text-primary hover:bg-primary-foreground transition-colors"
                    onClick={social.action}
                  >
                    <social.icon className="h-4 w-4" />
                  </Button>
                ))}
              </div>
            </div>

            {/* Platform Links */}
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2">
                {footerLinks.platform.map((link, index) => (
                  <li key={index}>
                    <button 
                      onClick={link.action}
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Business Links */}
            <div>
              <h4 className="font-semibold mb-4">Businesses</h4>
              <ul className="space-y-2">
                {footerLinks.businesses.map((link, index) => (
                  <li key={index}>
                    <button 
                      onClick={link.action}
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <button 
                      onClick={link.action}
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <button 
                      onClick={link.action}
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Contact & Legal Section */}
        <div className="py-8 border-t border-primary-foreground/20">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {contactInfo.map((contact, index) => (
              <button
                key={index}
                onClick={contact.action}
                className="flex items-center space-x-3 text-left hover:text-primary-foreground/80 transition-colors"
              >
                <contact.icon className="h-5 w-5" />
                <span>{contact.icon === MapPin ? "India" : contact.text}</span>
              </button>
            ))}
          </div>

          <Separator className="mb-8 bg-primary-foreground/20" />
          
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-primary-foreground/80">
              © 2024 BizConnect. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              {legalLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={link.action}
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}