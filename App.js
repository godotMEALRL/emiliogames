// app.js
import { StreamChat } from 'stream-chat';

// Redirect to crazygames.com if the username is not valid
const redirectToCrazyGames = () => {
    window.location.href = 'https://crazygames.com';
};

// Prompt user for their name
let username = prompt('Enter your username (number between 0 and 1000):');

// Check if the username is a valid number between 0 and 1000
if (isNaN(username) || username < 0 || username > 1000) {
    redirectToCrazyGames();
} else {
    // Instantiate StreamChat client using the provided API key
    const serverClient = StreamChat.getInstance('6hevtpzamvgu', 'ed8cy58taky8tju6jmmt7nd68zhfkxccjdwebq9qggdskyzyhbsq594xdpxn3gs6');

    // Generate a token for the user with the entered username
    const token = serverClient.createToken(username);

    // Now we need to connect the client and let the user start texting
    const client = new StreamChat('6hevtpzamvgu');
    client.connectUser(
        {
            id: username,
            name: `User ${username}`
        },
        token
    ).then(() => {
        console.log('User connected:', username);
        // Here you can initialize the chat UI with Stream's chat components
        document.getElementById('chat-container').innerText = `You are logged in as User ${username}`;
    }).catch((error) => {
        console.error('Error connecting user:', error);
        redirectToCrazyGames();
    });
}