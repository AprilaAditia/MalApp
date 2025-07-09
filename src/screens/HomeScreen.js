import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AnimeCard from '../components/AnimeCard';
import animeData from '../data/animeData';

const HomeScreen = () => {
  const [season, setSeason] = useState('Summer');
  const [search, setSearch] = useState('');
  const navigation = useNavigation();

  // Filter berdasarkan season & pencarian
  const filteredData = animeData
    .filter(anime => anime.season === season)
    .filter(anime =>
      anime.title.toLowerCase().includes(search.toLowerCase())
    );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Detail', { anime: item })}
      activeOpacity={0.85}
    >
      <AnimeCard anime={item} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Anime {season} 2025</Text>

      {/* Search Input */}
      <TextInput
        placeholder="Search anime..."
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />

      {/* Season Tabs */}
      <View style={styles.seasonTabs}>
        {['Spring', 'Summer', 'Fall', 'Winter'].map(s => (
          <TouchableOpacity
            key={s}
            style={[styles.seasonButton, season === s && styles.seasonButtonActive]}
            onPress={() => setSeason(s)}
          >
            <Text style={[styles.seasonText, season === s && styles.seasonTextActive]}>
              {s}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Anime Grid */}
      {filteredData.length === 0 ? (
        <Text style={styles.emptyText}>No anime found for "{season}"</Text>
      ) : (
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.title}-${index}`}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.row}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingTop: 16,
    paddingHorizontal: 12,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#111',
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 14,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  seasonTabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  seasonButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: '#ddd',
  },
  seasonButtonActive: {
    backgroundColor: '#007bff',
  },
  seasonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#444',
  },
  seasonTextActive: {
    color: '#fff',
  },
  listContent: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#777',
  },
});

export default HomeScreen;
