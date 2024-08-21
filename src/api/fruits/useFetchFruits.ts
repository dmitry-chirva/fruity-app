import { useState} from 'react';

import fruitsApiService from './fruits.service';
import { useFruitsStore } from '../../store/fruitsStore';

export default function useFetchFruits() {
    // TODO use SWR instead of this hook
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const setFruits = useFruitsStore((state) => state.setFruits);

    const fetchFruits = async () => {
        setLoading(true);
        try {
            const data = await fruitsApiService.getFruits();
            setFruits(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { fetchFruits, loading, error };
}
