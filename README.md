
# PolySync - AI-Powered Document Editor

PolySync is a free, web-based policy and document editor designed for teams. It features AI-powered assistance, real-time editing, and collaborative tools to help you create better documents faster.

## 🚀 Features

- **Smart Document Editing**: Rich text editor with real-time preview and formatting tools
- **AI-Powered Assistance**: Built-in AI chat for summarizing, rephrasing, and enhancing documents
- **Document Upload**: Support for DOCX, PDF, and TXT files with automatic parsing
- **Real-time Collaboration**: Share and collaborate on documents with team members
- **Auto-save**: Automatic saving every 10 seconds to prevent data loss
- **@-Mentions**: Quick AI actions with @ mentions in the editor
- **Export Options**: Download your documents in various formats

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Routing**: React Router
- **State Management**: React Query
- **File Processing**: Client-side document parsing
- **AI Integration**: Ready for OpenAI API integration

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd polysync
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:8080
   ```

## 🚀 Production Build

```bash
npm run build
npm run preview
```

## 🔧 Environment Variables

For full AI functionality, you'll need to set up the following environment variables:

```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

> **Note**: In the current demo version, AI responses are simulated. To enable real AI features, you'll need to integrate with OpenAI's API.

## 📖 Usage

### Getting Started

1. **Upload a Document**: Click "Get Started" and upload a DOCX, PDF, or TXT file
2. **Start Editing**: Use the rich text editor to modify your content
3. **AI Assistance**: Use the chat panel or @ mentions for AI help
4. **Save & Export**: Your document auto-saves, and you can export when ready

### AI Features

- **@-Mentions**: Type @ in the editor for quick AI actions
- **Chat Panel**: Ask the AI to improve, summarize, or rephrase content
- **Smart Suggestions**: Get context-aware recommendations
- **Compliance Help**: Add compliance sections and guidelines

### Keyboard Shortcuts

- **Ctrl/Cmd + B**: Bold text
- **Ctrl/Cmd + I**: Italic text
- **Ctrl/Cmd + U**: Underline text
- **@**: Open AI actions menu
- **Enter**: Send chat message

## 🎯 Demo

Try our interactive demo at `/demo` to see PolySync in action with a sample document.

## 🔒 Privacy & Security

- Documents are processed locally in your browser
- No permanent server storage in demo mode
- Enterprise-grade security for production deployments
- GDPR and SOC2 compliance ready

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for more details.

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Support

- **Documentation**: [View our docs](https://docs.polysync.com)
- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Community**: [Join our Discord](https://discord.gg/polysync)

## 🗺️ Roadmap

- [ ] Real-time collaboration
- [ ] Advanced AI integrations
- [ ] Cloud storage options
- [ ] Mobile app
- [ ] API access
- [ ] Enterprise features

---

Built with ❤️ by the PolySync team
```
