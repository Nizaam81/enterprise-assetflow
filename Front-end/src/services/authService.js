import api from './axios.js';

export const authService = {
  /**
   * @param {Object} userData - The user registration data
   * @returns {Promise} Axios response promise
   */
  signup: async (userData) => {
    try {
      const response = await api.post('/employ-signup', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};
