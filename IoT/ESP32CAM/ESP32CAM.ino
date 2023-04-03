#include "defines.h" // ignored by git for privacy purposes
#include "esp32cam_Impl.h"

#include <Arduino.h>
#include <WiFi.h>

extern "C"
{
#include "freertos/FreeRTOS.h"
#include "freertos/timers.h"
}
#define ASYNC_TCP_SSL_ENABLED true
#include <AsyncMQTT_ESP32.h>

String deviceId = String("101");
String topictemp1 = String("mqtt/RFID/json/" + deviceId); // for JSON DATA
String topictemp2 = String("mqtt/RFID/image/" + deviceId); // for image data buffer base64 string
String subtopictemp = String("mqtt/RFID/response/" + deviceId); // for image data buffer base64 string

#if ASYNC_TCP_SSL_ENABLED
  #define MQTT_SECURE true

  const char *PubTopic1 = topictemp1.c_str();
  const char *PubTopic2 = topictemp2.c_str();
  const char *SubTopic = subtopictemp.c_str();
#endif

// ===================
// Select camera model
// ===================
//#define CAMERA_MODEL_WROVER_KIT // Has PSRAM
//#define CAMERA_MODEL_ESP_EYE // Has PSRAM
//#define CAMERA_MODEL_ESP32S3_EYE // Has PSRAM
//#define CAMERA_MODEL_M5STACK_PSRAM // Has PSRAM
//#define CAMERA_MODEL_M5STACK_V2_PSRAM // M5Camera version B Has PSRAM
//#define CAMERA_MODEL_M5STACK_WIDE // Has PSRAM
//#define CAMERA_MODEL_M5STACK_ESP32CAM // No PSRAM
//#define CAMERA_MODEL_M5STACK_UNITCAM // No PSRAM
// #define CAMERA_MODEL_AI_THINKER // Has PSRAM
//#define CAMERA_MODEL_TTGO_T_JOURNAL // No PSRAM
// ** Espressif Internal Boards **
#define CAMERA_MODEL_ESP32_CAM_BOARD
//#define CAMERA_MODEL_ESP32S2_CAM_BOARD
//#define CAMERA_MODEL_ESP32S3_CAM_LCD

#include "camera_pins.h"
#include "soc/soc.h"
#include "soc/rtc_cntl_reg.h"

AsyncMqttClient mqttClient;
TimerHandle_t mqttReconnectTimer;
TimerHandle_t wifiReconnectTimer;

void connectToWifi(const char* ssid, const char* pwd){
  Serial.print("Connectiog to ");
 
  WiFi.begin(ssid, pwd);
  Serial.println(ssid);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println("Wifi Connected!!");
}

void connectToMqtt()
{
  Serial.println("Connecting to MQTT...");

  mqttClient.connect();
}

void onWifiEvent(WiFiEvent_t event){
  Serial.printf("[WiFi-event] event: %d\n", event);
  switch(event) {
  case SYSTEM_EVENT_STA_GOT_IP:
      Serial.println("WiFi connected");
      Serial.println("IP address: ");
      Serial.println(WiFi.localIP());
      connectToMqtt();
      break;
  case SYSTEM_EVENT_STA_DISCONNECTED:
      Serial.println("WiFi lost connection");
      xTimerStop(mqttReconnectTimer, 0); // ensure we don't reconnect to MQTT while reconnecting to Wi-Fi
      xTimerStart(wifiReconnectTimer, 0);
      break;
  }
}

void printSeparationLine()
{
  Serial.println("************************************************");
}

void onMqttConnect(bool sessionPresent)
{
  Serial.print("Connected to MQTT broker: ");
  Serial.print(MQTT_HOST);
  Serial.print(", port: ");
  Serial.println(MQTT_PORT);
  Serial.print("PubTopics: ");
  Serial.println(PubTopic1);
  Serial.println(PubTopic2);

  printSeparationLine();
  Serial.print("Session present: ");
  Serial.println(sessionPresent);

  sendDataPayload();

  // uint16_t packetIdSub = mqttClient.subscribe(PubTopic, 2);
  // Serial.print("Subscribing at QoS 2, packetId: ");
  // Serial.println(packetIdSub);

  // mqttClient.publish(PubTopic1, 0, true, capturePhotoToJSON().c_str());
  // Serial.println("Publishing JSON DATA at QoS 0");

  // mqttClient.publish(PubTopic2, 0, true, );
  // Serial.println("Publishing Image data buffer at QoS 0");

  // uint16_t packetIdPub1 = mqttClient.publish(PubTopic, 1, true, "ESP32 test 2");
  // Serial.print("Publishing at QoS 1, packetId: ");
  // Serial.println(packetIdPub1);

  // uint16_t packetIdPub2 = mqttClient.publish(PubTopic, 2, true, "ESP32 test 3");
  // Serial.print("Publishing at QoS 2, packetId: ");
  // Serial.println(packetIdPub2);


  printSeparationLine();
}

