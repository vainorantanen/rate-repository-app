import React from 'react'
import { Pressable, View, Alert } from 'react-native'
import Text from './Text'
import { USER_REVIEWS } from '../graphql/queries';
import { useMutation, useQuery } from '@apollo/client';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native';

import { format } from 'date-fns';
import { DELETE_REVIEW } from '../graphql/mutations';

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
  },
  buttonReview: {
    backgroundColor: 'blue',
    padding: 10,
    marginTop: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonDelete: {
    backgroundColor: 'red',
    padding: 10,
    marginTop: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});


const ReviewItem = ({ review, navigate, handleDelete }) => {
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
        <View style={styles.buttonRow}>
          <Pressable onPress={() => {
            navigate(`/${review.repositoryId}`)
          }} style={styles.buttonReview}>
          <Text style={styles.buttonText}>View repository</Text>
          </Pressable>
          <Pressable onPress={() => {
            // alert
            Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'Delete', onPress: () => handleDelete(review.id)},
            ]);
          }} style={styles.buttonDelete}>
          <Text style={styles.buttonText}>Delete review</Text>
          </Pressable>
        </View>
      </View>
    )
  };

const MyReviews = ({navigate}) => {
    const { loading, error, data, refetch } = useQuery(USER_REVIEWS, {
        fetchPolicy: 'cache-and-network'
    });

    const [deleteReview] = useMutation(DELETE_REVIEW)

    const handleDelete = async (reviewId) => {
      console.log('Delete pressed')
      await deleteReview({
      variables: {deleteReviewId: reviewId}      
      })
      refetch()
    }

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
      renderItem={({ item }) => <ReviewItem review={item} navigate={navigate} handleDelete={handleDelete}/>}
      keyExtractor={({ id }) => id}
      // ...
    />
  );
}

export default MyReviews