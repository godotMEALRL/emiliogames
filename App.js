// Import StreamChat
import { StreamChat } from 'stream-chat';

// Instantiate your stream client using the API key and secret
const serverClient = StreamChat.getInstance('6hevtpzamvgu', 'ed8cy58taky8tju6jmmt7nd68zhfkxccjdwebq9qggdskyzyhbsq594xdpxn3gs6');

// Initialize the chat
let userId = ''; // Variable to store the user ID
let channel; // Variable to store the chat channel

// Function to send a message
async function sendMessage(message) {
    if (message && channel) {
        await channel.sendMessage({
            text: message,
            user: { id: userId }, // Send the user ID with the message
        });
        displayMessage(userId, message); // Display the sent message
    }
}

// Function to initialize chat
async function initChat() {
    userId = prompt("What is your name?").toLowerCase();
    // If user does not input a name, default to 'Guest'
    if (!userId) {
        userId = "guest"; 
    }

    // Validate the username
    const validUsernames = [
        "charlotte", "katie", "lauryn", "titan",
        "sophia", "cameron", "arabella", "sydney",
        "august", "paxton", "jonathan", "blake",
        "lily", "brady", "matthew", "grant",
        "carter", "peyton", "julia", "marlena",
        "joshua", "tate", "emily",
        "jillian", "waylynn", "emma", "samuel",
        "hailey", "brenin", "ryker", "ethan",
        "addison", "john", "leah", "ellie",
        "johnathan", "colin", "katherine", "thomas",
        "carson", "jack", "ella", "matthew",
        "olivia", "zoey", "jackson"
    ];

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
    await channel.create();
    await channel.watch(); // Start listening to messages

    // Listen for new messages
    channel.on('message.new', (event) => {
        displayMessage(event.message.user.id, event.message.text);
    });

    // Greet the user
    document.getElementById("greeting").innerText = "Hello, " + userId + "!";
}

// Function to display messages in the chat
function displayMessage(user, message) {
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML += `<div>${user}: ${message}</div>`;
    chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom
}

// Call initChat on page load
window.onload = function() {
    initChat(); // Always ask for the user's name and initialize chat
};

// Function to send message from the input
function sendMessageFromInput() {
    const messageInput = document.getElementById('chat-input');
    const message = messageInput.value;
    sendMessage(message);
    messageInput.value = ''; // Clear the input after sending
}
