import createToken from './createToken';

const oktaDomain = process.env.OKTA_DOMAIN;

const getUsers = async (token) => {
  const response = await fetch(`${oktaDomain}/api/v1/users`, {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.access_token}`
    },
  });

  const users = await response.json();

  return users;
}

const handler = async (req, res) => {
  const token = await createToken();
  const users = await getUsers(token);
  res.send({ users })

}

export default handler;
