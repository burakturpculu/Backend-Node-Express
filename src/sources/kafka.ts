import kafka from 'kafka-node'
const client = new kafka.KafkaClient({
  kafkaHost: process.env.CICEKSEPETI_APP_KAFKA_URL,
})
const ciceksepetiKafka = (() => {
  const produceKafka = async (datum: any, topicName: string) => {
    const payloads = [
      {
        topic: process.env.CICEKSEPETI_KAFKA_PRODUCER || topicName,
        messages: JSON.stringify(datum),
      },
    ]
    const producer = new kafka.Producer(client)
    await producer.send(payloads, (err, data) => {
      if (err) {
        console.log(err)
      }
      console.log(
        ` Kafka topic : ${process.env.CICEKSEPETI_KAFKA_PRODUCER} produced `
      )
    })
  }
  const consumeKafka = async (topicName) => {
    const client = new kafka.KafkaClient()
    const consumer = new kafka.Consumer(
      client,
      [{ topic: process.env.CICEKSEPETI_KAFKA_CONSUMER || topicName }],
      {
        autoCommit: true,
        sessionTimeout: 15000,
        protocol: ['roundrobin'],
        fromOffset: 'latest', // default
        commitOffsetsOnFirstJoin: true,
        outOfRangeOffset: 'earliest',
      }
    )
    return new Promise((resolve, reject) => {
      const messages = {}
      consumer.on('message', (message) => {
        messages.data = message.value
        resolve(messages)
      })

      consumer.on('error', (err) => {
        console.error(`Error reading from Kafka topic test: ${err}`)
        reject(err)
      })
    })
  }
  return {
    consumeKafka,
    produceKafka,
  }
})()

module.exports = ciceksepetiKafka
