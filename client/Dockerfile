# Phase 1
# Build base image and give it alias because we need to use it later
FROM node:alpine as builder
# Create working directory
WORKDIR '/app'
# Copy package.json file
COPY ./package.json ./
# Install dependencies
RUN npm install
# Once dependencies are installed, copy over the /client files
COPY . .
# Build files for production
RUN npm run build

# Phase 2
# Use nginx image
FROM nginx
# Allow communication to the docker container via port 3000
# NOTE: Nginx needs to expose its port separately, it's done in nginx/default.conf
EXPOSE 3000
# Copy our nginx config to the Docker container
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# Copy our production files that we build in Phase 1 to this container
COPY --from=builder /app/build /usr/share/nginx/html