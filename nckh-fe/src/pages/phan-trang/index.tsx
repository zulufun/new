import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, message, Pagination } from "antd";
import { getAllBrands, createBrand, updateBrand, deleteBrand } from "../../utils/services/brandService";

interface Brand {
  _id: string;
  name: string;
}

interface BrandFormValues {
  name: string;
}

const BrandManagement: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [form] = Form.useForm<BrandFormValues>();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalBrands, setTotalBrands] = useState(0);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    fetchBrands(currentPage, pageSize, sortOrder);
  }, [currentPage, pageSize, sortOrder]);

  // Fetch brand data with pagination and sort order
  const fetchBrands = async (page: number, pageSize: number, sortOrder: 'asc' | 'desc' = 'asc') => {
    try {
      const response = await getAllBrands(page, pageSize, '', sortOrder);
      if (response && response.data) {
        setBrands(response.data);
        setTotalBrands(response.total); // Tổng số lượng brands
      }
    } catch (error) {
      message.error("Failed to fetch brands.");
    }
  };

  // Create or update brand
  const handleCreateOrUpdate = async (values: BrandFormValues) => {
    try {
      let response;
      if (editingBrand) {
        response = await updateBrand(editingBrand._id, { name: values.name });
      } else {
        response = await createBrand({ name: values.name });
      }

      if (response.status === "ERR") {
        message.error(response.message);
      } else {
        message.success(editingBrand ? "Brand updated successfully!" : "Brand created successfully!");
        setIsModalVisible(false);
        fetchBrands(currentPage, pageSize, sortOrder); // Tải lại dữ liệu sau khi tạo hoặc cập nhật thành công
      }
    } catch (error) {
      message.error("An error occurred while saving the brand.");
    }
  };

  // Delete brand
  const handleDelete = async (id: string) => {
    try {
      const response = await deleteBrand(id);
      if (response.status === "OK") {
        message.success("Brand deleted successfully!");

        // Tính toán lại tổng số trang
        const newTotal = totalBrands - 1;
        const maxPage = Math.ceil(newTotal / pageSize);

        // Nếu trang hiện tại vượt quá số trang tối đa sau khi xóa, giảm trang hiện tại
        if (currentPage > maxPage) {
          setCurrentPage(maxPage);
          fetchBrands(maxPage, pageSize, sortOrder);
        } else {
          fetchBrands(currentPage, pageSize, sortOrder);
        }
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error("Failed to delete brand.");
    }
  };

  // Open modal for creating or editing a brand
  const openModal = (brand: Brand | null = null) => {
    setEditingBrand(brand);
    form.resetFields();
    if (brand) {
      form.setFieldsValue({
        name: brand.name,
      });
    }
    setIsModalVisible(true);
  };

  return (
    <>
      <Button type="primary" onClick={() => openModal()}>
        Add Brand
      </Button>

      <Table
        dataSource={brands}
        columns={[
          {
            title: "Brand Name",
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirections: ['ascend', 'descend'],
            onHeaderCell: () => ({
              onClick: () => {
                const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc'; // Toggle sort order
                setSortOrder(newSortOrder); // Update sort order state
                fetchBrands(currentPage, pageSize, newSortOrder); // Fetch with new sort order
              }
            })
          },
          {
            title: "Actions",
            render: (_, brand: Brand) => (
              <>
                <Button onClick={() => openModal(brand)}>Edit</Button>
                <Button danger onClick={() => handleDelete(brand._id)}>Delete</Button>
              </>
            ),
          },
        ]}
        rowKey="_id"
        pagination={false} // Tắt phân trang mặc định của bảng
      />

      <Pagination
        style={{ marginTop: "20px" }} // Điều chỉnh style để phân trang hiển thị dưới bảng
        current={currentPage}
        pageSize={pageSize}
        total={totalBrands}
        onChange={(page, size) => {
          setCurrentPage(page);
          setPageSize(size || pageSize);
          fetchBrands(page, size || pageSize, sortOrder);
        }}
      />

      <Modal
        title={editingBrand ? "Edit Brand" : "Add Brand"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleCreateOrUpdate}>
          <Form.Item
            name="name"
            label="Brand Name"
            rules={[{ required: true, message: "Please input the brand name!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default BrandManagement;
