import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    problem: "",
    budget: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Using Web3Forms for simple form submission
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'YOUR_WEB3FORMS_KEY',
          subject: 'New Contact Form Submission - Portfolio',
          from_name: formData.name,
          ...formData,
        }),
      });

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "I'll get back to you within 24 hours.",
        });
        
        setFormData({
          name: "",
          contact: "",
          problem: "",
          budget: ""
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or contact directly via email.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Let's Work Together
            </h1>
            <p className="text-xl text-muted-foreground">
              Tell me about your data challenge. I respond within 24 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Your Name</Label>
              <Input 
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Jane Doe"
                required
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="contact">Email or WhatsApp</Label>
              <Input 
                id="contact"
                value={formData.contact}
                onChange={(e) => setFormData({...formData, contact: e.target.value})}
                placeholder="jane@company.com or +234..."
                required
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="problem">What problem are you trying to solve?</Label>
              <Textarea 
                id="problem"
                value={formData.problem}
                onChange={(e) => setFormData({...formData, problem: e.target.value})}
                placeholder="Describe your data challenge, reporting needs, or decision-making bottleneck..."
                required
                className="mt-2 min-h-[120px]"
              />
            </div>

            <div>
              <Label htmlFor="budget">Budget Range</Label>
              <Select 
                value={formData.budget}
                onValueChange={(value) => setFormData({...formData, budget: value})}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small project (&lt; $2k)</SelectItem>
                  <SelectItem value="medium">Medium project ($2k - $5k)</SelectItem>
                  <SelectItem value="large">Large project ($5k+)</SelectItem>
                  <SelectItem value="ongoing">Ongoing / Retainer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </Button>
          </form>

          <div className="mt-12 p-6 bg-card border border-border rounded-xl">
            <p className="text-sm text-muted-foreground">
              Based remotely. Available for freelance projects and contract work worldwide.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
