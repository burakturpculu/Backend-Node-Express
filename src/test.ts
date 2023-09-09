const crypto = require('crypto')

// Rastgele bir JWT sır anahtarı oluştur
const secretKey = crypto.randomBytes(32) // En az 256 bitlik bir anahtar kullanmalısınız

console.log('JWT Secret Key (Buffer):', secretKey)

// Anahtarı bir tam sayı dizgesine dönüştür
const secretKeyString = secretKey.toString('hex')

console.log('JWT Secret Key (String):', secretKeyString)
