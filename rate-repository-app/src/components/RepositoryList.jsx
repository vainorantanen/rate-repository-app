import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useState, useRef } from 'react';
import {Picker} from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

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
      //ListHeaderComponent={SearchBar}
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

const SearchBar = ({searchQuery, setSearchQuery}) => {
  const onChangeSearch = query => setSearchQuery(query);

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );
};

const RepositoryList = ({ navigate }) => {
  const [order, setOrder] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedValue] = useDebounce(searchQuery, 500);
  // ominaisuus orderin valinnalle

  const { repositories } = useRepositories({ order, debouncedValue });

  return (
    <View style={styles.container}>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      <SelectionComponent order={order} setOrder={setOrder}/>
      <RepositoryListContainer
        repositories={repositories}
        navigate={navigate}
      />
    </View>
  );
};

export default RepositoryList;
