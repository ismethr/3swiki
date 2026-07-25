# fnOS 部署

## 首次部署

1. 等待仓库的 `Publish website container` 工作流运行成功。
2. 在 GitHub 的 Packages 页面打开 `3swiki` 容器镜像，将可见性设置为
   `Public`。公开镜像在 fnOS 上不需要保存 GitHub 密钥。
3. 下载本目录中的 `compose.yaml`，在 fnOS Docker 的 Compose 页面创建项目。
4. 启动后访问 `http://NAS局域网IP:8088`。
5. 将 FRP 或 Cloudflare Tunnel 的目标设置为 NAS 的 `8088` 端口。

## 更新教材

修改教材并合并到 `main` 后，GitHub 会自动发布新镜像。在 fnOS 中执行“重新拉取”
或运行：

```bash
docker compose up -d --pull always
```

即可切换到新版本。

建议先确认 GitHub Actions 构建成功，再更新正式容器。如果需要回退，可将
`compose.yaml` 中的 `latest` 改成历史 `sha-xxxxxxx` 标签。
