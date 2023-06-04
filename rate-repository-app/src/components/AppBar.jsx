import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import Text from './Text';
import { useQuery, useApolloClient } from '@apollo/client';
import { ME } from '../graphql/queries';
import { useAuthStorage } from '../hooks/useAuthStorage';

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



const AppBarTab = ({ text, to, onPress }) => {
  
  if (text == "Sign out") {
    return (
      <View>
    <Pressable onPress={onPress}>
        <View>
          <Text style={styles.tabText}>{text}</Text>
        </View>
    </Pressable>
    </View>
    )
  }

  return (
    <View>
    <Pressable onPress={onPress}>
      <Link to={to}>
        <View>
          <Text style={styles.tabText}>{text}</Text>
        </View>
      </Link>
    </Pressable>
    </View>
  );
};


const AppBar = ({navigate}) => {
  const { loading, error, data } = useQuery(ME);
  const authStorage = useAuthStorage(); // Access the authStorage instance
  const apolloClient = useApolloClient();

  if (loading) {
    // Handle loading state
    return (
      <View>
        <Text>Loading user data</Text>
      </View>
    );
  }

  if (error) {
    // Handle error state
    console.error('Error fetching user data:', error);
    return null;
  }

  const user = data && data.me;

  const handleSignOut = async () => {
    await authStorage.removeAccessToken(); // Remove the access token from storage first
    await apolloClient.resetStore(); // Reset the Apollo Client's store

    // Redirect to the sign-in page or any desired location
    // You can use the useNavigate hook or any other navigation mechanism here
    navigate('/')
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollViewContainer}>
        <AppBarTab text="Repositories" to="/" />
        {user && <AppBarTab text="Create a review" to="/create"/>}
        {user && <AppBarTab text="My reviews" to="/reviews"/>}
        {user ? (
          <AppBarTab text="Sign out" onPress={handleSignOut}/>
        ) : (
          <AppBarTab text="Sign in" to="/signin" onPress={() => {}}/>
        )}
        {!user && <AppBarTab text="Sign up" to="/signup"/>}
      </ScrollView>
    </View>
  );
};
  
  export default AppBar;