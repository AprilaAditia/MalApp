import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { getFavoriteAnime } from '../utils/storage';
import { useNavigation } from '@react-navigation/native';

const FavoriteScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const loadFavorites = async () => {
      const data = await getFavoriteAnime();
      setFavorites(data || []); // fallback kalau null
    };

    const unsubscribe = navigation.addListener('focus', loadFavorites);
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Detail', { anime: item })}
    >
      <Image
        source={item.image}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.genre}>
          {Array.isArray(item.genre) ? item.genre.join(', ') : item.genre}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>❤️ Favorite Anime</Text>

      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>Belum ada anime favorit 😢</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: 90,
    height: 120,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  infoContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  genre: {
    fontSize: 14,
    color: '#555',
  },
});

export default FavoriteScreen;
