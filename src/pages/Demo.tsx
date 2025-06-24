
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Demo = () => {
  const navigate = useNavigate();

  const createDemoDocument = () => {
    const docId = "demo-" + Date.now();
    const demoContent = `
      <h1>Employee Remote Work Policy</h1>
      <h2>Effective Date: January 2024</h2>
      
      <p>This policy establishes guidelines for remote work arrangements to ensure productivity, security, and work-life balance for all employees.</p>
      
      <h3>1. Eligibility and Approval</h3>
      <p>Remote work arrangements are available to employees whose roles can be effectively performed outside the traditional office environment. All remote work must be pre-approved by direct supervisors and HR.</p>
      
      <h3>2. Work Hours and Availability</h3>
      <p>Remote employees are expected to maintain regular business hours and be available for communication during core business hours (9 AM - 3 PM local time). Flexibility in scheduling is permitted with supervisor approval.</p>
      
      <h3>3. Communication Requirements</h3>
      <ul>
        <li>Daily check-ins with team members</li>
        <li>Weekly one-on-one meetings with supervisors</li>
        <li>Prompt response to emails and messages during business hours</li>
        <li>Participation in scheduled video conferences and team meetings</li>
      </ul>
      
      <h3>4. Technology and Security</h3>
      <p>Employees must use company-approved devices and software for all work-related activities. VPN access is required for accessing company systems remotely.</p>
      
      <h3>5. Performance Standards</h3>
      <p>Remote work performance will be evaluated based on deliverables, quality of work, and adherence to deadlines rather than hours worked. Regular performance reviews will assess remote work effectiveness.</p>
      
      <h3>6. Home Office Requirements</h3>
      <p>Employees must maintain a dedicated, professional workspace that is free from distractions and conducive to productivity. The workspace should have reliable internet connectivity and appropriate lighting.</p>
    `;

    localStorage.setItem(`doc_${docId}`, JSON.stringify({
      id: docId,
      name: "Employee Remote Work Policy (Demo)",
      type: "demo",
      uploadedAt: new Date().toISOString(),
      content: demoContent
    }));

    navigate(`/editor/${docId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <Button onClick={createDemoDocument}>
            Try Demo Now
          </Button>
        </div>
      </header>

      {/* Demo Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              See PolySync in Action
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Experience the power of AI-assisted document editing with our interactive demo
            </p>
            <Button 
              size="lg" 
              onClick={createDemoDocument}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6 rounded-xl"
            >
              <Play className="w-5 h-5 mr-2" />
              Launch Interactive Demo
            </Button>
          </div>

          {/* Demo Features */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Rich Text Editor</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Experience our powerful editor with formatting tools, real-time preview, and seamless editing.
                </p>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex space-x-2">
                      <div className="w-6 h-6 bg-gray-300 rounded"></div>
                      <div className="w-6 h-6 bg-gray-300 rounded"></div>
                      <div className="w-6 h-6 bg-gray-300 rounded"></div>
                    </div>
                    <div className="h-24 bg-white rounded border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500">
                      Document content appears here
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">AI Chat Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Get instant help with summarizing, rephrasing, and improving your documents using AI.
                </p>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="space-y-3">
                    <div className="flex justify-end">
                      <div className="bg-blue-500 text-white p-2 rounded-lg text-sm max-w-xs">
                        Can you summarize this section?
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-white p-2 rounded-lg text-sm max-w-xs border">
                        Sure! I'll create a concise summary...
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Demo Walkthrough */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-center">What You'll Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Open Sample Document</h3>
                  <p className="text-gray-600 text-sm">
                    Start with a pre-loaded employee remote work policy document
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-purple-600 font-bold">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Edit & Format</h3>
                  <p className="text-gray-600 text-sm">
                    Use the rich text editor to modify content and apply formatting
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-green-600 font-bold">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">AI Assistance</h3>
                  <p className="text-gray-600 text-sm">
                    Use @ mentions or chat to get AI help with improvements
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Demo;
