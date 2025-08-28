const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method to get auth token
  getAuthToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token');
    }
    return null;
  }

  // Helper method to set auth tokens
  setAuthTokens(accessToken, refreshToken) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
    }
  }

  // Helper method to clear auth tokens
  clearAuthTokens() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  }

  // Helper method to make API requests
  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = this.getAuthToken();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Adding Authorization header for:', endpoint);
    } else {
      console.log('No token found for:', endpoint);
    }

    console.log('Request config:', { url, headers: config.headers });

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        console.error('API request failed:', { status: response.status, data });
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Health Check
  async healthCheck() {
    return this.makeRequest('/health');
  }

  // Authentication APIs
  async register(userData) {
    const response = await this.makeRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (response.success && response.access_token) {
      this.setAuthTokens(response.access_token, response.refresh_token);
    }

    return response;
  }

  async login(credentials) {
    const response = await this.makeRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.success && response.access_token) {
      this.setAuthTokens(response.access_token, response.refresh_token);
    }

    return response;
  }

  async logout() {
    try {
      await this.makeRequest('/auth/logout', {
        method: 'POST',
      });
    } finally {
      this.clearAuthTokens();
    }
  }

  async verifyToken() {
    return this.makeRequest('/auth/verify');
  }

  async refreshToken() {
    const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null;
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await this.makeRequest('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (response.success && response.access_token) {
      this.setAuthTokens(response.access_token, response.refresh_token);
    }

    return response;
  }

  // Category APIs
  async getCategories() {
    return this.makeRequest('/categories');
  }

  async getMainCategories() {
    return this.makeRequest('/categories/main');
  }

  async getSubCategories(mainCategorySlug) {
    return this.makeRequest(`/categories/sub/${mainCategorySlug}`);
  }

  async getCategoriesForAdmin() {
    return this.makeRequest('/categories/admin');
  }

  async createCategory(categoryData) {
    return this.makeRequest('/categories', {
      method: 'POST',
      body: JSON.stringify(categoryData),
    });
  }

  async updateCategory(categoryId, categoryData) {
    return this.makeRequest(`/categories/${categoryId}`, {
      method: 'PUT',
      body: JSON.stringify(categoryData),
    });
  }

  async deleteCategory(categoryId) {
    return this.makeRequest(`/categories/${categoryId}`, {
      method: 'DELETE',
    });
  }

  // Product APIs
  async getProducts(filters = {}) {
    const queryParams = new URLSearchParams();
    
    if (filters.category_id) queryParams.append('category_id', filters.category_id);
    if (filters.is_active !== undefined) queryParams.append('is_active', filters.is_active);
    if (filters.limit) queryParams.append('limit', filters.limit);
    if (filters.skip) queryParams.append('skip', filters.skip);

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/products?${queryString}` : '/products';
    
    console.log('getProducts called with filters:', filters);
    console.log('getProducts endpoint:', endpoint);
    
    return this.makeRequest(endpoint);
  }

  async getProductsByMainCategory(mainCategorySlug, filters = {}) {
    console.log('getProductsByMainCategory called with mainCategorySlug:', mainCategorySlug, 'filters:', filters);
    
    if (!mainCategorySlug) {
      console.error('getProductsByMainCategory called with undefined mainCategorySlug');
      throw new Error('mainCategorySlug is required');
    }
    
    const queryParams = new URLSearchParams();
    
    if (filters.sub_category_id) queryParams.append('sub_category_id', filters.sub_category_id);
    if (filters.is_active !== undefined) queryParams.append('is_active', filters.is_active);
    if (filters.limit) queryParams.append('limit', filters.limit);
    if (filters.skip) queryParams.append('skip', filters.skip);

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/products/category/${mainCategorySlug}?${queryString}` : `/products/category/${mainCategorySlug}`;
    
    console.log('getProductsByMainCategory endpoint:', endpoint);
    
    return this.makeRequest(endpoint);
  }

  async getProduct(productId) {
    return this.makeRequest(`/products/${productId}`);
  }

  async createProduct(productData) {
    return this.makeRequest('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  async updateProduct(productId, productData) {
    return this.makeRequest(`/products/${productId}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  }

  async deleteProduct(productId) {
    return this.makeRequest(`/products/${productId}`, {
      method: 'DELETE',
    });
  }

  // RFQ APIs
  async submitRFQ(rfqData) {
    return this.makeRequest('/rfq', {
      method: 'POST',
      body: JSON.stringify(rfqData),
    });
  }

  async getRFQRequests(filters = {}) {
    const queryParams = new URLSearchParams();
    
    if (filters.status) queryParams.append('status', filters.status);
    if (filters.limit) queryParams.append('limit', filters.limit);
    if (filters.skip) queryParams.append('skip', filters.skip);

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/rfq?${queryString}` : '/rfq';
    
    return this.makeRequest(endpoint);
  }

  async updateRFQStatus(rfqId, statusData) {
    return this.makeRequest(`/rfq/${rfqId}`, {
      method: 'PUT',
      body: JSON.stringify(statusData),
    });
  }
}

// Create a singleton instance
const apiService = new ApiService();

export default apiService;
