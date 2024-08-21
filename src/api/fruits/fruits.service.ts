const apiConfig = {
    baseUrl: "/api"
};

const fruitsApiService = {
    getFruits: async () => {
        try {
            const response = await fetch(`${apiConfig.baseUrl}/fruit/all`);
            return await response.json();
        } catch (error) {
            console.error("Error fetching fruits:", error);
            throw error;
        }
    }
};

export default fruitsApiService;
