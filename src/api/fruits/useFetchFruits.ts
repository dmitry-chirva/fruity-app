import { useState } from 'react';

import fruitsApiService from './fruits.service';
import { useFruitSlice } from '../../store/fruit.slice.ts';

export default function useFetchFruits() {
  // TODO use SWR instead of this hook
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const setFruits = useFruitSlice((state) => state.setFruits);

  const fetchFruits = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fruitsApiService.getFruits();
      setFruits(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Error fetching fruits:', err);
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { fetchFruits, loading, error };
}
