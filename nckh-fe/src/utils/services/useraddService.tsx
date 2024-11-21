// utils/services/useraddService.tsx
import createApiServices from "../createApiServices";

const api = createApiServices();

// Lấy danh sách người dùng
const getUsers = () => {
  return api.makeAuthRequest({
    url: "/api/user/get-all",
    method: "GET",
  });
};

// Tạo người dùng mới
const createUser = (data: { name: string; email: string; password: string; confirmPassword: string; }) => {
  return api.makeAuthRequest({
      url: "/api/user/sign-up",
      method: "POST",
      data, // Sử dụng 'body' thay vì 'data'
  });
};

// Đăng nhập người dùng
const loginUser = (data: { email: string; password: string }) => {
  return api.makeAuthRequest({
    url: "/api/user/sign-in",
    method: "POST",
    data,
  });
};

// Cập nhật thông tin người dùng
const updateUser = (id: string, data: { name: string; email: string; isAdmin?: boolean }) => {
  return api.makeAuthRequest({
    url: `/api/user/update-user/${id}`,
    method: "PUT",
    data,
  });
};

// Xóa người dùng
const deleteUser = (id: string) => {
  return api.makeAuthRequest({
    url: `/api/user/delete-user/${id}`,
    method: "DELETE",
  });
};

// Lấy thông tin người dùng theo id
const getUserById = (id: string) => {
  return api.makeAuthRequest({
    url: `/api/user/get-user/${id}`,
    method: "GET",
  });
};

// Refresh token
const refreshToken = (data: { refreshToken: string }) => {
  return api.makeAuthRequest({
    url: "/api/users/refresh-token",
    method: "POST",
    data,
  });
};

export { getUsers, createUser, loginUser, updateUser, deleteUser, getUserById, refreshToken };
