# Use an official Node runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) 
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Build the application
RUN npm run build

# Your app binds to port 3000 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "run", "start:prod"]
