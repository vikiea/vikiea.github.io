# vikiea.github.io 使用文档

本项目是 `https://vikiea.github.io/` 的 Hugo 源码仓库。站点当前定位是个人主页 + App 作品推荐，首页重点推荐 [Age Mac](/age_mac/)；博客、标签和归档骨架仍保留在源码中，后续需要时再恢复入口。

## 环境要求

- Hugo extended `0.161.1` 或兼容版本
- Git
- 可选：GitHub CLI `gh`，用于查看 GitHub Actions 和 Pages 状态

查看本机 Hugo 版本：

```bash
hugo version
```

## 本地预览

预览草稿和正式内容，默认使用当前 App 作品主题：

```bash
hugo server --environment theme-vikiea --buildDrafts
```

只按生产规则预览，草稿不会显示：

```bash
hugo server --environment theme-vikiea
```

默认访问地址是：

```text
http://localhost:1313/
```

## 生产构建

发布前运行：

```bash
hugo --environment theme-vikiea --gc --minify
```

生成目录是 `public/`。该目录已在 `.gitignore` 中忽略，不需要提交，GitHub Pages 会在 Actions 中重新构建。

## 目录结构

```text
.
├── .github/workflows/pages.yml   # GitHub Pages 发布 workflow
├── config/                       # 分层配置和多主题环境
├── content/                      # 页面和文章内容
│   ├── about.md                  # 关于页
│   ├── apps/                     # App 作品入口页
│   │   └── age-mac.md            # 独立 App 内容页
│   ├── archives.md               # 归档页入口
│   └── posts/                    # 博客文章
├── data/apps.yaml                # App 作品卡片数据
├── static/                       # 原样复制到站点根目录的静态资源
├── themes/
│   └── vikiea-apps/              # 当前自定义 App 作品主题
└── README.md
```

## 写博客文章

文章放在 `content/posts/` 下，推荐文件名使用英文短横线：

```text
content/posts/my-first-note.md
```

基础 front matter 示例：

```markdown
---
title: "My First Note"
date: 2026-05-22T00:00:00+08:00
draft: true
description: "Short summary for list pages and SEO."
tags:
  - Hugo
  - Notes
slug: "my-first-note"
---

Write the post body here.
```

字段说明：

- `title`：文章标题
- `date`：发布时间
- `draft`：是否草稿。`true` 不会进入生产发布
- `description`：文章列表和 meta description 使用的摘要
- `tags`：标签，会出现在 `/tags/`
- `slug`：文章 URL 的最后一段

发布文章时，把 `draft` 改为 `false` 或删除该字段，然后运行：

```bash
hugo --environment theme-vikiea --gc --minify
```

## 添加或修改 App 作品

首页作品卡片来自 `data/apps.yaml`，不需要直接改模板。默认 `theme-vikiea` 主题会读取这份数据并渲染 App 卡片。第三方主题一般不会认识这份自定义数据，所以项目额外保留了 `content/apps/_index.md` 和 `content/apps/*.md`，用于在第三方主题下展示 App 入口和 App 详情。

示例：

```yaml
- name: Age Mac
  summary: Local-first age encryption for macOS. Files, keys, passphrases, and operation history stay on your Mac.
  url: /age_mac/
  platform: macOS
  status: Current public release
  version: "1.3.2"
  tags:
    - Encryption
    - macOS
    - Local-first
  featured: true
  icon: /images/age-mac-icon.png
  image: /images/age-mac-screenshot.jpg
  cta: View Age Mac
```

字段说明：

- `name`：App 名称
- `summary`：卡片摘要
- `url`：跳转地址。Age Mac 保持为 `/age_mac/`，由独立项目页提供
- `platform`：平台或类型
- `status`：状态说明
- `version`：版本号，可选
- `tags`：卡片标签
- `featured`：是否作为首页主推 App。通常只保留一个 `true`
- `icon`：图标路径，放在 `static/images/` 后以 `/images/...` 引用
- `image`：预览图路径，放在 `static/images/` 后以 `/images/...` 引用
- `cta`：按钮文字

如果只是预留未来作品，可以把 `url` 设为 `"#"`，页面会显示为不可点击的 coming soon 状态。

## 修改导航和站点信息

站点标题、描述、GitHub 链接、导航菜单在 `config/_default/hugo.toml` 中维护。

常用位置：

```toml
title = "vikiea"

[params]
  description = "App作品推荐与发布入口。"
  author = "vikiea"
  github = "https://github.com/vikiea"

[[menus.main]]
  name = "Apps"
  pageRef = "/apps"
  weight = 10
```

菜单按 `weight` 从小到大排序。

当前公开导航只保留 `Apps`。`content/posts/`、`content/about.md`、`content/archives.md` 和标签页模板仍保留，但不会出现在首页导航和首页推荐区中。

## 静态资源

静态资源放在 `static/` 下，会原样发布到站点根目录。

例如：

```text
static/images/age-mac-icon.png
```

页面中引用为：

```text
/images/age-mac-icon.png
```

当前默认主题的 CSS 和 JS 源文件放在 `themes/vikiea-apps/assets/` 下，由 Hugo Pipes 压缩并生成带 hash 的产物：

```text
themes/vikiea-apps/assets/css/main.css
themes/vikiea-apps/assets/js/main.js
```

## 主题切换

本项目当前使用本地自定义主题 `themes/vikiea-apps`。它是默认展示主题，可以自由定制首页、App 卡片、列表页、文章页和归档页，不受第三方主题约束。当前首页只展示 App 推荐相关内容。

