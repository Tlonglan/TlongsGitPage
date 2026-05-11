---
title: 配置-Giscus评论系统到Hugo博客
type: docs
series: [精选内容]
tags: [5-方案教程]
categories: [Hugo, 网站, 配置, Giscus]
draft: false
date: 2026-05-06
lastmod: 2026-05-07
---

- `来源`: [为你的 HUGO 博客集成 Giscus 评论系统](https://loommii.github.io/zh-cn/posts/add-giscus-comments-to-hugo-blog/)




{{% steps %}}

### 第一步

创建一个 ==公开== 的 github 仓库，在设置中开启评论，安装 giscc 插件

### 第二步

按照引导选好 giscc插件 配置好参数，


### 第三步

把 giscc 插件自动生成的参数挑选合适的部分放到 hugo.yaml 文件中，以 **Hextra主题** 为例：


```yaml

# /hugo.yaml
params:
  # 页面评论系统配置
  comments:
    enable: true
    type: giscus

    giscus:
      repo: Tlonglan/TlongsGitPage
      repoId: R_kgDOSVn-gw
      category: Announcements
      categoryId: DIC_kwDOSVn-g84C8fg7
      lang: "zh-CN"                 # 建议明确指定语言，用 "zh-CN" 亦可
      reactionsEnabled: 1           # 开启 reactions
      inputPosition: "top"          # 评论输入框位置，可选 "top" 或 "bottom"
      loading: "lazy"               # 懒加载

```


### 第四步

在 **`your-repo\layouts\partials\comments.html`** 中配置参数，以控制在哪些特定的文件下加载评论系统：

```html
<!-- 从远程仓库中一份内容然后修改，限制评论系统只在docs 和 blog 中加载 -->

{{- /* 1. 确定是否显示评论 */ -}}
{{- $showComments := false -}}

{{- /* 2. 如果用户显式设置了 .Params.comments，则完全听从用户设置 */ -}}
{{- if isset .Params "comments" -}}
    {{- $showComments = .Params.comments -}}
{{- else -}}
    {{- /* 3. 否则，按照页面 Section 类型决定：只有 docs 或 blog 才显示 */ -}}
    {{- $showComments = (or (eq .Section "docs") (eq .Section "blog")) -}}
{{- end -}}

{{- /* 4. 根据最终决定渲染评论组件 */ -}}
{{- if $showComments -}}
    {{- $enableComments := site.Params.comments.enable | default false -}}
    {{ if not (eq .Params.comments nil) }}
      {{ $enableComments = .Params.comments }}
    {{ end }}
    {{- if $enableComments -}}
      {{- if eq site.Params.comments.type "giscus" -}}
        {{ partial "components/giscus.html" . }}
      {{- end -}}
    {{- end -}}
{{- end -}}
```

### 第五步
重新刷新或构建网站，即可看到指定页面加载出评论系统

> [!important] 注意
> 因为 giscc 系统基于 github ，所以
> 1. 可能因为网络问题出现加载较慢，加载不出来等不稳定情况
> 2. 需要登录 github 账号才能评论




{{% /steps %}}
