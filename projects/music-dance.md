---
title: Music Dance
summary: Performance / 4m 30s
date: 2023-2024
featured_image: assets/images/musicdance-1.png
---

<div class="container">
    <iframe class="responsive-iframe"
        src="https://www.youtube.com/embed/FJX6AqGDLhs?si=3tsfBSySJ15Bw2Tx" 
        allowfullscreen></iframe>
</div>
*Music Dance. Performed by Seongjoo Moon, Yeonhee Kim*

"Music Dance" is a project that transforms dance into music. 
When the gyroscopic sensor (MPU 6050) and an ESP32 send tilt data to a master ESP32, 
the master then converts this data into CV (control voltage) values for a modular synthesizer. 
The X, Y, and Z values are transformed into CV signals, and the module built with the master
 ESP32 features knobs that allow users to adjust parameters such as the minimum
  and maximum CV values and the sensitivity based on direction.

![synthesizer module](../assets/images/musicdance-2.jpg)
*synthesizer module*

MPU 6050 is connected as same way with airplane toy and rocking horse of 'Mischief'. 
The following code was used for the master ESP32. 
It is written to output CV signals that are quantized to musical scales.

```cpp
#include <esp_now.h>
#include <WiFi.h>

// Structure example to receive data
// Must match the sender structure
typedef struct struct_message {
    int id;
    float x;
    float y;
    float z;
} struct_message;

// Create a struct_message called myData
struct_message myData;

// callback function that will be executed when data is received
void OnDataRecv(const uint8_t * mac, const uint8_t *incomingData, int len) {
  memcpy(&myData, incomingData, sizeof(myData));
  Serial.print("Bytes received: ");
  Serial.println(len);
  Serial.print("ID: ");
  Serial.println(myData.id);
  Serial.print("x: ");
  Serial.println(myData.x);
  Serial.print("y: ");
  Serial.println(myData.y);
  Serial.print("z: ");
  Serial.println(myData.z);
  Serial.println();
}
 
void setup() {
  // Initialize Serial Monitor
  Serial.begin(115200);
  
  // Set device as a Wi-Fi Station
  WiFi.mode(WIFI_STA);

  // Init ESP-NOW
  if (esp_now_init() != ESP_OK) {
    Serial.println("Error initializing ESP-NOW");
    return;
  }
  
  // Once ESPNow is successfully Init, we will register for recv CB to
  // get recv packer info
  esp_now_register_recv_cb(OnDataRecv);
}
 
void loop() {

}
```
