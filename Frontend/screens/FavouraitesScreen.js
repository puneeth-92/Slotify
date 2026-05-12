import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    SafeAreaView
  } from 'react-native';
  
  import { Ionicons } from '@expo/vector-icons';
  import MainLayout from '../components/MainLayout';
  import { SALONS } from '../data/salons';
  
  export default function FavoritesScreen({ navigation }) {
  
    // demo favorites
    const favorites = [SALONS[0], SALONS[2], SALONS[4]];
  
    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
        onPress={() =>
          navigation.navigate('Salon', { salon: item })
        }
      >
  
        <Image source={{ uri: item.image }} style={styles.image} />
  
        {/* HEART */}
        <TouchableOpacity style={styles.heart}>
          <Ionicons name="heart" size={18} color="#EF4444" />
        </TouchableOpacity>
  
        {/* CONTENT */}
        <View style={styles.body}>
  
          <Text style={styles.name}>
            {item.name}
          </Text>
  
          <View style={styles.row}>
            <Text style={styles.price}>
              ₹{item.price}
            </Text>
  
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={12} color="#F59E0B" />
              <Text style={styles.rating}>
                {item.rating}
              </Text>
            </View>
          </View>
  
        </View>
  
      </TouchableOpacity>
    );
  
    return (
      <MainLayout navigation={navigation}>
        <SafeAreaView style={styles.container}>
  
          {/* HEADER */}
          <Text style={styles.header}>
            Favorites
          </Text>
  
          {/* EMPTY STATE */}
          {favorites.length === 0 ? (
            <View style={styles.empty}>
  
              <Ionicons
                name="heart-outline"
                size={70}
                color="#C4B5FD"
              />
  
              <Text style={styles.emptyTitle}>
                No Favorites Yet
              </Text>
  
              <Text style={styles.emptyText}>
                Save salons you like to access them quickly.
              </Text>
  
            </View>
          ) : (
            <FlatList
              data={favorites}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 120 }}
            />
          )}
  
        </SafeAreaView>
      </MainLayout>
    );
  }
  
  const styles = StyleSheet.create({
  
    container: {
      flex: 1,
      backgroundColor: '#F3F0FF',
      paddingHorizontal: 20,
    },
  
    header: {
      fontSize: 24,
      fontWeight: '900',
      marginTop: 10,
      marginBottom: 20,
    },
  
    /* CARD */
    card: {
      backgroundColor: '#fff',
      borderRadius: 18,
      marginBottom: 18,
      overflow: 'hidden',
    },
  
    image: {
      width: '100%',
      height: 170,
    },
  
    heart: {
      position: 'absolute',
      top: 12,
      right: 12,
      backgroundColor: '#fff',
      width: 34,
      height: 34,
      borderRadius: 17,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    body: {
      padding: 14,
    },
  
    name: {
      fontSize: 16,
      fontWeight: '700',
      marginBottom: 8,
    },
  
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  
    price: {
      fontSize: 14,
      fontWeight: '700',
      color: '#7C3AED',
    },
  
    ratingRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  
    rating: {
      marginLeft: 4,
      fontSize: 13,
      color: '#555',
    },
  
    /* EMPTY */
    empty: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 100,
    },
  
    emptyTitle: {
      fontSize: 18,
      fontWeight: '700',
      marginTop: 15,
    },
  
    emptyText: {
      fontSize: 13,
      color: '#777',
      marginTop: 5,
      textAlign: 'center',
      paddingHorizontal: 40,
    },
  
  });