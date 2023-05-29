import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import theme from '../theme';
import Text from './Text';

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
  
});

const formatCount = (count) => {
    if (count >= 1000) {
      const formattedCount = (count / 1000).toFixed(1);
      return `${formattedCount}k`;
    }
    return count.toString();
  };

const RepositoryItem = ({ item }) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
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
    </View>
  );
};

export default RepositoryItem;
