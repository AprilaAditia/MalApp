import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const AnimeCard = ({ anime, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={anime.image} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {anime.title}
        </Text>
        <Text style={styles.rating}>⭐ {anime.rating}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 6,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  info: {
    padding: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  rating: {
    fontSize: 12,
    color: '#555',
  },
});

export default AnimeCard;
