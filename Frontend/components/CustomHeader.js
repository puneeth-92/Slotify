import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CustomHeader({ title, navigation, showBack = true }) {
  return (
    <View style={styles.container}>

      {/* Back Button */}
      {showBack ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 24 }} />
      )}

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Right placeholder (for balance) */}
      <View style={{ width: 24 }} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
  },
});