
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Quote, 
  Heading1, 
  Heading2, 
  Heading3,
  AtSign,
  Sparkles
} from "lucide-react";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  onAIRequest: (content: string) => void;
}

interface AIAction {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

export const RichTextEditor = ({ content, onChange, onAIRequest }: RichTextEditorProps) => {
  const [showAIMenu, setShowAIMenu] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const editorRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  const aiActions: AIAction[] = [
    {
      id: "summarize",
      label: "Summarize",
      description: "Create a concise summary",
      icon: <Sparkles className="w-4 h-4" />
    },
    {
      id: "rephrase",
      label: "Rephrase",
      description: "Rewrite in different words",
      icon: <Sparkles className="w-4 h-4" />
    },
    {
      id: "expand",
      label: "Expand",
      description: "Add more detail and context",
      icon: <Sparkles className="w-4 h-4" />
    },
    {
      id: "compliance",
      label: "Add Compliance",
      description: "Add compliance guidelines",
      icon: <Sparkles className="w-4 h-4" />
    },
    {
      id: "simplify",
      label: "Simplify",
      description: "Make easier to understand",
      icon: <Sparkles className="w-4 h-4" />
    },
    {
      id: "formal",
      label: "Make Formal",
      description: "Adjust tone to be more formal",
      icon: <Sparkles className="w-4 h-4" />
    }
  ];

  useEffect(() => {
    if (editorRef.current && !isEditing) {
      editorRef.current.innerHTML = content;
    }
  }, [content, isEditing]);

  const handleEditorInput = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      onChange(newContent);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === '@') {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        setCursorPosition({ x: rect.left, y: rect.bottom });
        setSelectedText(selection.toString());
        setShowAIMenu(true);
      }
    } else if (e.key === 'Escape') {
      setShowAIMenu(false);
    }
  };

  const handleSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      setSelectedText(selection.toString());
    }
  };

  const applyFormatting = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleEditorInput();
  };

  const handleAIAction = async (action: AIAction) => {
    setShowAIMenu(false);
    
    // Simulate AI processing
    const prompt = `${action.label} the following text: "${selectedText || 'selected content'}"`;
    
    // Mock AI response based on action
    let aiResponse = "";
    switch (action.id) {
      case "summarize":
        aiResponse = `<p><strong>Summary:</strong> This section outlines key policy guidelines and implementation strategies for organizational compliance.</p>`;
        break;
      case "rephrase":
        aiResponse = `<p>This content has been rephrased to improve clarity while maintaining the original meaning and intent.</p>`;
        break;
      case "expand":
        aiResponse = selectedText + `<p>Additionally, it's important to consider the broader implications and ensure that all stakeholders understand their responsibilities in implementing these guidelines effectively.</p>`;
        break;
      case "compliance":
        aiResponse = selectedText + `<ul><li>Ensure compliance with industry regulations</li><li>Regular audits and reviews required</li><li>Document all compliance activities</li></ul>`;
        break;
      case "simplify":
        aiResponse = `<p>In simple terms: This policy helps ensure everyone follows the same rules and procedures.</p>`;
        break;
      case "formal":
        aiResponse = `<p>This document establishes the formal procedures and protocols that must be adhered to by all personnel within the organization.</p>`;
        break;
    }

    // Replace selected text or append at cursor
    if (selectedText && editorRef.current) {
      const newContent = content.replace(selectedText, aiResponse);
      onChange(newContent);
      onAIRequest(newContent);
    } else {
      const newContent = content + aiResponse;
      onChange(newContent);
      onAIRequest(newContent);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center space-x-1 p-4 border-b bg-white">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => applyFormatting('bold')}
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => applyFormatting('italic')}
        >
          <Italic className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => applyFormatting('underline')}
        >
          <Underline className="w-4 h-4" />
        </Button>
        
        <Separator orientation="vertical" className="h-6" />
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => applyFormatting('formatBlock', 'h1')}
        >
          <Heading1 className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => applyFormatting('formatBlock', 'h2')}
        >
          <Heading2 className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => applyFormatting('formatBlock', 'h3')}
        >
          <Heading3 className="w-4 h-4" />
        </Button>
        
        <Separator orientation="vertical" className="h-6" />
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => applyFormatting('insertUnorderedList')}
        >
          <List className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => applyFormatting('insertOrderedList')}
        >
          <ListOrdered className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => applyFormatting('formatBlock', 'blockquote')}
        >
          <Quote className="w-4 h-4" />
        </Button>
        
        <Separator orientation="vertical" className="h-6" />
        
        <div className="flex items-center text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded">
          <AtSign className="w-4 h-4 mr-1" />
          Type @ for AI actions
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 relative">
        <div
          ref={editorRef}
          contentEditable
          className="h-full p-6 prose prose-lg max-w-none focus:outline-none overflow-y-auto"
          onInput={handleEditorInput}
          onKeyDown={handleKeyDown}
          onMouseUp={handleSelection}
          onFocus={() => setIsEditing(true)}
          onBlur={() => setIsEditing(false)}
          style={{
            minHeight: '100%',
            lineHeight: '1.6'
          }}
        />

        {/* AI Actions Menu */}
        {showAIMenu && (
          <div
            className="fixed bg-white border rounded-lg shadow-xl p-2 z-50 w-64"
            style={{
              left: cursorPosition.x,
              top: cursorPosition.y + 10
            }}
          >
            <div className="text-xs text-gray-500 px-2 py-1 border-b mb-2">
              AI Actions {selectedText && `for "${selectedText.substring(0, 30)}..."`}
            </div>
            {aiActions.map((action) => (
              <button
                key={action.id}
                onClick={() => handleAIAction(action)}
                className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 flex items-start space-x-3"
              >
                <div className="text-purple-600 mt-0.5">
                  {action.icon}
                </div>
                <div>
                  <div className="font-medium text-sm">{action.label}</div>
                  <div className="text-xs text-gray-600">{action.description}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
