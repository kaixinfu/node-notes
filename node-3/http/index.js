// 创建html
echo 'hello docker 2022/0312' >> index.html
// -p 端口进行映射，将本地 8000 端口映射到容器内部的 80 端口。nginx默认端口是80
// -v 绑定 将本地$PWD/www映射到当前nginx默认的发布路径
docker run -p 8000:80 -v $PWD/www:/usr/share/nginx/html nginx