var Kafka = require('node-rdkafka');
var http = require('axios');

var baseurl = "http://localhost:3000/";

/*var consumer = new Kafka.KafkaConsumer({
  'group.id': 'test-consumer-group',
  'metadata.broker.list': 'localhost:9092',
}, {});*/

var consumer = new Kafka.KafkaConsumer({
  'group.id': 'consumer-group',
  'metadata.broker.list': '172.105.73.219:9092',
}, {});


var logConsumer = consumer.connect();

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
});