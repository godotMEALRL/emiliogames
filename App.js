// Function to initialize chat
async function initChat() {
    // Always prompt for the name each time the page is loaded
    userId = prompt("What is your name?").toLowerCase();

    // Validate the username
    if (!validUsernames.includes(userId)) {
        alert("Your username is not valid. Please refresh the page and enter a valid username.");
        window.location.href = "https://crazygames.com"; // Redirect to crazygames.com
        return;
    }

    const token = serverClient.createToken(userId); // Generate a token for the user

    // Set the user for the client
    await serverClient.connectUser({ id: userId }, token);

    // Create or get a channel
    channel = serverClient.channel('messaging', 'general', {
        name: 'General Chat',
    });

    // Create the channel if it doesn't exist
    await channel.create();
    
    // Start watching the channel
    await channel.watch();

    // Listen for new messages
    channel.on('message.new', (event) => {
        const chatMessages = document.getElementById('chat-messages');
        chatMessages.innerHTML += `<div>${event.message.user.id}: ${event.message.text}</div>`;
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom
    });
}

// Call initChat on page load
window.onload = function() {
    initChat(); // Get the user's name and initialize chat
};

// Function to send a message
async function sendMessage() {
    const messageInput = document.getElementById('chat-input');
    const message = messageInput.value;

    if (message && channel) {
        try {
            await channel.sendMessage({
                text: message,
                user: { id: userId }, // Send the user ID with the message
            });

            // Display message in the chat messages div
            const chatMessages = document.getElementById('chat-messages');
            chatMessages.innerHTML += `<div>${userId}: ${message}</div>`;
            messageInput.value = ''; // Clear the input
            chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom
        } catch (error) {
            console.error("Error sending message: ", error);
            alert("There was an error sending your message. Please try again.");
        }
    }
}
