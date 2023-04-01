const mqtt = require('mqtt');

const options = {
  host: process.env.MQTT_URL,
  port: process.env.MQTT_PORT,
  clientId: process.env.MQTT_DEVICEID,
  protocol: 'mqtts://',
  username: process.env.MQTT_UNAME,
  password: process.env.MQTT_PASS,
}

class MqttHandler {
  constructor() {
    this.mqttClient = mqtt.connect(options);

    this.mqttClient.on('connect', async () => {
      console.log('Connected to MQTT broker:');
    });

    this.mqttClient.on('error', async (err) => {
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