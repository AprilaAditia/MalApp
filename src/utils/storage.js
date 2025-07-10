import AsyncStorage from '@react-native-async-storage/async-storage';

// Menyimpan anime yang telah dilihat
export const saveViewedAnime = async (anime) => {
  try {
    const existing = await AsyncStorage.getItem('history');
    let history = existing ? JSON.parse(existing) : [];

    // Cegah duplikat berdasarkan id
    if (!history.find(item => item.id === anime.id)) {
      history.unshift(anime); // Tambah ke awal
      await AsyncStorage.setItem('history', JSON.stringify(history));
    }
  } catch (e) {
    console.error('Gagal menyimpan history:', e);
  }
};

// Mengambil list anime yang sudah dilihat
export const getViewedAnime = async () => {
  try {
    const history = await AsyncStorage.getItem('history');
    return history ? JSON.parse(history) : [];
  } catch (e) {
    return [];
  }
};

// ✅ Menyimpan ke daftar favorit
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

// ✅ Mengambil daftar favorit
export const getFavoriteAnime = async () => {
  try {
    const favorites = await AsyncStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  } catch (e) {
    return [];
  }
};
