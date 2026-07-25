# GEO·OPEN 资源环境开放教材

面向学生和社会学习者的开放式电子教材原型，以“资源环境信息技术”为主线，
连接“遥感基础与应用”和“地图学”两门课程。

## 当前版本

- 三门课程统一入口与知识关系
- “遥感基础与应用”课程目录与第一章完整电子教材
- 基于 Markdown 的可持续内容编辑系统
- 课程学习路径
- 示例章节阅读界面
- 遥感波段组合交互实验
- 实践案例入口
- 教材术语搜索原型
- 浏览器本地学习进度
- 适配桌面和移动设备

## 本地开发

```bash
pnpm install
pnpm dev
```

## fnOS 部署

执行 `pnpm build:nas` 可生成 `out` 静态目录。也可以直接使用
`outputs/GEO-OPEN-fnOS部署包.zip`，其中包含预构建页面、Nginx 配置和
Docker Compose 文件。

推荐使用仓库中的自动发布流程：

1. 内容合并到 `main`；
2. GitHub Actions 自动构建 `linux/amd64` 与 `linux/arm64` 镜像；
3. 镜像发布到 `ghcr.io/ismethr/3swiki:latest`；
4. fnOS 按照 [`deploy/fnos/README.md`](deploy/fnos/README.md) 拉取更新。

每次发布还会保留 `sha-xxxxxxx` 版本标签，便于出现问题时快速回退。

## 编辑与发布教材

课程正文保存在 `content` 目录中，可直接通过 GitHub 网页编辑 Markdown。
完整操作见 [`docs/内容更新与发布.md`](docs/内容更新与发布.md)：

1. 修改或新增 Markdown 章节；
2. 创建 Pull Request 并等待构建检查；
3. 合并到 `main`，GitHub 自动发布新镜像；
4. fnOS 拉取镜像并重新部署。
