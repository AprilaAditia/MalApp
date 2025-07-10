import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const AnimeCard = ({ anime, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={anime.image} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{anime.title}</Text>
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
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  info: {
    padding: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  rating: {
    fontSize: 12,
    color: '#777',
  },
});

export default AnimeCard;
