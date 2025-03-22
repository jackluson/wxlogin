#!/bin/bash

# Exit on error
set -e

echo "========== 微信公众号登录验证系统 - 初始化脚本 =========="

# Check if .env.local exists, if not create it from example
if [ ! -f .env.local ]; then
  echo "创建 .env.local 文件..."
  cp .env.local.example .env.local
  echo "请编辑 .env.local 文件，填入微信公众号配置信息。"
  echo ""
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
  echo "错误: 需要安装 Docker 和 Docker Compose。"
  echo "请访问 https://docs.docker.com/get-docker/ 安装 Docker"
  exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
  echo "错误: 需要安装 Docker Compose。"
  echo "请访问 https://docs.docker.com/compose/install/ 安装 Docker Compose"
  exit 1
fi

echo "开始构建 Docker 镜像..."
docker-compose build

echo ""
echo "========== 构建完成 =========="
echo ""
echo "使用以下命令启动服务:"
echo "  docker-compose up -d"
echo ""
echo "服务启动后，访问 http://localhost:3000 进行测试"
echo ""
echo "注意: 请确保您已正确配置了 .env.local 文件中的微信公众号参数"
echo "      并且已经在微信公众号后台配置了服务器地址和菜单"
echo ""

# Make the script executable
chmod +x build.sh 