const mqtt = require('mqtt');

var url = require('url');

// const userEnteredURL = `mqtt://${process.env.MQTT_URL}:${process.env.MQTT_PORT}`
// const tempNewURL= new URL(userEnteredURL)
// const brokerURL = url.parse(userEnteredURL)
// brokerURL.hostname = tempNewURL.hostname

const options = {
  host: process.env.MQTT_LOCAL,
  port: process.env.MQTT_LPORT,
  clientId: process.env.MQTT_DEVICEID,
  protocol: 'mqtt://',
  username: process.env.MQTT_UNAME,
  password: process.env.MQTT_PASS,
  keepalive: 2000,
  connectTimeout: 4000,
  resubscribe: true,

}

class MqttHandler {
  constructor() {
    console.log(options.host);
    this.mqttClient = mqtt.connect(options);

    this.mqttClient.on('connect', () => {
      console.log('Connected to MQTT broker:', this.mqttClient.options.host);
    });

    this.mqttClient.on('error', (err) => {
      console.error('Error connecting to MQTT broker:', err);
    });
  }

  subscribe(topic, options) {
    this.mqttClient.subscribe(topic, options, (err, granted) => {
      if (err) {
        console.error('Error subscribing to topic:', err);
      } else {
        console.log('Subscribed to topic:', granted[0].topic);
      }
    });
  }

  publish(topic, message, options) {
    this.mqttClient.publish(topic, message, options, (err) => {
      if (err) {
        console.error('Error publishing message:', err);
      } else {
        console.log('Message published to topic:', topic);
      }
    });
  }

  onMessage(callback) {
    this.mqttClient.on('message', (topic, message) => {
      console.log('Received message:', message.toString(), 'on topic:', topic);
      callback(topic, message);
    })
  }

  end() {
    this.mqttClient.end();
    console.log('Disconnected from MQTT broker');
  }
  
}

module.exports = MqttHandler;