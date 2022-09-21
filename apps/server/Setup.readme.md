# 服务器初始化设置

## zsh 安装

```bash
sudo apt-get install zsh

# 将 zsh 设置为系统默认 shell
chsh -s /bin/zsh 
```

## git

```bash
sudo apt update
sudo apt install git

git --version
```

## oh-my-zsh

```bash
# 安装
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# https://www.alicode.pro/blog/dev-tools/better-use-terminal-with-zsh
```

## Docker

### 配置Ubuntu更新源（清华大学）
```bash
$ sudo vim /etc/apt/sources.list
# deb cdrom:[Ubuntu 16.04 LTS _Xenial Xerus_ - Release amd64 (20160420.1)]/ xenial main restricted
deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial main restricted
deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial-updates main restricted
deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial universe
deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial-updates universe
deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial multiverse
deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial-updates multiverse
deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial-backports main restricted universe multiverse
deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial-security main restricted
deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial-security universe
deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial-security multiverse
```

### 卸载旧版本的Docker
```bash
sudo apt-get remove docker docker-engine docker.io
```

#### 步骤一：安装必要的系统工具
```bash
sudo apt-get update
sudo apt-get -y install apt-transport-https ca-certificates curl software-properties-common
```
#### 步骤二：安装GPG证书
```bash
curl -fsSL http://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo apt-key add -
```
#### 步骤三：写入软件源信息

```bash
sudo add-apt-repository "deb [arch=amd64] http://mirrors.aliyun.com/docker-ce/linux/ubuntu $(lsb_release -cs) stable"
```
#### 步骤四：更新并安装Docker-CE
```bash
sudo apt-get -y update
sudo apt-get -y install docker-ce
```

### 附：安装指定版本的Docker-CE
#### Step 1: 查找Docker-CE的版本:
```bash
apt-cache madison docker-ce
  docker-ce | 17.03.1~ce-0~ubuntu-xenial | http://mirrors.aliyun.com/docker-ce/linux/ubuntu xenial/stable amd64 Packages
  docker-ce | 17.03.0~ce-0~ubuntu-xenial | http://mirrors.aliyun.com/docker-ce/linux/ubuntu xenial/stable amd64 Packages
```

#### Step 2: 安装指定版本的Docker-CE: (VERSION 如上 17.03.1~ce-0~ubuntu-xenial)
```bash
sudo apt-get -y install docker-ce=[VERSION]
```

### 配置阿里云镜像加速器（TODO）
需登录阿里云管理控制台，获取专属的加速器地址。

针对Docker客户端版本大于1.10.0的用户，可以通过修改daemon配置文件/etc/docker/daemon.json来使用加速器：
```bash
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://irnlfwui.mirror.aliyuncs.com"]
}
EOF
```
```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

### docker --version

### docker compose

## Github Action Runner Setup

```bash
# add in .zshrc
export RUNNER_ALLOW_RUNASROOT="1"
```
依github命令运行

## Nginx Setup

```bash
sudo apt update
sudo apt install nginx
```

### 设置 ufw

```bash
sudo ufw app list
sudo ufw allow 'Nginx Full'
```

### 配置安全组，允许 http / https

## 安装 Node, nvm, pnpm, pm2
```bash
sudo apt update
sudo apt install nodejs npm
# nvm install
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
nvm install v16

npm install -g pnpm
pnpm setup

pnpm install -g pm2
which pm2
ln -s /root/.local/share/pnpm/pm2 /usr/bin/pm2
```

## 启动Docker服务

- cp .env.example .env

- 生成新的 ACCESS_TOKEN_PRIVATE_KEY 和 ACCESS_TOKEN_PUBLIC_KEY
  > Generating the JWT Private and Public Keys
  >
  > Follow these steps to generate the private and public keys needed to sign and verify the JWT Tokens.
  > 
  > Alternatively, you can use the ones I provided in the packages/server/.env file.
  > 
  > Step 1: Go to the [Private and Public Keys Generation Site](https://travistidwell.com/jsencrypt/demo/), and click the “Generate New Keys” button to create the private and public keys.
  > 
  > Step 2: Copy the private key and visit the [Base64 Encoding website](https://www.base64encode.org/) to encode it in Base64.
  > 
  > Step 3: Copy the base64 encoded string and add it to the packages/server/.env file as ACCESS_TOKEN_PRIVATE_KEY .
  > 
  > Step 4: Go back to the Private and Public Keys Generation Site and copy the corresponding public key before encoding it in base64.
  > 
  > Add it to the packages/server/.env file as ACCESS_TOKEN_PUBLIC_KEY .
  > 
  > Step 5: Repeat the above steps for the refresh token private and public keys.
- 
  ```bash
  docker compose -f "apps/server/docker-compose.yml" up -d --build
  ```

### 启动Server服务
  ```bash
  pnpm run generate
  pm2 start "pnpm run dev:server" --name server
  ```
