# GEO·OPEN 资源环境开放教材

面向学生和社会学习者的开放式电子教材原型，以“资源环境信息技术”为主线，
连接“遥感基础与应用”和“地图学”两门课程。

## 当前版本

- 三门课程统一入口与知识关系
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
