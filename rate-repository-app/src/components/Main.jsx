import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate, useNavigate } from 'react-router-native';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';
import SignIn from './SignIn';
import SingleRepo from './SingleRepo';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  const navigate = useNavigate();

  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList navigate={navigate}/>} exact />
        <Route path="/signin" element={<SignIn navigate={navigate}/>} />
        <Route
          path="/:id"
          element={<SingleRepo />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;