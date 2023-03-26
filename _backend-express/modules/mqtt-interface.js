const mqtt = require('mqtt');

const pubtopic = `mqtt/API/${process.env.MQTT_DEVICEID}`;
const subtopic = "mqtt/RFID/test";

class MqttHandler {
  constructor() {
    this.mqttClient = null;
    this.host = process.env.MQTT_URL;
    this.port = process.env.MQTT_PORT
    this.username = process.env.MQTT_UNAME; // mqtt credentials if these are needed to connect
    this.password = process.env.MQTT_PASS;
    this.deviceID = process.env.MQTT_DEVICEID;
  }
  
  connect() {
    // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
    this.mqttClient = mqtt.connect(this.host, { 
        clientId: this.deviceID,
        clean: true,
        connectTimeout: 4000,
        username: this.username, 
        password: this.password,
        protocol: 'mqtt',
        reconnectPeriod: 1000,
        rejectUnauthorized: false,
        resubscribe: true,

        
    });

    // When a message arrives, console.log it
    this.mqttClient.on('message', function (topic, message) {
        console.log(`message: ${message}, || topic: ${topic}`); 
    });

    // Connection callback
    this.mqttClient.on('connect', async () => {
        console.log(`mqtt client connected`);

        this.mqttClient.subscribe(subtopic, {qos: 0}, function (err) {
            if (err) {
                console.log("An error occurred while subscribing")
            } else {
                console.log("Subscribed successfully to " + subtopic.toString())
            }
        });
    });

    // Notify reconnection
    this.mqttClient.on("reconnect", function () {
        console.log("Reconnection starting");
    });

    // Notify offline status
    this.mqttClient.on("offline", function () {
        console.log("Currently offline. Please check internet!");
    });

    // mqtt subscriptions
    this.mqttClient.subscribe(subtopic, {qos: 0});

    // Mqtt error calback
    this.mqttClient.on('error', (err) => {
        console.log(err);
        this.mqttClient.end();
      });

    this.mqttClient.on('close', () => {
      console.log(`mqtt client disconnected`);
    });
  }

  // Sends a mqtt message to topic: mytopic
  sendMessage(message) {
    this.mqttClient.publish(pubtopic, message);
  }
}

module.exports = MqttHandler;