const axios = require('axios');

async function login() {
  const loginResponse = await axios.post('https://api.potber.de/auth/login', {
    username: '***',
    password: '***',
    lifetime: 86400,
  });

  if (loginResponse.statusCode >= 400) {
    throw new Error('The login failed. Did you enter wrong credentials?');
  }
  console.log('Login successful.');
  const { access_token } = loginResponse.data;

  // You can now use `access_token` to send authenticated requests to https://api.potber.de
  const sessionResponse = await axios.get(
    'https://api.potber.de/auth/session',
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );
  if (sessionResponse.statusCode >= 400) {
    throw new Error(
      'Unable to retrieve session. Did your session token expire?',
    );
  }

  // See: https://api.potber.de/swagger#/Authentication/AuthController_session
  const session = sessionResponse.data;
  const { username, userId, cookie } = session;
  console.log(`You are logged in as '${username}' (ID: ${userId})`);
  console.log(`Forum session cookie: ${cookie}`);

  // You can use `cookie` to send authenticated requests directly to the forum
  const forumResponse = await axios.get('https://forum.mods.de', {
    headers: {
      Cookie: cookie,
      'User-Agent': 'potber', // Must be included because the session is bound to the user-agent
    },
  });
  const html = forumResponse.data;
  if (html.includes('Du bist nicht eingeloggt!')) {
    throw new Error('Failed to log into the forum.');
  } else {
    console.log('Yay! The forum accepts our cookie.');
  }
}

login();
