import * as Contacts from 'expo-contacts'
import { useEffect, useMemo, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native'

import { useAppTheme } from '@/src/core/providers/theme-provider'

const { width } = Dimensions.get('window')

export default function ContactsScreen() {
  const { colors } = useAppTheme()
  const [contacts, setContacts] = useState<Contacts.Contact[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    getContacts()
  }, [])

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync()

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      })

      setContacts(data)
    }
  }

  const filteredContacts = useMemo(() => {
    if (!search.trim()) return contacts

    const lowerSearch = search.toLowerCase()

    return contacts.filter((contact) => {
      const nameMatch = contact.name?.toLowerCase().includes(lowerSearch)

      const phoneMatch =
        contact.phoneNumbers?.some(
          (phone) => phone?.number?.replace(/\s/g, '').includes(lowerSearch) || false
        ) ?? false

      return nameMatch || phoneMatch
    })
  }, [search, contacts])

  const styles = createStyles(colors)

  const renderItem = ({ item }: { item: Contacts.Contact }) => {
    const initials = item.name
      ? item.name
          .split(' ')
          .map((word) => word[0])
          .join('')
          .toUpperCase()
      : 'NA'

    return (
      <TouchableOpacity style={styles.card} onPress={() => console.log(item)}>
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
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contacts ({filteredContacts.length})</Text>

      <TextInput
        placeholder="Search by name or phone..."
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
        placeholderTextColor={colors.textMuted}
      />

      <FlatList
        data={filteredContacts}
        keyExtractor={(item, index) => {
          const contactId = (item as { id?: string }).id
          return contactId ?? item.name ?? String(index)
        }}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.emptyText}>No contacts found</Text>}
      />
    </View>
  )
}

function createStyles(colors: {
  background: string
  card: string
  text: string
  textMuted: string
  border: string
  blue: string
}) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent',
      paddingTop: 50,
      paddingHorizontal: 16,
    },
    title: {
      fontSize: 26,
      fontWeight: '700',
      marginBottom: 15,
      color: colors.text,
    },
    searchInput: {
      backgroundColor: colors.card,
      color: colors.text,
      paddingHorizontal: 15,
      paddingVertical: 12,
      borderRadius: 12,
      marginBottom: 20,
      fontSize: 16,
      borderWidth: 1,
      borderColor: colors.border,

      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    card: {
      flexDirection: 'row',
      backgroundColor: colors.card,
      padding: 16,
      borderRadius: 16,
      marginBottom: 12,
      width: width - 32,
      alignSelf: 'center',
      borderWidth: 1,
      borderColor: colors.border,

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
      backgroundColor: colors.blue,
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
      color: colors.text,
    },
    phone: {
      fontSize: 14,
      color: colors.textMuted,
    },
    noPhone: {
      fontSize: 14,
      color: colors.textMuted,
      fontStyle: 'italic',
    },
    emptyText: {
      textAlign: 'center',
      marginTop: 40,
      fontSize: 16,
      color: colors.textMuted,
    },
  })
}
