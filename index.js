const { createClient } = require('redis');
const ciceksepetiRedis = (() => {
  
    let client;
    const sum = () => {
      console.log(1 + 2);
    };
    const createClientRedis = () => {
      client = createClient({
        host: 'localhost',
        port: '6379'
     });
     client.on('error', err => console.log('Redis Client Error', err));

    };
    const connectClientRedis = async () => {
        await client.connect()
        .catch((err) => {
          console.log('Redis Connection Error', err);
        });
    };
    const setKey = async() => {
      await client.set('key', 'value');
    };
    const getKey = async() => {
      const value = await client.get('key');
      console.log('value', value);
      return value;
    };
    const redisDisconnect = async() => {
      await client.disconnect();
    };
    return {
      sum,
      createClientRedis,
      connectClientRedis,
      setKey,
      getKey,
      redisDisconnect,
    };

})();

module.exports = ciceksepetiRedis;
    //"start": "node ./dist/index.js",
