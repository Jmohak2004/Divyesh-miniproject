import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Check, Star, Building2, Store } from "lucide-react";
import { AuthModals } from "./AuthModals";
import { motion } from "motion/react";

export function PricingSection() {
  const plans = [
    {
      name: "Small Business",
      icon: <Store className="h-6 w-6" />,
      price: "Free",
      period: "forever",
      description: "Perfect for growing businesses looking to connect with enterprise clients",
      features: [
        "Create business profile",
        "Browse enterprise opportunities",
        "Basic messaging",
        "Up to 5 proposals per month",
        "Standard support"
      ],
      popular: false,
      cta: "Get Started Free"
    },
    {
      name: "Enterprise Starter",
      icon: <Building2 className="h-6 w-6" />,
      price: "$299",
      period: "per month",
      description: "Ideal for mid-size companies starting to diversify their supplier network",
      features: [
        "Post unlimited requirements",
        "Access to verified partners",
        "Advanced search filters",
        "Priority messaging",
        "Dedicated account manager",
        "Performance analytics"
      ],
      popular: true,
      cta: "Start 14-Day Trial"
    },
    {
      name: "Enterprise Pro",
      icon: <Building2 className="h-6 w-6" />,
      price: "$799",
      period: "per month",
      description: "Comprehensive solution for large enterprises with complex sourcing needs",
      features: [
        "Everything in Starter",
        "Custom matching algorithms",
        "Bulk partner onboarding",
        "API access",
        "White-label options",
        "24/7 premium support",
        "Custom integrations"
      ],
      popular: false,
      cta: "Contact Sales"
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-primary/5 to-secondary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the plan that's right for your business. Start for free and scale as you grow.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className={`relative h-full transition-all duration-200 ${
                plan.popular 
                  ? 'border-primary shadow-lg scale-105' 
                  : 'hover:shadow-md'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="flex items-center space-x-1 px-3 py-1">
                      <Star className="h-3 w-3 fill-current" />
                      <span>Most Popular</span>
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      {plan.icon}
                    </div>
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && (
                      <span className="text-muted-foreground ml-2">/{plan.period}</span>
                    )}
                  </div>
                  <CardDescription className="mt-2 text-base">
                    {plan.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4">
                    <AuthModals
                      signInTrigger={<></>}
                      signUpTrigger={
                        <Button 
                          className={`w-full ${
                            plan.popular 
                              ? 'bg-primary hover:bg-primary/90' 
                              : ''
                          }`}
                          variant={plan.popular ? "default" : "outline"}
                        >
                          {plan.cta}
                        </Button>
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground mb-4">
            Need a custom solution for your enterprise?
          </p>
          <Button variant="outline" size="lg">
            Schedule a Demo
          </Button>
        </motion.div>
      </div>
    </section>
  );
}