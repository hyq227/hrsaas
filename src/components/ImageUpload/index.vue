<template>
  <div>
    <!-- action是必填属性，可以给其一个#防止报错 -->
    <el-upload
      list-type="picture-card"
      action="#"
      :limit="1"
      :on-preview="preview"
      :file-list="fileList"
      :class="{disabled:fileComputed}"
      :on-remove="handleRemove"
      :on-change="changeFile"
      :before-upload="beforeUpload"
      :http-request="upLoad"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress v-if="showPercent" :percentage="percent" />
    <el-dialog :visible.sync="showDialog" title="图片预览">
      <img :src="imgURL" style="width:100%" alt="">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5' // 引入腾讯云的包
const cos = new COS({
  SecretId: 'AKIDCgvtb1B5i38wUlmfMo1zh9LIzQbXFhtq',
  SecretKey: 'kETSDixxiDSRAerpX0DAsLZWDk24pLcd'
})
export default {
  data() {
    return {
      fileList: [],
      showDialog: false,
      imgURL: null,
      currentFileUid: null, // 上传图片的uid
      percent: 0, // 进度条进度
      showPercent: false // 控制进度条关闭开启
    }
  },
  computed: {
    // 判断组件是否上传完一张
    fileComputed() {
      return this.fileList.length === 1
    }
  },
  methods: {
    // 点击预览事件
    preview(file) {
      this.imgURL = file.url
      this.showDialog = true
    },
    // 删除图片
    // file 是点击删除的文件，fileList是删除以后的文件
    handleRemove(file, fileList) {
      //   this.fileList = fileList
      this.fileList = this.fileList.filter(item => item.uid !== file.uid)
    },
    // 添加图片
    // 修改文件时触发
    // 此时可以用fileList 因为该方法会进来很多遍 不能每次都去push
    // 因为fileList参数是当前传进来的最新参数 我们只需要将其转化成数组即可 需要转化成一个新的数组
    // [] => [...fileList] [] => fileList.map()
    // 上传成功之后 还会进来 需要实现上传代码的逻辑 这里才会成功
    changeFile(file, fileList) {
      this.fileList = fileList.map(item => item)
    },
    // 上传图片大小格式检查
    beforeUpload(file) {
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.includes(file.type)) {
        // 格式检查
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
      }
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('图片大小最大不能超过5M')
        return false
      }
      this.showPercent = true
      this.currentFileUid = file.uid
      return true // 不返回认为是undefined
    },
    upLoad(params) {
      if (params.file) {
        cos.putObject({
          Bucket: 'hyq-123456-1312809010', /* 填入您自己的存储桶，必须字段 */
          Region: 'ap-nanjing', /* 存储桶所在地域，例如ap-beijing，必须字段 */
          Key: params.file.name, /* 文件名 */
          StorageClass: 'STANDARD',
          Body: params.file, // 上传文件对象
          onProgress: params => {
            // 上传进度回调函数
            this.percent = params.percent * 100
          }
        }, (err, data) => {
          console.log(err || data)
          if (!err && data.statusCode === 200) {
            // 数据上传成功
            this.fileList = this.fileList.map(item => {
              if (item.uid === this.currentFileUid) {
                // 将成功的地址赋值给原来的url属性
                return { url: 'http://' + data.Location, upload: true }
                // upload 为true 表示这张图片已经上传完毕 这个属性要为我们后期应用的时候做标记
              }
              return item
            })
            setTimeout(() => {
              this.showPercent = false
              this.percent = 0
            }, 2000)
          }
        })
      }
    }
  }
}
</script>

<style>
/* 将具有该样式的进行隐藏，控制上传按钮进行隐藏 */
.disabled .el-upload--picture-card {
    display: none;
}
</style>
