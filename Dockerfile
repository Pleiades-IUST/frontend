# For build: sudo docker build -t parvin_front .
# For run: sudo docker run --rm -itd --name parvin_front -p 80:80 parvin_front:latest

# Build stage
FROM node:alpine AS builder

# Set working directory
WORKDIR /app

# Copy package manifests and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

# Production stage: serve with Nginx
FROM nginx:alpine

# Copy built artifacts from build stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
