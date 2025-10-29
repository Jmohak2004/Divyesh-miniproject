import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  Building2, 
  Store, 
  Search, 
  MessageSquare, 
  Shield, 
  TrendingUp,
  Users,
  Zap,
  Globe
} from "lucide-react";
import { motion } from "motion/react";
import { FilmStrip } from "./CarouselPatterns";

export function Features() {
  const bigBusinessFeatures = [
    {
      icon: <Search className="h-8 w-8 text-primary" />,
      title: "Smart Vendor Discovery",
      description: "Find qualified small businesses that match your specific requirements using our AI-powered matching system."
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Verified Partners",
      description: "All small businesses are thoroughly vetted with background checks, certifications, and performance history."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: "Performance Analytics",
      description: "Track partnership performance, ROI, and supplier metrics with comprehensive dashboards."
    }
  ];

  const smallBusinessFeatures = [
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: "Enterprise Access",
      description: "Connect directly with Fortune 500 companies and enterprise clients looking for your services."
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Fast Contracting",
      description: "Streamlined proposal and contracting process to reduce time from connection to contract."
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Growth Support",
      description: "Access mentorship, resources, and scaling support to grow your business capacity."
    }
  ];

  const sharedFeatures = [
    {
      icon: <MessageSquare className="h-12 w-12 text-primary" />,
      title: "Integrated Communication",
      description: "Built-in messaging, video calls, and document sharing"
    },
    {
      icon: <Shield className="h-12 w-12 text-primary" />,
      title: "Secure Transactions",
      description: "Protected payments and contract management"
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-primary" />,
      title: "Success Tracking",
      description: "Monitor and measure partnership success"
    }
  ];

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Powerful Features for Both Sides
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Whether you're an enterprise looking for reliable partners or a small business 
            seeking growth opportunities, we have the tools you need.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Big Business Features */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-8">
              <Building2 className="h-8 w-8 text-primary mr-3" />
              <div>
                <h3 className="text-2xl font-bold">For Enterprise</h3>
                <Badge variant="outline" className="mt-1">Big Business</Badge>
              </div>
            </div>
            
            <div className="space-y-6">
              {bigBusinessFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-l-4 border-l-primary hover:shadow-md transition-shadow duration-200">
                    <CardHeader className="pb-4">
                      <div className="flex items-start space-x-4">
                        {feature.icon}
                        <div>
                          <CardTitle className="text-lg">{feature.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Small Business Features */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-8">
              <Store className="h-8 w-8 text-primary mr-3" />
              <div>
                <h3 className="text-2xl font-bold">For Small Business</h3>
                <Badge variant="outline" className="mt-1">Growing Companies</Badge>
              </div>
            </div>
            
            <div className="space-y-6">
              {smallBusinessFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-l-4 border-l-secondary hover:shadow-md transition-shadow duration-200">
                    <CardHeader className="pb-4">
                      <div className="flex items-start space-x-4">
                        {feature.icon}
                        <div>
                          <CardTitle className="text-lg">{feature.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Shared Features */}
        <motion.div 
          className="mt-16 pt-16 border-t"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">Shared Platform Benefits</h3>
            <p className="text-muted-foreground">Features that benefit everyone on the platform</p>
          </div>

          {/* Desktop Grid View */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {sharedFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                  {feature.icon}
                </div>
                <h4 className="font-bold mb-2">{feature.title}</h4>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Mobile Film Strip View */}
          <div className="md:hidden">
            <FilmStrip
              items={sharedFeatures.map((feature, index) => ({
                id: `shared-${index}`,
                content: (
                  <Card className="h-full">
                    <CardContent className="pt-6 text-center">
                      <div className="mx-auto mb-4">
                        {feature.icon}
                      </div>
                      <h4 className="font-bold mb-2">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                )
              }))}
              itemWidth={250}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}