void onMqttDisconnect(AsyncMqttClientDisconnectReason reason)
{
  (void) reason;

  Serial.println("Disconnected from MQTT.");

  if (WiFi.isConnected())
  {
    xTimerStart(mqttReconnectTimer, 0);
  }
}

void onMqttSubscribe(const uint16_t packetId, const uint8_t qos) {
  Serial.println("Subscribe acknowledged.");
  Serial.print("  packetId: ");
  Serial.println(packetId);
  Serial.print("  qos: ");
  Serial.println(qos);
}


void onMqttUnsubscribe(const uint16_t packetId) {
  Serial.println("Unsubscribe acknowledged.");
  Serial.print("  packetId: ");
  Serial.println(packetId);
}

void onMqttMessage(char* topic, char* payload, AsyncMqttClientMessageProperties properties, const size_t len, const size_t index, const size_t total) {
  Serial.println("Publish received.");
  Serial.print("  topic: ");
  Serial.println(topic);
  Serial.print("  qos: ");
  Serial.println(properties.qos);
  Serial.print("  dup: ");
  Serial.println(properties.dup);
  Serial.print("  retain: ");
  Serial.println(properties.retain);
  Serial.print("  len: ");
  Serial.println(len);
  Serial.print("  index: ");
  Serial.println(index);
  Serial.print("  total: ");
  Serial.println(total);
}

void onMqttPublish(const uint16_t& packetId)
{
  Serial.println("Publish acknowledged.");
  Serial.print("  packetId: ");
  Serial.println(packetId);
}

//-------------------------------------------------//

void sendDataPayload(){
  camera_fb_t *fb = NULL;
  char* payloadArray = (char*) malloc(sizeof(char));  // Allocate memory for an array of pointers
  Serial.println("Payload Allocated....");
  capturePhoto(payloadArray, fb);

  mqttClient.publish(PubTopic1, 0, true, (const char*) payloadArray[0]);
  Serial.println("Publishing JSON DATA at QoS 0");



  // mqttClient.publish(PubTopic2, 0, true, (const char*) payloadArray[1]);
  Serial.println("Publishing Image data buffer at QoS 0");

  free(payloadArray);
}


//-------------------------------------------------//

void setup() {
  Serial.begin(115200);
  pinMode(FLASH_GPIO_NUM, OUTPUT);

  while (!Serial && millis() < 5000);

  delay(500);

  Serial.print("\nStarting ESP32CAM on ");
  Serial.println(ARDUINO_BOARD);
  Serial.println(ASYNC_MQTT_ESP32_VERSION);

  mqttReconnectTimer = xTimerCreate("mqttTimer", pdMS_TO_TICKS(2000), pdFALSE, (void*)0,
                                    reinterpret_cast<TimerCallbackFunction_t>(connectToMqtt));
  wifiReconnectTimer = xTimerCreate("wifiTimer", pdMS_TO_TICKS(2000), pdFALSE, (void*)0,
                                    reinterpret_cast<TimerCallbackFunction_t>(connectToWifi));

  WiFi.onEvent(onWifiEvent);

  mqttClient.onConnect(onMqttConnect);
  mqttClient.onDisconnect(onMqttDisconnect);
  mqttClient.onSubscribe(onMqttSubscribe);
  mqttClient.onUnsubscribe(onMqttUnsubscribe);
  mqttClient.onMessage(onMqttMessage);
  mqttClient.onPublish(onMqttPublish);

  mqttClient.setClientId(deviceId.c_str());
  Serial.print("Device ID: ");
  Serial.println(deviceId);
  

  mqttClient.setKeepAlive(30);
  mqttClient.setServer(MQTT_HOST, MQTT_PORT);

#if ASYNC_TCP_SSL_ENABLED
  mqttClient.setSecure(MQTT_SECURE);
  if(MQTT_SECURE){
    mqttClient.setCredentials(UNAME, PASS);
  }
  

#endif

  connectToWifi(WIFI_SSID, WIFI_PASSWORD);

  initCamera();
  // flash(1);
  // Serial.println(capturePhotoToJSON());
  // flash(1);
  // Serial.println(capturePhotoToJSON());
  // flash(1);

  // put your setup code here, to run once:
  // pinMode(33, OUTPUT);
  // digitalWrite(33, LOW);
  
  // Serial2.begin(9600, SERIAL_8N1, RXp2, TXp2);
}
void loop() {
    
    // Serial.println(Serial.readString());

    if (Serial.available() > 0) {
      Serial.println("RFID Received: ");
      
      String data = Serial.readStringUntil('\n');
      Serial.println(data);
    }
    else{
      Serial.println("No Message");
      mqttClient.publish("mqtt/IDLE/test", 0, false, "No Message");

      delay(1500);
    }
  
}
