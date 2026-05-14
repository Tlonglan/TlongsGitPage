---
title: 部署 Github 项目到 Cloudflare Pages
type: "docs"
draft: false
# 内容属性
tags: [5-方案教程]
series: []
categories: [Hugo, 网站, 配置]
# 时间属性
date: "2026-05-14"
lastmod: "2026-05-14"
# 其他配置字段
description: ""
---



## 注意事项

1. 在根目录创建一个 `wrangler.toml` 文件，内容如下：
   ```
    # workers名称，即cloudflare的项目名
    name = "mygitpage"

    # 填写当前日期即可
    compatibility_date = "2026-05-14"

    # hugo的输入路径
    pages_build_output_dir = "./public/"
   ```

2. 在构建配置中，构建命令直接使用`Hugo`，而不是`Hugo server`（`Hugo server`是用于本地预览与热更新的快速调试模式命令）

   <img src=".\assets\2026-05-14-14-18-26.png" alt="丢失描述" width="80%">
