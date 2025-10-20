import axios from 'axios';

// 创建 Axios 实例
const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8123',
  timeout: 60000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// 全局请求拦截器
request.interceptors.request.use(
  function (config) {
    // 从localStorage获取token并添加到请求头
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // 处理请求错误
    console.error('请求错误:', error);
    return Promise.reject(error);
  }
);

// 全局响应拦截器
request.interceptors.response.use(
  function (response) {
    const { data } = response;
    
    // 处理自定义的错误码
    if (data && data.code !== 0 && data.code !== 200) {
      // 显示错误消息（使用浏览器原生alert，避免引入额外依赖）
      if (typeof window !== 'undefined' && data.message) {
        alert(data.message);
      }
      return Promise.reject(new Error(data.message || '请求失败'));
    }
    
    // 未登录处理
    if (data && data.code === 40100 && typeof window !== 'undefined') {
      // 不是获取用户信息的请求，并且用户目前不是已经在用户登录页面，则跳转到登录页面
      if (
        !response.config.url?.includes('user/get/login') &&
        !window.location.pathname.includes('/user/login')
      ) {
        alert('请先登录');
        window.location.href = `/user/login?redirect=${encodeURIComponent(window.location.href)}`;
      }
    }
    
    return response;
  },
  function (error) {
    // 处理HTTP错误
    if (typeof window !== 'undefined') {
      const errorMessage = error.response?.data?.message || error.message || '网络请求失败';
      alert(errorMessage);
    }
    
    // 401错误特殊处理
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      if (!window.location.pathname.includes('/user/login')) {
        window.location.href = `/user/login?redirect=${encodeURIComponent(window.location.href)}`;
      }
    }
    
    return Promise.reject(error);
  }
);

export default request;
