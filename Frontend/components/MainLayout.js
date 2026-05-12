import { View, StyleSheet } from 'react-native';
import BottomNav from './BottomNav';

export default function MainLayout({ children, navigation }) {
  return (
    <View style={styles.container}>

      {/* Screen Content */}
      <View style={styles.content}>
        {children}
      </View>

      {/* Bottom Navbar */}
      <BottomNav navigation={navigation} />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F3F0FF',
  },

  content: {
    flex: 1,
  },

});