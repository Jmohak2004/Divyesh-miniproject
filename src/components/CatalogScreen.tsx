import { motion } from "motion/react";
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Users, 
  TrendingUp,
  Heart,
  Share2,
  ChevronRight
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";

interface Vendor {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  location: string;
  employees: string;
  growth: string;
  image: string;
  featured: boolean;
  tags: string[];
}

export function CatalogScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const vendors: Vendor[] = [
    {
      id: "1",
      name: "TechStart Solutions",
      category: "Technology",
      rating: 4.8,
      reviews: 156,
      location: "San Francisco, CA",
      employees: "25-50",
      growth: "+45%",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
      featured: true,
      tags: ["AI", "Cloud", "SaaS"]
    },
    {
      id: "2",
      name: "Creative Design Co",
      category: "Design",
      rating: 4.9,
      reviews: 203,
      location: "New York, NY",
      employees: "10-25",
      growth: "+62%",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
      featured: true,
      tags: ["Branding", "UI/UX", "Graphics"]
    },
    {
      id: "3",
      name: "Marketing Masters",
      category: "Marketing",
      rating: 4.7,
      reviews: 189,
      location: "Austin, TX",
      employees: "15-30",
      growth: "+38%",
      image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800",
      featured: false,
      tags: ["SEO", "Content", "Social Media"]
    },
    {
      id: "4",
      name: "Legal Advisors Plus",
      category: "Legal",
      rating: 5.0,
      reviews: 142,
      location: "Boston, MA",
      employees: "5-10",
      growth: "+28%",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
      featured: false,
      tags: ["Corporate", "IP", "Compliance"]
    },
    {
      id: "5",
      name: "Data Analytics Pro",
      category: "Technology",
      rating: 4.6,
      reviews: 178,
      location: "Seattle, WA",
      employees: "20-40",
      growth: "+51%",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800",
      featured: true,
      tags: ["Analytics", "Big Data", "BI"]
    },
    {
      id: "6",
      name: "Consulting Experts",
      category: "Consulting",
      rating: 4.8,
      reviews: 167,
      location: "Chicago, IL",
      employees: "30-60",
      growth: "+34%",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
      featured: false,
      tags: ["Strategy", "Operations", "Growth"]
    }
  ];

  const categories = ["All", "Technology", "Design", "Marketing", "Legal", "Consulting"];

  const toggleFavorite = (vendorId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(vendorId)) {
        newFavorites.delete(vendorId);
      } else {
        newFavorites.add(vendorId);
      }
      return newFavorites;
    });
  };

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vendor.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = !selectedCategory || selectedCategory === "All" || vendor.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-muted/30 pb-24 md:pb-8">
      {/* Sticky search header - Mobile optimized */}
      <div className="bg-background border-b sticky top-16 z-40 safe-area-inset-top">
        <div className="container mx-auto px-4 py-4 space-y-3">
          <div className="flex items-center gap-2">
            {/* Search input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search vendors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0">
                  <Filter className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[60vh]">
                <SheetHeader>
                  <SheetTitle>Filter Vendors</SheetTitle>
                </SheetHeader>
                <div className="py-6 space-y-6">
                  <div className="space-y-4">
                    <h3>Category</h3>
                    <div className="space-y-3">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox 
                            id={category}
                            checked={selectedCategory === category || (category === "All" && !selectedCategory)}
                            onCheckedChange={() => setSelectedCategory(category === "All" ? null : category)}
                          />
                          <Label htmlFor={category} className="cursor-pointer">
                            {category}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="featured" />
                      <Label htmlFor="featured">Featured only</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="verified" defaultChecked />
                      <Label htmlFor="verified">Verified partners</Label>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Horizontal scrolling category chips */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-2">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedCategory(category === "All" ? null : category)}
                className="shrink-0"
              >
                <Badge
                  variant={selectedCategory === category || (category === "All" && !selectedCategory) ? "default" : "outline"}
                  className="cursor-pointer whitespace-nowrap"
                >
                  {category}
                </Badge>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Vendor grid - Mobile optimized */}
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-4">
          {filteredVendors.map((vendor, index) => (
            <motion.div
              key={vendor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all">
                {/* Vendor image - High quality for catalog */}
                <div className="relative aspect-video overflow-hidden">
                  <ImageWithFallback
                    src={vendor.image}
                    alt={vendor.name}
                    className="w-full h-full object-cover"
                  />
                  {vendor.featured && (
                    <Badge className="absolute top-3 left-3 bg-gradient-to-r from-yellow-500 to-orange-500 border-0">
                      ⭐ Featured
                    </Badge>
                  )}
                  <div className="absolute top-3 right-3 flex gap-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8 rounded-full bg-white/90 backdrop-blur"
                      onClick={() => toggleFavorite(vendor.id)}
                    >
                      <Heart 
                        className={`h-4 w-4 ${favorites.has(vendor.id) ? 'fill-red-500 text-red-500' : ''}`}
                      />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8 rounded-full bg-white/90 backdrop-blur"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Vendor info - Linearized for mobile */}
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="truncate">{vendor.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {vendor.category}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      <span className="font-medium">{vendor.rating}</span>
                      <span className="text-sm text-muted-foreground">
                        ({vendor.reviews})
                      </span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3 pb-3">
                  {/* Quick stats - Optimized for mobile */}
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      <span className="text-xs text-muted-foreground truncate">
                        {vendor.location.split(',')[0]}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      <span className="text-xs text-muted-foreground">
                        {vendor.employees}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="h-3.5 w-3.5 text-green-600 shrink-0" />
                      <span className="text-xs text-green-600 font-medium">
                        {vendor.growth}
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex gap-1.5 flex-wrap">
                    {vendor.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="border-t pt-3">
                  <Button className="w-full" variant="outline">
                    View Details
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No results */}
        {filteredVendors.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground">No vendors found</p>
            <Button 
              variant="link" 
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory(null);
              }}
              className="mt-2"
            >
              Clear filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
