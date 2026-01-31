import api from "./api";

const authService = {
  login: async (username, password) => {
    try {
      const response = await api.post("auth/login/", { username, password });
      const { user, tokens } = response.data;

      // Store tokens and user info
      localStorage.setItem("access_token", tokens.access);
      localStorage.setItem("refresh_token", tokens.refresh);
      localStorage.setItem("user", JSON.stringify(user));

      return { success: true, user };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Login failed. Please try again.",
      };
    }
  },

  logout: async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        await api.post("auth/logout/", { refresh_token: refreshToken });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear local storage regardless of API call result
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post("auth/register/", userData);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || "Registration failed. Please try again.",
      };
    }
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("access_token");
  },

  isAdmin: () => {
    const user = authService.getCurrentUser();
    return user?.is_staff || false;
  },

  getProfile: async () => {
    try {
      const response = await api.get("auth/profile/");
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || "Failed to fetch profile",
      };
    }
  },
};

export default authService;
