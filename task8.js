import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
  ActivityIndicator
} from 'react-native';

export default function RegistrationForm() {
  const [form, setForm] = useState({
    name: '',
    surname: '',
    phone: '',
    password: '',
    repeatPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const showMessage = (message: string) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      alert(message);
    }
  };

  const handleSubmit = () => {
    const { name, surname, phone, password, repeatPassword } = form;
    if (!name.trim() || !surname.trim() || !phone.trim() || !password.trim() || !repeatPassword.trim()) {
      showMessage('Усі поля обовʼязкові');
      return;
    }
    if (password !== repeatPassword) {
      showMessage('Паролі не співпадають');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showMessage('Реєстрація пройшла успішно!');
      console.log('Form submitted:', form);
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TextInput
        placeholder="Імʼя"
        style={styles.input}
        value={form.name}
        onChangeText={(val) => handleChange('name', val)}
        autoCapitalize="words"
      />

      <TextInput
        placeholder="Прізвище"
        style={styles.input}
        value={form.surname}
        onChangeText={(val) => handleChange('surname', val)}
        autoCapitalize="words"
      />

      <TextInput
        placeholder="Номер телефону"
        style={styles.input}
        value={form.phone}
        onChangeText={(val) => handleChange('phone', val)}
        keyboardType="phone-pad"
      />

      <TextInput
        placeholder="Пароль"
        style={styles.input}
        value={form.password}
        onChangeText={(val) => handleChange('password', val)}
        secureTextEntry
      />

      <TextInput
        placeholder="Повторіть пароль"
        style={styles.input}
        value={form.repeatPassword}
        onChangeText={(val) => handleChange('repeatPassword', val)}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Зареєструватися</Text>
        )}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});