import { View, Text, StyleSheet } from 'react-native';

export default function Modal() {
  return (
    <View style={styles.container}>
      <View style={styles.modalBox}>
        <Text style={styles.title}>Modal Screen</Text>
        <Text style={styles.subtitle}>This is a simple modal layout</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // overlay effect
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalBox: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',     // iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,            // Android shadow
  },

  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#222',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});
