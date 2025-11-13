class BibleStudyCompanion {
    constructor() {
        this.messages = [];
        this.userName = '';
        this.userGoals = null;
        this.studyPlan = null;
        this.loading = false;
        this.init();
    }
    
    async init() {
        await this.loadUserData();
        this.render();
    }
    
    async loadUserData() {
        try {
            const name = localStorage.getItem('user-name');
            const goals = localStorage.getItem('user-goals');
            const plan = localStorage.getItem('study-plan');
            const msgs = localStorage.getItem('chat-messages');
            
            if (name) this.userName = name;
            if (goals) this.userGoals = JSON.parse(goals);
            if (plan) this.studyPlan = JSON.parse(plan);
            if (msgs) this.messages = JSON.parse(msgs);
        } catch (error) {
            console.log('No existing user data');
        }
    }
    
    saveMessages() {
        localStorage.setItem('chat-messages', JSON.stringify(this.messages));
    }
    
    addMessage(role, content) {
        this.messages.push({ role, content, timestamp: new Date().toISOString() });
        this.saveMessages();
    }
    
    async handleWelcome(name) {
        this.userName = name;
        localStorage.setItem('user-name', name);
        this.addMessage('assistant', 'Welcome, ' + name + '! 🙏 I am your Bible Study Companion. I am here to help you grow in your faith journey through consistent Bible study, personalized study plans, and daily encouragement.\n\nLet us start by understanding your goals. What would you like to achieve in your Bible study? For example:\n- Read through the entire Bible\n- Study Proverbs weekly\n- Understand a specific book\n- Build a daily reading habit\n\nTell me about your spiritual goals!');
        this.render();
    }
    
    async callAPI(conversationHistory) {
        const systemPrompt = 'You are a warm, encouraging Bible Study Companion. Your role is to help users create personalized Bible study plans, provide daily check-ins, offer encouraging accountability, reference KJV Bible passages when relevant, and guide users in their spiritual growth journey. User Info: Name: ' + this.userName + ', Current Goals: ' + (this.userGoals ? JSON.stringify(this.userGoals) : 'Not set yet') + ', Study Plan: ' + (this.studyPlan ? JSON.stringify(this.studyPlan) : 'Not created yet') + '. Be warm, personal, and encouraging. If they miss a day, respond with grace. Celebrate small wins. Ask thoughtful questions about their spiritual growth. Suggest specific Bible passages based on their needs. Help them create achievable, structured study plans.';

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    system: systemPrompt,
                    messages: conversationHistory
                })
            });
            
            const data = await response.json();
            return data.response;
        } catch (error) {
            console.error('API Error:', error);
            return "I'm having trouble connecting right now. Please try again in a moment.";
        }
    }
    
    async handleSend(input) {
        if (!input.trim() || this.loading) return;
        
        this.addMessage('user', input);
        this.loading = true;
        this.render();
        
        const conversationHistory = this.messages.map(msg => ({
            role: msg.role === 'assistant' ? 'assistant' : 'user',
            content: msg.content
        }));
        
        const response = await this.callAPI(conversationHistory);
        this.addMessage('assistant', response);
        this.loading = false;
        this.render();
        
        const today = new Date().toISOString().split('T')[0];
        localStorage.setItem('last-interaction', today);
    }
    
    async handleDailyCheckIn() {
        const today = new Date().toLocaleDateString();
        const checkedIn = localStorage.getItem('checkin-' + today);
        
        if (checkedIn) {
            this.addMessage('assistant', "You've already checked in today! That's wonderful consistency. How did your study time go?");
        } else {
            localStorage.setItem('checkin-' + today, 'true');
            const hour = new Date().getHours();
            const greeting = hour < 12 ? 'morning' : 'evening';
            this.addMessage('assistant', 'Good ' + greeting + ', ' + this.userName + '! ☀️\n\nTime for your daily check-in. Did you complete your Bible study today?\n\n- If yes: Tell me what you read and one thing that stood out!\n- If not: That is okay! Let us continue where you left off. What got in the way today?');
        }
        this.render();
    }
    
    getStreak() {
        let streak = 0;
        const today = new Date();
        
        for (let i = 0; i < 30; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toLocaleDateString();
            
            if (localStorage.getItem('checkin-' + dateStr)) {
                if (i === streak) streak++;
            } else {
                break;
            }
        }
        
        return streak;
    }
    
    viewProgress() {
        const streak = this.getStreak();
        this.addMessage('assistant', '📊 **Your Progress**\n\n🔥 Current Streak: ' + streak + ' days\n📖 Study Plan: ' + (this.studyPlan ? this.studyPlan.name || 'Active' : 'Not created yet') + '\n🎯 Goals: ' + (this.userGoals ? this.userGoals.description : 'Set your goals to track progress!') + '\n\nKeep up the great work, ' + this.userName + '! Every day you show up matters. 💪');
        this.render();
    }
    
    render() {
        const app = document.getElementById('app');
        
        if (!this.userName) {
            app.innerHTML = this.renderWelcome();
            this.attachWelcomeListeners();
        } else {
            app.innerHTML = this.renderChat();
            this.attachChatListeners();
        }
        
        if (window.lucide) {
            lucide.createIcons();
        }
    }
    
    renderWelcome() {
        return '<div class="welcome-screen"><div class="welcome-card"><div class="welcome-header"><i data-lucide="book-open" class="welcome-icon"></i><h1 class="welcome-title">Bible Study Companion</h1><p class="welcome-subtitle">Your personal guide to consistent, meaningful Bible study</p></div><input type="text" id="name-input" placeholder="Enter your name" class="welcome-input"><button id="start-button" class="welcome-button">Start Your Journey</button></div></div>';
    }
    
    renderChat() {
        const messagesHTML = this.messages.map(msg => '<div class="message ' + msg.role + '"><div class="message-content">' + (msg.role === 'assistant' ? '<div class="message-header"><i data-lucide="heart" style="width: 1rem; height: 1rem; color: #EF4444;"></i><span class="message-label">Your Bible Companion</span></div>' : '') + '<div class="message-text">' + msg.content + '</div></div></div>').join('');
        
        const loadingHTML = this.loading ? '<div class="loading"><div class="loading-content"><div class="loading-dots"><div class="loading-dot"></div><div class="loading-dot"></div><div class="loading-dot"></div></div></div></div>' : '';
        
        return '<div class="header"><div class="header-content"><div class="header-left"><i data-lucide="book-open" class="header-icon"></i><div><h1 class="header-title">Bible Study Companion</h1><p class="header-subtitle">Welcome back, ' + this.userName + '!</p></div></div><div class="header-actions"><button id="checkin-button" class="action-button green"><i data-lucide="check-circle" style="width: 1rem; height: 1rem;"></i>Daily Check-In</button><button id="progress-button" class="action-button purple"><i data-lucide="trending-up" style="width: 1rem; height: 1rem;"></i>Progress</button></div></div></div><div class="messages-container"><div class="messages-wrapper">' + messagesHTML + loadingHTML + '</div></div><div class="input-area"><div class="input-wrapper"><input type="text" id="message-input" placeholder="Share your thoughts, ask questions, or tell me about your study..." class="input-field" ' + (this.loading ? 'disabled' : '') + '><button id="send-button" class="send-button" ' + (this.loading ? 'disabled' : '') + '><i data-lucide="send" style="width: 1.25rem; height: 1.25rem;"></i>Send</button></div></div>';
    }
    
    attachWelcomeListeners() {
        const input = document.getElementById('name-input');
        const button = document.getElementById('start-button');
        
        const handleStart = () => {
            const name = input.value.trim();
            if (name) this.handleWelcome(name);
        };
        
        button.addEventListener('click', handleStart);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleStart();
        });
    }
    
    attachChatListeners() {
        const input = document.getElementById('message-input');
        const sendButton = document.getElementById('send-button');
        const checkinButton = document.getElementById('checkin-button');
        const progressButton = document.getElementById('progress-button');
        
        const handleSend = () => {
            const message = input.value;
            if (message.trim()) {
                this.handleSend(message);
                input.value = '';
            }
        };
        
        sendButton.addEventListener('click', handleSend);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSend();
        });
        
        checkinButton.addEventListener('click', () => this.handleDailyCheckIn());
        progressButton.addEventListener('click', () => this.viewProgress());
        
        const container = document.querySelector('.messages-container');
        if (container) container.scrollTop = container.scrollHeight;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new BibleStudyCompanion();
});
