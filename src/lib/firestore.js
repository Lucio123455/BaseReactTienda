
import { db } from './firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, setDoc, getDoc } from 'firebase/firestore';

export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return products;
  } catch (error) {
    console.error("Error getting documents: ", error);
    throw error;
  }
};

export const getProduct = async (productId) => {
  try {
    const docRef = doc(db, 'products', productId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting document: ", error);
    throw error;
  }
};

export const addProduct = async (productData) => {
  try {
    const docRef = await addDoc(collection(db, 'products'), productData);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

export const updateProduct = async (productId, productData) => {
  try {
    const productRef = doc(db, 'products', productId);
    await updateDoc(productRef, productData);
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    await deleteDoc(doc(db, 'products', productId));
  } catch (error) {
    console.error("Error deleting document: ", error);
    throw error;
  }
};

export const toggleFavorite = async (userId, productId, productData) => {
  const favoriteRef = doc(db, 'users', userId, 'favorites', productId);
  try {
    const docSnap = await getDoc(favoriteRef);
    if (docSnap.exists()) {
      await deleteDoc(favoriteRef);
      return false;
    } else {
      const { name, imageUrl, price, category } = productData;
      await setDoc(favoriteRef, { name, imageUrl, price, category });
      return true;
    }
  } catch (error) {
    console.error("Error toggling favorite: ", error);
    throw error;
  }
};

export const getFavorites = async (userId) => {
  try {
    const favoritesCol = collection(db, 'users', userId, 'favorites');
    const querySnapshot = await getDocs(favoritesCol);
    const favorites = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return favorites;
  } catch (error) {
    console.error("Error getting favorites: ", error);
    return [];
  }
};

export const getFavoriteIds = async (userId) => {
  try {
    const favoritesCol = collection(db, 'users', userId, 'favorites');
    const querySnapshot = await getDocs(favoritesCol);
    return querySnapshot.docs.map(doc => doc.id);
  } catch (error) {
    console.error("Error getting favorite IDs: ", error);
    return [];
  }
};

export const addUser = async (userId, userData) => {
  try {
    await setDoc(doc(db, "users", userId), userData);
  } catch (error) {
    console.error("Error adding user: ", error);
    throw error;
  }
};

export const getUser = async (userId) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such user document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting user: ", error);
    throw error;
  }
};

// BLOG

export const addBlog = async (blogData) => {
  const blogRef = collection(db, 'blogs');
  const docRef = await addDoc(blogRef, blogData);
  return docRef.id;
};

export const updateBlog = async (id, blogData) => {
  const blogDoc = doc(db, 'blogs', id);
  await updateDoc(blogDoc, blogData);
};

export const deleteBlog = async (id) => {
  const blogDoc = doc(db, 'blogs', id);
  await deleteDoc(blogDoc);
};