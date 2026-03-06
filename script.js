const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const typingIndicator = document.getElementById('typing-indicator');
const emojiBtn = document.getElementById('emoji-btn');
const emojiPicker = document.getElementById('emoji-picker');
const imageInput = document.getElementById('image-input');

// Helper: Get Time
const getTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

// Function to Add Message
function appendMessage(content, type, isImage = false) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', type);
    
    if (isImage) {
        msgDiv.innerHTML = `<img src="${content}"><span class="timestamp">${getTime()}</span>`;
    } else {
        msgDiv.innerHTML = `${content}<span class="timestamp">${getTime()}</span>`;
    }

    chatBox.insertBefore(msgDiv, typingIndicator);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Handle Bot Logic
function botReply(text) {
    typingIndicator.style.display = 'flex';
    chatBox.scrollTop = chatBox.scrollHeight;
    setTimeout(() => {
        typingIndicator.style.display = 'none';
        appendMessage(text, 'bot-msg');
    }, 1500);
}

// Send Text Message
function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;
    appendMessage(text, 'user-msg');
    userInput.value = '';
    emojiPicker.classList.remove('active');
    botReply("Got it! That looks great.");
}

// Handle Image Upload
imageInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            appendMessage(e.target.result, 'user-msg', true);
            botReply("Nice photo!");
        };
        reader.readAsDataURL(file);
    }
});

// Emoji Picker Logic
emojiBtn.addEventListener('click', () => emojiPicker.classList.toggle('active'));
emojiPicker.querySelectorAll('span').forEach(s => {
    s.addEventListener('click', () => {
        userInput.value += s.innerText;
        userInput.focus();
    });
});

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => e.key === 'Enter' && sendMessage());
