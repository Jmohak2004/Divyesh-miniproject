import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { Slider } from "./ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  Users, 
  DollarSign,
  Clock,
  Building2,
  Briefcase,
  Award,
  Heart,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner@2.0.3";

interface Vendor {
  id: string;
  name: string;
  industry: string;
  location: string;
  rating: number;
  reviewCount: number;
  employees: string;
  founded: string;
  priceRange: string;
  specializations: string[];
  certifications: string[];
  description: string;
  projectsCompleted: number;
  responseTime: string;
  verified: boolean;
  featured: boolean;
}

// Mock vendor data
const mockVendors: Vendor[] = [
  {
    id: "1",
    name: "AI Innovations Lab",
    industry: "Technology",
    location: "Austin, TX",
    rating: 4.9,
    reviewCount: 127,
    employees: "25",
    founded: "2018",
    priceRange: "$150-300/hr",
    specializations: ["Machine Learning", "AI Strategy", "Data Analytics"],
    certifications: ["AWS Certified", "Google Cloud Partner"],
    description: "Leading AI consulting firm specializing in enterprise digital transformation.",
    projectsCompleted: 85,
    responseTime: "< 4 hours",
    verified: true,
    featured: true
  },
  {
    id: "2",
    name: "DataMind Consulting",
    industry: "Technology",
    location: "Boston, MA",
    rating: 4.8,
    reviewCount: 98,
    employees: "18",
    founded: "2019",
    priceRange: "$120-250/hr",
    specializations: ["Enterprise AI", "Process Automation", "Cloud Migration"],
    certifications: ["Microsoft Partner", "Salesforce Certified"],
    description: "Expert consultants in AI implementation and business process optimization.",
    projectsCompleted: 72,
    responseTime: "< 6 hours",
    verified: true,
    featured: false
  },
  {
    id: "3",
    name: "Green Energy Solutions",
    industry: "Energy",
    location: "Denver, CO",
    rating: 4.7,
    reviewCount: 156,
    employees: "42",
    founded: "2015",
    priceRange: "$100-200/hr",
    specializations: ["Solar Installation", "Energy Audits", "Sustainability Consulting"],
    certifications: ["NABCEP Certified", "LEED Accredited"],
    description: "Sustainable energy solutions for commercial and industrial clients.",
    projectsCompleted: 203,
    responseTime: "< 8 hours",
    verified: true,
    featured: false
  },
  {
    id: "4",
    name: "Creative Marketing Hub",
    industry: "Marketing",
    location: "Los Angeles, CA",
    rating: 4.6,
    reviewCount: 89,
    employees: "12",
    founded: "2020",
    priceRange: "$80-180/hr",
    specializations: ["Digital Marketing", "Brand Strategy", "Content Creation"],
    certifications: ["Google Ads Certified", "HubSpot Partner"],
    description: "Full-service marketing agency focusing on digital growth strategies.",
    projectsCompleted: 134,
    responseTime: "< 12 hours",
    verified: false,
    featured: true
  }
];

