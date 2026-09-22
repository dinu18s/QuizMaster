// Storage and state persistence service mirroring Base44 entity APIs locally

const STORAGE_KEYS = {
  USER: 'quizmaster_user',
  ATTEMPTS: 'quizmaster_attempts',
};

const DEFAULT_USER = {
  id: 'usr_quizmaster',
  name: 'Alex Morgan',
  email: 'alex.morgan@quizmaster.io',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
  role: 'user'
};

export const authService = {
  me: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USER);
      if (stored) return JSON.parse(stored);
      // Auto initialize default user for frictionless immediate start
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(DEFAULT_USER));
      return DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  },
  login: (userData = DEFAULT_USER) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
    return userData;
  },
  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
  },
  isAuthenticated: () => {
    return !!localStorage.getItem(STORAGE_KEYS.USER);
  }
};

export const attemptService = {
  getAll: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ATTEMPTS);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },
  getById: (id) => {
    try {
      const attempts = attemptService.getAll();
      return attempts.find(a => a.id === id) || null;
    } catch {
      return null;
    }
  },
  create: (data) => {
    try {
      const attempts = attemptService.getAll();
      const newAttempt = {
        id: 'att_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
        ...data,
        completed_at: data.completed_at || new Date().toISOString()
      };
      attempts.unshift(newAttempt);
      localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(attempts));
      return newAttempt;
    } catch (e) {
      console.error('Error saving attempt:', e);
      return { id: 'fallback_' + Date.now(), ...data };
    }
  }
};
