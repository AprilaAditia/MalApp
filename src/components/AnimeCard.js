import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const AnimeCard = ({ anime }) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageWrapper}>
        <Image
          source={typeof anime.image === 'string' ? { uri: anime.image } : anime.image}
          style={styles.image}
        />
        <View style={styles.ratingTag}>
          <Text style={styles.ratingText}>⭐ {anime.rating}</Text>
        </View>
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {anime.title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 160,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
  },
  ratingTag: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: '#000000b3',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ratingText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    padding: 8,
    fontSize: 13,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
  },
});

export default AnimeCard;
