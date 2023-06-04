import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useState, useRef } from 'react';
import {Picker} from '@react-native-picker/picker';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    height: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, navigate }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <View style={styles.container}>
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      //ListHeaderComponent={SelectionComponent}
      renderItem={({ item }) => (
        <RepositoryItem item={item} navigate={navigate} />
      )}
      keyExtractor={(item) => item.id}
    />
    </View>
  );
};

const SelectionComponent = ({order, setOrder}) => {
  const pickerRef = useRef();

  return (
    <View style={styles.pickerContainer}>
      <Picker
        ref={pickerRef}
        selectedValue={order}
        onValueChange={(itemValue, itemIndex) => setOrder(itemValue)}
      >
        <Picker.Item label="Latest repository" value="latest" />
        <Picker.Item label="Highest rated repository" value="highest" />
        <Picker.Item label="Lowest rated repository" value="lowest" />
      </Picker>
    </View>
  );
};

const RepositoryList = ({ navigate }) => {
  const [order, setOrder] = useState('latest');
  // ominaisuus orderin valinnalle

  const { repositories } = useRepositories({ order });

  return (
    <View style={styles.container}>
      <SelectionComponent order={order} setOrder={setOrder}/>
      <RepositoryListContainer
        repositories={repositories}
        navigate={navigate}
      />
    </View>
  );
};

export default RepositoryList;
