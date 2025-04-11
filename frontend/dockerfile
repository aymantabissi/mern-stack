# Frontend Dockerfile
FROM node:18

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all files
COPY . .

# Build the frontend
RUN npm run build

# Serve using a simple static server
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "dist"]
