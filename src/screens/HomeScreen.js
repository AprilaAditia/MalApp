import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AnimeCard from '../components/AnimeCard';
import animeList from '../data/animeData';

const seasons = ['All', 'Spring', 'Summer', 'Fall', 'Winter'];

const HomeScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('All');
  const [filteredList, setFilteredList] = useState(animeList);

  const navigation = useNavigation();

  useEffect(() => {
    applyFilters();
  }, [searchText, selectedGenre, selectedSeason]);

  const applyFilters = () => {
    const lowerSearch = searchText.toLowerCase();
    const filtered = animeList.filter((anime) => {
      const matchTitle = anime.title.toLowerCase().includes(lowerSearch);

      const genreArray = Array.isArray(anime.genre)
        ? anime.genre
        : anime.genre?.split(',') || [];

      const matchGenre = selectedGenre
        ? genreArray.map((g) => g.trim().toLowerCase()).includes(selectedGenre.toLowerCase())
        : true;

      const matchSeason =
        selectedSeason !== 'All'
          ? anime.season?.toLowerCase() === selectedSeason.toLowerCase()
          : true;

      return matchTitle && matchGenre && matchSeason;
    });

    setFilteredList(filtered);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search anime..."
        value={searchText}
        onChangeText={setSearchText}
        style={styles.searchInput}
      />

      <View style={styles.filterRow}>
        {seasons.map((season) => (
          <TouchableOpacity
            key={season}
            style={[
              styles.seasonBtn,
              selectedSeason === season && styles.selected,
            ]}
            onPress={() => setSelectedSeason(season)}
          >
            <Text>{season}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredList}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={({ item }) => (
          <AnimeCard
            anime={item}
            onPress={() => navigation.navigate('Detail', { anime: item })}
          />
        )}
        horizontal={false}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f2f2f2' },
  searchInput: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  seasonBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#eee',
    borderRadius: 6,
    margin: 4,
  },
  selected: {
    backgroundColor: '#cce5ff',
  },
});

export default HomeScreen;
