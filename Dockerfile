FROM nginx:1.25-alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# 1. 로컬에서 빌드
#npm run build

# 2. docker build (Dockerfile, nginx.conf, dist/ 가 같은 폴더에 있어야 함)
#docker build -t why48382/frontend:latest .