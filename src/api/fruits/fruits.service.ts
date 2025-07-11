const apiConfig = {
  baseUrl: '/api',
};

const fruitsApiService = {
  getFruits: async () => {
    const response = await fetch(`${apiConfig.baseUrl}/fruit/all`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  },
};

export default fruitsApiService;
