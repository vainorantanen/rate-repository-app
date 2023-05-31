import React from 'react'
import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import Text from './Text'
import { useMutation } from '@apollo/client';
import { SIGN_UP } from '../graphql/mutations';

import useSignIn from '../hooks/useSignIn';

const validationSchema = yup.object().shape({
    username: yup.string()
        .required('Username is required')
        .min(5, 'Username must be at least 5 characters')
        .max(30, 'Username must be at most 30 characters'),
    password: yup.string()
        .required('Password is required')
        .min(5, 'Password must be at least 5 characters')
        .max(50, 'Password must be at most 50 characters'),
    repassword: yup.string().oneOf([yup.ref('password')],'Password does not match').required('Confirmation is Required')
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

const SignUpForm = ({navigate}) => {
    const [ createUser ] = useMutation(SIGN_UP)
    const [signIn] = useSignIn();

    const onSubmit = async (values) => {
        const { username, password } = values;

      try {
        console.log("VALS", values)
        console.log("Submit new user!")
        const res = await createUser({
            variables: {
                user: {
                    password,
                    username
                  }
      }})
      console.log("RES", res)
      await signIn({ username, password });
      navigate('/')
      } catch (error) {
        throw new Error(error.message);
      }
    }

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <>
            <FormikTextInput name="username" placeholder="Username" />
            <FormikTextInput name="password" placeholder="Password" secureTextEntry />
            <FormikTextInput name="repassword" placeholder="Password confirmation" secureTextEntry />
            <Pressable onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Sign up</Text>
            </Pressable>
          </>
        )}
      </Formik>
    </View>
  )
}

export default SignUpForm