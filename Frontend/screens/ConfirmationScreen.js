import { View, Text } from 'react-native';

export default function ConfirmationScreen({ route }) {
  const { slot } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      <Text style={{ fontSize: 24 }}> Booking Confirmed</Text>
      <Text style={{ marginTop: 10 }}>Time: {slot}</Text>

    </View>
  );
}