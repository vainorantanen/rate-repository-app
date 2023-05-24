import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    flexDirection: 'row', // Add flexDirection to arrange tabs side by side
    justifyContent: 'space-around', // Add justifyContent to evenly distribute tabs
  },
  // ...
  tabText: {
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    fontSize: 20,
    marginRight: 8,
    marginLeft: 8,
  },
  scrollViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  }
});

const AppBarTab = ({ text, to }) => {
  return (
    <Pressable onPress={() => {}}>
      <Link to={to}>
        <View>
          <Text style={styles.tabText}>{text}</Text>
        </View>
      </Link>
    </Pressable>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollViewContainer}>
        <AppBarTab text="Repositories" to="/" />
        <AppBarTab text="Sign in" to="/signin" />
      </ScrollView>
    </View>
  );
};
  
  export default AppBar;