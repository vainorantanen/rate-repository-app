import { View, StyleSheet, Text, Pressable } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
  },
  // ...
  tabText: {
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    marginLeft: 20,
    fontSize: 20
  },
});

const AppBarTab = ({ text }) => {
    return (
      <Pressable onPress={() => {}}>
        <Text style={styles.tabText}>{text}</Text>
      </Pressable>
    );
  };
  
  const AppBar = () => {
    return (
      <View style={styles.container}>
        <AppBarTab text="Repositories" />
        {/* Add more AppBarTabs here if needed */}
      </View>
    );
  };
  
  export default AppBar;