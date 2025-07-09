import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const DetailScreen = ({ route }) => {
  const { anime } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={typeof anime.image === 'string' ? { uri: anime.image } : anime.image}
        style={styles.image}
      />

      <Text style={styles.title}>{anime.title}</Text>

      <Text style={styles.rating}>⭐ {anime.rating}</Text>

      <View style={styles.infoGrid}>
        <View style={styles.infoCard}>
          <Text style={styles.cardLabel}>Genre</Text>
          <Text style={styles.cardValue}>{anime.genre}</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.cardLabel}>Type</Text>
          <Text style={styles.cardValue}>{anime.type}</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.cardLabel}>Episodes</Text>
          <Text style={styles.cardValue}>{anime.episodes}</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.cardLabel}>Season</Text>
          <Text style={styles.cardValue}>{anime.season}</Text>
        </View>
      </View>

      <Text style={styles.synopsisTitle}>Synopsis</Text>
      <Text style={styles.synopsis}>{anime.synopsis}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fafafa',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1b1b1b',
    marginBottom: 4,
  },
  rating: {
    fontSize: 14,
    color: '#ff9500',
    marginBottom: 16,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  cardLabel: {
    fontSize: 12,
    color: '#777',
  },
  cardValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  synopsisTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
  },
  synopsis: {
    fontSize: 14,
    color: '#444',
    lineHeight: 22,
  },
});

export default DetailScreen;