export function VendorSearchForm() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("all-industries");
  const [selectedLocation, setSelectedLocation] = useState("all-locations");
  const [ratingFilter, setRatingFilter] = useState([0]);
  const [employeeRange, setEmployeeRange] = useState("any-size");
  const [priceRange, setPriceRange] = useState("");
  const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [savedVendors, setSavedVendors] = useState<string[]>([]);
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>(mockVendors);
  const [isSearching, setIsSearching] = useState(false);

  const industries = ["Technology", "Healthcare", "Finance", "Manufacturing", "Marketing", "Energy", "Legal", "Consulting"];
  const locations = ["Austin, TX", "Boston, MA", "Denver, CO", "Los Angeles, CA", "New York, NY", "San Francisco, CA", "Seattle, WA"];
  const specializations = [
    "Machine Learning", "AI Strategy", "Data Analytics", "Enterprise AI", "Process Automation",
    "Cloud Migration", "Solar Installation", "Energy Audits", "Sustainability Consulting",
    "Digital Marketing", "Brand Strategy", "Content Creation"
  ];

  // Filter vendors based on search criteria
  useEffect(() => {
    const applyFilters = () => {
      setIsSearching(true);
      
      setTimeout(() => {
        let filtered = mockVendors.filter(vendor => {
          // Text search
          const matchesSearch = !searchQuery || 
            vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vendor.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vendor.specializations.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()));

          // Industry filter
          const matchesIndustry = !selectedIndustry || selectedIndustry === "all-industries" || vendor.industry === selectedIndustry;

          // Location filter
          const matchesLocation = !selectedLocation || selectedLocation === "all-locations" || vendor.location === selectedLocation;

          // Rating filter
          const matchesRating = vendor.rating >= ratingFilter[0];

          // Employee count filter
          const matchesEmployees = !employeeRange || employeeRange === "any-size" ||
            (employeeRange === "1-10" && parseInt(vendor.employees) <= 10) ||
            (employeeRange === "11-50" && parseInt(vendor.employees) >= 11 && parseInt(vendor.employees) <= 50) ||
            (employeeRange === "51+" && parseInt(vendor.employees) > 50);

          // Specialization filter
          const matchesSpecializations = selectedSpecializations.length === 0 ||
            selectedSpecializations.some(spec => vendor.specializations.includes(spec));

          // Verified filter
          const matchesVerified = !verifiedOnly || vendor.verified;

          // Featured filter
          const matchesFeatured = !featuredOnly || vendor.featured;

          return matchesSearch && matchesIndustry && matchesLocation && matchesRating && 
                 matchesEmployees && matchesSpecializations && matchesVerified && matchesFeatured;
        });

        // Sort by featured first, then by rating
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
        });

        setFilteredVendors(filtered);
        setIsSearching(false);
      }, 500);
    };

    applyFilters();
  }, [searchQuery, selectedIndustry, selectedLocation, ratingFilter, employeeRange, 
      selectedSpecializations, verifiedOnly, featuredOnly]);

  const toggleSaveVendor = (vendorId: string) => {
    setSavedVendors(prev => 
      prev.includes(vendorId) 
        ? prev.filter(id => id !== vendorId)
        : [...prev, vendorId]
    );
    
    const action = savedVendors.includes(vendorId) ? "removed from" : "added to";
    toast.success(`Vendor ${action} your saved list`);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedIndustry("all-industries");
    setSelectedLocation("all-locations");
    setRatingFilter([0]);
    setEmployeeRange("any-size");
    setPriceRange("");
    setSelectedSpecializations([]);
    setVerifiedOnly(false);
    setFeaturedOnly(false);
  };

  const toggleSpecialization = (spec: string) => {
    setSelectedSpecializations(prev =>
      prev.includes(spec)
        ? prev.filter(s => s !== spec)
        : [...prev, spec]
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold mb-2">Find Your Perfect Business Partner</h2>
        <p className="text-muted-foreground">Search through thousands of verified vendors and service providers</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Clear All
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Search */}
              <div className="space-y-2">
                <Label>Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search vendors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              {/* Industry */}
              <div className="space-y-2">
                <Label>Industry</Label>
                <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                  <SelectTrigger>
                    <SelectValue placeholder="All industries" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-industries">All Industries</SelectItem>
                    {industries.map(industry => (
                      <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label>Location</Label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="All locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-locations">All Locations</SelectItem>
                    {locations.map(location => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Rating */}
              <div className="space-y-3">
                <Label>Minimum Rating</Label>
                <div className="px-2">
                  <Slider
                    value={ratingFilter}
                    onValueChange={setRatingFilter}
                    max={5}
                    min={0}
                    step={0.5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>0</span>
                    <span className="font-medium">{ratingFilter[0]}+ stars</span>
                    <span>5</span>
                  </div>
                </div>
              </div>

              {/* Quick Filters */}
              <div className="space-y-3">
                <Label>Quick Filters</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="verified"
                      checked={verifiedOnly}
                      onCheckedChange={setVerifiedOnly}
                    />
                    <Label htmlFor="verified" className="text-sm">Verified vendors only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="featured"
                      checked={featuredOnly}
                      onCheckedChange={setFeaturedOnly}
                    />
                    <Label htmlFor="featured" className="text-sm">Featured vendors only</Label>
                  </div>
                </div>
              </div>

              {/* Advanced Filters */}
              <div className="space-y-3">
                <Button
                  variant="ghost"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center justify-between w-full p-0 h-auto"
                >
                  <span>Advanced Filters</span>
                  {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>

                <AnimatePresence>
                  {showAdvanced && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4"
                    >
                      {/* Employee Count */}
                      <div className="space-y-2">
                        <Label>Company Size</Label>
                        <Select value={employeeRange} onValueChange={setEmployeeRange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Any size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any-size">Any Size</SelectItem>
                            <SelectItem value="1-10">1-10 employees</SelectItem>
                            <SelectItem value="11-50">11-50 employees</SelectItem>
                            <SelectItem value="51+">51+ employees</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Specializations */}
                      <div className="space-y-2">
                        <Label>Specializations</Label>
                        <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
                          {specializations.map(spec => (
                            <div key={spec} className="flex items-center space-x-2">
                              <Checkbox
                                id={spec}
                                checked={selectedSpecializations.includes(spec)}
                                onCheckedChange={() => toggleSpecialization(spec)}
                              />
                              <Label htmlFor={spec} className="text-xs">{spec}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3 space-y-6"
        >
          {/* Results Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">
                {isSearching ? "Searching..." : `${filteredVendors.length} vendors found`}
              </h3>
              <p className="text-sm text-muted-foreground">
                Showing results for your search criteria
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                Saved ({savedVendors.length})
              </Button>
            </div>
          </div>

          {/* Active Filters */}
          {(searchQuery || (selectedIndustry && selectedIndustry !== "all-industries") || (selectedLocation && selectedLocation !== "all-locations") || selectedSpecializations.length > 0 || verifiedOnly || featuredOnly) && (
            <div className="flex flex-wrap gap-2">
              {searchQuery && (
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <span>Search: "{searchQuery}"</span>
                  <button onClick={() => setSearchQuery("")}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {selectedIndustry && selectedIndustry !== "all-industries" && (
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <span>{selectedIndustry}</span>
                  <button onClick={() => setSelectedIndustry("all-industries")}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {selectedLocation && selectedLocation !== "all-locations" && (
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <span>{selectedLocation}</span>
                  <button onClick={() => setSelectedLocation("all-locations")}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {selectedSpecializations.map(spec => (
                <Badge key={spec} variant="secondary" className="flex items-center space-x-1">
                  <span>{spec}</span>
                  <button onClick={() => toggleSpecialization(spec)}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {/* Vendor Cards */}
          <div className="space-y-4">
            <AnimatePresence>
              {filteredVendors.map((vendor, index) => (
                <motion.div
                  key={vendor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`hover:shadow-lg transition-shadow cursor-pointer ${
                    vendor.featured ? 'border-primary shadow-md' : ''
                  }`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              <Building2 className="h-6 w-6" />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-lg">{vendor.name}</h3>
                              {vendor.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  <Award className="h-3 w-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                              {vendor.featured && (
                                <Badge className="text-xs">Featured</Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                              <div className="flex items-center">
                                <Briefcase className="h-3 w-3 mr-1" />
                                {vendor.industry}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {vendor.location}
                              </div>
                              <div className="flex items-center">
                                <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                                {vendor.rating} ({vendor.reviewCount} reviews)
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleSaveVendor(vendor.id)}
                            className={savedVendors.includes(vendor.id) ? "text-red-500" : ""}
                          >
                            <Heart className={`h-4 w-4 ${savedVendors.includes(vendor.id) ? 'fill-current' : ''}`} />
                          </Button>
                          <Button size="sm">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Contact
                          </Button>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4">{vendor.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center text-sm">
                          <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{vendor.employees} employees</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{vendor.priceRange}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>Responds {vendor.responseTime}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{vendor.projectsCompleted} projects</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm font-medium">Specializations</Label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {vendor.specializations.map(spec => (
                              <Badge key={spec} variant="outline" className="text-xs">
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {vendor.certifications.length > 0 && (
                          <div>
                            <Label className="text-sm font-medium">Certifications</Label>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {vendor.certifications.map(cert => (
                                <Badge key={cert} variant="secondary" className="text-xs">
                                  <Award className="h-3 w-3 mr-1" />
                                  {cert}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredVendors.length === 0 && !isSearching && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No vendors found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or clearing some filters
              </p>
              <Button onClick={clearFilters} variant="outline">
                Clear All Filters
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}