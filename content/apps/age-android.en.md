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
- Migrate the Android application ID to `io.github.vikiea.age` and align the gomobile engine Java package.
- Use shared glass card styling across encryption and decryption screens, with swipe gestures on history tabs.
- Show key-import completion as a short auto-dismiss tip instead of a heavier interruption.
- Download a Universal APK or ABI-specific APKs.

## Privacy Model

Age Android does not collect analytics, upload files, or transmit passphrases or private keys. Files, passphrases, private keys, and operation history are processed and stored only on the Android device.

## Release

The current public release is `v4.0.0`, published on 2026-05-28. This release migrates the Android application ID to `io.github.vikiea.age`, aligns the gomobile engine package, unifies encryption/decryption glass cards, adds swipe gestures to history tabs, and turns key-import completion into a short tip.

Open the [Age Android product page](/age_android/) for APK downloads, screenshots, and release notes.
