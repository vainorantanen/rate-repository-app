import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, navigate }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

    return (
      <FlatList
      data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        // other props
        renderItem={({item}) => <RepositoryItem item={item} navigate={navigate} />}
          keyExtractor={item => item.id}
      />
      
    );
};

const RepositoryList = ({navigate}) => {
  const { repositories } = useRepositories();

  return <RepositoryListContainer repositories={repositories} navigate={navigate}/>;
};

export default RepositoryList;