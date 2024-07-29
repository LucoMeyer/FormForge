# Stage 1: Build Angular app
FROM node:20 as build

WORKDIR /app

COPY FormForgeFE/package.json FormForgeFE/package-lock.json ./
RUN npm install

COPY FormForgeFE/ ./
RUN npm run build --configuration FormForge

# Stage 2: Build Flask app
FROM python:3.9

WORKDIR /app

# Copy and install Flask app requirements
COPY FormForgeBE/requirements.txt ./
RUN pip install -r requirements.txt

# Copy Flask app code
COPY FormForgeBE/ ./

# Copy built Angular app from Stage 1
COPY --from=build /app/dist/form-forge /app/static

EXPOSE 5000

# Run Flask app
CMD ["python", "app.py"]

