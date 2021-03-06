FROM node:latest

# Create app directory
WORKDIR /app

# Install app depencies
COPY package*.json ./

RUN yarn install && yarn cache clean --force

# In production 
# RUN npm  ci --only=production

# Bundle app source
COPY . .

# Binding to PORT 5000
EXPOSE 5000

CMD ["yarn","run","dev"]