<template>
  <div :class="b()"
       :element-loading-text="loadText"
       v-loading.lock="loading">
    <el-upload :key="reload"
               :class="b({'list':listType=='picture-img','upload':disabled})"
               @click.native="handleClick"
               :action="action"
               :on-remove="handleRemove"
               :accept="acceptList"
               :before-remove="beforeRemove"
               :multiple="multiple"
               :on-preview="handlePreview"
               :limit="limit"
               :http-request="httpUpload"
               :readonly="readonly"
               :drag="dragFile"
               :show-file-list="isPictureImg?false:showFileList"
               :list-type="listType"
               :on-change="handleFileChange"
               :on-exceed="handleExceed"
               :disabled="disabled"
               :file-list="fileList">
      <template v-if="listType=='picture-card'">
        <i class="el-icon-plus"></i>
      </template>
      <template v-else-if="listType=='picture-img'">
        <slot v-if="$scopedSlots.default"
              :file="{url:imgUrl}"></slot>
        <template v-else>
          <component v-if="imgUrl"
                     :src="imgUrl"
                     :is="getIsVideo(imgUrl)"
                     @mouseover="menu=true"
                     :class="b('avatar')"></component>
          <i v-else
             class="el-icon-plus"
             :class="b('icon')"></i>
          <div class="el-upload-list__item-actions"
               :class="b('menu')"
               v-if="menu"
               @mouseover="menu=true"
               @mouseout="menu=false"
               @click.stop="()=>{return false}">
            <i class="el-icon-zoom-in"
               @click.stop="handlePreview({url:imgUrl})"></i>
            <i class="el-icon-delete"
               v-if="!disabled"
               @click.stop="handleDelete(imgUrl)"></i>
          </div>
        </template>
      </template>
      <template v-else-if="dragFile">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          {{t('upload.tip')}}
          <em>{{t('upload.upload')}}</em>
        </div>
      </template>
      <template v-else>
        <el-button size="small"
                   type="primary">{{t('upload.upload')}}</el-button>
      </template>
      <div slot="tip"
           class="el-upload__tip"
           v-html="tip"></div>
      <template slot="file"
                slot-scope="{file}">
        <slot :file="file"
              v-if="$scopedSlots.default">
        </slot>
        <span v-else-if="listType==='picture-card'">
          <component class="el-upload-list__item-thumbnail"
                     :src="file.url"
                     :is="file.type"></component>
          <span class="el-upload-list__item-actions">
            <span class="el-upload-list__item-preview">
              <i class="el-icon-zoom-in"
                 @click.stop="handlePreview(file)"></i>
            </span>
            <span class="el-upload-list__item-delete">
              <i class="el-icon-delete"
                 v-if="!disabled"
                 @click.stop="handleRemove(file)"></i>
            </span>
          </span>
        </span>
        <span v-else-if="listType==='picture'"
              @click.stop="handlePreview(file)">
          <component class="el-upload-list__item-thumbnail"
                     :src="file.url"
                     :is="file.type"></component>
          <a class="el-upload-list__item-name">
            <i class="el-icon-document"></i>
            {{file.name}}
          </a>
          <i class="el-icon-close"
             @click.stop="handleRemove(file)"></i>
        </span>
        <span v-else
              @click.stop="handlePreview(file)">
          <a class="el-upload-list__item-name">
            <i class="el-icon-document"></i>
            {{file.name}}
          </a>
          <i class="el-icon-close"
             v-if="!disabled"
             @click.stop="handleRemove(file)"></i>
        </span>
      </template>

    </el-upload>
  </div>
</template>

