import * as Contacts from 'expo-contacts';
import { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function Setting() {
  const navigation = useNavigation();
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getContacts();
  }, []);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      setContacts(data);
    }
  };

  // 🔎 Optimized filtering using useMemo
  const filteredContacts = useMemo(() => {
    if (!search.trim()) return contacts;

    const lowerSearch = search.toLowerCase();

    return contacts.filter((contact) => {
      const nameMatch =
        contact.name?.toLowerCase().includes(lowerSearch);

      const phoneMatch =
        contact.phoneNumbers?.some((phone) =>
          phone?.number?.replace(/\s/g, '').includes(lowerSearch) || false
        );

      return nameMatch || phoneMatch;
    });
  }, [search, contacts]);

  const renderItem = ({ item }: { item: Contacts.Contact }) => {
    const initials = item.name
      ? item.name
          .split(' ')
          .map((word) => word[0])
          .join('')
          .toUpperCase()
      : 'NA';

    return (
      <TouchableOpacity style={styles.card}
       onPress={() =>
        // navigation.navigate('ContactDetails' as never, { contact: item } as never)
        console.log(item)
      }>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{item.name || 'No Name'}</Text>

          {item.phoneNumbers?.length ? (
            item.phoneNumbers.map((phone, index) => (
              <Text key={index} style={styles.phone}>
                {phone.label}: {phone.number}
              </Text>
            ))
          ) : (
            <Text style={styles.noPhone}>No Phone Number</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contacts ({filteredContacts.length})</Text>

      {/* 🔍 Search Bar */}
      <TextInput
        placeholder="Search by name or phone..."
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
        placeholderTextColor="#999"
      />

      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No contacts found</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 15,
  },
  searchInput: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    width: width - 32,
    alignSelf: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  phone: {
    fontSize: 14,
    color: '#555',
  },
  noPhone: {
    fontSize: 14,
    color: 'gray',
    fontStyle: 'italic',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#888',
  },
});