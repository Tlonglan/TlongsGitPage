---
title: 在vscdoe中使用Mathematica
draft: false
# 内容属性
tags: [5-方案教程]
series: []
categories: [计算机, vscode, jupyter, Mathematica]
type: docs
# 时间属性
date: 2026-09-25
lastmod: 2026-09-25
# 其他配置字段
description: ""
layout: single
---


## 在vscode 官网下载 vscode

## 安装 Mathematica

建议Mathematica 的版本大于12.1。因为vscode的 wolfram Language lsp 插件 Wolfram Language Server 的相关包（特别是LSPServer.paclet）要求wolfram版本为12.1+

## 在vscode 安装 Wolfram 相关扩展

### Wolfram Language（shigma）

> 这个扩展主要是用于实现语法高亮

1. 安装扩展
2. 根据提示进行配置 Wolfram Language 扩展

### Wolfram Language Server（lsp-wl） 

> 这个扩展主要是用于实现内置函数自动补全、悬浮帮助文档以及调试

1. 安装扩展
2. 下载 [wl-lsp](https://github.com/kenkangxgwe/lsp-wl)
3. 根据提示进行配置 Wolfram Language Server 扩展
4. 在vscode 的 设置 json 中使用如下配置，对信息进行过滤：

```json
{
    "WolframLanguageServer.Diagnostics.mitigated": [
        "ExperimentalSymbol",
        "UnusedParameter",
        "UnusedVariable",
    ],
    "WolframLanguageServer.Diagnostics.suppressed": [
        "DifferentLine",
        "SuspiciousSessionSymbol",
        "NonASCIICharacter",
    ]
}
```

## 在 vscode 的 jupyter 中使用Mathematica
### 安装 Miniconda
### 安装jupyter包（建议在新环境中安装，不要安装在base环境中）

#### 创建新环境
``` python
conda create -n -NewEnve
```



#### 安装jupyter包
``` python
conda activate NewEnve
conda install jupyter
```


#### 在vscode 安装python插件
#### 在Mathematica 中 安装 jupyter包
1. 下载[WolframLanguageForJupyter-0.9.3.paclet](https://github.com/twn39/IWolframEngine/blob/master/WolframLanguageForJupyter-0.9.3.paclet)

2. 在Mathematica中执行下方命令
``` wolfram
(*安装扩展包*)
PacletInstall["WolframLanguageForJupyter-0.9.3.paclet"]

(*加载扩展包*)
Needs["WolframLanguageForJupyter`"]

(*配置扩展包*)
ConfigureJupyter["Add", "JupyterInstallation" -> "安装了jupyter包的python环境目录\\Scripts\\jupyter.exe"]

(*例如：
ConfigureJupyter["Add", "JupyterInstallation" -> "E:\\0-AppData\\CondaEnvs\\SciCalc\\Scripts\\jupyter.exe"]*)

```

3. 在vscode 中创建一个 jupyter notebook 文件（后缀为 .ipynb），点击右上方内核选择，选择wolfram 内核
4. 愉快地在Jupyter中使用Mathematica！
