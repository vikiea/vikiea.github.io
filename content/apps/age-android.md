---
title: "Age Android"
date: 2026-05-24T00:00:00+08:00
draft: false
description: "面向 Android 的本地优先 age 文件加密 App。"
tags:
  - Android
  - 加密
  - 本地优先
slug: "age-android"
image: /images/age-android-preview.svg
---

Age Android 是面向 Android 设备的本地优先 age 文件加密 App。它使用原生 Jetpack Compose 界面和本地 Go age 引擎，让文件加密、解密、密钥管理、操作历史和批量流式处理都留在设备端完成。

产品页：[vikiea.github.io/age_android/](/age_android/)

代码仓库：[github.com/vikiea/age_android](https://github.com/vikiea/age_android)

## 功能

- 加密文件或文件夹，并输出 `.age` 归档。
- 解密 `.age` 文件，并恢复归档中的内容。
- 生成、导入、查看和复用本地 X25519 age 密钥。
- 通过 Android 存储访问框架选择文件，不走远程上传流程。
- 查看加密与解密历史、输出路径和任务状态。
- 提供更通透的 Liquid Glass 界面，并改善亮色模式下的玻璃质感。
- 在 App 内检查更新、下载 APK，并按系统要求引导安装权限。
- 提供 Universal APK 与 ABI 专用 APK。

## 隐私模型

Age Android 不收集分析数据，不上传文件，也不会传输口令或私钥。文件、口令、私钥和操作历史都只在当前 Android 设备上处理和保存。

## 发布

当前公开版本是 `v3.1.1`，发布于 2026-05-27。本次版本重点修复亮色模式 Liquid Glass 质感，让卡片保持磨砂玻璃观感而不是变成不透明白色。

下载 APK、查看截图和发布说明，请打开 [Age Android 产品页](/age_android/)。
