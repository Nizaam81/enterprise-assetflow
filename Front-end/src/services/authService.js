import api from './axios.js';

export const authService = {
  /**
   * Register a new employee
   * @param {Object} userData - The user registration data
   * @returns {Promise} Axios response promise
   */
  signup: async (userData) => {
    try {
      const response = await api.post('/employ-signup', userData);
      return response.data;
    } catch (error) {
      // You can add custom error formatting here if needed
      throw error.response?.data || error;
    }
  },
  
  // You would add other auth calls here later, e.g.:
  // login: async (credentials) => { ... }
};
