// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const jose = require("jose");

const clientId = process.env.OKTA_CLIENT_ID;
const oktaDomain = process.env.OKTA_DOMAIN;
const jwk = JSON.parse(process.env.PRIVATE_KEY);

const endpoint = `${oktaDomain}/oauth2/v1/token`;

const createJWT = async () => {
  const alg = 'RS256'
  const privateKey = await jose.importJWK(jwk, alg)
  
  const jwt = await new jose.SignJWT({ 'urn:example:claim': true })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer(clientId)
    .setSubject(clientId)
    .setAudience(endpoint)
    .setExpirationTime('1h')
    .sign(privateKey)
  
  return jwt;
}

const getAccessToken = async (jwt) => {
  const postData = {
    grant_type: 'client_credentials',
    scope: 'okta.users.read',
    'client_assertion_type': 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
    client_assertion: jwt,
  };

  const rawData = new URLSearchParams(Object.keys(postData).map(key=>[key,postData[key]]));

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: rawData,
  });

  const parsedResponse = await response.json();

  return parsedResponse;
}



const handler = async () => {
  const jwt = await createJWT();
  const token = await getAccessToken(jwt);
  return token;
}

export default handler;
