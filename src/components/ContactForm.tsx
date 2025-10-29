import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Mail, 
  Phone, 
  MessageCircle, 
  Calendar,
  User,
  Building2,
  Target,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Send,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner@2.0.3";

interface ContactFormData {
  // Contact Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  
  // Inquiry Details
  inquiryType: string;
  subject: string;
  message: string;
  urgency: string;
  budget: string;
  timeline: string;
  
  // Partnership Details
  partnershipType: string[];
  industryFocus: string[];
  companySize: string;
  
  // Communication Preferences
  preferredContact: string;
  bestTimeToCall: string;
  marketingConsent: boolean;
}

const initialFormData: ContactFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  jobTitle: "",
  inquiryType: "",
  subject: "",
  message: "",
  urgency: "",
  budget: "",
  timeline: "",
  partnershipType: [],
  industryFocus: [],
  companySize: "",
  preferredContact: "",
  bestTimeToCall: "",
  marketingConsent: false
};

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  const inquiryTypes = [
    { value: "partnership", label: "Partnership Inquiry", icon: Building2 },
    { value: "service", label: "Service Request", icon: Target },
    { value: "support", label: "Customer Support", icon: MessageCircle },
    { value: "demo", label: "Product Demo", icon: Calendar },
    { value: "other", label: "Other", icon: Mail }
  ];

  const urgencyLevels = [
    { value: "low", label: "Low - Within 2 weeks", color: "bg-green-100 text-green-800" },
    { value: "medium", label: "Medium - Within 1 week", color: "bg-yellow-100 text-yellow-800" },
    { value: "high", label: "High - Within 3 days", color: "bg-orange-100 text-orange-800" },
    { value: "urgent", label: "Urgent - ASAP", color: "bg-red-100 text-red-800" }
  ];

  const budgetRanges = [
    "Under $10K", "$10K - $50K", "$50K - $100K", "$100K - $500K", 
    "$500K - $1M", "Over $1M", "Not specified"
  ];

  const partnershipTypes = [
    "Service Provider", "Technology Partner", "Supplier", "Distributor",
    "Strategic Alliance", "Joint Venture", "Client", "Vendor"
  ];

  const industries = [
    "Technology", "Healthcare", "Finance", "Manufacturing", "Retail",
    "Education", "Real Estate", "Consulting", "Marketing", "Legal"
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Required fields
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.company.trim()) newErrors.company = "Company name is required";
    if (!formData.inquiryType) newErrors.inquiryType = "Please select an inquiry type";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    // Phone validation (if provided)
    if (formData.phone && !/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Your message has been sent successfully! We'll get back to you within 24 hours.");
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});
    setIsSubmitted(false);
    setActiveTab("general");
  };

  const toggleArrayField = (field: keyof Pick<ContactFormData, 'partnershipType' | 'industryFocus'>, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto p-6"
      >
        <Card className="text-center">
          <CardContent className="p-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            </motion.div>
            <h2 className="text-2xl font-bold mb-2">Message Sent Successfully!</h2>
            <p className="text-muted-foreground mb-6">
              Thank you for contacting BizConnect. Our team will review your inquiry and get back to you within 24 hours.
            </p>
            <div className="flex justify-center space-x-4">
              <Button onClick={handleReset} variant="outline">
                Send Another Message
              </Button>
              <Button>
                Return to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold mb-2">Get in Touch</h2>
        <p className="text-muted-foreground">
          Ready to connect with the right business partners? Fill out the form below and we'll match you with relevant opportunities.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>Contact Form</span>
            </CardTitle>
            <CardDescription>
              Tell us about your business needs and we'll help you find the perfect match
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="general">General Info</TabsTrigger>
                <TabsTrigger value="details">Inquiry Details</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* General Info Tab */}
                  <TabsContent value="general" className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                          placeholder="John"
                          className={errors.firstName ? "border-destructive" : ""}
                        />
                        {errors.firstName && (
                          <p className="text-sm text-destructive flex items-center">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {errors.firstName}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                          placeholder="Doe"
                          className={errors.lastName ? "border-destructive" : ""}
                        />
                        {errors.lastName && (
                          <p className="text-sm text-destructive flex items-center">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="john@company.com"
                          className={errors.email ? "border-destructive" : ""}
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive flex items-center">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="+1 (555) 123-4567"
                          className={errors.phone ? "border-destructive" : ""}
                        />
                        {errors.phone && (
                          <p className="text-sm text-destructive flex items-center">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company Name *</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                          placeholder="Your Company Inc."
                          className={errors.company ? "border-destructive" : ""}
                        />
                        {errors.company && (
                          <p className="text-sm text-destructive flex items-center">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {errors.company}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="jobTitle">Job Title</Label>
                        <Input
                          id="jobTitle"
                          value={formData.jobTitle}
                          onChange={(e) => setFormData(prev => ({ ...prev, jobTitle: e.target.value }))}
                          placeholder="CEO, Marketing Director, etc."
                        />
                      </div>
                    </div>
                  </TabsContent>

                  {/* Inquiry Details Tab */}
                  <TabsContent value="details" className="space-y-6 mt-6">
                    <div className="space-y-4">
                      <Label>Inquiry Type *</Label>
                      {errors.inquiryType && (
                        <p className="text-sm text-destructive flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {errors.inquiryType}
                        </p>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {inquiryTypes.map((type) => {
                          const Icon = type.icon;
                          return (
                            <motion.div
                              key={type.value}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Card 
                                className={`cursor-pointer transition-all duration-200 ${
                                  formData.inquiryType === type.value 
                                    ? 'border-primary bg-primary/5' 
                                    : 'hover:border-primary/50'
                                }`}
                                onClick={() => setFormData(prev => ({ ...prev, inquiryType: type.value }))}
                              >
                                <CardContent className="p-4 text-center">
                                  <Icon className={`h-8 w-8 mx-auto mb-2 ${
                                    formData.inquiryType === type.value ? 'text-primary' : 'text-muted-foreground'
                                  }`} />
                                  <h4 className="font-medium text-sm">{type.label}</h4>
                                </CardContent>
                              </Card>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                        placeholder="Brief description of your inquiry"
                        className={errors.subject ? "border-destructive" : ""}
                      />
                      {errors.subject && (
                        <p className="text-sm text-destructive flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {errors.subject}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Please provide details about your inquiry, requirements, and any specific questions you have..."
                        rows={6}
                        className={errors.message ? "border-destructive" : ""}
                      />
                      {errors.message && (
                        <p className="text-sm text-destructive flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {errors.message}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {formData.message.length}/500 characters
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label>Urgency Level</Label>
                        <Select value={formData.urgency} onValueChange={(value) => setFormData(prev => ({ ...prev, urgency: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select urgency" />
                          </SelectTrigger>
                          <SelectContent>
                            {urgencyLevels.map(level => (
                              <SelectItem key={level.value} value={level.value}>
                                <div className="flex items-center space-x-2">
                                  <div className={`w-2 h-2 rounded-full ${level.color.split(' ')[0]}`} />
                                  <span>{level.label}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Budget Range</Label>
                        <Select value={formData.budget} onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select budget" />
                          </SelectTrigger>
                          <SelectContent>
                            {budgetRanges.map(range => (
                              <SelectItem key={range} value={range}>{range}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Timeline</Label>
                        <Select value={formData.timeline} onValueChange={(value) => setFormData(prev => ({ ...prev, timeline: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immediate">Immediate</SelectItem>
                            <SelectItem value="1-month">Within 1 month</SelectItem>
                            <SelectItem value="3-months">Within 3 months</SelectItem>
                            <SelectItem value="6-months">Within 6 months</SelectItem>
                            <SelectItem value="flexible">Flexible</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {formData.inquiryType === 'partnership' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="space-y-4"
                      >
                        <div className="space-y-3">
                          <Label>Partnership Types (select all that apply)</Label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {partnershipTypes.map(type => (
                              <div key={type} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`partnership-${type}`}
                                  checked={formData.partnershipType.includes(type)}
                                  onCheckedChange={() => toggleArrayField('partnershipType', type)}
                                />
                                <Label htmlFor={`partnership-${type}`} className="text-sm">{type}</Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label>Industry Focus</Label>
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                            {industries.map(industry => (
                              <div key={industry} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`industry-${industry}`}
                                  checked={formData.industryFocus.includes(industry)}
                                  onCheckedChange={() => toggleArrayField('industryFocus', industry)}
                                />
                                <Label htmlFor={`industry-${industry}`} className="text-sm">{industry}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </TabsContent>

                  {/* Preferences Tab */}
                  <TabsContent value="preferences" className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Preferred Contact Method</Label>
                        <Select value={formData.preferredContact} onValueChange={(value) => setFormData(prev => ({ ...prev, preferredContact: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select preference" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="phone">Phone Call</SelectItem>
                            <SelectItem value="video">Video Call</SelectItem>
                            <SelectItem value="any">Any Method</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Best Time to Call</Label>
                        <Select value={formData.bestTimeToCall} onValueChange={(value) => setFormData(prev => ({ ...prev, bestTimeToCall: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="morning">Morning (9-12 PM)</SelectItem>
                            <SelectItem value="afternoon">Afternoon (12-5 PM)</SelectItem>
                            <SelectItem value="evening">Evening (5-8 PM)</SelectItem>
                            <SelectItem value="anytime">Anytime</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Company Size</Label>
                      <Select value={formData.companySize} onValueChange={(value) => setFormData(prev => ({ ...prev, companySize: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="startup">Startup (1-10 employees)</SelectItem>
                          <SelectItem value="small">Small Business (11-50 employees)</SelectItem>
                          <SelectItem value="medium">Medium Business (51-200 employees)</SelectItem>
                          <SelectItem value="large">Large Business (201-1000 employees)</SelectItem>
                          <SelectItem value="enterprise">Enterprise (1000+ employees)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="marketingConsent"
                        checked={formData.marketingConsent}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, marketingConsent: !!checked }))}
                      />
                      <Label htmlFor="marketingConsent" className="text-sm">
                        I would like to receive updates about new partnership opportunities and BizConnect news
                      </Label>
                    </div>

                    <div className="bg-accent/50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">What happens next?</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• We'll review your inquiry within 24 hours</li>
                        <li>• A partnership specialist will contact you</li>
                        <li>• We'll match you with relevant business opportunities</li>
                        <li>• You'll receive personalized recommendations</li>
                      </ul>
                    </div>
                  </TabsContent>
                </motion.div>
              </AnimatePresence>

              {/* Navigation and Submit */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t">
                <div className="flex space-x-2">
                  {activeTab !== "general" && (
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        const tabs = ["general", "details", "preferences"];
                        const currentIndex = tabs.indexOf(activeTab);
                        if (currentIndex > 0) setActiveTab(tabs[currentIndex - 1]);
                      }}
                    >
                      Previous
                    </Button>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  {formData.urgency && (
                    <Badge 
                      className={urgencyLevels.find(l => l.value === formData.urgency)?.color}
                    >
                      {urgencyLevels.find(l => l.value === formData.urgency)?.label}
                    </Badge>
                  )}
                </div>

                <div className="flex space-x-2">
                  {activeTab !== "preferences" ? (
                    <Button 
                      onClick={() => {
                        const tabs = ["general", "details", "preferences"];
                        const currentIndex = tabs.indexOf(activeTab);
                        if (currentIndex < tabs.length - 1) setActiveTab(tabs[currentIndex + 1]);
                      }}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleSubmit} 
                      disabled={isSubmitting}
                      className="min-w-[120px]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}