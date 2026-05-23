---
title: "Age Mac"
date: 2026-05-22T00:00:00+08:00
draft: false
description: "面向 macOS 的本地优先 age 文件加密工具。"
tags:
  - macOS
  - 加密
  - 本地优先
slug: "age-mac"
---

Age Mac 是围绕 age 格式构建的原生 macOS 文件加密 App。它是一个独立的 SwiftUI 桌面应用，内置 Go 流式处理引擎，面向本地文件工作流：选择文件、加密或解密、查看进度，并把密钥留在自己的机器上。

代码仓库：[github.com/vikiea/age_mac](https://github.com/vikiea/age_mac)

## 功能

- 将多个文件加密成一个 `.tar.gz.age` 或 `.tar.age` 归档。
- 分别加密文件，每个输入文件生成一个 age 归档。
- 解密 `.age` 文件，并自动解包 tar 或 tar.gz 内容。
- 使用口令或 X25519 age 密钥。
- 生成、导入、重命名、查看和导出本地 age 密钥。
- 启动时从 `~/.config/age` 导入已有密钥。
- 将操作历史、输出和任务进度保留在本地。
- 通过 GitHub Pages 上的公开 appcast 使用 Sparkle 检查更新。

## 架构

```shell
Sources/AgeMac/App/AgeMacApp.swift          App entry, commands, scenes
Sources/AgeMac/Views/                      SwiftUI screens and components
Sources/AgeMac/Stores/AppStore.swift       State, persistence, task lifecycle
Sources/AgeMac/Services/AgeEngineClient.swift
                                            Process bridge to the Go engine
Sources/AgeMac/Services/UpdateService.swift Sparkle update checks
Sources/AgeMac/Models/AppModels.swift      Shared app models
Engine/main.go                             Streaming age engine
script/build_and_run.sh                    Local build and bundle staging
```

Swift 应用负责 UI、本地状态、AppKit 面板和任务编排。Go 引擎负责流式 tar、gzip、加密和解密。两者通过子进程上的 JSON Lines 通信。

## 隐私模型

Age Mac 是本地优先的。文件、口令、私钥和操作历史只在这台 Mac 上处理和保存。App 不会上传文件、遥测、密钥或使用历史。

启用或触发更新检查时，Sparkle 会读取这些公开更新元数据：

```text
https://vikiea.github.io/age_mac/appcast-arm64.xml
https://vikiea.github.io/age_mac/appcast-x86_64.xml
```

App 会根据当前 Mac 架构在运行时选择匹配的更新源。

参见 [PRIVACY.md](https://github.com/vikiea/age_mac/blob/master/PRIVACY.md) 和托管隐私页面 [vikiea.github.io/age_mac/privacy/](https://vikiea.github.io/age_mac/privacy/)。

## 构建与运行

环境要求：

- macOS 14 或更高版本
- 带 Swift 5.10 或更高版本的 Xcode 命令行工具
- `Engine/go.mod` 声明的 Go 工具链

运行 App：

```bash
./script/build_and_run.sh
```

脚本会构建 Go 引擎、构建 SwiftPM 可执行文件、暂存 `dist/AgeMac.app`、嵌入资源和 Sparkle、本地签名、注册 bundle 并启动应用。

为了获得可复用的 Codex 和终端工作流，可以安装项目 CLI：

```bash
(cd Tools/age-mac-cli && make install-local)
age-mac --json doctor
```

CLI 可以在任意工作目录封装构建、运行、调试、验证、打包、PR 和 GitHub Release 操作。参见 [Tools/age-mac-cli/README.md](https://github.com/vikiea/age_mac/blob/master/Tools/age-mac-cli/README.md)。

## 验证

```bash
swift build
(cd Engine && env -u GOROOT go test ./...)
./script/build_and_run.sh --verify
git diff --check
codesign --verify --deep --strict --verbose=2 dist/AgeMac.app
```

如果 shell 中存在其他安装遗留的 `GOROOT`，运行 Go 命令时使用 `env -u GOROOT`。

## 发布与更新

Age Mac 使用 Sparkle 2 做在线更新。不同架构的 appcast 由 GitHub Pages 从 `pages/` 目录托管。

要点：

- `SUPublicEDKey` 会写入生成的 App `Info.plist`。
- Sparkle 私有 EdDSA 密钥保留在本地 macOS Keychain 或其他私有密钥存储中。
- DMG 发布资产和 appcast 条目通过 `scripts/release/build_dmg_release.sh all` 生成。
- `scripts/sparkle/release_appcast.sh` 保留为同一 DMG 发布流程的兼容包装。
- GitHub Pages 发布 `pages/appcast-arm64.xml` 和 `pages/appcast-x86_64.xml`。
