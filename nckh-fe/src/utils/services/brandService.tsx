// utils/services/brandService.tsx
import createApiServices from "../createApiServices";

const api = createApiServices();

// Lấy danh sách tất cả các thương hiệu với phân trang, lọc và sắp xếp
const getAllBrands = (page: number = 1, pageSize: number = 100, filterName: string = '', sortOrder: 'asc' | 'desc' = 'asc') => {
  return api.makeAuthRequest({
    url: `/api/brand/get-all?page=${page}&pageSize=${pageSize}&filterName=${filterName}&sortOrder=${sortOrder}`,
    method: "GET",
  });
};

// Lấy danh sách tất cả thương hiệu không phân trang
const getAll = () => {
  return api.makeAuthRequest({
    url: "/api/brand/get-all-brand",
    method: "GET",
  });
};

// Lấy thông tin chi tiết của một thương hiệu theo ID
const getBrandById = (id: string) => {
  return api.makeAuthRequest({
    url: `/api/brand/get-brand/${id}`,
    method: "GET",
  });
};

// Tạo thương hiệu mới
const createBrand = (data: { name: string }) => {
  return api.makeAuthRequest({
    url: "/api/brand/create-brand",
    method: "POST",
    data,
  });
};

// Cập nhật thương hiệu
const updateBrand = (id: string, data: { name: string }) => {
  return api.makeAuthRequest({
    url: `/api/brand/update-brand/${id}`,
    method: "PUT",
    data,
  });
};

// Xóa thương hiệu theo ID
const deleteBrand = (id: string) => {
  return api.makeAuthRequest({
    url: `/api/brand/delete-brand/${id}`,
    method: "DELETE",
  });
};

export { getAllBrands, getAll, getBrandById, createBrand, updateBrand, deleteBrand };
