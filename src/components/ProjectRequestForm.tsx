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
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { 
  CalendarIcon,
  DollarSign,
  Clock,
  MapPin,
  Users,
  FileText,
  Target,
  Briefcase,
  CheckCircle,
  AlertCircle,
  Plus,
  X,
  Upload,
  Eye,
  Send,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner@2.0.3";
import { format } from "date-fns";

interface ProjectRequirement {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
}

interface ProjectFormData {
  // Basic Project Info
  projectTitle: string;
  projectDescription: string;
  category: string;
  subcategory: string;
  
  // Budget & Timeline
  budgetType: "fixed" | "hourly" | "negotiable";
  budgetAmount: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  timeline: string;
  
  // Requirements
  requirements: ProjectRequirement[];
  skillsNeeded: string[];
  experienceLevel: string;
  
  // Location & Remote Work
  workLocation: "remote" | "onsite" | "hybrid";
  preferredLocations: string[];
  timezone: string;
  
  // Company Info
  companyName: string;
  industryType: string;
  companySize: string;
  contactName: string;
  contactEmail: string;
  
  // Additional Details
  attachments: File[];
  specialInstructions: string;
  nda: boolean;
  urgent: boolean;
}

const initialFormData: ProjectFormData = {
  projectTitle: "",
  projectDescription: "",
  category: "",
  subcategory: "",
  budgetType: "fixed",
  budgetAmount: "",
  startDate: undefined,
  endDate: undefined,
  timeline: "",
  requirements: [],
  skillsNeeded: [],
  experienceLevel: "",
  workLocation: "remote",
  preferredLocations: [],
  timezone: "",
  companyName: "",
  industryType: "",
  companySize: "",
  contactName: "",
  contactEmail: "",
  attachments: [],
  specialInstructions: "",
  nda: false,
  urgent: false
};

export function ProjectRequestForm() {
  const [formData, setFormData] = useState<ProjectFormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [newRequirement, setNewRequirement] = useState({ title: "", description: "", priority: "medium" as const });

  const steps = [
    { title: "Project Details", description: "Basic information about your project" },
    { title: "Budget & Timeline", description: "Financial and scheduling details" },
    { title: "Requirements", description: "Skills and requirements needed" },
    { title: "Location & Contact", description: "Work arrangement and contact info" },
    { title: "Review & Submit", description: "Final review and submission" }
  ];

  const categories = {
    "Technology": ["Web Development", "Mobile Development", "AI/ML", "Cloud Services", "Cybersecurity"],
    "Design": ["UI/UX Design", "Graphic Design", "Brand Identity", "Product Design", "Marketing Materials"],
    "Marketing": ["Digital Marketing", "Content Marketing", "SEO/SEM", "Social Media", "Email Marketing"],
    "Consulting": ["Business Strategy", "Management Consulting", "Financial Consulting", "IT Consulting", "HR Consulting"],
    "Writing": ["Content Writing", "Technical Writing", "Copywriting", "Translation", "Editing"]
  };

  const skills = [
    "React", "Node.js", "Python", "JavaScript", "TypeScript", "AWS", "Docker", "MongoDB",
    "Figma", "Adobe Creative Suite", "Sketch", "Photoshop", "Illustrator",
    "Google Analytics", "Facebook Ads", "SEO", "Content Strategy", "Email Marketing",
    "Project Management", "Business Analysis", "Data Analysis", "Strategic Planning"
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 0:
        if (!formData.projectTitle.trim()) newErrors.projectTitle = "Project title is required";
        if (!formData.projectDescription.trim()) newErrors.projectDescription = "Project description is required";
        if (!formData.category) newErrors.category = "Category is required";
        break;
      case 1:
        if (!formData.budgetAmount.trim()) newErrors.budgetAmount = "Budget amount is required";
        if (!formData.timeline) newErrors.timeline = "Timeline is required";
        break;
      case 2:
        if (formData.skillsNeeded.length === 0) newErrors.skillsNeeded = "At least one skill is required";
        if (!formData.experienceLevel) newErrors.experienceLevel = "Experience level is required";
        break;
      case 3:
        if (!formData.contactName.trim()) newErrors.contactName = "Contact name is required";
        if (!formData.contactEmail.trim()) newErrors.contactEmail = "Contact email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) newErrors.contactEmail = "Invalid email format";
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

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Project request submitted successfully! You'll start receiving proposals within 24 hours.");
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skillsNeeded.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skillsNeeded: [...prev.skillsNeeded, newSkill.trim()]
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skillsNeeded: prev.skillsNeeded.filter(s => s !== skill)
    }));
  };

  const addRequirement = () => {
    if (newRequirement.title.trim() && newRequirement.description.trim()) {
      const requirement: ProjectRequirement = {
        id: Date.now().toString(),
        title: newRequirement.title.trim(),
        description: newRequirement.description.trim(),
        priority: newRequirement.priority
      };
      setFormData(prev => ({
        ...prev,
        requirements: [...prev.requirements, requirement]
      }));
      setNewRequirement({ title: "", description: "", priority: "medium" });
    }
  };

  const removeRequirement = (id: string) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter(req => req.id !== id)
    }));
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

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
            <h2 className="text-2xl font-bold mb-2">Project Request Submitted!</h2>
            <p className="text-muted-foreground mb-6">
              Your project "{formData.projectTitle}" has been posted successfully. Qualified vendors will start submitting proposals within 24 hours.
            </p>
            <div className="space-y-4">
              <div className="bg-accent/50 p-4 rounded-lg text-left">
                <h3 className="font-semibold mb-2">What happens next?</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Vendors will review your project requirements</li>
                  <li>• You'll receive proposals with quotes and timelines</li>
                  <li>• Review vendor profiles and previous work</li>
                  <li>• Interview your top candidates</li>
                  <li>• Choose the best vendor for your project</li>
                </ul>
              </div>
              <div className="flex justify-center space-x-4">
                <Button onClick={() => window.location.hash = 'dashboard'} variant="outline">
                  View Dashboard
                </Button>
                <Button onClick={() => setIsSubmitted(false)}>
                  Post Another Project
                </Button>
              </div>
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
        <h2 className="text-3xl font-bold mb-2">Post a Project Request</h2>
        <p className="text-muted-foreground">Tell us about your project and get proposals from qualified vendors</p>
      </motion.div>

      {/* Progress Bar */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-4">
          <span className="font-medium">Project Setup Progress</span>
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
            {currentStep === 0 && <FileText className="h-5 w-5" />}
            {currentStep === 1 && <DollarSign className="h-5 w-5" />}
            {currentStep === 2 && <Target className="h-5 w-5" />}
            {currentStep === 3 && <MapPin className="h-5 w-5" />}
            {currentStep === 4 && <Eye className="h-5 w-5" />}
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
              {/* Step 0: Project Details */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="projectTitle">Project Title *</Label>
                    <Input
                      id="projectTitle"
                      value={formData.projectTitle}
                      onChange={(e) => setFormData(prev => ({ ...prev, projectTitle: e.target.value }))}
                      placeholder="e.g., E-commerce Website Development"
                      className={errors.projectTitle ? "border-destructive" : ""}
                    />
                    {errors.projectTitle && (
                      <p className="text-sm text-destructive flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.projectTitle}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Category *</Label>
                      <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value, subcategory: "" }))}>
                        <SelectTrigger className={errors.category ? "border-destructive" : ""}>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(categories).map(category => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.category && (
                        <p className="text-sm text-destructive flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {errors.category}
                        </p>
                      )}
                    </div>

                    {formData.category && (
                      <div className="space-y-2">
                        <Label>Subcategory</Label>
                        <Select value={formData.subcategory} onValueChange={(value) => setFormData(prev => ({ ...prev, subcategory: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select subcategory" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories[formData.category as keyof typeof categories]?.map(subcategory => (
                              <SelectItem key={subcategory} value={subcategory}>{subcategory}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="projectDescription">Project Description *</Label>
                    <Textarea
                      id="projectDescription"
                      value={formData.projectDescription}
                      onChange={(e) => setFormData(prev => ({ ...prev, projectDescription: e.target.value }))}
                      placeholder="Describe your project in detail. Include goals, scope, expected deliverables, and any specific requirements..."
                      rows={6}
                      className={errors.projectDescription ? "border-destructive" : ""}
                    />
                    {errors.projectDescription && (
                      <p className="text-sm text-destructive flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.projectDescription}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {formData.projectDescription.length}/1000 characters
                    </p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="urgent"
                        checked={formData.urgent}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, urgent: !!checked }))}
                      />
                      <Label htmlFor="urgent" className="text-sm">This is an urgent project</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="nda"
                        checked={formData.nda}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, nda: !!checked }))}
                      />
                      <Label htmlFor="nda" className="text-sm">NDA required</Label>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 1: Budget & Timeline */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Label>Budget Type</Label>
                    <div className="grid grid-cols-3 gap-4">
                      {["fixed", "hourly", "negotiable"].map((type) => (
                        <Card
                          key={type}
                          className={`cursor-pointer transition-all duration-200 ${
                            formData.budgetType === type 
                              ? 'border-primary bg-primary/5' 
                              : 'hover:border-primary/50'
                          }`}
                          onClick={() => setFormData(prev => ({ ...prev, budgetType: type as any }))}
                        >
                          <CardContent className="p-4 text-center">
                            <DollarSign className={`h-6 w-6 mx-auto mb-2 ${
                              formData.budgetType === type ? 'text-primary' : 'text-muted-foreground'
                            }`} />
                            <h4 className="font-medium capitalize">{type} {type === "fixed" ? "Price" : type === "hourly" ? "Rate" : "Budget"}</h4>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budgetAmount">
                      Budget Amount * 
                      {formData.budgetType === "hourly" && " (per hour)"}
                      {formData.budgetType === "fixed" && " (total project)"}
                    </Label>
                    <Input
                      id="budgetAmount"
                      value={formData.budgetAmount}
                      onChange={(e) => setFormData(prev => ({ ...prev, budgetAmount: e.target.value }))}
                      placeholder={
                        formData.budgetType === "hourly" ? "$50-100/hour" :
                        formData.budgetType === "fixed" ? "$5,000-10,000" :
                        "To be discussed"
                      }
                      className={errors.budgetAmount ? "border-destructive" : ""}
                    />
                    {errors.budgetAmount && (
                      <p className="text-sm text-destructive flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.budgetAmount}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Preferred Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.startDate ? format(formData.startDate, "PPP") : "Select start date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={formData.startDate}
                            onSelect={(date) => setFormData(prev => ({ ...prev, startDate: date }))}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label>Expected End Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.endDate ? format(formData.endDate, "PPP") : "Select end date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={formData.endDate}
                            onSelect={(date) => setFormData(prev => ({ ...prev, endDate: date }))}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Project Timeline *</Label>
                    <Select value={formData.timeline} onValueChange={(value) => setFormData(prev => ({ ...prev, timeline: value }))}>
                      <SelectTrigger className={errors.timeline ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asap">ASAP (Rush job)</SelectItem>
                        <SelectItem value="1-week">Within 1 week</SelectItem>
                        <SelectItem value="2-weeks">Within 2 weeks</SelectItem>
                        <SelectItem value="1-month">Within 1 month</SelectItem>
                        <SelectItem value="3-months">Within 3 months</SelectItem>
                        <SelectItem value="6-months">Within 6 months</SelectItem>
                        <SelectItem value="flexible">Flexible timeline</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.timeline && (
                      <p className="text-sm text-destructive flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.timeline}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Requirements */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Label>Skills Needed *</Label>
                    {errors.skillsNeeded && (
                      <p className="text-sm text-destructive flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.skillsNeeded}
                      </p>
                    )}
                    <div className="flex space-x-2">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Add a skill..."
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                      />
                      <Button type="button" onClick={addSkill} variant="outline">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {skills.map(skill => (
                        <Button
                          key={skill}
                          variant={formData.skillsNeeded.includes(skill) ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            if (formData.skillsNeeded.includes(skill)) {
                              removeSkill(skill);
                            } else {
                              setFormData(prev => ({
                                ...prev,
                                skillsNeeded: [...prev.skillsNeeded, skill]
                              }));
                            }
                          }}
                          className="justify-start text-xs"
                        >
                          {skill}
                        </Button>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.skillsNeeded.map((skill) => (
                        <Badge key={skill} variant="secondary" className="flex items-center space-x-1">
                          <span>{skill}</span>
                          <button
                            onClick={() => removeSkill(skill)}
                            className="hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Experience Level Required *</Label>
                    <Select value={formData.experienceLevel} onValueChange={(value) => setFormData(prev => ({ ...prev, experienceLevel: value }))}>
                      <SelectTrigger className={errors.experienceLevel ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                        <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                        <SelectItem value="expert">Expert (5+ years)</SelectItem>
                        <SelectItem value="any">Any experience level</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.experienceLevel && (
                      <p className="text-sm text-destructive flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.experienceLevel}
                      </p>
                    )}
                  </div>

                  <div className="space-y-4">
                    <Label>Specific Requirements</Label>
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Input
                          value={newRequirement.title}
                          onChange={(e) => setNewRequirement(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="Requirement title..."
                        />
                        <Select value={newRequirement.priority} onValueChange={(value) => setNewRequirement(prev => ({ ...prev, priority: value as any }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high">High Priority</SelectItem>
                            <SelectItem value="medium">Medium Priority</SelectItem>
                            <SelectItem value="low">Low Priority</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex space-x-2">
                        <Textarea
                          value={newRequirement.description}
                          onChange={(e) => setNewRequirement(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Describe this requirement in detail..."
                          rows={2}
                        />
                        <Button type="button" onClick={addRequirement} variant="outline">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {formData.requirements.map((req) => (
                        <Card key={req.id} className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h4 className="font-medium">{req.title}</h4>
                                <Badge variant={
                                  req.priority === "high" ? "destructive" :
                                  req.priority === "medium" ? "default" : "secondary"
                                }>
                                  {req.priority} priority
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{req.description}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeRequirement(req.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Location & Contact */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Label>Work Location Preference</Label>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { value: "remote", label: "Remote Only", icon: "🏠" },
                        { value: "onsite", label: "On-site Only", icon: "🏢" },
                        { value: "hybrid", label: "Hybrid", icon: "🔄" }
                      ].map((option) => (
                        <Card
                          key={option.value}
                          className={`cursor-pointer transition-all duration-200 ${
                            formData.workLocation === option.value 
                              ? 'border-primary bg-primary/5' 
                              : 'hover:border-primary/50'
                          }`}
                          onClick={() => setFormData(prev => ({ ...prev, workLocation: option.value as any }))}
                        >
                          <CardContent className="p-4 text-center">
                            <div className="text-2xl mb-2">{option.icon}</div>
                            <h4 className="font-medium">{option.label}</h4>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

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
                      <Label htmlFor="contactEmail">Contact Email *</Label>
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                        placeholder="Your Company Inc."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Company Size</Label>
                      <Select value={formData.companySize} onValueChange={(value) => setFormData(prev => ({ ...prev, companySize: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="startup">Startup (1-10)</SelectItem>
                          <SelectItem value="small">Small (11-50)</SelectItem>
                          <SelectItem value="medium">Medium (51-200)</SelectItem>
                          <SelectItem value="large">Large (201-1000)</SelectItem>
                          <SelectItem value="enterprise">Enterprise (1000+)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialInstructions">Special Instructions</Label>
                    <Textarea
                      id="specialInstructions"
                      value={formData.specialInstructions}
                      onChange={(e) => setFormData(prev => ({ ...prev, specialInstructions: e.target.value }))}
                      placeholder="Any additional instructions or requirements for vendors..."
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Review & Submit */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="bg-accent/50 p-6 rounded-lg">
                    <h3 className="font-semibold mb-4">Project Summary</h3>
                    
                    <Tabs defaultValue="basic" className="w-full">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="basic">Basic Info</TabsTrigger>
                        <TabsTrigger value="budget">Budget</TabsTrigger>
                        <TabsTrigger value="requirements">Requirements</TabsTrigger>
                        <TabsTrigger value="contact">Contact</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="basic" className="space-y-3 mt-4">
                        <div><strong>Title:</strong> {formData.projectTitle}</div>
                        <div><strong>Category:</strong> {formData.category} {formData.subcategory && `> ${formData.subcategory}`}</div>
                        <div><strong>Description:</strong> {formData.projectDescription}</div>
                        {formData.urgent && <Badge variant="destructive">Urgent Project</Badge>}
                        {formData.nda && <Badge variant="outline">NDA Required</Badge>}
                      </TabsContent>
                      
                      <TabsContent value="budget" className="space-y-3 mt-4">
                        <div><strong>Budget Type:</strong> {formData.budgetType}</div>
                        <div><strong>Amount:</strong> {formData.budgetAmount}</div>
                        <div><strong>Timeline:</strong> {formData.timeline}</div>
                        {formData.startDate && <div><strong>Start Date:</strong> {format(formData.startDate, "PPP")}</div>}
                        {formData.endDate && <div><strong>End Date:</strong> {format(formData.endDate, "PPP")}</div>}
                      </TabsContent>
                      
                      <TabsContent value="requirements" className="space-y-3 mt-4">
                        <div><strong>Skills:</strong> {formData.skillsNeeded.join(", ")}</div>
                        <div><strong>Experience Level:</strong> {formData.experienceLevel}</div>
                        <div><strong>Requirements:</strong> {formData.requirements.length} specific requirements</div>
                      </TabsContent>
                      
                      <TabsContent value="contact" className="space-y-3 mt-4">
                        <div><strong>Contact:</strong> {formData.contactName}</div>
                        <div><strong>Email:</strong> {formData.contactEmail}</div>
                        <div><strong>Work Location:</strong> {formData.workLocation}</div>
                        {formData.companyName && <div><strong>Company:</strong> {formData.companyName}</div>}
                      </TabsContent>
                    </Tabs>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium mb-2 text-blue-800">What happens after submission?</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Your project will be reviewed and approved within 2 hours</li>
                      <li>• Qualified vendors will submit proposals with quotes</li>
                      <li>• You'll receive notifications for new proposals</li>
                      <li>• Review vendor profiles and compare offers</li>
                      <li>• Choose your preferred vendor and start the project</li>
                    </ul>
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
            
            <div className="flex items-center space-x-2">
              {formData.urgent && (
                <Badge variant="destructive">Urgent</Badge>
              )}
              {formData.nda && (
                <Badge variant="outline">NDA Required</Badge>
              )}
            </div>
            
            {currentStep < steps.length - 1 ? (
              <Button onClick={handleNext}>
                Next Step
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit} 
                disabled={isSubmitting}
                className="min-w-[140px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Project
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}