<script>
import create from "core/create";
import props from "common/common/props.js";
import event from "common/common/event.js";
import locale from "core/locale";
import { getAsVal } from "utils/util";
import { detailImg, fileToBase64 } from "plugin/canvas/";
import { getToken } from "plugin/qiniu/";
import { getClient } from "plugin/ali/";
import packages from "core/packages";
import { typeList } from 'global/variable'
function getFileUrl (home, uri = '') {
  return uri.match(/(^http:\/\/|^https:\/\/|^\/\/|data:image\/)/) ? uri : home + uri
};
export default create({
  name: "upload",
  mixins: [props(), event(), locale],
  data () {
    return {
      res: '',
      loading: false,
      text: [],
      file: {},
      menu: false,
      reload: Math.random()
    }
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    showFileList: {
      type: Boolean,
      default: true
    },
    fileType: {
      type: String,
    },
    oss: {
      type: String
    },
    limit: {
      type: Number,
      default: 10
    },
    headers: {
      type: Object,
      default: () => {
        return {}
      }
    },
    accept: {
      type: [String, Array],
      default: ""
    },
    canvasOption: {
      type: Object,
      default: () => {
        return {};
      }
    },
    cropperOption: {
      type: Object,
      default: () => {
        return {};
      }
    },
    fileSize: {
      type: Number
    },
    dragFile: {
      type: Boolean,
      default: false
    },
    drag: {
      type: Boolean,
      default: false
    },
    loadText: {
      type: String,
      default: "Loading..."
    },
    action: {
      type: String,
      default: ""
    },
    uploadBefore: Function,
    uploadAfter: Function,
    uploadDelete: Function,
    uploadPreview: Function,
    uploadError: Function,
    uploadExceed: Function,
    httpRequest: Function
  },
  computed: {
    isMultiple () {
      return this.isArray || this.isString || this.stringMode
    },
    acceptList () {
      if (Array.isArray(this.accept)) {
        return this.accept.join(',')
      }
      return this.accept
    },
    homeUrl () {
      return this.propsHttp.home || ''
    },
    fileName () {
      return this.propsHttp.fileName || 'file'
    },
    isAliOss () {
      return this.oss === "ali";
    },
    isQiniuOss () {
      return this.oss === "qiniu";
    },
    isPictureImg () {
      return this.listType === "picture-img";
    },
    //单个头像图片
    imgUrl () {
      if (!this.validatenull(this.text)) {
        return getFileUrl(this.homeUrl, this.text[0]);
      }
    },
    fileList () {
      let list = [];
      (this.text || []).forEach((ele, index) => {
        if (ele) {
          let name;
          //处理单个url链接取最后为label
          if (this.isMultiple) {
            let i = ele.lastIndexOf('/');
            name = ele.substring(i + 1);
          }
          let url = getFileUrl(this.homeUrl, this.isMultiple ? ele : ele[this.valueKey]);
          list.push({
            uid: index + '',
            status: 'done',
            type: this.getIsVideo(url),
            name: this.isMultiple ? name : ele[this.labelKey],
            url: url
          });
        }
      });
      return list;
    }
  },
  mounted () {
    if (this.drag) {
      this.setSort()
    }
  },
  methods: {
    getIsVideo (url) {
      if (typeList.video.test(url) || this.fileType == 'video') {
        return 'video'
      } else if (typeList.img.test(url) || this.fileType == 'img') {
        return 'img'
      }
      return this.listType ? 'img' : ''
    },
    setSort () {
      if (!window.Sortable) {
        packages.logs('Sortable');
        return
      }
      const el = this.$el.querySelectorAll('.avue-upload > ul')[0]
      window.Sortable.create(el, {
        animation: 100,
        onEnd: evt => {
          const targetRow = this.text.splice(evt.oldIndex, 1)[0];
          this.text.splice(evt.newIndex, 0, targetRow)
          this.reload = Math.random();
          this.$nextTick(() => this.setSort())
        }
      })
    },
    handleSuccess (file) {
      if (this.isPictureImg) {
        this.text.splice(0, 1, file[this.urlKey])
      } else if (this.isMultiple) {
        this.text.push(file[this.urlKey]);
      } else {
        let obj = {};
        obj[this.labelKey] = file[this.nameKey];
        obj[this.valueKey] = file[this.urlKey];
        this.text.push(obj);
      }
    },
    handleRemove (file, fileList) {
      this.beforeRemove(file).then(() => {
        this.delete(file);
      })
    },
    handleError (error) {
      this.uploadError && this.uploadError(error, this.column)
    },
    delete (file) {
      (this.text || []).forEach((ele, index) => {
        if ((this.isMultiple ? ele : ele[this.valueKey]) === file.url.replace(this.homeUrl, '')) {
          this.text.splice(index, 1);
        }
      });
    },
    show (data) {
      this.loading = false;
      this.handleSuccess(data || this.res);
    },
    hide (msg) {
      this.loading = false;
      this.handleError(msg);
    },
    handleFileChange (file, fileList) {
      fileList.splice(fileList.length - 1, 1);
    },
    httpUpload (config) {
      if (typeof this.httpRequest === "function") {
        this.httpRequest(config)
        return
      }
      this.loading = true;
      let file = config.file;
      const fileSize = file.size / 1024;
      this.file = config.file;
      if (!this.validatenull(fileSize) && fileSize > this.fileSize) {
        this.hide("文件太大不符合");
        return;
      }
      const headers = Object.assign(this.headers, { "Content-Type": "multipart/form-data" });
      //oss配置属性
      let oss_config = {};
      let client = {};
      let param = new FormData();
      const done = () => {
        const callback = (newFile) => {
          let url = this.action;
          for (let o in this.data) {
            param.append(o, this.data[o]);
          }
          const uploadfile = newFile || file;
          param.append(this.fileName, uploadfile);
          //七牛云oss存储
          if (this.isQiniuOss) {
            if (!window.CryptoJS) {
              packages.logs("CryptoJS");
              this.hide();
              return;
            }
            oss_config = this.$AVUE.qiniu;
            const token = getToken(oss_config.AK, oss_config.SK, {
              scope: oss_config.scope,
              deadline: new Date().getTime() + oss_config.deadline * 3600
            });
            param.append("token", token);
            url = oss_config.bucket
          } else if (this.isAliOss) {
            if (!window.OSS) {
              packages.logs("AliOSS");
              this.hide();
              return;
            }
            oss_config = this.$AVUE.ali;
            client = getClient(oss_config);
          }
          (() => {
            if (this.isAliOss) {
              return client.put(uploadfile.name, uploadfile, {
                headers: this.headers
              });
            } else {
              return this.$axios.post(url, param, { headers });
            }
          })()
            .then(res => {
              this.res = {};
              if (this.isQiniuOss) {
                res.data.key = oss_config.url + res.data.key;
              }

              if (this.isAliOss) {
                this.res = getAsVal(res, this.resKey);
              } else {
                this.res = getAsVal(res.data, this.resKey);
              }

              if (typeof this.uploadAfter === "function")
                this.uploadAfter(
                  this.res,
                  this.show,
                  () => {
                    this.loading = false;
                  },
                  this.column
                );
              else this.show(this.res);
            })
            .catch(error => {
              if (typeof this.uploadAfter === "function")
                this.uploadAfter(error, this.hide, () => {
                  this.loading = false;
                }, this.column);
              else this.hide(error);
            });
        };
        if (typeof this.uploadBefore === "function")
          this.uploadBefore(this.file, callback, () => {
            this.loading = false;
          }, this.column);
        else callback();
      };
      if (!this.validatenull(this.cropperOption)) {
        fileToBase64(this.file, (res) => {
          let option = Object.assign(this.cropperOption, {
            img: res,
            type: 'file',
            callback: res => {
              file = res;
              done();
            },
            cancel: () => {
              this.loading = false
            }
          })
          this.$ImageCropper(option)
        })
      } else if (!this.validatenull(this.canvasOption)) {
        detailImg(file, this.canvasOption, res => {
          file = res;
          done();
        });
      } else {
        done();
      }
    },
    handleExceed (files, fileList) {
      this.uploadExceed && this.uploadExceed(this.limit, files, fileList, this.column);
    },
    handlePreview (file) {
      const callback = () => {
        let index = this.fileList.findIndex(ele => {
          return ele.url === file.url;
        })
        this.$ImagePreview(this.fileList, index);
      }
      if (typeof this.uploadPreview === "function") {
        this.uploadPreview(file, this.column, callback);
      } else {
        callback();
      }
    },
    handleDelete (file) {
      this.beforeRemove(file).then(() => {
        this.text = [];
        this.menu = false;
      })
    },
    beforeRemove (file) {
      if (typeof this.uploadDelete === "function") {
        return this.uploadDelete(file, this.column);
      } else {
        return Promise.resolve()
      }
    }
  }
})
</script>
