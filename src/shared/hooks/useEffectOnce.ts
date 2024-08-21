import { useEffect, useRef } from 'react';

const useEffectOnce = (effect) => {
    const hasRun = useRef(false);

    useEffect(() => {
        if (!hasRun.current) {
            effect();
            hasRun.current = true;
        }
    }, [effect]);
};

export default useEffectOnce;
