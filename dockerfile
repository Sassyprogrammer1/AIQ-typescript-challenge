# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Create the src/data-files folder
RUN mkdir -p src/data-files

# Build the Nest application
RUN yarn build

# Run the script to generate JSON files
RUN node dist/utils/parse-excel.js

# Run tests
RUN yarn test

# Expose the port the app runs on
EXPOSE 3018

# Command to run the app
CMD ["yarn", "development"]