“无损切换”的目标是：当前展示效果由 `vikiea-apps` 稳定承载；未来如果引入第三方主题，也先放到独立的 `config/theme-*` 环境中测试，不直接覆盖默认发布效果。

当前启用的主题环境：

```text
theme-vikiea  # 默认主题：App 作品推荐首页，由 themes/vikiea-apps 提供
```

默认生产发布使用 `theme-vikiea`。本地切换主题时使用 Hugo environment：

```bash
# 当前自定义 App 作品主题
hugo server --environment theme-vikiea --buildDrafts
```

生产构建：

```bash
hugo --environment theme-vikiea --gc --minify
```

配置位置：

```text
config/_default/hugo.toml       # 所有主题共享配置，默认指定 vikiea-apps
config/theme-vikiea/hugo.toml   # 默认主题覆盖项
```

主题文件位置：

```text
themes/vikiea-apps/             # 当前自定义主题，本仓库维护
```

如果后续要引入第三方主题，推荐按下面的方式增加，而不是改动当前默认主题：

```text
themes/<third-party-theme>/         # 第三方主题，建议用 Hugo module 或 git submodule 管理
themes/<third-party-theme>-compat/  # 可选：本仓库维护的兼容覆盖层
config/theme-<name>/hugo.toml       # 该主题的环境覆盖项
```

保留当前展示效果的接入示例：

```toml
theme = ["vikiea-apps", "<third-party-theme>-compat", "<third-party-theme>"]
```

Hugo 会优先使用左侧主题组件里的模板和资源。因此把 `vikiea-apps` 放在最前面，可以保证首页、文章列表、归档、关于页等核心展示不变；第三方主题只在本地主题没有提供某些模板、shortcode 或资源时作为 fallback。

如果确实想预览第三方主题原始效果，可以新建单独环境，例如 `config/theme-thirdparty-raw/hugo.toml`：

```toml
theme = ["<third-party-theme>-compat", "<third-party-theme>"]
```

这种模式会改变页面展示效果，不属于默认发布路径。

无损切换约定：

- 内容放在 `content/`，不要依赖某个主题专属 front matter
- App 数据放在 `data/apps.yaml`
- App 入口页放在 `content/apps/_index.md`
- 重要 App 也同步一份 `content/apps/*.md`，保证第三方博客主题能展示它
- 图片等通用资源放在 `static/`
- 不要在根目录放 `layouts/` 或 `assets/`，否则会覆盖所有主题
- 第三方主题专属参数只放进对应的 `config/theme-*/hugo.toml`
- 如果第三方主题需要少量兼容修正，不直接修改第三方主题源码，而是在 `themes/*-compat/` 中覆盖
- 新增主题环境后，先本地运行对应的 `hugo --environment theme-<name> --gc --minify`，确认不会影响 `theme-vikiea`

## 发布流程

当前 GitHub Pages 使用 workflow 模式发布，配置文件是：

```text
.github/workflows/pages.yml
```

正常发布步骤：

```bash
hugo --environment theme-vikiea --gc --minify
git status --short
git add -A
git commit -m "docs: update site content"
git push origin master
```

推送到 `master` 后，GitHub Actions 会自动构建并部署到：

```text
https://vikiea.github.io/
```

查看最近的部署状态：

```bash
gh run list --repo vikiea/vikiea.github.io --workflow pages.yml --limit 5
```

查看 Pages 配置：

```bash
gh api repos/vikiea/vikiea.github.io/pages --jq '{status,html_url,build_type,source}'
```

期望 `build_type` 是 `workflow`。

## 发布前检查清单

每次修改内容或模板后建议运行：

```bash
rm -rf public resources/_gen
hugo --environment theme-vikiea --gc --minify
git diff --check
```

如果改了主题切换相关配置，也同时验证所有实际存在的 `config/theme-*` 环境。当前仓库只有 `theme-vikiea`。

如果改了 workflow，也检查 YAML：

```bash
ruby -e 'require "yaml"; YAML.load_file(".github/workflows/pages.yml"); puts "pages workflow yaml ok"'
```

如果改了页面视觉，建议本地预览并检查：

- 首页首屏是否仍以 App 作品推荐为主
- `/age_mac/` 链接是否保持可访问
- 顶部导航是否只保留 App 推荐相关入口
- `/posts/`、`/tags/`、`/archives/`、`/about/` 作为隐藏骨架页面是否仍能构建
- 移动端导航和卡片是否没有横向溢出

## 常见问题

### 本地能看到文章，线上看不到

检查文章 front matter 里的 `draft`。生产构建不会发布 `draft: true` 的文章。

### 首页 App 卡片图片不显示

确认图片文件在 `static/images/` 下，并且 `data/apps.yaml` 中使用 `/images/...` 路径。

### GitHub Pages 显示 README 而不是 Hugo 首页

检查 Pages 是否使用 workflow 模式：

```bash
gh api repos/vikiea/vikiea.github.io/pages --jq '{build_type,source}'
```

如果 `build_type` 是 `legacy`，需要切到 workflow 模式：

```bash
gh api --method PUT repos/vikiea/vikiea.github.io/pages -f build_type=workflow
gh workflow run pages.yml --repo vikiea/vikiea.github.io --ref master
```

### 不要提交哪些文件

这些目录或文件是本地生成物，不需要提交：

```text
public/
resources/_gen/
.hugo_build.lock
.playwright-cli/
.superpowers/
```
