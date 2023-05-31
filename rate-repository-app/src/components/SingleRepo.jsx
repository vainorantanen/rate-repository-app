import React from 'react';
import { View, Image, StyleSheet, Pressable, Linking, FlatList } from 'react-native';
import theme from '../theme';
import Text from './Text';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { SINGLE_REPO } from '../graphql/queries';
import { format } from 'date-fns';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        borderRadius: 4,
        justifyContent: 'center',
      },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  name: {
    fontWeight: theme.fontWeights.bold,
  },
  basicInfo: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 20,
  },
  language: {
    backgroundColor: 'blue',
    color: 'white',
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 5,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  numberInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    alignItems: 'center',
  },
  infoText: {
    fontWeight: 'bold',
  },
  picNInfo: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 0,
    alignItems: 'center',
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    marginTop: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  reviewRow: {
    display: 'flex',
    flexDirection: 'row',
    
  },
  reviewCol: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 5,
    padding: 5,
    
  },
  ratingBorder: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: 'blue',
    borderRadius: 20,
    textAlign: 'center',
    padding: 10,
    color: 'blue'
  }
});

const formatCount = (count) => {
    if (count >= 1000) {
      const formattedCount = (count / 1000).toFixed(1);
      return `${formattedCount}k`;
    }
    return count.toString();
  };


const RepositoryInfo = ({repository}) => {
  const item = repository
  const openInGitHub = () => {
    Linking.openURL(item.url);
  };

return (
  <View testID="SingleRepositoryItem" style={styles.container}>
    <View style={styles.picNInfo}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: item.ownerAvatarUrl,
        }}
      />
      <View style={styles.basicInfo}>
        <Text style={styles.name}>{item.fullName}</Text>
        <Text>{item.description}</Text>
        {item.language && <Text style={styles.language}>{item.language}</Text>}
      </View>
    </View>
    <View style={styles.numberInfo}>
      <View style={{alignItems: 'center'}}>
          <Text>{formatCount(item.stargazersCount)}</Text>
        <Text style={styles.infoText}>Stars</Text>
      </View>
      <View style={{alignItems: 'center'}}>
          <Text>{formatCount(item.forksCount)}</Text>
        <Text style={styles.infoText}>Forks</Text>
      </View>
      <View style={{alignItems: 'center'}}>
          <Text>{item.reviewCount}</Text>
        <Text style={styles.infoText}>Reviews</Text>
      </View>
      <View style={{alignItems: 'center'}}>
          <Text>{item.ratingAverage}</Text>
        <Text style={styles.infoText}>Rating</Text>
      </View>
    </View>
    <Pressable onPress={openInGitHub} style={styles.button}>
        <Text style={styles.buttonText}>Open in GitHub</Text>
      </Pressable>
  </View>
)
}
  

const ReviewItem = ({ review }) => {
  const formattedDate = format(new Date(review.createdAt), 'dd.MM.yyyy');

  // Single review item
  return (
    <View style={styles.container}>
      <View style={styles.reviewRow}>
        <View>
          <Text style={styles.ratingBorder}>{review.rating}</Text>
        </View>
        <View style={styles.reviewCol}>
          <Text style={{fontWeight: 'bold'}}>{review.user.username}</Text>
          <Text>{formattedDate}</Text>
          <Text>{review.text}</Text>
        </View>
      </View>
      
    </View>
  )
};

const SingleRepo = () => {
    const {id} = useParams()
    
    const { data, loading, error } = useQuery(SINGLE_REPO,
      { variables: { id }, 
      fetchPolicy: 'cache-and-network'
    });

    if (loading) {
        // Handle loading state
        return (
          <View>
            <Text>Loading user data form cloud</Text>
          </View>
        );
      }
    
      if (error) {
        // Handle error state
        console.error('Error fetching user data:', error);
        return null;
      }

    
    console.log("data singless", data)  
    const repository = data.repository
    const reviews = data.repository.reviews
    ? data.repository.reviews.edges.map((edge) => edge.node)
    : [];
    return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      // ...
    />
  );
  
};

export default SingleRepo