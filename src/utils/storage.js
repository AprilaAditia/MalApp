import AsyncStorage from '@react-native-async-storage/async-storage';

// --- History ---
export const saveViewedAnime = async (anime) => {
  try {
    const existing = await AsyncStorage.getItem('history');
    let history = existing ? JSON.parse(existing) : [];

    if (!history.find(item => item.id === anime.id)) {
      history.unshift(anime);
      await AsyncStorage.setItem('history', JSON.stringify(history));
    }
  } catch (e) {
    console.error('Gagal menyimpan history:', e);
  }
};

export const getViewedAnime = async () => {
  try {
    const history = await AsyncStorage.getItem('history');
    return history ? JSON.parse(history) : [];
  } catch (e) {
    return [];
  }
};

// --- Favorites ---
export const saveFavoriteAnime = async (anime) => {
  try {
    const existing = await AsyncStorage.getItem('favorites');
    let favorites = existing ? JSON.parse(existing) : [];

    if (!favorites.find(item => item.id === anime.id)) {
      favorites.unshift(anime);
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    }
  } catch (e) {
    console.error('Gagal menyimpan favorit:', e);
  }
};

export const getFavoriteAnime = async () => {
  try {
    const favorites = await AsyncStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  } catch (e) {
    return [];
  }
};

export const removeFavoriteAnime = async (animeId) => {
  try {
    const existing = await AsyncStorage.getItem('favorites');
    let favorites = existing ? JSON.parse(existing) : [];

    favorites = favorites.filter(item => item.id !== animeId);
    await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
  } catch (e) {
    console.error('Gagal menghapus favorit:', e);
  }
};

export const clearFavorites = async () => {
  try {
    await AsyncStorage.removeItem('favorites');
  } catch (e) {
    console.error('Gagal menghapus semua favorit:', e);
  }
};

export const isFavoriteAnime = async (animeId) => {
  try {
    const existing = await AsyncStorage.getItem('favorites');
    let favorites = existing ? JSON.parse(existing) : [];

    return favorites.some(item => item.id === animeId);
  } catch (e) {
    return false;
  }
};
