import React, { useState } from 'react';
import {
  Grid,
  Button,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { CodeBlock, dracula } from 'react-code-blocks';

import { BACKEND_API_URL } from '../services/axiosConfig';

export default function CodeComponent({ token, nodeParams, dataTypes, apiToken }) {
  const [deviceType, setDeviceType] = useState('arduino');
  const [protocolType, setProtocolType] = useState('http');
  const [dataModelType, setDataModelType] = useState('onem2m');
  const [isCodeVisible, setIsCodeVisible] = useState(true);

  const url = `${BACKEND_API_URL}/cin/create/${token}`;

  const toggleCodeVisibility = () => {
    setIsCodeVisible(!isCodeVisible);
  };

  const generateExampleValue = (type) => {
    const exampleValues = {
      int: Math.round(Math.random() * 100),
      float: Math.round(Math.random() * 10000) / 100,
      string: 'example'
    };
    return exampleValues[type] || 'example';
  };

  const generateRequestBody = () => {
    const requestBody = nodeParams.reduce((acc, param, index) => {
      acc[param] = generateExampleValue(dataTypes[index]);
      return acc;
    }, {});

    return JSON.stringify(requestBody, null, '\t\t').replace(/}\s*$/, '\t    }');
  };

  const generateArduinoCode = (requestBody) =>
    `#include <ESP8266WiFi.h>\n#include <ESP8266HTTPClient.h>\n#include <WiFiClient.h>\n\nconst char* ssid = "yourSSID";\nconst char* password = "yourPASSWORD";\n\nvoid setup() {\n    Serial.begin(115200);\n    WiFi.begin(ssid, password);\n\n    while (WiFi.status() != WL_CONNECTED) {\n        delay(1000);\n        Serial.println("Connecting to WiFi...");\n    }\n\n    Serial.println("Connected to WiFi");\n}\n\nvoid loop() {\n    if (WiFi.status() == WL_CONNECTED) {\n        WiFiClient client;\n        HTTPClient http;\n\n        http.begin(client, "${url}");\n        http.addHeader("Content-Type", "application/json");\n        http.addHeader("Authorization", "Bearer ${apiToken}");\n\n        String requestBody = ${requestBody};\n        int httpResponseCode = http.POST(requestBody);\n\n        if (httpResponseCode > 0) {\n            String response = http.getString();\n            Serial.println(httpResponseCode);\n            Serial.println(response);\n        } else {\n            Serial.print("Error on sending POST: ");\n            Serial.println(httpResponseCode);\n        }\n\n        http.end();\n    }\n\n    delay(10000); // Delay between POST requests\n}`;

  const generateESP32Code = (requestBody) =>
    `#include <WiFi.h>\n#include <HTTPClient.h>\n\nconst char* ssid = "yourSSID";\nconst char* password = "yourPASSWORD";\n\nvoid setup() {\n    Serial.begin(115200);\n    WiFi.begin(ssid, password);\n\n    while (WiFi.status() != WL_CONNECTED) {\n        delay(1000);\n        Serial.println("Connecting to WiFi...");\n    }\n\n    Serial.println("Connected to WiFi");\n}\n\nvoid loop() {\n    if (WiFi.status() == WL_CONNECTED) {\n        HTTPClient http;\n\n        http.begin("${url}");\n        http.addHeader("Content-Type", "application/json");\n        http.addHeader("Authorization", "Bearer ${apiToken}");\n\n        String requestBody = ${requestBody};\n        int httpResponseCode = http.POST(requestBody);\n\n        if (httpResponseCode > 0) {\n            String response = http.getString();\n            Serial.println(httpResponseCode);\n            Serial.println(response);\n        } else {\n            Serial.print("Error on sending POST: ");\n            Serial.println(httpResponseCode);\n        }\n\n        http.end();\n    }\n\n    delay(10000); // Delay between POST requests\n}`;

  const generateRaspberryPiCode = (requestBody) =>
    `import requests\nimport json\n\nurl = "${url}"\ndata = ${requestBody}\nheaders = {"Content-Type": "application/json", "Authorization": "Bearer ${apiToken}"}\n\nresponse = requests.post(url, data=json.dumps(data), headers=headers)\n\nif response.status_code == 200:\n    print("Success:", response.text)\nelse:\n    print("Error:", response.status_code, response.text)`;

  const codeGenerators = {
    arduino: generateArduinoCode,
    esp32: generateESP32Code,
    raspberrypi: generateRaspberryPiCode
  };

  const generateCodeSnippet = (type) => {
    if (!token) return '// Please assign a token';
    const generator = codeGenerators[type];
    return generator ? generator(generateRequestBody()) : '// Select a device type';
  };

  const handleDeviceChange = (event) => {
    setDeviceType(event.target.value);
  };

  const handleProtocolChange = (event) => {
    setProtocolType(event.target.value);
    console.log('Protocol changed to:', event.target.value);
  };

  const handleDataModelChange = (event) => {
    setDataModelType(event.target.value);
    console.log('Data model changed to:', event.target.value);
  };

  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Device Code
          </Typography>

          <Grid container spacing={2} sx={{ marginBottom: isCodeVisible ? '20px' : '0px' }}>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel id="device-select-label">Device Type</InputLabel>
                <Select
                  labelId="device-select-label"
                  id="device-select"
                  value={deviceType}
                  label="Device Type"
                  onChange={handleDeviceChange}
                >
                  <MenuItem value="arduino">Arduino</MenuItem>
                  <MenuItem value="esp32">ESP32</MenuItem>
                  <MenuItem value="raspberrypi">Raspberry Pi</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel id="protocol-select-label">Protocol</InputLabel>
                <Select
                  labelId="protocol-select-label"
                  id="protocol-select"
                  value={protocolType}
                  label="Protocol"
                  onChange={handleProtocolChange}
                >
                  <MenuItem value="http">HTTP</MenuItem>
                  <MenuItem value="mqtt">MQTT</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel id="datamodel-select-label">Data Model</InputLabel>
                <Select
                  labelId="datamodel-select-label"
                  id="datamodel-select"
                  value={dataModelType}
                  label="Data Model"
                  onChange={handleDataModelChange}
                >
                  <MenuItem value="onem2m">oneM2M</MenuItem>
                  <MenuItem value="non-onem2m">Non-oneM2M</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3} sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Button onClick={toggleCodeVisibility} variant="contained" color="primary">
                {isCodeVisible ? 'Hide Code' : 'Show Code'}
              </Button>
            </Grid>
          </Grid>

          {isCodeVisible && (
            <CodeBlock
              text={generateCodeSnippet(deviceType)}
              language="javascript"
              showLineNumbers
              theme={dracula}
            />
          )}
        </CardContent>
      </Card>
    </Grid>
  );
}