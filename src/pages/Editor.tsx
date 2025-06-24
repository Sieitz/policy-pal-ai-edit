
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Download, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { RichTextEditor } from "@/components/RichTextEditor";
import { AIChatPanel } from "@/components/AIChatPanel";

interface Document {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
  content: string;
}

const Editor = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [document, setDocument] = useState<Document | null>(null);
  const [content, setContent] = useState("");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!docId) return;
    
    // Load document from localStorage (in real app, this would be an API call)
    const docData = localStorage.getItem(`doc_${docId}`);
    if (docData) {
      const doc = JSON.parse(docData);
      setDocument(doc);
      setContent(doc.content);
    } else {
      toast({
        title: "Document not found",
        description: "The document you're looking for doesn't exist.",
        variant: "destructive"
      });
      navigate("/");
    }
  }, [docId, navigate, toast]);

  // Auto-save functionality
  useEffect(() => {
    if (!document || !content) return;
    
    const autoSaveInterval = setInterval(() => {
      saveDocument();
    }, 10000); // Auto-save every 10 seconds

    return () => clearInterval(autoSaveInterval);
  }, [document, content]);

  const saveDocument = async () => {
    if (!document || saving) return;
    
    setSaving(true);
    
    // Simulate save delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedDoc = { ...document, content };
    localStorage.setItem(`doc_${document.id}`, JSON.stringify(updatedDoc));
    setLastSaved(new Date());
    setSaving(false);
    
    toast({
      title: "Document saved",
      description: "Your changes have been saved automatically.",
    });
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleAIContentUpdate = (updatedContent: string) => {
    setContent(updatedContent);
  };

  const exportDocument = () => {
    if (!document) return;
    
    const element = document.createElement("a");
    const file = new Blob([content], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = `${document.name.replace(/\.[^/.]+$/, "")}.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Document exported",
      description: "Your document has been downloaded.",
    });
  };

  if (!document) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading document...</h2>
          <p className="text-gray-600">Please wait while we load your document.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-semibold">{document.name}</h1>
              <p className="text-sm text-gray-600">
                {lastSaved ? `Last saved: ${lastSaved.toLocaleTimeString()}` : "Not saved yet"}
                {saving && " • Saving..."}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={saveDocument} disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Saving..." : "Save"}
            </Button>
            <Button variant="outline" size="sm" onClick={exportDocument}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </header>

      {/* Editor Layout */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Document Editor */}
        <div className="flex-1 flex flex-col">
          <RichTextEditor
            content={content}
            onChange={handleContentChange}
            onAIRequest={handleAIContentUpdate}
          />
        </div>

        {/* AI Chat Panel */}
        <div className="w-96 border-l bg-white">
          <AIChatPanel
            documentContent={content}
            onContentUpdate={handleAIContentUpdate}
            documentId={document.id}
          />
        </div>
      </div>
    </div>
  );
};

export default Editor;
