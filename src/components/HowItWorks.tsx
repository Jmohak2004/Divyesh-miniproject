import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowRight, UserPlus, Search, MessageCircle, Handshake } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      step: 1,
      icon: <UserPlus className="h-8 w-8" />,
      title: "Create Your Profile",
      description: "Build a comprehensive business profile highlighting your capabilities, experience, and requirements.",
      bigBusiness: "Specify your industry, project needs, and partner criteria",
      smallBusiness: "Showcase your services, portfolio, and company credentials"
    },
    {
      step: 2,
      icon: <Search className="h-8 w-8" />,
      title: "Smart Matching",
      description: "Our AI-powered algorithm connects businesses based on compatibility, needs, and mutual benefits.",
      bigBusiness: "Get matched with pre-qualified small business partners",
      smallBusiness: "Discover enterprise opportunities that fit your expertise"
    },
    {
      step: 3,
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Connect & Communicate",
      description: "Start conversations, share requirements, and explore partnership opportunities through our platform.",
      bigBusiness: "Review proposals and conduct virtual meetings",
      smallBusiness: "Submit proposals and present your capabilities"
    },
    {
      step: 4,
      icon: <Handshake className="h-8 w-8" />,
      title: "Partner & Grow",
      description: "Finalize agreements and manage ongoing partnerships with built-in project management tools.",
      bigBusiness: "Monitor performance and scale successful partnerships",
      smallBusiness: "Deliver results and build long-term enterprise relationships"
    }
  ];

  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            How BizConnect Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A simple, streamlined process to connect big businesses with small businesses 
            and create lasting partnerships.
          </p>
        </div>

        <div className="relative">
          {/* Connection line for desktop */}
          <div className="hidden lg:block absolute top-20 left-1/2 transform -translate-x-1/2 w-px h-96 bg-gradient-to-b from-primary/20 to-transparent"></div>
          
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={step.step} className="relative">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Step content */}
                  <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white">
                        <Badge variant="secondary" className="text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center">
                          {step.step}
                        </Badge>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{step.title}</h3>
                      </div>
                    </div>
                    
                    <p className="text-lg text-muted-foreground">
                      {step.description}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <Card className="border-l-4 border-l-primary">
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-2 text-primary">Big Business</h4>
                          <p className="text-sm text-muted-foreground">{step.bigBusiness}</p>
                        </CardContent>
                      </Card>
                      <Card className="border-l-4 border-l-secondary">
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-2 text-secondary-foreground">Small Business</h4>
                          <p className="text-sm text-muted-foreground">{step.smallBusiness}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Step icon/visual */}
                  <div className={`flex justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center">
                      <div className="text-primary">
                        {step.icon}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex justify-center mt-8">
                    <ArrowRight className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <Button size="lg" className="text-lg px-8 py-4">
            Start Your Journey Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}