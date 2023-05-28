import { useMutation, useApolloClient } from "@apollo/client";
import { SIGN_IN } from "../graphql/mutations";
//import { useContext } from 'react';
import { useAuthStorage } from '../hooks/useAuthStorage';
//import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignIn = () => {
    const [mutate, result] = useMutation(SIGN_IN);
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();

    const signIn = async ({ username, password }) => {
        try {
          const res = await mutate({
            variables: {
              credentials: {
                username,
                password,
              },
            },
          });

          //console.log("TOKEN", res.data.authenticate.accessToken)
          await authStorage.setAccessToken(res.data.authenticate.accessToken);
          await apolloClient.resetStore();

          return res;
        } catch (error) {
          throw new Error(error.message);
        }
      };
    
    return [signIn, result];
  };

export default useSignIn