var { Kafka, logLevel } = require('kafkajs');
var http = require('axios');
var fs = require("fs");

var baseurl = "http://localhost:3000/";

var _kafka = new Kafka({
  clientId: 'testapp',
  brokers: ['kafka:9092'],
  logLevel: logLevel.INFO
});

var consumer = _kafka.consumer({groupId: 'test-consumer-group'});
var run = async () => {
  await consumer.connect();
  await consumer.subscribe({topic:'nibss.gateway.make.payment'});
  await consumer.run({
    eachMessage: async ({topic, partition, message}) => {
      const prefix = `${new Date()} - ${topic}[${partition} | ${message}] / ${message.timestamp}`;
      const ddata = `- ${prefix} ${message.key}#${message.value}\n`;
      // fs.writeFile('testdata.txt', ddata, { flag: 'a+' }, err => {});
      console.log(ddata, "\n\n");
    },
  });
}

// setInterval(() => {
// }, 3000);

run().catch(e => {
  const errdata = `${new Date()} - [testapp] ${e.message}\n`;
  //fs.writeFile('errdata.txt', errdata, { flag: 'a+' }, err => {});
  console.log(errdata, "\n\n");
});

/*
logConsumer.on('ready', () => {
  console.log('log consumer ready..');
  logConsumer.subscribe(['nibss.gateway.make.payment']);
  logConsumer.consume();
}).on('data', function(data) {
  const payload = JSON.parse(data.value);
  http.post(baseurl+'pos-transaction', payload)
    .then((res) => {
      console.log(`Status: ${res.status}`);
      console.log(`Message: `, res.data);
    })
    .catch((err) => {
      console.log(err);
    });
});*/