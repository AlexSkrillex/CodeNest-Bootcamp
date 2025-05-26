# 🤖 Simple Chainlit AI Agent

**A Beginner-Friendly AI Assistant with Built-in Tools**

Created by: **Riaz Hussain** - Professional Developer & AI Expert

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [About the Developer](#-about-the-developer)
- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [How It Works](#-how-it-works)
- [Customization](#-customization)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 About the Project

This is a **simple, beginner-friendly AI assistant** built with Chainlit and OpenRouter. It's designed to help newcomers understand how AI agents work while providing practical functionality.

### What makes it special:
- ✅ **Simple Code** - Easy to read and understand
- ✅ **Detailed Comments** - Every line explained for beginners
- ✅ **Built-in Tools** - Calculator and text analyzer
- ✅ **Professional Design** - Clean, modern interface
- ✅ **Free to Use** - Uses free AI model (DeepSeek)

---

## 👨‍💻 About the Developer

**Riaz Hussain** - Professional Developer & AI Expert

### 🛠️ Expertise:
- **Full-Stack Development** - Modern web applications
- **AI/ML Integration** - Production-ready AI systems  
- **Chainlit Applications** - Interactive AI interfaces
- **API Development** - Scalable backend solutions
- **Python Programming** - Clean, efficient code

### 📞 Connect:
- **GitHub:** [github.com/riaz-hussain](https://github.com/Riaz-Hussain-Saifi)
- **LinkedIn:** [linkedin.com/in/riaz-hussain](https://linkedin.com/in/riaz-hussain-saifi)

---

## ✨ Features

### 🤖 **AI Capabilities**
- Smart conversation with context memory
- Natural language understanding
- Helpful and friendly responses
- Developer attribution and credits

### 🛠️ **Built-in Tools**
- **Calculator** - Math operations (addition, subtraction, multiplication, division)
- **Text Analyzer** - Word count, character count, reading time estimation
- **Auto-detection** - Automatically uses tools when needed

### 🎨 **User Interface**
- Modern chat interface with Chainlit
- Step-by-step processing visualization
- Session statistics tracking
- Professional branding and design

### 📊 **Monitoring**
- Message count tracking
- Session duration monitoring
- Memory usage statistics
- Performance insights

---

## 📋 Prerequisites

Before you begin, make sure you have:

### Required Software:
- **Python 3.7 or higher** - [Download Python](https://python.org/downloads/)
- **pip** - Usually comes with Python
- **Internet connection** - For API calls

### Required Accounts:
- **OpenRouter Account** - [Sign up here](https://openrouter.ai/)
- **API Credits** - The project uses a free model, but you need an account

---

## 🚀 Installation

### Step 1: Download the Project
```bash
# Clone or download the project files
# You should have: agent.py and README.md
```

### Step 2: Install Required Packages
```bash
# Install the necessary Python packages
pip install chainlit requests python-dateutil

# Alternative: Install from requirements.txt (if provided)
pip install -r requirements.txt
```

### Step 3: Configure API Key
1. Open `agent.py` in a text editor
2. Find the line with `API_KEY = "your-key-here"`
3. Replace with your actual OpenRouter API key
4. Save the file

---

## 🎮 Usage

### Starting the Application

1. **Open Terminal/Command Prompt**
2. **Navigate to project folder**
   ```bash
   cd path/to/your/project
   ```
3. **Run the application**
   ```bash
   chainlit run agent.py
   ```
4. **Open your browser** and go to `http://localhost:8000`

### Using the AI Assistant

1. **Start chatting** - Type any question or request
2. **Try the tools:**
   - **Math:** "Calculate 15 + 25" or "What's 10 * 8?"
   - **Text Analysis:** "Analyze this text" or "Count words in this sentence"
3. **Ask questions** - The AI can help with programming, explanations, advice
4. **View stats** - Every 5 messages, you'll see session statistics

### Example Conversations

```
You: Hello! What can you do?
AI: Hi! I'm Riaz Hussain's AI assistant. I can help with questions, 
    do math calculations, and analyze text. What would you like to try?

You: Calculate 25 * 4
AI: ✅ Tool Result: 25 * 4 = 100

You: Analyze this text: "The quick brown fox jumps over the lazy dog"
AI: ✅ Tool Result: 
    - Words: 9
    - Characters: 43
    - Reading time: 1 minutes
```

---

## 📁 Project Structure

```
your-project/
├── agent.py          # Main application file
├── README.md         # This documentation
└── requirements.txt  # Python dependencies (optional)
```

### Main Components in `agent.py`:

```python
# Configuration Section
API_KEY = "your-api-key"      # OpenRouter API key
DEVELOPER_INFO = {...}        # Information about Riaz Hussain

# Tool Functions
calculate_math()              # Simple calculator
analyze_text()               # Text analysis tool
detect_and_use_tools()       # Auto-tool detection

# AI Communication
call_ai_api()                # Sends requests to OpenRouter

# Chainlit Handlers
@cl.on_chat_start            # Welcome message
@cl.on_message               # Handle user messages
```

---

## 🔧 How It Works

### 1. **User Sends Message**
   - User types something in the chat
   - Chainlit captures the message

### 2. **Tool Detection**
   - System checks if message needs tools
   - Keywords like "calculate" trigger calculator
   - Keywords like "analyze" trigger text analyzer

### 3. **Processing**
   - If tool needed: Execute tool and show result
   - If no tool: Send message to AI via OpenRouter API

### 4. **Response**
   - System sends response back to user
   - Updates conversation history
   - Shows statistics periodically

### Flow Diagram:
```
User Input → Tool Detection → Tool/AI Processing → Response → Display
     ↑                                                           ↓
     └─────────────── Conversation History ←─────────────────────┘
```

---

## 🎨 Customization

### Changing Developer Information
```python
# In agent.py, modify DEVELOPER_INFO:
DEVELOPER_INFO = {
    "name": "Your Name",
    "title": "Your Title", 
    "skills": ["Your Skills"],
    "contact": {
        "github": "your-github",
        "linkedin": "your-linkedin"
    }
}
```

### Adding New Tools
```python
def my_custom_tool(input_text):
    """
    Your custom tool function
    """
    # Your logic here
    return {
        "success": True,
        "result": "Your result",
        "message": "What to show user"
    }

# Add detection in detect_and_use_tools() function
def detect_and_use_tools(user_message):
    # Add your keywords
    if "your_keyword" in user_message.lower():
        return {
            "tool": "custom_tool",
            "result": my_custom_tool(user_message)
        }
```

### Changing AI Behavior
```python
# In handle_message() function, modify system_message:
system_message = {
    "role": "system", 
    "content": "Your custom instructions for the AI..."
}
```

---

## 🐛 Troubleshooting

### Common Issues and Solutions

#### 1. **"Module not found" Error**
```bash
# Solution: Install missing packages
pip install chainlit requests
```

#### 2. **"API Key Invalid" Error**
- Check your OpenRouter API key
- Make sure you have credits in your account
- Verify the key is correctly pasted (no extra spaces)

#### 3. **"Port already in use" Error**
```bash
# Solution: Use a different port
chainlit run agent.py --port 8001
```

#### 4. **AI Not Responding**
- Check your internet connection
- Verify API key is valid
- Look at terminal for error messages

#### 5. **Tools Not Working**
- Check if keywords are spelled correctly
- Look at the `detect_and_use_tools()` function
- Test individual tool functions

### Debug Mode
```python
# Add this at the top of agent.py for more information:
import logging
logging.basicConfig(level=logging.DEBUG)
```

---

## 🤝 Contributing

### How to Contribute
1. **Fork the project**
2. **Make your changes**
3. **Test thoroughly**
4. **Submit a pull request**

### Contribution Ideas
- Add more tools (weather, web search, etc.)
- Improve the user interface
- Add more error handling
- Create new features
- Improve documentation

### Code Style
- Use clear, descriptive comments
- Keep functions simple and focused
- Follow Python naming conventions
- Test your changes before submitting

---

## 📞 Support

### Getting Help
1. **Check this README** - Most questions are answered here
2. **Look at error messages** - They usually tell you what's wrong
3. **Test individual functions** - Use the main program section
4. **Contact the developer** - See contact information above

### Professional Services
**Riaz Hussain** offers:
- Custom AI agent development
- One-on-one coding mentorship
- AI integration consulting
- Code review and optimization

---

## 📄 License

This project is created for educational purposes by **Riaz Hussain**.

### Usage Rights:
- ✅ **Personal Use** - Use for learning and personal projects
- ✅ **Educational Use** - Use in schools, courses, tutorials
- ✅ **Modification** - Change and adapt the code
- ✅ **Commercial Use** - Use in business projects

### Requirements:
- 🔴 **Attribution** - Credit Riaz Hussain as the original developer
- 🔴 **Preserve Comments** - Keep the educational comments for others
- 🔴 **Share Improvements** - Consider contributing improvements back

---

## 🎉 Conclusion

This project demonstrates how to build a simple but powerful AI assistant. It's designed to be:

- **Educational** - Learn how AI agents work
- **Practical** - Actually useful for real tasks  
- **Expandable** - Easy to add new features
- **Professional** - Production-quality code

### Next Steps:
1. Get it running on your computer
2. Try all the features
3. Read through the code and comments
4. Add your own custom tools
5. Share your improvements with the community

**Happy coding! 🚀**

---

*Created with ❤️ by [Riaz Hussain](https://github.com/Riaz-Hussain-Saifi/CodeNest-Bootcamp.git) - Professional Developer & AI Expert*