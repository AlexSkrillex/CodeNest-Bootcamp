import streamlit as st
import requests
import os
import json
import time
from datetime import datetime

# ========== CONFIGURATION ==========
DEVELOPER_INFO = {
    "name": "Riaz Hussain Saifi",
    "role": "Full Stack Developer | AI & Cloud Student",
    "email": "infosaifideveloper@gmail.com",
    "phone": "+92 3000321640",
    "address": "Gulshan-e-Hadeed, Karachi",
    "portfolio": "https://saifi-dev.vercel.app/",
    "github": "https://github.com/Riaz-Hussain-Saifi",
    "linkedin": "https://linkedin.com/in/riaz-hussain-saifi",
    "education": [
        "Bachelor of Computer Science (B.Sc) - Shah Abdul Latif University (2017-2019)",
        "Full Stack Developer - Governor's Initiative for AI & Computing (2023-Present)",
        "Cloud Applied Engineering - Presidential Initiative for AI & Computing (2025-Ongoing)"
    ],
    "skills": [
        "HTML5, CSS3, JavaScript, TypeScript",
        "React, Next.js, Node.js",
        "MongoDB, SQL, Dbeaver",
        "REST APIs, Postman",
        "Git & GitHub, Vercel",
        "Python, Streamlit",
        "TailwindCSS, Sanity",
        "Responsive Design, Problem Solving"
    ],
    "experience": [
        {
            "role": "Web Developer - Freelance/Self-Projects",
            "period": "2023 - PRESENT",
            "details": [
                "Built multiple full-stack applications using React, Next.js, Node.js, and MongoDB",
                "Implemented user authentication, CRUD operations, and API integration",
                "Participated in team collaborations and open-source contributions via GitHub",
                "Managed project deployments and version control using Git and Vercel"
            ]
        }
    ],
    "bio": "Motivated and detail-oriented Full Stack Developer with strong foundation in modern web technologies. Skilled in building responsive, user-friendly applications with both front-end and back-end tools."
}

# API Configuration
API_KEY = os.getenv("OPENROUTER_API_KEY")
API_URL = "https://openrouter.ai/api/v1/chat/completions"
MODEL = "deepseek/deepseek-chat-v3-0324:free"

# App Settings
MAX_RETRIES = 3
TIMEOUT_SECONDS = 30
APP_VERSION = "1.2.0 (June 2024)"

