# Sử dụng image Node.js chính thức từ Docker Hub
FROM node:20-alpine

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt các phụ thuộc
RUN npm install --productison

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Expose port 8000 cho ứng dụng
EXPOSE 8000

# Lệnh khởi động ứng dụng
CMD ["npm", "start"]
# Thay "index.js" bằng file chính của bạn nếu cần
