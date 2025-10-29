import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Building2, 
  Users, 
  MapPin, 
  DollarSign, 
  Star, 
  Plus, 
  X,
  CheckCircle,
  AlertCircle,
  Upload
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner@2.0.3";

interface BusinessData {
  // Basic Info
  businessName: string;
  businessType: "enterprise" | "small-business" | "";
  industry: string;
  description: string;
  foundedYear: string;
  website: string;
  
  // Contact Info
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  
  // Business Details
  employeeCount: string;
  annualRevenue: string;
  certifications: string[];
  services: string[];
  
  // Partnership Preferences
  lookingFor: string[];
  projectBudget: string;
  projectTimeline: string;
  preferredLocations: string[];
}

export function BusinessRegistrationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<BusinessData>({
    businessName: "",
    businessType: "",
    industry: "",
    description: "",
    foundedYear: "",
    website: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    employeeCount: "",
    annualRevenue: "",
    certifications: [],
    services: [],
    lookingFor: [],
    projectBudget: "",
    projectTimeline: "",
    preferredLocations: []
  });

  const [newService, setNewService] = useState("");
  const [newCertification, setNewCertification] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    { title: "Basic Info", description: "Tell us about your business" },
    { title: "Contact Details", description: "How can we reach you?" },
    { title: "Business Profile", description: "Showcase your capabilities" },
    { title: "Partnership Goals", description: "What are you looking for?" },
    { title: "Review & Submit", description: "Confirm your information" }
  ];

  const industries = [
    "Technology", "Healthcare", "Finance", "Manufacturing", "Retail",
    "Education", "Real Estate", "Consulting", "Marketing", "Legal",
    "Construction", "Transportation", "Energy", "Entertainment", "Other"
  ];

  const employeeCounts = [
    "1-10", "11-50", "51-200", "201-500", "501-1000", "1000-5000", "5000+"
  ];

  const revenueRanges = [
    "Under $100K", "$100K - $500K", "$500K - $1M", "$1M - $10M", 
    "$10M - $50M", "$50M - $100M", "Over $100M"
  ];

  const partnershipTypes = [
    "Service Providers", "Suppliers", "Technology Partners", "Distribution Partners",
    "Strategic Alliances", "Joint Ventures", "Clients", "Vendors"
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 0:
        if (!formData.businessName) newErrors.businessName = "Business name is required";
        if (!formData.businessType) newErrors.businessType = "Business type is required";
        if (!formData.industry) newErrors.industry = "Industry is required";
        if (!formData.description) newErrors.description = "Description is required";
        break;
      case 1:
        if (!formData.contactName) newErrors.contactName = "Contact name is required";
        if (!formData.contactEmail) newErrors.contactEmail = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) newErrors.contactEmail = "Invalid email format";
        if (!formData.city) newErrors.city = "City is required";
        if (!formData.country) newErrors.country = "Country is required";
        break;
      case 2:
        if (!formData.employeeCount) newErrors.employeeCount = "Employee count is required";
        if (formData.services.length === 0) newErrors.services = "At least one service is required";
        break;
      case 3:
        if (formData.lookingFor.length === 0) newErrors.lookingFor = "Please select what you're looking for";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = () => {
    toast.success("Business registration submitted successfully! We'll review your application and get back to you within 24 hours.");
    // Here you would submit to Supabase
  };

  const addService = () => {
    if (newService.trim() && !formData.services.includes(newService.trim())) {
      setFormData(prev => ({
        ...prev,
        services: [...prev.services, newService.trim()]
      }));
      setNewService("");
    }
  };

  const removeService = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter(s => s !== service)
    }));
  };

  const addCertification = () => {
    if (newCertification.trim() && !formData.certifications.includes(newCertification.trim())) {
      setFormData(prev => ({
        ...prev,
        certifications: [...prev.certifications, newCertification.trim()]
      }));
      setNewCertification("");
    }
  };

  const removeCertification = (cert: string) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(c => c !== cert)
    }));
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold mb-2">Join BizConnect</h2>
        <p className="text-muted-foreground">Create your business profile and start connecting with potential partners</p>
      </motion.div>

      {/* Progress Bar */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-4">
          <span className="font-medium">Registration Progress</span>
          <span className="text-sm text-muted-foreground">{Math.round(progress)}% complete</span>
        </div>
        <Progress value={progress} className="h-2 mb-4" />
        
        <div className="grid grid-cols-5 gap-2">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className={`p-3 rounded-lg border text-center transition-all duration-300 cursor-pointer ${
                index <= currentStep 
                  ? 'bg-primary text-primary-foreground border-primary' 
                  : 'bg-muted border-border hover:bg-accent'
              }`}
              onClick={() => index < currentStep && setCurrentStep(index)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-sm font-medium">{step.title}</div>
              <div className="text-xs opacity-80 mt-1">{step.description}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <Card className="min-h-[600px]">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {currentStep === 0 && <Building2 className="h-5 w-5" />}
            {currentStep === 1 && <MapPin className="h-5 w-5" />}
            {currentStep === 2 && <Star className="h-5 w-5" />}
            {currentStep === 3 && <Users className="h-5 w-5" />}
            {currentStep === 4 && <CheckCircle className="h-5 w-5" />}
            <span>{steps[currentStep].title}</span>
          </CardTitle>
          <CardDescription>{steps[currentStep].description}</CardDescription>
        </CardHeader>

        <CardContent>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Step 0: Basic Info */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Business Name *</Label>
                      <Input
                        id="businessName"
                        value={formData.businessName}
                        onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                        placeholder="Enter your business name"
                        className={errors.businessName ? "border-destructive" : ""}
                      />
                      {errors.businessName && (
                        <p className="text-sm text-destructive flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {errors.businessName}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="businessType">Business Type *</Label>
                      <Select value={formData.businessType} onValueChange={(value) => setFormData(prev => ({ ...prev, businessType: value as "enterprise" | "small-business" }))}>
                        <SelectTrigger className={errors.businessType ? "border-destructive" : ""}>
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="enterprise">Enterprise (500+ employees)</SelectItem>
                          <SelectItem value="small-business">Small Business (1-499 employees)</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.businessType && (
                        <p className="text-sm text-destructive flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {errors.businessType}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry *</Label>
                      <Select value={formData.industry} onValueChange={(value) => setFormData(prev => ({ ...prev, industry: value }))}>
                        <SelectTrigger className={errors.industry ? "border-destructive" : ""}>
                          <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {industries.map(industry => (
                            <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.industry && (
                        <p className="text-sm text-destructive flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {errors.industry}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="foundedYear">Founded Year</Label>
                      <Input
                        id="foundedYear"
                        type="number"
                        value={formData.foundedYear}
                        onChange={(e) => setFormData(prev => ({ ...prev, foundedYear: e.target.value }))}
                        placeholder="2020"
                        min="1800"
                        max={new Date().getFullYear()}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                      placeholder="https://www.yourcompany.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Business Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe your business, what you do, and what makes you unique..."
                      rows={4}
                      className={errors.description ? "border-destructive" : ""}
                    />
                    {errors.description && (
                      <p className="text-sm text-destructive flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.description}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 1: Contact Details */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="contactName">Contact Name *</Label>
                      <Input
                        id="contactName"
                        value={formData.contactName}
                        onChange={(e) => setFormData(prev => ({ ...prev, contactName: e.target.value }))}
                        placeholder="John Doe"
                        className={errors.contactName ? "border-destructive" : ""}
                      />
                      {errors.contactName && (
                        <p className="text-sm text-destructive flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {errors.contactName}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactEmail">Email *</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        value={formData.contactEmail}
                        onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
                        placeholder="john@company.com"
                        className={errors.contactEmail ? "border-destructive" : ""}
                      />
                      {errors.contactEmail && (
                        <p className="text-sm text-destructive flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {errors.contactEmail}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Phone Number</Label>
                    <Input
                      id="contactPhone"
                      type="tel"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData(prev => ({ ...prev, contactPhone: e.target.value }))}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                      placeholder="123 Business St, Suite 100"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                        placeholder="San Francisco"
                        className={errors.city ? "border-destructive" : ""}
                      />
                      {errors.city && (
                        <p className="text-sm text-destructive flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {errors.city}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">State/Region</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                        placeholder="California"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">Country *</Label>
                      <Input
                        id="country"
                        value={formData.country}
                        onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                        placeholder="United States"
                        className={errors.country ? "border-destructive" : ""}
                      />
                      {errors.country && (
                        <p className="text-sm text-destructive flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {errors.country}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Business Profile */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="employeeCount">Number of Employees *</Label>
                      <Select value={formData.employeeCount} onValueChange={(value) => setFormData(prev => ({ ...prev, employeeCount: value }))}>
                        <SelectTrigger className={errors.employeeCount ? "border-destructive" : ""}>
                          <SelectValue placeholder="Select employee count" />
                        </SelectTrigger>
                        <SelectContent>
                          {employeeCounts.map(count => (
                            <SelectItem key={count} value={count}>{count}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.employeeCount && (
                        <p className="text-sm text-destructive flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {errors.employeeCount}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="annualRevenue">Annual Revenue</Label>
                      <Select value={formData.annualRevenue} onValueChange={(value) => setFormData(prev => ({ ...prev, annualRevenue: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select revenue range" />
                        </SelectTrigger>
                        <SelectContent>
                          {revenueRanges.map(range => (
                            <SelectItem key={range} value={range}>{range}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Services Offered *</Label>
                      <div className="flex space-x-2 mt-2">
                        <Input
                          value={newService}
                          onChange={(e) => setNewService(e.target.value)}
                          placeholder="Add a service..."
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addService())}
                        />
                        <Button type="button" onClick={addService} variant="outline">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      {errors.services && (
                        <p className="text-sm text-destructive flex items-center mt-2">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {errors.services}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {formData.services.map((service) => (
                          <Badge key={service} variant="secondary" className="flex items-center space-x-1">
                            <span>{service}</span>
                            <button
                              onClick={() => removeService(service)}
                              className="hover:text-destructive"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Certifications & Awards</Label>
                      <div className="flex space-x-2 mt-2">
                        <Input
                          value={newCertification}
                          onChange={(e) => setNewCertification(e.target.value)}
                          placeholder="Add a certification..."
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCertification())}
                        />
                        <Button type="button" onClick={addCertification} variant="outline">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {formData.certifications.map((cert) => (
                          <Badge key={cert} variant="outline" className="flex items-center space-x-1">
                            <span>{cert}</span>
                            <button
                              onClick={() => removeCertification(cert)}
                              className="hover:text-destructive"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Partnership Goals */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Label>What are you looking for? *</Label>
                    {errors.lookingFor && (
                      <p className="text-sm text-destructive flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.lookingFor}
                      </p>
                    )}
                    <div className="grid grid-cols-2 gap-3">
                      {partnershipTypes.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={type}
                            checked={formData.lookingFor.includes(type)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFormData(prev => ({
                                  ...prev,
                                  lookingFor: [...prev.lookingFor, type]
                                }));
                              } else {
                                setFormData(prev => ({
                                  ...prev,
                                  lookingFor: prev.lookingFor.filter(item => item !== type)
                                }));
                              }
                            }}
                          />
                          <Label htmlFor={type} className="text-sm">{type}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="projectBudget">Typical Project Budget</Label>
                      <Select value={formData.projectBudget} onValueChange={(value) => setFormData(prev => ({ ...prev, projectBudget: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-10k">Under $10K</SelectItem>
                          <SelectItem value="10k-50k">$10K - $50K</SelectItem>
                          <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                          <SelectItem value="100k-500k">$100K - $500K</SelectItem>
                          <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                          <SelectItem value="over-1m">Over $1M</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="projectTimeline">Preferred Timeline</Label>
                      <Select value={formData.projectTimeline} onValueChange={(value) => setFormData(prev => ({ ...prev, projectTimeline: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asap">ASAP</SelectItem>
                          <SelectItem value="1-3-months">1-3 months</SelectItem>
                          <SelectItem value="3-6-months">3-6 months</SelectItem>
                          <SelectItem value="6-12-months">6-12 months</SelectItem>
                          <SelectItem value="over-1-year">Over 1 year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Review & Submit */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="bg-accent/50 p-6 rounded-lg">
                    <h3 className="font-semibold mb-4">Review Your Information</h3>
                    
                    <Tabs defaultValue="basic" className="w-full">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="basic">Basic</TabsTrigger>
                        <TabsTrigger value="contact">Contact</TabsTrigger>
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="goals">Goals</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="basic" className="space-y-3 mt-4">
                        <div><strong>Business Name:</strong> {formData.businessName}</div>
                        <div><strong>Type:</strong> {formData.businessType}</div>
                        <div><strong>Industry:</strong> {formData.industry}</div>
                        <div><strong>Description:</strong> {formData.description}</div>
                      </TabsContent>
                      
                      <TabsContent value="contact" className="space-y-3 mt-4">
                        <div><strong>Contact:</strong> {formData.contactName}</div>
                        <div><strong>Email:</strong> {formData.contactEmail}</div>
                        <div><strong>Location:</strong> {formData.city}, {formData.state} {formData.country}</div>
                      </TabsContent>
                      
                      <TabsContent value="profile" className="space-y-3 mt-4">
                        <div><strong>Employees:</strong> {formData.employeeCount}</div>
                        <div><strong>Services:</strong> {formData.services.join(", ")}</div>
                        <div><strong>Certifications:</strong> {formData.certifications.join(", ") || "None"}</div>
                      </TabsContent>
                      
                      <TabsContent value="goals" className="space-y-3 mt-4">
                        <div><strong>Looking for:</strong> {formData.lookingFor.join(", ")}</div>
                        <div><strong>Budget:</strong> {formData.projectBudget || "Not specified"}</div>
                        <div><strong>Timeline:</strong> {formData.projectTimeline || "Not specified"}</div>
                      </TabsContent>
                    </Tabs>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the Terms of Service and Privacy Policy
                    </Label>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button 
              variant="outline" 
              onClick={handlePrev}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            
            {currentStep < steps.length - 1 ? (
              <Button onClick={handleNext}>
                Next Step
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                Submit Registration
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}