import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { useAuthStore } from '../store/AuthStore';

export const useLostAndFound = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  const token = useAuthStore((state) => state.authUser?.token);

  useEffect(() => {
    fetchItems();
  }, [token]);

 const fetchItems = async () => {
  if (!token) return;

  setLoading(true);
  try {
    const res = await fetch('http://127.0.0.1:5000/api/lost-and-found', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error);
    }
    setItems(data.items || []); // ✅ defensive check
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: error.message,
    });
  } finally {
    setLoading(false);
  }
};

  const createItem = async (itemData) => {
    if (!token) return;

    try {
      const res = await fetch('http://127.0.0.1:5000/api/lost-and-found', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(itemData),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setItems(prev => [...prev, data]);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Item posted successfully',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
      });
    }
  };

  const updateItem = async (itemId, itemData) => {
    if (!token) return;

    try {
      const res = await fetch(`http://127.0.0.1:5000/api/lost-and-found/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(itemData),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setItems(prev => prev.map(item => item._id === itemId ? data : item));
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
      });
    }
  };

  const deleteItem = async (itemId) => {
    if (!token) return;

    try {
      const res = await fetch(`http://127.0.0.1:5000/api/lost-and-found/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error('Failed to delete item');
      }
      setItems(prev => prev.filter(item => item._id !== itemId));
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Item deleted successfully',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
      });
    }
  };

  return { 
    loading, 
    items, 
    fetchItems, 
    createItem, 
    updateItem, 
    deleteItem 
  };
};

