FROM nginx:1.25-alpine

# 기본 nginx 설정 제거
RUN rm /etc/nginx/conf.d/default.conf

# nginx 설정 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 빌드 결과물 복사
COPY dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


# # 2. 도커 이미지 생성
  #docker build -t onsum-pwa .
  #
  ## 3. 실행
  #docker run -d -p 80:80 --name onsum onsum-pwa