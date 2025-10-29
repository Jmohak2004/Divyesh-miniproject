import { motion } from "motion/react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { 
  CreditCard, 
  Lock, 
  Shield, 
  CheckCircle2,
  AlertCircle,
  ChevronLeft
} from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import { Checkbox } from "./ui/checkbox";
import { toast } from "sonner@2.0.3";

export function CheckoutScreen() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    // Personal info
    fullName: "",
    email: "",
    company: "",
    
    // Billing
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    
    // Agreement
    terms: false,
    saveInfo: false
  });

  const orderItems = [
    { name: "Enterprise Plan", price: 299, quantity: 1 },
    { name: "Premium Support", price: 99, quantity: 1 },
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted.slice(0, 19);
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const handleSubmit = async () => {
    if (!formData.terms) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
      toast.success("Payment processed successfully!");
    }, 2000);
  };

  // Success screen
  if (step === 3) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center px-4 pb-24 md:pb-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-md"
        >
          <Card className="text-center">
            <CardContent className="pt-12 pb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6"
              >
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </motion.div>

              <h2 className="mb-3">Payment Successful!</h2>
              <p className="text-muted-foreground mb-6">
                Thank you for your purchase. A confirmation email has been sent to {formData.email}
              </p>

              <div className="bg-muted/50 rounded-lg p-4 mb-6 text-left">
                <p className="text-sm text-muted-foreground mb-2">Order Number</p>
                <p className="font-mono">#BIZ-{Math.random().toString(36).substring(7).toUpperCase()}</p>
              </div>

              <div className="space-y-3">
                <Button className="w-full" onClick={() => window.location.hash = 'dashboard'}>
                  Go to Dashboard
                </Button>
                <Button variant="outline" className="w-full" onClick={() => toast.info("Receipt download started")}>
                  Download Receipt
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 pb-24 md:pb-8">
      {/* Header */}
      <div className="bg-background border-b sticky top-16 z-40 safe-area-inset-top">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => window.history.back()}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl">Secure Checkout</h1>
              <p className="text-sm text-muted-foreground">Step {step} of 2</p>
            </div>
            <Shield className="h-5 w-5 text-green-600" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Security notice - Addressing mobile challenge */}
          <Alert>
            <Lock className="h-4 w-4" />
            <AlertDescription>
              Your payment information is encrypted and secure. We never store your card details.
            </AlertDescription>
          </Alert>

          {/* Progress indicator */}
          <div className="flex items-center gap-2">
            <div className={`flex-1 h-2 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-muted'}`} />
            <div className={`flex-1 h-2 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
          </div>

          {/* Step 1: Contact Information */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      autoComplete="name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      autoComplete="email"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name *</Label>
                    <Input
                      id="company"
                      placeholder="ACME Corporation"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      autoComplete="organization"
                    />
                  </div>
                </CardContent>
              </Card>

              <Button 
                className="w-full" 
                size="lg"
                onClick={() => setStep(2)}
                disabled={!formData.fullName || !formData.email || !formData.company}
              >
                Continue to Payment
              </Button>
            </motion.div>
          )}

          {/* Step 2: Payment Information */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number *</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                      maxLength={19}
                      autoComplete="cc-number"
                      inputMode="numeric"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardName">Cardholder Name *</Label>
                    <Input
                      id="cardName"
                      placeholder="Name on card"
                      value={formData.cardName}
                      onChange={(e) => handleInputChange('cardName', e.target.value)}
                      autoComplete="cc-name"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Expiry Date *</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
                        maxLength={5}
                        autoComplete="cc-exp"
                        inputMode="numeric"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV *</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                        maxLength={4}
                        type="password"
                        autoComplete="cc-csc"
                        inputMode="numeric"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox
                      id="saveInfo"
                      checked={formData.saveInfo}
                      onCheckedChange={(checked) => handleInputChange('saveInfo', checked as boolean)}
                    />
                    <Label htmlFor="saveInfo" className="cursor-pointer text-sm">
                      Save payment information for future purchases
                    </Label>
                  </div>
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {orderItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p>{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium">${item.price}</p>
                    </div>
                  ))}

                  <Separator />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax (8%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center">
                    <span>Total</span>
                    <span className="text-2xl">${total.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Terms and conditions */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.terms}
                  onCheckedChange={(checked) => handleInputChange('terms', checked as boolean)}
                />
                <Label htmlFor="terms" className="cursor-pointer text-sm leading-relaxed">
                  I agree to the Terms of Service and Privacy Policy. I understand that my payment will be processed securely.
                </Label>
              </div>

              {/* Action buttons */}
              <div className="space-y-3">
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleSubmit}
                  disabled={isProcessing || !formData.terms || !formData.cardNumber || !formData.cardName || !formData.expiryDate || !formData.cvv}
                >
                  {isProcessing ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <Lock className="mr-2 h-4 w-4" />
                      Pay ${total.toFixed(2)}
                    </>
                  )}
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setStep(1)}
                  disabled={isProcessing}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back to Contact Info
                </Button>
              </div>

              {/* Security badges */}
              <div className="flex items-center justify-center gap-4 pt-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  SSL Secure
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Lock className="h-3 w-3" />
                  PCI Compliant
                </Badge>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
