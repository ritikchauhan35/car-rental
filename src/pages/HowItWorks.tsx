import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SEOHead } from "@/components/SEOHead";
import { Search, Car, Shield, Clock, Star, AlertTriangle, MapPin, Settings, DollarSign, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const customerJourneySteps = [
  {
    icon: Search,
    title: "Sign Up & Verify",
    description: "Create account with email/phone. Upload multiple identity documents for comprehensive verification. Complete biometric verification with selfie matching. Background check completed within 24 hours.",
    details: [
      "Email or phone verification required",
      "Multiple ID verification: Driving License + PAN/Aadhar/Passport",
      "AI-powered document verification in seconds",
      "Facial recognition identity matching",
      "Background check with criminal history screening",
      "Credit score assessment for security deposits"
    ]
  },
  {
    icon: Car,
    title: "Search & Book",
    description: "Browse verified vehicles with real-time availability. View owner ratings, vehicle history, and insurance details. Book instantly with $50 security deposit. Get pickup location and digital key access.",
    details: [
      "Real-time GPS location tracking",
      "Detailed vehicle history reports",
      "Owner verification badges and ratings",
      "Instant booking with secure payment",
      "Digital key delivery to your phone"
    ]
  },
  {
    icon: Shield,
    title: "Pickup & Drive",
    description: "Use app to unlock vehicle with digital key. Complete 360° damage inspection (photos auto-uploaded). Start trip with GPS tracking. Enjoy comprehensive insurance coverage up to $1M liability.",
    details: [
      "Contactless vehicle unlock via app",
      "Mandatory pre-trip damage documentation",
      "AI-powered damage detection system",
      "24/7 GPS monitoring and geofencing",
      "Comprehensive insurance up to $1M liability"
    ]
  },
  {
    icon: Clock,
    title: "Return & Rate",
    description: "Return to designated spot. Complete final inspection with photo evidence. Rate owner and vehicle. Automatic billing with damage protection. Get trip summary and receipt via email.",
    details: [
      "Flexible return locations and times",
      "Post-trip damage inspection required",
      "Automatic billing and receipt generation",
      "Two-way rating system for accountability",
      "Trip analytics and carbon footprint tracking"
    ]
  }
];

const ownerJourneySteps = [
  {
    icon: Car,
    title: "Vehicle Registration",
    description: "Upload vehicle registration, insurance documents, and current inspection certificate. Complete vehicle verification with VIN check. Professional photos taken or self-uploaded with quality review.",
    details: [
      "VIN verification and history check",
      "Insurance validation and coverage review",
      "Professional photo shoot or quality review",
      "Vehicle inspection certificate required",
      "Market value assessment for pricing"
    ]
  },
  {
    icon: Shield,
    title: "Safety & Compliance",
    description: "Install GPS tracking device (free installation). Set up smart lock system for keyless access. Complete safety inspection checklist. Activate comprehensive insurance coverage for rentals.",
    details: [
      "Free GPS device installation service",
      "Smart lock system with remote access",
      "Safety features inspection checklist",
      "Commercial insurance coverage activation",
      "Emergency roadside assistance setup"
    ]
  },
  {
    icon: Search,
    title: "Listing & Pricing",
    description: "Set availability calendar and pricing (dynamic pricing suggestions provided). Define pickup/return locations. Set vehicle rules and requirements. Go live after final approval (typically 2-3 days).",
    details: [
      "AI-powered dynamic pricing recommendations",
      "Calendar integration for availability",
      "Custom pickup/dropoff location setup",
      "Renter requirements and restrictions",
      "Final approval process within 2-3 days"
    ]
  },
  {
    icon: Clock,
    title: "Earn & Manage",
    description: "Receive booking notifications and manage requests. Track vehicle location and status in real-time. Get automatic payments (85% to owner, 15% platform fee). Access monthly earnings reports and tax documents.",
    details: [
      "Real-time booking notifications",
      "Live vehicle tracking and monitoring",
      "Automatic payments every Tuesday",
      "Monthly earnings and tax reporting",
      "Performance analytics and insights"
    ]
  }
];

const damageProtectionInfo = [
  {
    title: "Pre-Trip Inspection",
    description: "Mandatory 360° photo documentation before each trip. AI-powered damage detection compares with baseline photos. Any existing damage flagged and recorded.",
    coverage: "Prevents false damage claims",
    process: [
      "Customer takes 12+ photos from all angles",
      "AI compares with vehicle baseline photos",
      "Any discrepancies flagged immediately",
      "Owner notified of any new damage found",
      "Trip cannot start until inspection complete"
    ]
  },
  {
    title: "During Trip Protection",
    description: "Real-time GPS monitoring and speed alerts. 24/7 roadside assistance included. Emergency contact system for breakdowns or accidents.",
    coverage: "Up to $1M liability coverage",
    process: [
      "GPS tracking with speed limit monitoring",
      "Automatic alerts for violations",
      "24/7 roadside assistance hotline",
      "Emergency response coordination",
      "Accident reporting and documentation"
    ]
  },
  {
    title: "Damage Claims Process",
    description: "Post-trip inspection with photo evidence. Claims reviewed within 24 hours. Professional repair estimates from approved shops. Direct billing to insurance (no owner hassle).",
    coverage: "Up to $125,000 damage protection",
    process: [
      "Post-trip damage inspection required",
      "Photo evidence automatically compared",
      "Claims team reviews within 24 hours",
      "Approved repair shops provide estimates",
      "Direct insurance billing to minimize hassle"
    ]
  },
  {
    title: "Dispute Resolution",
    description: "AI-assisted damage assessment using before/after photos. Independent third-party arbitration available. Fair resolution process with evidence-based decisions.",
    coverage: "Free arbitration service",
    process: [
      "AI analysis of damage photo evidence",
      "Independent third-party arbitration",
      "Evidence-based decision making",
      "Fair resolution for all parties",
      "Appeals process available if needed"
    ]
  }
];

const registrationExamples = [
  {
    vehicleType: "Car",
    registrationId: "CA-TES-3456",
    requirements: [
      "Valid vehicle registration certificate",
      "Comprehensive insurance policy",
      "Annual safety inspection certificate",
      "Emissions test certificate (if required)",
      "Commercial use permit for rentals"
    ]
  },
  {
    vehicleType: "Motorcycle",
    registrationId: "CA-HDL-7890",
    requirements: [
      "Motorcycle registration and title",
      "Motorcycle-specific insurance coverage",
      "Safety inspection with brake/light check",
      "Helmet and safety gear provision",
      "Rider experience requirements posting"
    ]
  },
  {
    vehicleType: "Scooter",
    registrationId: "NY-ACT-2134",
    requirements: [
      "Scooter registration (if required by state)",
      "Insurance appropriate for CC rating",
      "Safety inspection including brakes",
      "Storage compartment security check",
      "Local permit compliance verification"
    ]
  }
];

export const HowItWorks = () => {
  return (
    <>
      <SEOHead 
        title="How It Works - Rent Flow"
        description="Learn how to rent and list vehicles on Rent Flow. Complete guide for customers and owners with step-by-step verification process."
        keywords="how it works, vehicle rental guide, car sharing process, rental verification, vehicle listing guide"
      />
      <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-primary/5 py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              How It Works
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 px-4">
              Everything you need to know about renting and listing vehicles on our platform
            </p>
          </motion.div>
        </div>
      </section>

      {/* Customer Journey */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">For Customers</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto px-4">
              From registration to return, we've streamlined every step for a seamless rental experience
            </p>
          </motion.div>

          <div className="space-y-12">
            {customerJourneySteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center"
              >
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <Badge variant="outline" className="mb-2">Step {index + 1}</Badge>
                      <h3 className="text-xl sm:text-2xl font-semibold">{step.title}</h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6">{step.description}</p>
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-2">
                        <Shield className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <Card className="p-6 bg-gradient-to-br from-primary/5 to-transparent">
                    <CardContent className="p-0">
                      <div className="text-center">
                        <div className="text-6xl mb-4">🚗</div>
                        <p className="text-muted-foreground">Visual representation of {step.title.toLowerCase()}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Owner Journey */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">For Vehicle Owners</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto px-4">
              List your vehicle and start earning passive income with our comprehensive protection system
            </p>
          </motion.div>

          <div className="space-y-12">
            {ownerJourneySteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
              >
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <step.icon className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <Badge variant="outline" className="mb-2 border-green-500 text-green-600">Step {index + 1}</Badge>
                      <h3 className="text-2xl font-semibold">{step.title}</h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6">{step.description}</p>
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-2">
                        <DollarSign className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <Card className="p-6 bg-gradient-to-br from-green-50 dark:from-green-900/20 to-transparent">
                    <CardContent className="p-0">
                      <div className="text-center">
                        <div className="text-6xl mb-4">💰</div>
                        <p className="text-muted-foreground">Visual representation of {step.title.toLowerCase()}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Identity Verification Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Identity Verification Documents</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Multiple document verification ensures platform security and user trust
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card className="p-8">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Required Documents (Choose Any 2 + License)</h3>
                    <ul className="space-y-4">
                      <li className="flex items-center gap-3">
                        <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                          Mandatory
                        </Badge>
                        <span className="font-medium">Driving License</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Badge variant="outline">PAN Card</Badge>
                        <span>Permanent Account Number for tax verification</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Badge variant="outline">Aadhar Card</Badge>
                        <span>Government-issued unique identity proof</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Badge variant="outline">Passport</Badge>
                        <span>International travelers and identity proof</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Badge variant="outline">Voter ID</Badge>
                        <span>Alternative government identity document</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Verification Process</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-medium text-green-600 dark:text-green-400">1</span>
                        </div>
                        <span className="text-sm">Upload clear photos of documents</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-medium text-green-600 dark:text-green-400">2</span>
                        </div>
                        <span className="text-sm">AI-powered document verification</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-medium text-green-600 dark:text-green-400">3</span>
                        </div>
                        <span className="text-sm">Facial recognition matching with selfie</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-medium text-green-600 dark:text-green-400">4</span>
                        </div>
                        <span className="text-sm">Background verification within 24 hours</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-medium text-green-600 dark:text-green-400">5</span>
                        </div>
                        <span className="text-sm">Verified badge upon successful completion</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Registration Requirements */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Vehicle Registration Requirements</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Different vehicle types have specific registration and compliance requirements
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {registrationExamples.map((example, index) => (
              <motion.div
                key={example.vehicleType}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-semibold mb-2">{example.vehicleType}</h3>
                      <Badge variant="outline" className="font-mono">
                        {example.registrationId}
                      </Badge>
                    </div>
                    <ul className="space-y-3">
                      {example.requirements.map((requirement, reqIndex) => (
                        <li key={reqIndex} className="flex items-start gap-2">
                          <Settings className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Damage Protection */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Damage Protection</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Advanced AI-powered damage detection and comprehensive insurance coverage protect both owners and renters
            </p>
          </motion.div>

          <div className="space-y-8">
            {damageProtectionInfo.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <Shield className="h-8 w-8 text-primary" />
                          <h3 className="text-2xl font-semibold">{item.title}</h3>
                        </div>
                        <p className="text-muted-foreground mb-4">{item.description}</p>
                        <Badge className="bg-primary/10 text-primary">
                          {item.coverage}
                        </Badge>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-4 text-lg">Process Details:</h4>
                        <ul className="space-y-3">
                          {item.process.map((step, stepIndex) => (
                            <li key={stepIndex} className="flex items-start gap-3">
                              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-medium text-primary">{stepIndex + 1}</span>
                              </div>
                              <span className="text-sm">{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join thousands of users who trust our platform for safe, reliable vehicle rentals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Button size="lg" asChild>
                <Link to="/browse">
                  <Car className="mr-2 h-4 w-4" />
                  Browse Vehicles
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/owner/dashboard">
                  <DollarSign className="mr-2 h-4 w-4" />
                  List Your Vehicle
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
};