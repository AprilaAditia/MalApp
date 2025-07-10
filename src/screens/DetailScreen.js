import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Animated,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { saveViewedAnime, saveFavoriteAnime } from '../utils/storage';
import { useNavigation } from '@react-navigation/native';

const DetailScreen = ({ route }) => {
  const { anime } = route.params;
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    saveViewedAnime(anime);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleAddToFavorites = async () => {
    await saveFavoriteAnime(anime);
    setIsFavorited(true);
    Alert.alert('Success', 'Added to favorites!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Tombol kembali */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      {/* Gambar */}
      <Animated.Image
        source={anime.image}
        style={[styles.image, { opacity: fadeAnim }]}
        resizeMode="cover"
      />

      <Text style={styles.title}>{anime.title}</Text>

      <Text style={styles.info}>
        Genre:{' '}
        {Array.isArray(anime.genre) ? anime.genre.join(', ') : anime.genre || 'N/A'}
      </Text>

      <Text style={styles.info}>Season: {anime.season || 'N/A'}</Text>

      <Text style={styles.info}>
        Description: {anime.synopsis || 'N/A'}
      </Text>

      {/* Tombol favorite */}
      <TouchableOpacity
        style={[styles.button, isFavorited && styles.buttonDisabled]}
        onPress={handleAddToFavorites}
        disabled={isFavorited}
      >
        <Text style={styles.buttonText}>
          {isFavorited ? 'Favorited ❤️' : 'Add to Favorite'}
        </Text>
      </TouchableOpacity>

      {/* Navigasi ke episode (placeholder) */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#4a90e2' }]}
        onPress={() => Alert.alert('Coming Soon', 'Daftar episode akan segera tersedia!')}
      >
        <Text style={styles.buttonText}>View Episodes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  backText: {
    fontSize: 16,
    color: '#007bff',
  },
  image: {
    width: 220,
    height: 320,
    borderRadius: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 22,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 15,
  },
  buttonDisabled: {
    backgroundColor: '#aaa',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default DetailScreen;
