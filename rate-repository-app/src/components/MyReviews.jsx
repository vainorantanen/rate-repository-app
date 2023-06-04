import React from 'react'
import { View } from 'react-native'
import Text from './Text'
import { USER_REVIEWS } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native';

import { format } from 'date-fns';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        borderRadius: 4,
        justifyContent: 'center',
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

const MyReviews = () => {
    const { loading, error, data } = useQuery(USER_REVIEWS, {
        fetchPolicy: 'cache-and-network'
    });

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


      console.log("data singless", data)  
    const reviews = data.me && data.me.reviews
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];

    return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      // ...
    />
  );
}

export default MyReviews