(window.webpackJsonp=window.webpackJsonp||[]).push([[113],{715:function(t,s,a){"use strict";a.r(s);var e=a(37),n=Object(e.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"贡献指南"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#贡献指南"}},[t._v("#")]),t._v(" 贡献指南")]),t._v(" "),a("h3",{attrs:{id:"介绍"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#介绍"}},[t._v("#")]),t._v(" 介绍")]),t._v(" "),a("p",[t._v("感谢你使用 Avue。")]),t._v(" "),a("p",[t._v("以下是关于向 Avue 提交反馈或代码的指南。在向 Avue 提交 issue 或者 PR 之前，请先花几分钟时间阅读以下文字。")]),t._v(" "),a("h3",{attrs:{id:"issue-规范"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#issue-规范"}},[t._v("#")]),t._v(" Issue 规范")]),t._v(" "),a("p",[t._v("遇到问题时，请先确认这个问题是否已经在 issue 中有记录或者已被修复\n提 issue 时，请用简短的语言描述遇到的问题，并添加出现问题时的环境和复现步骤")]),t._v(" "),a("h3",{attrs:{id:"参与开发"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参与开发"}},[t._v("#")]),t._v(" 参与开发")]),t._v(" "),a("h5",{attrs:{id:"本地开发"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#本地开发"}},[t._v("#")]),t._v(" 本地开发")]),t._v(" "),a("p",[t._v("按照下面的步骤操作，即可在本地开发 Avue 组件。")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 克隆仓库")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 开发分支为 dev 分支")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" clone git@gitee.com:smallweigit/avue.git\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 安装依赖")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" Avue "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("yarn")]),t._v(" 或者 "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 进入开发模式")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" run dev\n\n")])])]),a("h3",{attrs:{id:"目录结构"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#目录结构"}},[t._v("#")]),t._v(" 目录结构")]),t._v(" "),a("p",[t._v("仓库的组件代码位于 packages 下，每个组件一个文件夹\nsrc 为组件提供的核心方法等\n项目主要目录如下：")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("Avue\n├─ build     # 构建\n├─ packages  # 组件\n├─ src       # 方法\n├─ lib       # 生成\n└─ examples  # 测试\n")])])]),a("h3",{attrs:{id:"提交-pr"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#提交-pr"}},[t._v("#")]),t._v(" 提交 PR")]),t._v(" "),a("h4",{attrs:{id:"pull-request-规范"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#pull-request-规范"}},[t._v("#")]),t._v(" Pull Request 规范")]),t._v(" "),a("ul",[a("li",[t._v("如果遇到问题，建议保持你的 PR 足够小。保证一个 PR 只解决一个问题或只添加一个功能")]),t._v(" "),a("li",[t._v("当新增组件或者修改原有组件时，记得增加或者修改测试代码，保证代码的稳定")]),t._v(" "),a("li",[t._v("在 PR 中请添加合适的描述，并关联相关的 Issue")])]),t._v(" "),a("h4",{attrs:{id:"pull-request-流程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#pull-request-流程"}},[t._v("#")]),t._v(" Pull Request 流程")]),t._v(" "),a("ul",[a("li",[t._v("fork 主仓库，如果已经 fork 过，请同步主仓库的最新代码")]),t._v(" "),a("li",[t._v("基于 fork 后仓库的 dev 分支新建一个分支，比如feature/button_color")]),t._v(" "),a("li",[t._v("在新分支上进行开发，开发完成后，提 Pull Request 到主仓库的 dev 分支")]),t._v(" "),a("li",[t._v("Pull Request 会在 Review 通过后被合并到dev分支")]),t._v(" "),a("li",[t._v("等待 Avue 发布版本，随缘更新")])]),t._v(" "),a("h4",{attrs:{id:"同步最新代码"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#同步最新代码"}},[t._v("#")]),t._v(" 同步最新代码")]),t._v(" "),a("p",[t._v("提 Pull Request 前，请依照下面的流程同步主仓库的最新代码：")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 添加主仓库到 remote，作为 fork 后仓库的上游仓库")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" remote "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" upstream https://gitee.com/smallweigit/avue.git\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 拉取主仓库最新代码")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" fetch upstream\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 切换至 dev 分支")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" checkout dev\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 合并主仓库代码")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" merge upstream/dev\n")])])])])}),[],!1,null,null,null);s.default=n.exports}}]);