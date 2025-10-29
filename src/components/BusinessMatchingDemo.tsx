import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { 
  Building2, 
  Store, 
  MapPin, 
  Star, 
  Users, 
  DollarSign,
  CheckCircle,
  ArrowRight,
  Zap
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface BusinessMatchingDemoProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BusinessMatchingDemo({ open, onOpenChange }: BusinessMatchingDemoProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    {
      title: "Enterprise Posts Requirement",
      description: "TechCorp needs AI consulting services for digital transformation"
    },
    {
      title: "AI Matching Algorithm",
      description: "Our system analyzes 500+ small businesses to find perfect matches"
    },
    {
      title: "Top Matches Found",
      description: "3 highly qualified AI consulting firms identified based on criteria"
    },
    {
      title: "Connection Made",
      description: "TechCorp reviews profiles and initiates contact with preferred partner"
    }
  ];

  const enterpriseBusiness = {
    name: "TechCorp Industries",
    industry: "Technology",
    size: "5000+ employees",
    location: "San Francisco, CA",
    requirement: "AI Consulting for Digital Transformation",
    budget: "$500K - $1M",
    timeline: "6 months"
  };

  const matchedBusinesses = [
    {
      name: "AI Innovations Lab",
      rating: 4.9,
      employees: "25",
      location: "Austin, TX",
      specialization: "Machine Learning & AI Strategy",
      projects: "50+ completed",
      matchScore: 98,
      price: "$450K",
      highlight: "Perfect match"
    },
    {
      name: "DataMind Consulting",
      rating: 4.8,
      employees: "18",
      location: "Boston, MA",
      specialization: "Enterprise AI Implementation",
      projects: "35+ completed",
      matchScore: 94,
      price: "$520K",
      highlight: "Great expertise"
    },
    {
      name: "Smart Solutions Inc",
      rating: 4.7,
      employees: "32",
      location: "Seattle, WA",
      specialization: "AI & Digital Transformation",
      projects: "40+ completed",
      matchScore: 92,
      price: "$480K",
      highlight: "Fast delivery"
    }
  ];

  useEffect(() => {
    if (open) {
      setCurrentStep(0);
      setProgress(0);
      
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            return 100;
          }
          return prev + 2;
        });
      }, 100);

      const stepInterval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= steps.length - 1) {
            clearInterval(stepInterval);
            return prev;
          }
          return prev + 1;
        });
      }, 2000);

      return () => {
        clearInterval(interval);
        clearInterval(stepInterval);
      };
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-primary" />
            <span>Live Matching Demo</span>
          </DialogTitle>
          <DialogDescription>Watch how our AI-powered platform matches businesses in real-time</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Steps */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Matching Progress</span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className={`p-3 rounded-lg border transition-all duration-300 ${
                    index <= currentStep 
                      ? 'bg-primary text-primary-foreground border-primary' 
                      : 'bg-muted border-border'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <div className={`w-2 h-2 rounded-full ${
                      index <= currentStep ? 'bg-primary-foreground' : 'bg-muted-foreground'
                    }`} />
                    <span className="text-xs font-medium">{step.title}</span>
                  </div>
                  <p className="text-xs opacity-80">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Enterprise Business Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  <span>{enterpriseBusiness.name}</span>
                  <Badge>Enterprise</Badge>
                </CardTitle>
                <CardDescription>Looking for: {enterpriseBusiness.requirement}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Industry:</span>
                    <div className="text-muted-foreground">{enterpriseBusiness.industry}</div>
                  </div>
                  <div>
                    <span className="font-medium">Size:</span>
                    <div className="text-muted-foreground">{enterpriseBusiness.size}</div>
                  </div>
                  <div>
                    <span className="font-medium">Budget:</span>
                    <div className="text-muted-foreground">{enterpriseBusiness.budget}</div>
                  </div>
                  <div>
                    <span className="font-medium">Timeline:</span>
                    <div className="text-muted-foreground">{enterpriseBusiness.timeline}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Matching Results */}
          <AnimatePresence>
            {currentStep >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Top Matched Partners</h3>
                  <Badge variant="secondary" className="flex items-center space-x-1">
                    <CheckCircle className="h-3 w-3" />
                    <span>3 matches found</span>
                  </Badge>
                </div>

                <div className="grid gap-4">
                  {matchedBusinesses.map((business, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <Card className={`transition-all duration-200 hover:shadow-lg cursor-pointer ${
                        index === 0 ? 'border-primary shadow-md' : ''
                      }`}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarFallback className="bg-primary text-primary-foreground">
                                  <Store className="h-4 w-4" />
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-semibold">{business.name}</h4>
                                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                  <div className="flex items-center">
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                                    {business.rating}
                                  </div>
                                  <div className="flex items-center">
                                    <Users className="h-3 w-3 mr-1" />
                                    {business.employees}
                                  </div>
                                  <div className="flex items-center">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    {business.location}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge variant={index === 0 ? "default" : "secondary"}>
                                {business.matchScore}% match
                              </Badge>
                              <div className="text-sm text-muted-foreground mt-1">{business.highlight}</div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                            <div>
                              <span className="font-medium">Specialization:</span>
                              <div className="text-muted-foreground">{business.specialization}</div>
                            </div>
                            <div>
                              <span className="font-medium">Projects:</span>
                              <div className="text-muted-foreground">{business.projects}</div>
                            </div>
                            <div>
                              <span className="font-medium">Quote:</span>
                              <div className="text-muted-foreground flex items-center">
                                <DollarSign className="h-3 w-3 mr-1" />
                                {business.price}
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Button size="sm" variant={index === 0 ? "default" : "outline"} className="w-full">
                                {index === 0 ? "Contact Now" : "View Profile"}
                                <ArrowRight className="h-3 w-3 ml-1" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success Message */}
          <AnimatePresence>
            {currentStep >= 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
              >
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-green-800 mb-1">Match Successful!</h3>
                <p className="text-green-600 text-sm">
                  TechCorp has been connected with AI Innovations Lab. 
                  Both parties will receive contact details and can begin discussions.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close Demo
            </Button>
            <Button onClick={() => {
              setCurrentStep(0);
              setProgress(0);
            }}>
              Restart Demo
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}