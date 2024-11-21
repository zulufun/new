import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";
import { getUsers, createUser, updateUser, deleteUser } from "../../utils/services/useraddService";

// Định nghĩa kiểu cho người dùng
interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
}

// Định nghĩa kiểu cho giá trị form
interface UserFormValues {
  name: string;
  email: string;
  password?: string;
}

const UserAdd: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm<UserFormValues>();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      if (response && response.data) {
        setUsers(response.data);
      }
    } catch (error) {
      message.error("Failed to fetch users.");
    }
  };
  const handleCreateOrUpdate = async (values: UserFormValues) => {
    try {
      const userPayload: any = {
        name: values.name,
        email: values.email,
      };
  
      if (values.password) {
        userPayload.password = values.password;
        userPayload.confirmPassword = values.password;
      }
  
      let response;
      if (editingUser) {
        // Chế độ chỉnh sửa
        response = await updateUser(editingUser._id, userPayload);
      } else {
        // Chế độ thêm mới
        response = await createUser(userPayload);
      }
  
      // Kiểm tra `status` từ phản hồi của backend
      if (response.status === "ERR") {
        // Nếu phản hồi lỗi, hiển thị thông báo lỗi từ BE
        message.error(response.message);
      } else if (response.status === "SUCCESS" || response.status === "OK") {
        // Nếu thành công, hiển thị thông báo thành công
        message.success(editingUser ? "User updated successfully!" : "User created successfully!");
        setIsModalVisible(false);
        fetchUsers();
      }
    } catch (error: any) {
      // Bắt lỗi hệ thống khác
      message.error("An error occurred while saving the user.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteUser(id);
      if (response.status === "OK") {
        message.success("User deleted successfully!");
        fetchUsers();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error("Failed to delete user.");
    }
  };

  const openModal = (user: User | null = null) => {
    setEditingUser(user);
    form.resetFields();
    if (user) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
      });
    }
    setIsModalVisible(true);
  };

  return (
    <>
      <Button type="primary" onClick={() => openModal()}>
        Add User
      </Button>
      <Table
        dataSource={users}
        columns={[
          { title: "Username", dataIndex: "name", key: "name" },
          { title: "Email", dataIndex: "email", key: "email" },
          {
            title: "Actions",
            render: (_, user: User) => (
              <>
                <Button onClick={() => openModal(user)}>Edit</Button>
                <Button danger onClick={() => handleDelete(user._id)}>
                  Delete
                </Button>
              </>
            ),
          },
        ]}
        rowKey="_id"
      />
      <Modal
        title={editingUser ? "Edit User" : "Add User"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleCreateOrUpdate}>
          <Form.Item
            name="name"
            label="Username"
            rules={[{ required: true, message: "Please input the username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input the email!" }]}
          >
            <Input />
          </Form.Item>

          {!editingUser && (
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "Please input the password!" }]}
            >
              <Input.Password />
            </Form.Item>
          )}

          {editingUser && (
            <Form.Item
              name="password"
              label="New Password"
              rules={[{ message: "Leave empty if you don't want to change the password" }]}
            >
              <Input.Password placeholder="Leave blank if unchanged" />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default UserAdd;
