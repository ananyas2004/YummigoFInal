# Use the official Node.js image as the base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 4000

# Command to run the app
CMD ["npx", "nodemon", "server.js"]