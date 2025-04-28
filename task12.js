import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';

export default function App() {
  const [users, setUsers] = useState([
    {
      id: 1,
      firstName: 'Carl',
      lastName: 'Aesop',
      phone: '+1 (111) 111-1111',
      avatar: 'https://i.pinimg.com/736x/5a/9e/df/5a9edfd059fb4cd62004c8aa822e75d7.jpg',
      subscribed: false
    },
    {
      id: 2,
      firstName: 'Luca',
      lastName: 'Balsa',
      phone: '+1 (111) 111-1111',
      avatar: 'https://i.pinimg.com/736x/18/3c/c7/183cc7cfbd38c0c3a710982a4b712903.jpg',
      subscribed: false
    }
  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    avatar: ''
  });

  const handleUserInputChange = (name, value) => {
    setNewUser({
      ...newUser,
      [name]: value.trim()
    });
  };

  const addUser = () => {
    if (!newUser.firstName || !newUser.lastName) {
      Alert.alert('Error', 'First and last names are required');
      return;
    }
    if (!newUser.avatar) {
      Alert.alert('Error', 'Avatar URL is required');
      return;
    }
    if (!newUser.avatar.startsWith('http')) {
      Alert.alert('Error', 'Please enter a valid URL');
      return;
    }

    const user = {
      id: users.length + 1,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      phone: newUser.phone || 'Not provided',
      avatar: newUser.avatar,
      subscribed: false
    };

    setUsers([...users, user]);
    setNewUser({ firstName: '', lastName: '', phone: '', avatar: '' });
  };

  const showUserDetails = (user) => {
    setSelectedUser(user);
  };

  const goBackToList = () => {
    setSelectedUser(null);
  };

  const toggleSubscribe = (id) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, subscribed: !user.subscribed } : user
    ));
  };

  if (selectedUser) {
    return (
      <View style={styles.container}>
        <View style={styles.userDetailContainer}>
          <Image
            style={styles.detailAvatar}
            source={{ uri: selectedUser.avatar }}
          />
          <Text style={styles.detailName}>
            {selectedUser.firstName} {selectedUser.lastName}
          </Text>
          <Text style={styles.detailPhone}>{selectedUser.phone}</Text>

          <TouchableOpacity
            style={[
              styles.subscribeButton,
              { backgroundColor: selectedUser.subscribed ? '#FF9AA2' : '#B5EAD7' }
            ]}
            onPress={() => {
              toggleSubscribe(selectedUser.id);
              setSelectedUser({
                ...selectedUser,
                subscribed: !selectedUser.subscribed
              });
            }}
          >
            <Text style={styles.buttonText}>
              {selectedUser.subscribed ? 'Unsubscribe' : 'Subscribe'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.backButton} onPress={goBackToList}>
            <Text style={styles.buttonText}>Back to List</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Create New User</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={newUser.firstName}
          onChangeText={(text) => handleUserInputChange('firstName', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={newUser.lastName}
          onChangeText={(text) => handleUserInputChange('lastName', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number (optional)"
          value={newUser.phone}
          onChangeText={(text) => handleUserInputChange('phone', text)}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Avatar URL"
          value={newUser.avatar}
          onChangeText={(text) => handleUserInputChange('avatar', text)}
          keyboardType="url"
        />
        <TouchableOpacity style={styles.submitButton} onPress={addUser}>
          <Text style={styles.buttonText}>Add User</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Users</Text>
        {users.map(user => (
          <TouchableOpacity
            key={user.id}
            style={styles.userCard}
            onPress={() => showUserDetails(user)}
          >
            <Image
              style={styles.avatar}
              source={{ uri: user.avatar }}
            />
            <View style={styles.info}>
              <Text style={styles.name}>
                {user.firstName} {user.lastName}
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.subscribeButtonSmall,
                { backgroundColor: user.subscribed ? '#FF9AA2' : '#B5EAD7' }
              ]}
              onPress={(e) => {
                e.stopPropagation();
                toggleSubscribe(user.id);
              }}
            >
              <Text style={styles.buttonTextSmall}>
                {user.subscribed ? 'Unsub' : 'Sub'}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 16,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#555',
  },
  input: {
    height: 40,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: '#FAFAFA',
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: '#C7CEEA',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  userCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: '#444',
  },
  buttonText: {
    color: '#555',
    fontWeight: '500',
  },
  buttonTextSmall: {
    color: '#555',
    fontWeight: '500',
    fontSize: 12,
  },
  userDetailContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF',
  },
  detailAvatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#F0F0F0',
  },
  detailName: {
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 10,
    textAlign: 'center',
    color: '#444',
  },
  detailPhone: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
  },
  backButton: {
    backgroundColor: '#E2F0CB',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  subscribeButton: {
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  subscribeButtonSmall: {
    padding: 6,
    borderRadius: 15,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
