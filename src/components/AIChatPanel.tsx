
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Send, Bot, User, Sparkles, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface AIChatPanelProps {
  documentContent: string;
  onContentUpdate: (content: string) => void;
  documentId: string;
}

export const AIChatPanel = ({ documentContent, onContentUpdate, documentId }: AIChatPanelProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Load chat history from localStorage
  useEffect(() => {
    const chatHistory = localStorage.getItem(`chat_${documentId}`);
    if (chatHistory) {
      const parsedHistory = JSON.parse(chatHistory);
      setMessages(parsedHistory.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      })));
    } else {
      // Add welcome message
      setMessages([{
        id: 'welcome',
        type: 'ai',
        content: "Hi! I'm your AI assistant. I can help you improve your document by summarizing, rephrasing, adding compliance information, and more. Just ask me anything or select text and use @ for quick actions!",
        timestamp: new Date()
      }]);
    }
  }, [documentId]);

  // Save chat history to localStorage
  useEffect(() => {
    if (messages.length > 1) { // Don't save just the welcome message
      localStorage.setItem(`chat_${documentId}`, JSON.stringify(messages));
    }
  }, [messages, documentId]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Mock AI responses based on common patterns
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('summarize') || lowerMessage.includes('summary')) {
      return "I've analyzed your document. Here's a summary: This policy document outlines key organizational guidelines, implementation procedures, and compliance requirements. The main focus areas include team coordination, regular policy reviews, and maintaining industry standards.";
    }
    
    if (lowerMessage.includes('improve') || lowerMessage.includes('better')) {
      return "Here are some suggestions to improve your document:\n\n1. Add more specific examples\n2. Include compliance checkpoints\n3. Define clear responsibilities\n4. Add implementation timelines\n\nWould you like me to help implement any of these improvements?";
    }
    
    if (lowerMessage.includes('compliance') || lowerMessage.includes('regulation')) {
      return "For compliance enhancement, consider adding:\n\n• Regular audit schedules\n• Documentation requirements\n• Training mandates\n• Risk assessment procedures\n• Incident reporting protocols\n\nI can help you add any of these sections to your document.";
    }
    
    if (lowerMessage.includes('rewrite') || lowerMessage.includes('rephrase')) {
      return "I can help you rewrite sections of your document. Please select the specific text you'd like me to rephrase, or let me know which section needs improvement. I can adjust the tone, clarity, or formality level as needed.";
    }
    
    if (lowerMessage.includes('add') || lowerMessage.includes('include')) {
      return "I can help you add new content to your document. What specific information would you like to include? I can help with:\n\n• Policy sections\n• Procedures\n• Guidelines\n• Compliance requirements\n• Best practices\n\nJust let me know the topic and I'll draft the content for you.";
    }
    
    // Default response
    return "I understand you'd like help with your document. I can assist with:\n\n• Summarizing content\n• Improving clarity and readability\n• Adding compliance information\n• Rephrasing sections\n• Expanding on topics\n• Making content more formal or casual\n\nWhat specifically would you like me to help you with?";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const aiResponse = await generateAIResponse(userMessage.content);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyToClipboard = async (content: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(messageId);
      setTimeout(() => setCopiedId(null), 2000);
      toast({
        title: "Copied!",
        description: "Message copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard.",
        variant: "destructive"
      });
    }
  };

  const quickActions = [
    "Summarize this document",
    "Improve readability",
    "Add compliance section",
    "Make it more formal",
    "Check for clarity issues"
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold">AI Assistant</h3>
            <p className="text-xs text-gray-600">Powered by advanced AI</p>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="space-y-1">
          <p className="text-xs text-gray-600 mb-2">Quick actions:</p>
          {quickActions.slice(0, 3).map((action, index) => (
            <button
              key={index}
              onClick={() => setInputValue(action)}
              className="block w-full text-left text-xs bg-white hover:bg-gray-50 px-2 py-1 rounded border"
            >
              {action}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                <div className={`flex items-start space-x-2 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user' 
                      ? 'bg-blue-600' 
                      : 'bg-gradient-to-r from-purple-600 to-blue-600'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="w-3 h-3 text-white" />
                    ) : (
                      <Sparkles className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <div className={`rounded-lg px-3 py-2 group relative ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                    <div className={`text-xs mt-1 opacity-70 ${
                      message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                    
                    {/* Copy button for AI messages */}
                    {message.type === 'ai' && (
                      <button
                        onClick={() => copyToClipboard(message.content, message.id)}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-200 rounded"
                      >
                        {copiedId === message.id ? (
                          <Check className="w-3 h-3 text-green-600" />
                        ) : (
                          <Copy className="w-3 h-3 text-gray-600" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
                <div className="bg-gray-100 text-gray-900 rounded-lg px-3 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <Separator />

      {/* Input */}
      <div className="p-4 bg-white">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me to improve your document..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            size="sm"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Press Enter to send • Select text and type @ for quick actions
        </p>
      </div>
    </div>
  );
};
