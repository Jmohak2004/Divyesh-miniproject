import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import { Star, Send, MessageSquare, Heart } from "lucide-react";
import { toast } from "sonner@2.0.3";

export function FeedbackForm() {
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    rating: "",
    userType: "",
    experience: "",
    mostHelpful: [] as string[],
    improvements: "",
    wouldRecommend: "",
    testimonialConsent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFeedback(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFeatureToggle = (feature: string, checked: boolean) => {
    setFeedback(prev => ({
      ...prev,
      mostHelpful: checked 
        ? [...prev.mostHelpful, feature]
        : prev.mostHelpful.filter(f => f !== feature)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success("Thank you for your feedback! Your input helps us improve BizConnect.", {
      description: "We may reach out to feature your experience as a success story."
    });

    // Reset form
    setFeedback({
      name: "",
      email: "",
      company: "",
      role: "",
      rating: "",
      userType: "",
      experience: "",
      mostHelpful: [],
      improvements: "",
      wouldRecommend: "",
      testimonialConsent: false
    });

    setIsSubmitting(false);
  };

  const features = [
    "AI-powered matching algorithm",
    "Verified partner network",
    "Interactive dashboard",
    "Business registration process", 
    "Vendor search functionality",
    "Project request system",
    "Communication tools",
    "Mobile-responsive design"
  ];

  const isFormValid = feedback.name && feedback.email && feedback.rating && feedback.experience && feedback.wouldRecommend;

  return (
    <div className="mt-20 border-t pt-20">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <MessageSquare className="h-8 w-8 text-primary mr-3" />
          <h3 className="text-3xl font-bold">Share Your Experience</h3>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Help us improve BizConnect by sharing your feedback about the platform experience
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Feedback Stats */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Heart className="h-6 w-6 text-primary mr-2" />
                <h4 className="text-xl font-semibold">Your Voice Matters</h4>
              </div>
              <p className="text-muted-foreground mb-6">
                Every piece of feedback helps us create better experiences for businesses like yours. 
                Join the conversation and help shape the future of business networking.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-primary">1,247</div>
                  <div className="text-sm text-muted-foreground">Feedback Received</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-primary">4.8/5</div>
                  <div className="text-sm text-muted-foreground">Average Rating</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="h-5 w-5 text-primary mr-2" />
                Recent Feedback Highlights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <p className="text-sm italic">"The AI matching is incredibly accurate - found perfect partners in days, not months!"</p>
                <div className="text-xs text-muted-foreground mt-1">- Enterprise User, Tech Industry</div>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <p className="text-sm italic">"User-friendly interface made onboarding our team seamless."</p>
                <div className="text-xs text-muted-foreground mt-1">- Small Business Owner</div>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <p className="text-sm italic">"Mobile experience is fantastic - can manage partnerships on the go."</p>
                <div className="text-xs text-muted-foreground mt-1">- Procurement Manager</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feedback Form */}
        <Card>
          <CardHeader>
            <CardTitle>Share Your Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    value={feedback.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@company.com"
                    value={feedback.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    placeholder="Company name"
                    value={feedback.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    placeholder="Your job title"
                    value={feedback.role}
                    onChange={(e) => handleInputChange("role", e.target.value)}
                  />
                </div>
              </div>

              {/* User Type */}
              <div className="space-y-3">
                <Label>I represent a *</Label>
                <RadioGroup 
                  value={feedback.userType} 
                  onValueChange={(value) => handleInputChange("userType", value)}
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="enterprise" id="enterprise" />
                    <Label htmlFor="enterprise">Enterprise Company</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="small-business" id="small-business" />
                    <Label htmlFor="small-business">Small Business</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Rating */}
              <div className="space-y-3">
                <Label>Overall Rating *</Label>
                <RadioGroup 
                  value={feedback.rating} 
                  onValueChange={(value) => handleInputChange("rating", value)}
                  className="flex space-x-4"
                >
                  {[1, 2, 3, 4].map((rating) => (
                    <div key={rating} className="flex items-center space-x-2">
                      <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} />
                      <Label htmlFor={`rating-${rating}`} className="flex items-center">
                        {Array.from({ length: rating }, (_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Experience */}
              <div className="space-y-2">
                <Label htmlFor="experience">Tell us about your experience *</Label>
                <Textarea
                  id="experience"
                  placeholder="What do you like about BizConnect? How has it helped your business?"
                  value={feedback.experience}
                  onChange={(e) => handleInputChange("experience", e.target.value)}
                  rows={4}
                  required
                />
              </div>

              {/* Most Helpful Features */}
              <div className="space-y-3">
                <Label>Which features do you find most helpful? (Select all that apply)</Label>
                <div className="grid md:grid-cols-2 gap-2">
                  {features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Checkbox
                        id={feature}
                        checked={feedback.mostHelpful.includes(feature)}
                        onCheckedChange={(checked) => handleFeatureToggle(feature, checked as boolean)}
                      />
                      <Label htmlFor={feature} className="text-sm">{feature}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Improvements */}
              <div className="space-y-2">
                <Label htmlFor="improvements">What could we improve?</Label>
                <Textarea
                  id="improvements"
                  placeholder="Any suggestions for features, improvements, or changes you'd like to see?"
                  value={feedback.improvements}
                  onChange={(e) => handleInputChange("improvements", e.target.value)}
                  rows={3}
                />
              </div>

              {/* Recommendation */}
              <div className="space-y-3">
                <Label>Would you recommend BizConnect to others? *</Label>
                <RadioGroup 
                  value={feedback.wouldRecommend} 
                  onValueChange={(value) => handleInputChange("wouldRecommend", value)}
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="definitely" id="definitely" />
                    <Label htmlFor="definitely">Definitely</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="probably" id="probably" />
                    <Label htmlFor="probably">Probably</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="maybe" id="maybe" />
                    <Label htmlFor="maybe">Maybe</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="unlikely" id="unlikely" />
                    <Label htmlFor="unlikely">Unlikely</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Testimonial Consent */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="testimonial-consent"
                  checked={feedback.testimonialConsent}
                  onCheckedChange={(checked) => handleInputChange("testimonialConsent", checked as boolean)}
                />
                <Label htmlFor="testimonial-consent" className="text-sm leading-relaxed">
                  I give permission for BizConnect to use my feedback as a testimonial on their website and marketing materials (optional)
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={!isFormValid || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Feedback
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}