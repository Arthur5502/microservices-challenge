FROM nginx:alpine

# Copiar arquivos do frontend
COPY index.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY app.js /usr/share/nginx/html/

# Expor porta 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
