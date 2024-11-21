# Dockerfile cho Frontend
FROM node:20-alpine as build

# Tạo thư mục làm việc
WORKDIR /app

# Sao chép file package.json và package-lock.json
COPY package.json package-lock.json ./

# Cài đặt các package
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Xây dựng ứng dụng React
RUN npm run build

# Sử dụng Nginx để phục vụ ứng dụng
FROM nginx:alpine

# Sao chép các file đã xây dựng từ bước trước vào thư mục phục vụ của Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expose cổng 80
EXPOSE 80
