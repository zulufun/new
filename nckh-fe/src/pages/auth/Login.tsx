import React from "react";
import { Form, Button, Input, Row, Col } from "antd";
import { message } from "antd";
import { authService } from "../../utils/services/authServices";
import { useDispatch } from "react-redux";
import useAction from "../../redux/useActions";
import { useNavigate } from "react-router-dom";
import { RouterLinks } from "../../const/RouterLinks";
import loginBack from "../../assets/login-v2.svg";

const Login: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate(); // Xóa khai báo thừa
  const [form] = Form.useForm(); // Xóa khai báo thừa

  const onFinish = async (value: any) => {
    // Giả lập thông tin đăng nhập đúng
    localStorage.setItem("username", "ducphuc");
    localStorage.setItem("name", "Đức Phúc");
    localStorage.setItem("token", "ok");

    // Điều hướng tới trang chủ
    navigate(RouterLinks.HOME_PAGE);

    // Nếu cần điều hướng tới trang khác, bạn có thể thay đổi như sau:
    // navigate(RouterLinks.KIEM_TRA_WEBSITE);
  };

  return (
    <div className="login">
      {contextHolder}
      <Row>
        <Col span={16}>
          <img
            src={loginBack}
            className="login-background"
            alt="htht"
            style={{ width: "90%" }}
          />
        </Col>
        <Col
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          span={8}
        >
          <div
            style={{
              fontSize: "25px",
              marginBottom: "1px",
              fontWeight: "600",
              fontFamily: "cursive",
            }}
          >
            Nghiên cứu khoa học 2025
          </div>
          <div style={{ margin: "30px", width: "75%" }}>
            <Form onFinish={onFinish} form={form} layout="vertical">
              <Form.Item
                style={{ marginBottom: "7px" }}
                label="Tên đăng nhập"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Tên đăng nhập không được bỏ trống",
                  },
                  {
                    validator: async (_, value) => {
                      if (value) {
                        const regex = /^\s*$/;
                        if (regex.test(value)) {
                          throw new Error("Tên bài không hợp lệ !");
                        }
                      }
                    },
                  },
                ]}
              >
                <Input placeholder="Tên đăng nhập" />
              </Form.Item>
              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Mật khẩu không được bỏ trống",
                  },
                ]}
              >
                <Input.Password placeholder="Mật khẩu" />
              </Form.Item>

              <Form.Item>
                <Button
                  style={{ width: "100%" }}
                  htmlType="submit"
                  type="primary"
                >
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
