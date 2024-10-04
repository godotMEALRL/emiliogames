const faunadb = require('faunadb');
const bcrypt = require('bcryptjs');

const q = faunadb.query;
const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

exports.handler = async (event) => {
  // Ensure the correct method is used
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  const { username, password } = JSON.parse(event.body);
  
  // Check if username and password are provided
  if (!username || !password) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Username and password are required' }),
    };
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Save into FaunaDB
    await client.query(
      q.Create(q.Collection('users'), {
        data: {
          username,
          password: hashedPassword,
        },
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'User registered successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error registering user', error: error.message }),
    };
  }
};