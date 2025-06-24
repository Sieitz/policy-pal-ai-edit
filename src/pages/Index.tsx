
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Upload, Bot, Zap, Shield, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DocumentUploader } from "@/components/DocumentUploader";

const Index = () => {
  const [showUploader, setShowUploader] = useState(false);
  const navigate = useNavigate();

  const features = [
    {
      icon: FileText,
      title: "Smart Document Editing",
      description: "Rich text editor with real-time preview and collaborative features"
    },
    {
      icon: Bot,
      title: "AI-Powered Assistance",
      description: "Built-in AI chat for summarizing, rephrasing, and enhancing your documents"
    },
    {
      icon: Zap,
      title: "Instant Processing",
      description: "Upload and start editing documents in seconds with automatic parsing"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your documents are processed securely with enterprise-grade privacy"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share and collaborate on policies with your team members"
    },
    {
      icon: Upload,
      title: "Multiple Formats",
      description: "Support for DOCX, PDF, TXT and other common document formats"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PolySync
            </span>
          </div>
          <Button 
            onClick={() => setShowUploader(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight">
            The Future of Document Editing
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Transform your policy and document workflow with AI-powered editing, real-time collaboration, 
            and intelligent assistance. Free for teams of all sizes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={() => setShowUploader(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload & Start Editing
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/demo')}
              className="text-lg px-8 py-6 rounded-xl border-2 hover:bg-gray-50 transition-all duration-300"
            >
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Everything you need to manage documents
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features designed for modern teams who need to create, edit, and manage policy documents efficiently.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to transform your document workflow?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of teams who use PolySync to create better policies and documents faster.
          </p>
          <Button 
            size="lg" 
            onClick={() => setShowUploader(true)}
            className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Editing Now - It's Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold">PolySync</span>
          </div>
          <p className="text-gray-400">
            © 2024 PolySync. Empowering teams with intelligent document editing.
          </p>
        </div>
      </footer>

      {/* Document Uploader Modal */}
      {showUploader && (
        <DocumentUploader onClose={() => setShowUploader(false)} />
      )}
    </div>
  );
};

export default Index;
