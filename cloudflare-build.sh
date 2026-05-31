#!/bin/bash
# 在 Cloudflare Pages 构建设置中，拿到完整 Git 历史，lastmod 自动更新
git fetch --unshallow || true
hugo --minify