import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  const [data, setData] = useState(null);
  const [led, setLed] = useState(false)

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get('http://herculanodebiasi.dyndns-ip.com:9090/lesensor');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }, 2000); 

    return () => clearInterval(interval); 
  }, []);

  async function onHandleOnLed() {
    await axios.get('http://herculanodebiasi.dyndns-ip.com:9090/ledon')
    setLed(true);
  }

  async function onHandleOffLed() {
    await axios.get('http://herculanodebiasi.dyndns-ip.com:9090/ledoff')
    setLed(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Servidor Web ESP32</Text>
      <Text style={styles.subtitle}>Sensor DHT</Text>
      <View style={styles.dataContainer}>
        <View style={styles.dataRow}>
          <Text style={styles.icon}>🌡️</Text>
          <Text style={styles.label}>Temperatura</Text>
          <Text style={styles.value}>{data ? data.temperatura : 'Carregando...'} °C</Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={styles.icon}>💧</Text>
          <Text style={styles.label}>Umidade</Text>
          <Text style={styles.value}>{data ? data.umidade : 'Carregando...'} %</Text>
        </View>
      </View>
      <Text style={styles.ledState}>Estado do LED: {led ? 'Ligado' : 'Desligado'}</Text>
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: led ? 'red' : 'green' }]} 
        onPress={led ? onHandleOffLed : onHandleOnLed}
      >
        <Text style={styles.buttonText}>{led ? 'Turn Off' : 'Turn On'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    fontFamily: 'sans-serif',
  },
  subtitle: {
    fontSize: 20,
    color: '#666',
    marginBottom: 16,
    fontFamily: 'sans-serif',
  },
  dataContainer: {
    marginBottom: 16,
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    fontSize: 24,
    marginRight: 8,
  },
  label: {
    fontSize: 18,
    marginRight: 8,
    color: '#444',
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  ledState: {
    fontSize: 18,
    marginBottom: 16,
    color: '#444',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
