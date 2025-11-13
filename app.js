* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background: linear-gradient(135deg, #EFF6FF 0%, #F3E8FF 100%);
    min-height: 100vh;
}

#app {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.welcome-screen {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 1rem;
}

.welcome-card {
    background: white;
    border-radius: 1rem;
    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
    padding: 2rem;
    max-width: 28rem;
    width: 100%;
}

.welcome-header {
    text-align: center;
    margin-bottom: 2rem;
}

.welcome-icon {
    width: 4rem;
    height: 4rem;
    color: #2563EB;
    margin: 0 auto 1rem;
}

.welcome-title {
    font-size: 1.875rem;
    font-weight: bold;
    color: #1F2937;
    margin-bottom: 0.5rem;
}

.welcome-subtitle {
    color: #6B7280;
}

.welcome-input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 2px solid #D1D5DB;
    border-radius: 0.5rem;
    font-size: 1rem;
    margin-bottom: 1rem;
}

.welcome-input:focus {
    outline: none;
    border-color: #2563EB;
}

.welcome-button {
    width: 100%;
    background: #2563EB;
    color: white;
    padding: 0.75rem;
    border: none;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
}

.welcome-button:hover {
    background: #1D4ED8;
}

.header {
    background: white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    padding: 1rem;
    border-bottom: 2px solid #DBEAFE;
}

.header-content {
    max-width: 64rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
}

.header-left {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.header-icon {
    width: 2rem;
    height: 2rem;
    color: #2563EB;
}

.header-title {
    font-size: 1.25rem;
    font-weight: bold;
    color: #1F2937;
}

.header-subtitle {
    font-size: 0.875rem;
    color: #6B7280;
}

.header-actions {
    display: flex;
    gap: 0.5rem;
}

.action-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;
}

.action-button.green {
    background: #D1FAE5;
    color: #065F46;
}

.action-button.green:hover {
    background: #A7F3D0;
}

.action-button.purple {
    background: #E9D5FF;
    color: #6B21A8;
}

.action-button.purple:hover {
    background: #DDD6FE;
}

.messages-container {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
}

.messages-wrapper {
    max-width: 64rem;
    margin: 0 auto;
}

.message {
    display: flex;
    margin-bottom: 1rem;
}

.message.user {
    justify-content: flex-end;
}

.message.assistant {
    justify-content: flex-start;
}

.message-content {
    max-width: 80%;
    padding: 1rem;
    border-radius: 1rem;
}

.message.user .message-content {
    background: #2563EB;
    color: white;
}

.message.assistant .message-content {
    background: white;
    color: #1F2937;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.message-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
}

.message-label {
    font-size: 0.75rem;
    font-weight: 600;
    color: #6B7280;
}

.message-text {
    white-space: pre-wrap;
    line-height: 1.6;
}

.loading {
    display: flex;
    justify-content: flex-start;
}

.loading-content {
    background: white;
    padding: 1rem;
    border-radius: 1rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.loading-dots {
    display: flex;
    gap: 0.5rem;
}

.loading-dot {
    width: 0.5rem;
    height: 0.5rem;
    background: #2563EB;
    border-radius: 50%;
    animation: bounce 1s infinite;
}

.loading-dot:nth-child(2) {
    animation-delay: 0.1s;
}

.loading-dot:nth-child(3) {
    animation-delay: 0.2s;
}

@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
}

.input-area {
    background: white;
    border-top: 2px solid #DBEAFE;
    padding: 1rem;
    box-shadow: 0 -2px 8px rgba(0,0,0,0.1);
}

.input-wrapper {
    max-width: 64rem;
    margin: 0 auto;
    display: flex;
    gap: 0.75rem;
}

.input-field {
    flex: 1;
    padding: 0.75rem 1rem;
    border: 2px solid #D1D5DB;
    border-radius: 0.75rem;
    font-size: 1rem;
}

.input-field:focus {
    outline: none;
    border-color: #2563EB;
}

.send-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: #2563EB;
    color: white;
    border: none;
    border-radius: 0.75rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
}

.send-button:hover {
    background: #1D4ED8;
}

.send-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

@media (max-width: 640px) {
    .header-content {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .header-actions {
        width: 100%;
        flex-wrap: wrap;
    }
    
    .action-button {
        flex: 1;
    }
    
    .message-content {
        max-width: 90%;
    }
}