# ========== APP SETUP ==========
st.set_page_config(
    page_title="🤖 RiazGPT", 
    page_icon="🤖",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for better UI (remain the same as original)
st.markdown("""
<style>
    .main-header {
        text-align: center;
        color: #1f77b4;
        margin-bottom: 30px;
        font-size: 2.5rem;
        font-weight: bold;
    }
    .subtitle {
        text-align: center;
        color: #666;
        margin-bottom: 30px;
        font-size: 1.2rem;
    }
    .developer-info {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 25px;
        border-radius: 15px;
        color: white;
        margin: 15px 0;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .error-message {
        background-color: #ffebee;
        padding: 15px;
        border-radius: 10px;
        border-left: 5px solid #f44336;
        color: #c62828;
        margin: 10px 0;
    }
    .success-message {
        background-color: #e8f5e8;
        padding: 15px;
        border-radius: 10px;
        border-left: 5px solid #4caf50;
        color: #2e7d32;
        margin: 10px 0;
    }
    .info-box {
        background-color: #e3f2fd;
        padding: 15px;
        border-radius: 10px;
        border-left: 5px solid #2196f3;
        color: #0d47a1;
        margin: 10px 0;
    }
    .stButton > button {
        width: 100%;
        border-radius: 20px;
        border: none;
        padding: 0.5rem 1rem;
        font-weight: 600;
        transition: all 0.3s ease;
    }
    .stButton > button:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 10px rgba(0,0,0,0.2);
    }
    .chat-input {
        position: sticky;
        bottom: 0;
        background: white;
        padding: 10px 0;
        border-top: 1px solid #eee;
    }
    .message-timestamp {
        font-size: 0.8rem;
        color: #888;
        font-style: italic;
    }
    .thinking-animation {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-weight: 500;
        color: #1f77b4;
    }
    .thinking-dots {
        display: inline-flex;
        gap: 2px;
    }
    .thinking-dots span {
        width: 6px;
        height: 6px;
        background-color: #1f77b4;
        border-radius: 50%;
        animation: thinking 1.5s infinite ease-in-out;
    }
    .thinking-dots span:nth-child(1) { animation-delay: 0s; }
    .thinking-dots span:nth-child(2) { animation-delay: 0.2s; }
    .thinking-dots span:nth-child(3) { animation-delay: 0.4s; }
    
    @keyframes thinking {
        0%, 20%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
        50% { opacity: 1; transform: scale(1); }
    }
    
    .chat-session {
        padding: 8px 12px;
        margin: 4px 0;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
        border: 1px solid #e0e0e0;
    }
    .chat-session:hover {
        background-color: #f5f5f5;
        border-color: #1f77b4;
    }
    .active-session {
        background-color: #e3f2fd;
        border-color: #1f77b4;
    }
    .session-title {
        font-weight: 500;
        font-size: 0.9rem;
        color: #333;
        margin-bottom: 2px;
    }
    .session-info {
        font-size: 0.75rem;
        color: #666;
    }
</style>
""", unsafe_allow_html=True)

# ========== SESSION STATE INITIALIZATION ==========
def initialize_session_state():
    """Initialize all session state variables"""
    defaults = {
        "chat_sessions": {},
        "current_session_id": None,
        "messages": [],
        "api_status": "Unknown",
        "error_count": 0,
        "total_messages": 0,
        "app_started": datetime.now(),
        "user_name": None,
        "session_counter": 0
    }
    
    for key, value in defaults.items():
        if key not in st.session_state:
            st.session_state[key] = value

initialize_session_state()

# ========== CHAT SESSION MANAGEMENT ==========
def create_new_session():
    """Create a new chat session"""
    st.session_state.session_counter += 1
    session_id = f"session_{st.session_state.session_counter}_{int(time.time())}"
    
    # Generate session title from first message or use default
    if st.session_state.messages and len(st.session_state.messages) > 0:
        first_message = st.session_state.messages[0]["content"]
        title = first_message[:30] + "..." if len(first_message) > 30 else first_message
    else:
        title = f"New Chat {st.session_state.session_counter}"
    
    session_data = {
        "id": session_id,
        "title": title,
        "messages": st.session_state.messages.copy(),
        "created_at": datetime.now(),
        "last_updated": datetime.now(),
        "message_count": len(st.session_state.messages)
    }
    
    st.session_state.chat_sessions[session_id] = session_data
    st.session_state.current_session_id = session_id
    return session_id

def save_current_session():
    """Save current chat to session history"""
    if st.session_state.messages and len(st.session_state.messages) > 0:
        if st.session_state.current_session_id is None:
            create_new_session()
        else:
            # Update existing session
            session = st.session_state.chat_sessions[st.session_state.current_session_id]
            session["messages"] = st.session_state.messages.copy()
            session["last_updated"] = datetime.now() 
            session["message_count"] = len(st.session_state.messages)

def load_session(session_id):
    """Load a specific chat session"""
    if session_id in st.session_state.chat_sessions:
        save_current_session()  # Save current before switching
        session = st.session_state.chat_sessions[session_id]
        st.session_state.messages = session["messages"].copy()
        st.session_state.current_session_id = session_id
        st.rerun()

def delete_session(session_id):
    """Delete a chat session"""
    if session_id in st.session_state.chat_sessions:
        del st.session_state.chat_sessions[session_id]
        if st.session_state.current_session_id == session_id:
            st.session_state.current_session_id = None
            st.session_state.messages = []
        st.rerun()

def start_new_chat():
    """Start a completely new chat"""
    save_current_session()
    st.session_state.messages = []
    st.session_state.current_session_id = None
    st.session_state.error_count = 0
    st.rerun()

# ========== DEVELOPER INFO FUNCTIONS ==========
def is_about_developer(message):
    """Check if message is asking about the developer"""
    message_lower = message.lower()
    developer_keywords = [
        "developer", "creator", "who made", "who created", "who built",
        "riaz", "hussain", "saifi", "your creator", "your developer", "about you",
        "who are you", "your maker", "author", "programmer", "contact",
        "email", "github", "linkedin", "portfolio", "about developer",
        "tell me about", "contact info", "reach out", "who developed you",
        "your author", "created you", "piaic", "giaic", "study", "learning",
        "experience", "skills", "education", "resume", "cv", "background",
        "projects", "qualifications", "languages", "habits", "freelance"
    ]
    return any(keyword in message_lower for keyword in developer_keywords)

def is_social_media_question(message):
    """Check if message is asking about social media"""
    message_lower = message.lower()
    social_keywords = [
        "github", "linkedin", "social media", "social account", "profile",
        "contact", "where can i find", "how to contact", "reach you",
        "portfolio", "website", "online presence"
    ]
    return any(keyword in message_lower for keyword in social_keywords)

def is_date_question(message):
    """Check if message is asking about date/time"""
    message_lower = message.lower()
    date_keywords = [
        "date", "time", "today", "current date", "current time",
        "what day is it", "what's the date", "what time is it",
        "day today", "time now"
    ]
    return any(keyword in message_lower for keyword in date_keywords)

def format_list_items(items, bullet="•"):
    """Format a list of items with bullet points"""
    return "\n".join(f"{bullet} {item}" for item in items)

def format_experience(experience):
    """Format experience details"""
    result = []
    for exp in experience:
        result.append(f"**{exp['role']}** ({exp['period']})")
        for detail in exp['details']:
            result.append(f"  - {detail}")
    return "\n".join(result)

def get_developer_response(user_query):
    """Return appropriate response based on user query"""
    current_date = datetime.now().strftime("%A, %B %d, %Y")
    current_time = datetime.now().strftime("%I:%M %p")
    
    # Handle date/time questions
    if is_date_question(user_query):
        return f"📅 Today is **{current_date}**\n\n⏰ Current time is **{current_time}**"
    
    # Handle social media questions
    if is_social_media_question(user_query):
        return f"""🔗 Here are my professional links:
        
- **Portfolio:** [{DEVELOPER_INFO['portfolio']}]({DEVELOPER_INFO['portfolio']})
- **GitHub:** [{DEVELOPER_INFO['github']}]({DEVELOPER_INFO['github']})
- **LinkedIn:** [{DEVELOPER_INFO['linkedin']}]({DEVELOPER_INFO['linkedin']})
- **Email:** [{DEVELOPER_INFO['email']}](mailto:{DEVELOPER_INFO['email']})
- **Phone:** {DEVELOPER_INFO['phone']}
- **Address:** {DEVELOPER_INFO['address']}
"""
    
    # General about me response
    return f"""👋 Hi! I'm RiazGPT, created by **{DEVELOPER_INFO['name']}** - {DEVELOPER_INFO['role']}

🔹 **Professional Profile:**
{DEVELOPER_INFO['bio']}

🎓 **Education:**
{format_list_items(DEVELOPER_INFO['education'])}

💼 **Professional Experience:**
{format_experience(DEVELOPER_INFO['experience'])}

🛠️ **Technical Skills:**
{format_list_items(DEVELOPER_INFO['skills'])}

💡 You can ask me specific questions about:
- My technical skills and experience
- Education background
- Contact information
- Current projects
- Or anything else you're curious about!

(Ask something specific like "What frameworks do you know?" or "Tell me about your education")"""

# ========== API FUNCTIONS ==========
def test_api_connection():
    """Test API connection with detailed feedback"""
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    
    test_data = {
        "model": MODEL,
        "messages": [{"role": "user", "content": "Hello"}],
        "max_tokens": 5,
        "temperature": 0.1
    }
    
    try:
        response = requests.post(API_URL, headers=headers, json=test_data, timeout=10)
        
        if response.status_code == 200:
            st.session_state.api_status = "✅ Connected"
            return True
        elif response.status_code == 401:
            st.session_state.api_status = "❌ Invalid API Key"
        elif response.status_code == 429:
            st.session_state.api_status = "⏳ Rate Limited"
        elif response.status_code == 403:
            st.session_state.api_status = "🚫 Access Denied"
        else:
            st.session_state.api_status = f"❌ Error {response.status_code}"
        
        return False
        
    except requests.exceptions.Timeout:
        st.session_state.api_status = "⏰ Connection Timeout"
        return False
    except requests.exceptions.ConnectionError:
        st.session_state.api_status = "🌐 Connection Failed"
        return False
    except Exception as e:
        st.session_state.api_status = f"❌ Error"
        return False

def get_ai_response(messages):
    """Get AI response with comprehensive error handling"""
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    
    data = {
        "model": MODEL,
        "messages": messages,
        "temperature": 0.7,
        "max_tokens": 2000
    }
    
    for attempt in range(MAX_RETRIES):
        try:
            response = requests.post(
                API_URL, 
                headers=headers, 
                json=data, 
                timeout=TIMEOUT_SECONDS
            )
            
            if response.status_code == 200:
                result = response.json()
                st.session_state.error_count = 0  # Reset error count on success
                return result["choices"][0]["message"]["content"]
            
            elif response.status_code == 401:
                return "❌ **Authentication Error**: Invalid API key. Please check the configuration."
            
            elif response.status_code == 429:
                wait_time = (2 ** attempt) * 5
                return f"⏳ **Rate Limited**: Too many requests. Please wait {wait_time} seconds and try again."
            
            elif response.status_code == 403:
                return "🚫 **Access Denied**: Your API key doesn't have permission to use this model."
            
            elif response.status_code >= 500:
                if attempt < MAX_RETRIES - 1:
                    time.sleep(2 ** attempt)
                    continue
                return "🔧 **Server Error**: The AI service is temporarily unavailable. Please try again in a few minutes."
            
            else:
                return f"❌ **HTTP Error {response.status_code}**: Unexpected response from the server."
        
        except requests.exceptions.Timeout:
            if attempt < MAX_RETRIES - 1:
                continue
            return "⏰ **Timeout Error**: The request took too long. Please try again with a shorter message."
        
        except requests.exceptions.ConnectionError:
            if attempt < MAX_RETRIES - 1:
                time.sleep(2)
                continue
            return "🌐 **Connection Error**: Unable to connect to the AI service. Please check your internet connection."
        
        except json.JSONDecodeError:
            return "📝 **Response Error**: Received invalid response format from the AI service."
        
        except Exception as e:
            st.session_state.error_count += 1
            return f"❌ **Unexpected Error**: {str(e)}"
    
    return "❌ **Request Failed**: Unable to get a response after multiple attempts. Please try again later."

# ========== CHAT FUNCTIONS ==========
def process_user_input(user_input):
    """Process user input and generate AI response"""
    if not user_input.strip():
        return
    
    timestamp = datetime.now().strftime("%I:%M:%S %p")
    st.session_state.total_messages += 1
    
    # Add user message to history
    st.session_state.messages.append({
        "role": "user", 
        "content": user_input,
        "timestamp": timestamp
    })
    
    # Display user message
    with st.chat_message("user"):
        st.markdown(user_input)
        st.markdown(f'<p class="message-timestamp">📅 {timestamp}</p>', unsafe_allow_html=True)
    
    # Generate and display AI response
    with st.chat_message("assistant"):
        # Custom thinking indicator
        thinking_placeholder = st.empty()
        thinking_placeholder.markdown("""
        <div class="thinking-animation">
            RiazGPT is thinking
            <div class="thinking-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        """, unsafe_allow_html=True)
        
        # Check if asking about developer or related topics
        if is_about_developer(user_input) or is_social_media_question(user_input) or is_date_question(user_input):
            time.sleep(1)  # Brief pause for realism
            response = get_developer_response(user_input)
            response_type = "developer_info"
        else:
            # Prepare messages for API call
            system_message = {
                "role": "system", 
                "content": f"""You are RiazGPT, a helpful and intelligent AI assistant representing Riaz Hussain Saifi, a Full Stack Developer. 
                
Your personality:
- Be professional yet friendly
- Provide clear, detailed explanations
- Highlight Riaz's technical skills when relevant
- Be patient and supportive
- Show enthusiasm for learning and technology
- Be conversational and natural

Version: {APP_VERSION}
Current Date: {datetime.now().strftime("%A, %B %d, %Y")}

Key facts about Riaz:
- Front End & Back End Developer with experience in React, Next.js, Node.js
- Currently studying AI & Cloud Computing
- Skilled in both frontend and backend development
- Portfolio available at {DEVELOPER_INFO['portfolio']}

When discussing technical topics, you can mention Riaz's relevant skills:
{format_list_items(DEVELOPER_INFO['skills'], bullet="•")}

Always aim to be helpful and provide value in your responses."""
            }
            
            # Keep recent conversation context (last 10 messages to avoid token limits)
            recent_messages = st.session_state.messages[-10:]
            messages = [system_message] + recent_messages
            
            response = get_ai_response(messages)
            response_type = "ai_response"
        
        # Clear thinking indicator and display response
        thinking_placeholder.empty()
        st.markdown(response)
        response_timestamp = datetime.now().strftime("%I:%M:%S %p")
        st.markdown(f'<p class="message-timestamp">🤖 {response_timestamp}</p>', unsafe_allow_html=True)
        
        # Add response to history
        st.session_state.messages.append({
            "role": "assistant", 
            "content": response,
            "timestamp": response_timestamp,
            "type": response_type
        })
        
        # Auto-save session after each interaction
        save_current_session()

def display_chat_history():
    """Display all chat messages"""
    for message in st.session_state.messages:
        with st.chat_message(message["role"]):
            st.markdown(message["content"])
            
            if "timestamp" in message:
                icon = "📅" if message["role"] == "user" else "🤖"
                st.markdown(f'<p class="message-timestamp">{icon} {message["timestamp"]}</p>', unsafe_allow_html=True)

# ========== MAIN UI ==========
def main():
    """Main application interface"""
    
    # Header Section
    st.markdown('<h1 class="main-header">🤖 RiazGPT</h1>', unsafe_allow_html=True)
    st.markdown('<p class="subtitle">Professional AI Assistant for Riaz Hussain Saifi</p>', unsafe_allow_html=True)
    
    # Welcome message for new users
    if not st.session_state.messages:
        st.markdown(f"""
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                    padding: 25px; border-radius: 15px; color: white; margin: 20px 0; 
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h3>👋 Hello! I'm RiazGPT</h3>
            <p>I'm here to represent and assist with information about Riaz Hussain Saifi, a Full Stack Developer.</p>
            <p><strong>Try asking me:</strong> "What are your skills?", "Tell me about your education", 
            "Show me your portfolio", or any technical question!</p>
            <p>You can also ask general questions and I'll do my best to help.</p>
        </div>
        """, unsafe_allow_html=True)
    
    st.markdown("---")
    
    # Display chat history
    display_chat_history()
    
    # Chat input (always visible at bottom)
    if prompt := st.chat_input("💬 Message RiazGPT..."):
        process_user_input(prompt)
        st.rerun()

def setup_sidebar():
    """Setup sidebar with chat sessions and controls"""
    with st.sidebar:
        # New Chat Button
        st.header("💬 Chat Sessions")
        
        col1, col2 = st.columns([2, 1])
        with col1:
            if st.button("➕ New Chat", use_container_width=True, help="Start a new conversation"):
                start_new_chat()
        
        with col2:
            if st.button("💾", use_container_width=True, help="Save current chat"):
                save_current_session()
                st.success("Saved!")
                time.sleep(1)
                st.rerun()
        
        st.markdown("---")
        
        # Chat Sessions List
        if st.session_state.chat_sessions:
            st.subheader("📚 Previous Chats")
            
            # Sort sessions by last updated (most recent first)
            sorted_sessions = sorted(
                st.session_state.chat_sessions.items(),
                key=lambda x: x[1]["last_updated"],
                reverse=True
            )
            
            for session_id, session_data in sorted_sessions:
                is_active = session_id == st.session_state.current_session_id
                
                col1, col2 = st.columns([4, 1])
                
                with col1:
                    if st.button(
                        f"{'🟢' if is_active else '💬'} {session_data['title']}", 
                        key=f"load_{session_id}",
                        help=f"{session_data['message_count']} messages • {session_data['last_updated'].strftime('%m/%d %I:%M %p')}",
                        use_container_width=True
                    ):
                        load_session(session_id)
                
                with col2:
                    if st.button("🗑️", key=f"del_{session_id}", help="Delete chat"):
                        delete_session(session_id)
        
        else:
            st.info("💡 Your chat sessions will appear here as you start conversations.")
        
        st.markdown("---")
        
        # App Controls Section
        st.header("🎛️ Controls")
        
        col1, col2 = st.columns(2)
        
        with col1:
            if st.button("🗑️ Clear Current", use_container_width=True, help="Clear current chat"):
                st.session_state.messages = []
                st.session_state.error_count = 0
                st.success("Chat cleared!")
                time.sleep(1)
                st.rerun()
        
        with col2:
            if st.button("🔗 Test API", use_container_width=True, help="Test API connection"):
                with st.spinner("Testing..."):
                    if test_api_connection():
                        st.success("API is working!")
                    else:
                        st.error("API connection failed!")
        
        st.markdown("---")
        
        # Statistics Section
        st.header("📊 Session Stats")
        
        col1, col2 = st.columns(2)
        with col1:
            st.metric("Total Messages", st.session_state.total_messages)
            st.metric("Saved Chats", len(st.session_state.chat_sessions))
        
        with col2:
            st.metric("Current Chat", len(st.session_state.messages))
            uptime = datetime.now() - st.session_state.app_started
            hours, remainder = divmod(uptime.seconds, 3600)
            minutes, seconds = divmod(remainder, 60)
            st.metric("Session Time", f"{hours:02d}:{minutes:02d}")
        
        st.markdown("---")
        
        # System Information
        st.header("⚙️ System Status")
        st.info(f"**Model:** RiazGPT")
        st.info(f"**Version:** {APP_VERSION}")
        st.info(f"**API Status:** {st.session_state.api_status}")
        st.info("**Mode:** Full Stack Developer Assistant")
        
        st.markdown("---")
        
        # Help & Support
        with st.expander("❓ Help & Tips"):
            st.markdown("""
            **Getting Started:**
            - Ask about Riaz's professional background
            - Inquire about technical skills and projects
            - Get contact information
            - Or ask general questions
            
            **Professional Topics:**
            - "What frameworks do you know?"
            - "Tell me about your education"
            - "What projects have you worked on?"
            - "How can I contact you?"
            
            **Chat Management:**
            - Click "New Chat" to start fresh
            - Previous chats are saved automatically
            - Click any saved chat to continue it
            
            **Having Issues?**
            - Use "Test API" if responses are slow
            - Try "Clear Current" if behavior seems odd
            - Refresh the page if needed
            """)

# ========== APP ENTRY POINT ==========
if __name__ == "__main__":
    try:
        # Setup sidebar first
        setup_sidebar()
        
        # Run main app
        main()
        
        # Footer
        st.markdown("---")
        st.markdown(
            f"""
            <div style='text-align: center; color: #666; padding: 20px; font-size: 0.9rem;'>
                <strong>RiazGPT v{APP_VERSION}</strong> | Professional AI Assistant | 
                Representing {DEVELOPER_INFO['name']}
                <br>
                <small>Ask "about me" for professional details</small>
            </div>
            """, 
            unsafe_allow_html=True
        )
        
    except Exception as e:
        st.error("❌ **Application Error**")
        st.error(f"Something went wrong: {str(e)}")
        
        st.info("**How to fix:**")
        st.info("1. Refresh the page (F5 or Ctrl+R)")
        st.info("2. Check your internet connection")
        st.info("3. Make sure all required packages are installed")
        
        with st.expander("🔧 Technical Details (For Developers)"):
            st.code(f"Error Type: {type(e).__name__}")
            st.code(f"Error Message: {str(e)}")
            st.code(f"Streamlit Version: {st.__version__}")