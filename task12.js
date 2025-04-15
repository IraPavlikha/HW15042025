import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';

export default function App() {
  const [cards, setCards] = useState([
    {
      id: 1,
      name: 'Carl',
      job: 'Software Developer',
      avatar: 'https://i.pinimg.com/736x/30/b2/1d/30b21d8a232bea115960a9216d65a94f.jpg',
      subscribed: false
    }
  ]);

  const [newCard, setNewCard] = useState({
    name: '',
    job: '',
    avatar: ''
  });

  const handleCardInputChange = (name, value) => {
    setNewCard({
      ...newCard,
      [name]: value.trim()
    });
  };

  const addCard = () => {
    if (!newCard.name) {
      Alert.alert('Error', 'Name is required');
      return;
    }
    if (!newCard.job) {
      Alert.alert('Error', 'Job title is required');
      return;
    }
    if (!newCard.avatar) {
      Alert.alert('Error', 'Avatar URL is required');
      return;
    }
    if (!newCard.avatar.startsWith('http')) {
      Alert.alert('Error', 'Please enter a valid URL');
      return;
    }

    const card = {
      id: cards.length + 1,
      name: newCard.name,
      job: newCard.job,
      avatar: newCard.avatar,
      subscribed: false
    };

    setCards([...cards, card]);
    setNewCard({ name: '', job: '', avatar: '' });
  };

  const toggleSubscribe = (id) => {
    setCards(cards.map(card =>
      card.id === id ? { ...card, subscribed: !card.subscribed } : card
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Create New Card</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={newCard.name}
          onChangeText={(text) => handleCardInputChange('name', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Job Title"
          value={newCard.job}
          onChangeText={(text) => handleCardInputChange('job', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Avatar URL"
          value={newCard.avatar}
          onChangeText={(text) => handleCardInputChange('avatar', text)}
          keyboardType="url"
        />
        <TouchableOpacity style={styles.submitButton} onPress={addCard}>
          <Text style={styles.buttonText}>Add Card</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cards</Text>
        {cards.map(card => (
          <View key={card.id} style={styles.card}>
            <Image
              style={styles.avatar}
              source={{ uri: card.avatar }}
            />
            <View style={styles.info}>
              <Text style={styles.name}>{card.name}</Text>
              <Text style={styles.job}>{card.job}</Text>
            </View>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: card.subscribed ? 'red' : 'skyblue' }
              ]}
              onPress={() => toggleSubscribe(card.id)}
            >
              <Text style={styles.buttonText}>
                {card.subscribed ? 'Unsubscribe' : 'Subscribe'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ececec',
    padding: 16,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  job: {
    fontSize: 14,
    color: 'gray',
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});