import { makeAutoObservable } from 'mobx';
import AuthService from '../services/Auth/AuthService';

class UserStore {
  user = null;
  isLoading = false;
  userType = null;
  userId = null;

  constructor() {
    makeAutoObservable(this);
    this.loadUserFromLocalStorage(); // Загрузка данных пользователя из локального хранилища при создании экземпляра класса
  }

  setUserId(id) {
    this.userId = id;
    localStorage.setItem('userId', id);
  }

  setUserType(type) {
    this.userType = type;
    localStorage.setItem('userType', type);
  }

  setUser(user) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  setLoading(isLoading) {
    this.isLoading = isLoading;
  }

  async login(login, password) {
    this.setLoading(true);
    try {
      const response = await AuthService.login(login, password);
      this.setUserId(response.data.id);
      this.setUserType(response.data.idRole);
      this.setUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    } finally {
      this.setLoading(false);
    }
  }

  async register(user) {
    this.setLoading(true);
    try {
      const response = await AuthService.register(user);
      if (response && response.id) {
        this.setUserId(response.id);
        this.setUserType(2);
        this.setUser(response);
        console.log(response);
      } else {
        throw new Error('Invalid registration response: missing user id');
      }
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    } finally {
      this.setLoading(false);
    }
  }

  // Метод для загрузки данных пользователя из локального хранилища
  loadUserFromLocalStorage() {
    const storedUserId = localStorage.getItem('userId');
    const storedUserType = localStorage.getItem('userType');
    const storedUser = localStorage.getItem('user');

    if (storedUserId) {
      this.userId = storedUserId;
    }

    if (storedUserType) {
      this.userType = parseInt(storedUserType, 10);
    }

    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  }
}

export default UserStore;
