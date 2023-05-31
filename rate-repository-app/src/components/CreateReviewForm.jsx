import React from 'react'
import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import Text from './Text'
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

const validationSchema = yup.object().shape({
    owner: yup.string().required('Repository owner name is required'),
    reponame: yup.string().required('Repository name is required'),
    rating: yup
    .number()
    .required('Rating is required')
    .min(0, 'Rating must be greater than or equal to 0')
    .max(100, 'Rating must be less than or equal to 100'),
  });
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 5,
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 1,
      shadowRadius: 5,
      elevation: 5,
    },
    button: {
      backgroundColor: '#0366d6',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 5,
      marginTop: 10,
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    inputContainer: {
        marginBottom: 10,
        padding: 10,
        
      },
      reviewInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
      }
  });

const CreateReviewForm = ({navigate}) => {
    const [ createReview ] = useMutation(CREATE_REVIEW)

    const onSubmit = async (values) => {
      try {
        console.log("VALS", values)
        console.log("Submit form!")
        const {owner, reponame, rating, review} = values;
        console.log({owner, reponame, rating, review})
        const ratingNum = Number(rating) 
        const res = await createReview({
            variables: {
                review: {
                  ownerName: owner,
                  repositoryName: reponame,
                  rating: ratingNum,
                  text: review
            }
      }})
      console.log("RES", res)
        navigate(`/${res.data.createReview.repositoryId}`)
        
      } catch (error) {
        throw new Error(error.message);
      }
    }

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ owner: '', reponame: '', rating: '', review: '' }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <>
            <View style={styles.inputContainer}>
              <FormikTextInput name="owner" placeholder="Repository owner name" />
            </View>
            <View style={styles.inputContainer}>
              <FormikTextInput name="reponame" placeholder="Repository name" />
            </View>
            <View style={styles.inputContainer}>
              <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
            </View>
            <View style={styles.inputContainer}>
              <Text>Review</Text>
              <FormikTextInput
                name="review"
                multiline
                placeholder="Write a review"
                style={styles.reviewInput}
              />
            </View>
            <Pressable onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Create a review</Text>
            </Pressable>
          </>
        )}
      </Formik>
    </View>
  )
}

export default CreateReviewForm