FROM node

# 工作目录
WORKDIR /opt/nodeApp

# COPY必要文件
COPY package.json .
COPY src src

# 安装服务必要的包
RUN npm install --registry https://registry.npm.taobao.org

# 暴露端口
EXPOSE 5000

CMD ["npm","run","bulid"]

