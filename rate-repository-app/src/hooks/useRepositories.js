import { useQuery } from '@apollo/client';
import { View, Text } from 'react-native';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
    const { data, loading, error } = useQuery(GET_REPOSITORIES, {
      fetchPolicy: 'cache-and-network',
    });

    if (loading) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }
  
    if (error) {
      return (
        <View>
          <Text>
            Error: {error.message}
          </Text>
        </View>
      );
    }
    

  return { repositories: data.repositories, loading }
};

export default useRepositories;