const fs = require('fs');
const jose = require('node-jose');


const handler = async (req, res) => {
  const keyStore = await jose.JWK.createKeyStore()
  keyStore.generate('RSA', 2048, {alg: 'RS256', use: 'sig' })
  .then(result => {
    fs.writeFileSync(
      'privateKey.json', 
      JSON.stringify(keyStore.toJSON(true), null, '  ')
    )
    fs.writeFileSync(
      'publicKey.json', 
      JSON.stringify(keyStore.toJSON(), null, '  ')
    )
  })
  res.send({ message: 'Key generated' })

}

export default handler;