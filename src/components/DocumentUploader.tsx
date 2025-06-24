
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { X, Upload, FileText, AlertCircle, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface DocumentUploaderProps {
  onClose: () => void;
}

export const DocumentUploader = ({ onClose }: DocumentUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      validateAndSetFile(droppedFile);
    }
  }, []);

  const validateAndSetFile = (selectedFile: File) => {
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/pdf',
      'text/plain',
      'application/msword'
    ];
    
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    if (!allowedTypes.includes(selectedFile.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a DOCX, PDF, or TXT file.",
        variant: "destructive"
      });
      return;
    }
    
    if (selectedFile.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive"
      });
      return;
    }
    
    setFile(selectedFile);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const simulateUpload = async () => {
    setUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 200);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate a mock document ID
    const docId = Date.now().toString();
    
    // Store document info in localStorage for demo purposes
    localStorage.setItem(`doc_${docId}`, JSON.stringify({
      id: docId,
      name: file?.name,
      type: file?.type,
      uploadedAt: new Date().toISOString(),
      content: generateMockContent(file?.name || 'Document')
    }));
    
    setUploading(false);
    
    toast({
      title: "Document uploaded successfully!",
      description: "Redirecting to editor...",
    });
    
    // Redirect to editor
    setTimeout(() => {
      navigate(`/editor/${docId}`);
      onClose();
    }, 1000);
  };

  const generateMockContent = (fileName: string) => {
    return `
      <h1>${fileName.replace(/\.[^/.]+$/, "")}</h1>
      <h2>Company Policy Document</h2>
      <p>This is a sample document that has been uploaded to PolySync. You can now edit this content using our rich text editor and get AI assistance for improving your policies.</p>
      <h3>Section 1: Overview</h3>
      <p>This section provides an overview of the policy framework and its applications within the organization.</p>
      <h3>Section 2: Guidelines</h3>
      <p>The following guidelines should be followed by all team members:</p>
      <ul>
        <li>Ensure compliance with industry standards</li>
        <li>Regular review and updates of policies</li>
        <li>Clear communication of policy changes</li>
      </ul>
      <h3>Section 3: Implementation</h3>
      <p>Implementation of these policies requires coordination across multiple departments and regular monitoring of compliance metrics.</p>
    `;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg mx-auto shadow-2xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Upload Document</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-gray-600">Upload your policy or document to start editing with AI assistance.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {!file ? (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                dragActive 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Drop your file here</h3>
              <p className="text-gray-600 mb-4">or click to browse</p>
              <input
                type="file"
                accept=".docx,.pdf,.txt,.doc"
                onChange={handleFileSelect}
                className="hidden"
                id="file-input"
              />
              <Button asChild variant="outline">
                <label htmlFor="file-input" className="cursor-pointer">
                  Choose File
                </label>
              </Button>
              <p className="text-sm text-gray-500 mt-3">
                Supports DOCX, PDF, TXT files up to 10MB
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <FileText className="w-8 h-8 text-blue-600" />
                <div className="flex-1">
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-gray-600">{formatFileSize(file.size)}</p>
                </div>
                {!uploading && (
                  <Button variant="ghost" size="sm" onClick={() => setFile(null)}>
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              {uploading && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Processing document...</span>
                    <span>{Math.round(uploadProgress)}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}
              
              {uploadProgress === 100 && (
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span>Document processed successfully!</span>
                </div>
              )}
              
              {!uploading && uploadProgress < 100 && (
                <div className="flex space-x-3">
                  <Button onClick={() => setFile(null)} variant="outline" className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={simulateUpload} className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600">
                    Upload & Edit
                  </Button>
                </div>
              )}
            </div>
          )}
          
          <div className="flex items-start space-x-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
            <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <p>
              Your documents are processed securely and privately. We don't store your files permanently.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
