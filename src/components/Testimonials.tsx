import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Star, Quote } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { FeedbackForm } from "./FeedbackForm";

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "VP of Procurement",
      company: "TechCorp Industries",
      type: "Enterprise",
      avatar: "SC",
      rating: 5,
      testimonial: "BizConnect helped us find three incredible small business partners for our digital transformation project. The vetting process saved us months of sourcing time, and the quality of partners exceeded our expectations.",
      result: "40% cost savings, 3-month faster delivery"
    },
    {
      name: "Marcus Rodriguez",
      role: "Founder & CEO",
      company: "Innovation Labs",
      type: "Small Business",
      avatar: "MR",
      rating: 5,
      testimonial: "Within 2 months of joining BizConnect, we landed our first enterprise client worth $500K. The platform's matching algorithm connected us with companies that were the perfect fit for our AI consulting services.",
      result: "300% revenue growth in first year"
    },
    {
      name: "Jennifer Park",
      role: "Supply Chain Director",
      company: "Global Manufacturing Co.",
      type: "Enterprise",
      avatar: "JP",
      rating: 5,
      testimonial: "The diversity of small business partners on BizConnect has been game-changing. We've built sustainable supply chains with minority-owned businesses that bring innovation and competitive pricing.",
      result: "Diversified 60% of supplier base"
    },
    {
      name: "David Thompson",
      role: "Co-Founder",
      company: "GreenTech Solutions",
      type: "Small Business",
      avatar: "DT",
      rating: 5,
      testimonial: "BizConnect opened doors to Fortune 500 companies we never thought we could reach. The platform's credibility and support system helped us scale from 5 to 50 employees in just 18 months.",
      result: "Scaled team by 900%"
    }
  ];

  const successMetrics = [
    {
      metric: "95%",
      label: "Partnership Success Rate",
      description: "Partnerships that lead to ongoing business relationships"
    },
    {
      metric: "60%",
      label: "Faster Connection Time",
      description: "Compared to traditional business networking"
    },
    {
      metric: "$2.3M",
      label: "Average Deal Value",
      description: "Median contract value facilitated through platform"
    }
  ];

  return (
    <section id="success-stories" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Success Stories That Inspire
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real businesses achieving remarkable results through meaningful partnerships
          </p>
        </div>

        {/* Success Metrics */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {successMetrics.map((item, index) => (
            <Card key={index} className="text-center p-6">
              <CardContent className="space-y-2">
                <div className="text-4xl font-bold text-primary">{item.metric}</div>
                <h3 className="font-semibold">{item.label}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-8">
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                
                <div className="flex items-center mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>

                <blockquote className="text-lg mb-6 leading-relaxed">
                  "{testimonial.testimonial}"
                </blockquote>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-white">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      <div className="text-sm font-medium">{testimonial.company}</div>
                    </div>
                  </div>
                  <Badge variant={testimonial.type === "Enterprise" ? "default" : "secondary"}>
                    {testimonial.type}
                  </Badge>
                </div>

                <div className="mt-4 p-3 bg-primary/5 rounded-lg">
                  <div className="text-sm font-medium text-primary">Key Result:</div>
                  <div className="text-sm">{testimonial.result}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="relative max-w-4xl mx-auto">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1675716921224-e087a0cca69a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG5ldHdvcmtpbmclMjBldmVudHxlbnwxfHx8fDE3NTU0OTkwMjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Business networking event"
              className="w-full h-64 object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center">
              <div className="text-center text-white space-y-4">
                <h3 className="text-3xl font-bold">Ready to Write Your Success Story?</h3>
                <p className="text-xl">Join thousands of businesses creating meaningful partnerships</p>
              </div>
            </div>
          </div>
        </div>

        {/* User Feedback Section */}
        <FeedbackForm />
      </div>
    </section>
  );
}