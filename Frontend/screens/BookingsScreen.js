import { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainLayout from '../components/MainLayout';
import { SALONS } from '../data/salons';
import { Modal } from 'react-native';


const BOOKINGS = [
  {
    id: '1',
    salonId: '1',
    service: 'Haircut',
    date: '20 Apr 2026',
    time: '4:30 PM',
    status: 'upcoming',
  },
  {
    id: '2',
    salonId: '2',
    service: 'Facial',
    date: '15 Apr 2026',
    time: '2:00 PM',
    status: 'completed',
  },
  {
    id: '3',
    salonId: '4',
    service: 'Beard Trim',
    date: '10 Apr 2026',
    time: '6:00 PM',
    status: 'cancelled',
  },
];

export default function BookingsScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showCancelPopup, setShowCancelPopup] = useState(false);

  const getSalon = (id) => SALONS.find(s => s.id === id);

  const filtered = BOOKINGS.filter(b => b.status === activeTab);

  const renderItem = ({ item }) => {
    const salon = getSalon(item.salonId);
    if (!salon) return null;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('Salon', { salon, booking: item })
        }
      >
        <View style={styles.rowBetween}>
          <Text style={styles.salon}>{salon.name}</Text>
          <Text style={styles.status(item.status)}>
            {item.status.toUpperCase()}
          </Text>
        </View>

        <Text style={styles.service}>{item.service}</Text>

        <View style={styles.metaRow}>
          <Ionicons name="calendar-outline" size={14} />
          <Text style={styles.metaText}>{item.date}</Text>

          <Ionicons name="time-outline" size={14} style={{ marginLeft: 10 }} />
          <Text style={styles.metaText}>{item.time}</Text>
        </View>

        {item.status === 'completed' && (
          <TouchableOpacity
            style={styles.bookAgainBtn}
            onPress={(e) => {
              e.stopPropagation();
              navigation.navigate('Salon', { salon });
            }}
          >
            <Text style={styles.bookAgainText}>Book Again</Text>
          </TouchableOpacity>
        )}
        {item.status === 'upcoming' && (
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={(e) => {
              e.stopPropagation();
              setShowCancelPopup(true);
            }}
          >
            <Text style={styles.cancelText}>Cancel Booking</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <MainLayout navigation={navigation}>
      <SafeAreaView style={styles.container}>

        <Text style={styles.header}>My Bookings</Text>

        <View style={styles.tabs}>
          {['upcoming', 'completed', 'cancelled'].map(tab => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[
                styles.tab,
                activeTab === tab && styles.activeTab
              ]}
            >
              <Text style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText
              ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 120 }}
        />
        <Modal transparent visible={showCancelPopup} animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <Ionicons name="checkmark-circle" size={70} color="#7C3AED" />

              <Text style={styles.modalText}>
                Cancellation Requested
              </Text>

              <TouchableOpacity
                style={{ marginTop: 10 }}
                onPress={() => setShowCancelPopup(false)}
              >
                <Text style={{ color: '#7C3AED', fontWeight: '700' }}>
                  OK
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </SafeAreaView>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F0FF', padding: 20 },

  header: {
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 20,
  },

  tabs: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  tab: {
    marginRight: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#EDEBFF',
  },

  activeTab: {
    backgroundColor: '#7C3AED',
  },

  tabText: { fontSize: 12 },

  activeTabText: { color: '#fff' },

  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  salon: { fontWeight: '700' },

  service: {
    color: '#666',
    marginTop: 5,
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  metaText: { marginLeft: 5 },

  status: (s) => ({
    color: s === 'completed' ? 'green' : s === 'cancelled' ? 'red' : '#7C3AED'
  }),

  bookAgainBtn: {
    marginTop: 10,
    backgroundColor: '#7C3AED',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
  },

  bookAgainText: {
    color: '#fff',
    fontWeight: '600',
  },
  cancelBtn: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'red',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  
  cancelText: {
    color: 'red',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  modalBox: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    width: '70%',
  },
  
  modalText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '700',
  },
});