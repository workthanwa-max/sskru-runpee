import axios, { AxiosRequestConfig } from 'axios';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: process.env['NEXT_PUBLIC_REST_API_ENDPOINT'],
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong'),
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  auth: {
    login: '/auth/login',
    profile: '/auth/profile',
  },
  faculty: {
    list: '/faculties',
    details: (id: string) => `/faculties/${id}`,
    children: (id: string) => `/faculties/${id}/children`,
  },
  personnel: {
    list: '/personnel',
    details: (id: string) => `/personnel/${id}`,
    roles: (id: string) => `/personnel/${id}/roles`,
    uploadUrl: '/personnel/upload-url',
  },
  student: {
    list: '/students',
    details: (id: string) => `/students/${id}`,
  },
  permission: {
    list: '/permissions',
    details: (id: string) => `/permissions/${id}`,
    systems: (id: string) => `/permissions/${id}/systems`,
  },
  role: {
    list: '/roles',
    details: (id: string) => `/roles/${id}`,
    permissions: (id: string) => `/roles/${id}/permissions`,
  },
  system: {
    list: '/systems',
    details: (id: string) => `/systems/${id}`,
  },
  curriculum: {
    activities: '/curriculum/activities',
    reviewing: '/curriculum/activities/reviewing',
    details: (id: string) => `/curriculum/activities/${id}`,
    submit: (id: string) => `/curriculum/activities/${id}/submit`,
    implementations: (id: string) => `/curriculum/activities/${id}/implementations`,
    implementation: (id: string) => `/curriculum/activities/${id}/implementation`,
    general: (id: string) => `/curriculum/activities/${id}/general`,
    curriculum: (id: string) => `/curriculum/activities/${id}/curriculum`,
    budget: (id: string) => `/curriculum/activities/${id}/budget`,
    uploadUrl: '/curriculum/upload-url',
  },
};
