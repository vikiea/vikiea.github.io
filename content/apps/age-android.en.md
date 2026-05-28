---
title: "Age Android"
date: 2026-05-24T00:00:00+08:00
draft: false
description: "Local-first age encryption for Android."
tags:
  - Android
  - Encryption
  - Local-first
slug: "age-android"
image: /images/age-android-preview.svg
---

Age Android is a local-first age file encryption app for Android devices. It pairs a native Jetpack Compose interface with a local Go age engine, keeping encryption, decryption, key management, history, and streaming batch processing on device.

Product page: [vikiea.github.io/age_android/](/age_android/)

Repository: [github.com/vikiea/age_android](https://github.com/vikiea/age_android)

## Features

- Encrypt files or folders into `.age` archives.
- Decrypt `.age` files and restore archived content.
- Generate, import, view, and reuse local X25519 age keys.
- Pick files through Android's storage access framework instead of a remote upload flow.
- Review encryption and decryption history, output paths, and task status.
- Use a clearer Liquid Glass interface with improved frosted-glass treatment in light mode.
- Check for updates in app, download APKs, and follow Android's install-permission flow.
- Download a Universal APK or ABI-specific APKs.

## Privacy Model

Age Android does not collect analytics, upload files, or transmit passphrases or private keys. Files, passphrases, private keys, and operation history are processed and stored only on the Android device.

## Release

The current public release is `v3.1.1`, published on 2026-05-27. This release restores the light-mode Liquid Glass translucency so cards read as frosted glass instead of opaque white panels.

Open the [Age Android product page](/age_android/) for APK downloads, screenshots, and release notes.
