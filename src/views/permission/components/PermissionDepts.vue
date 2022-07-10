<template>
  <div>
    <el-dialog :visible="showDialog" :title="showText" @close="btnCancel">
      <el-form ref="perForm" :model="formData" :rules="rules" label-width="120px">
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="formData.name" style="width:90%" />
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="formData.code" style="width:90%" />
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input v-model="formData.description" style="width:90%" />
        </el-form-item>
        <el-form-item label="开启">
          <el-switch
            v-model="formData.enVisible"
            active-value="1"
            inactive-value="0"
          />
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" type="primary" @click="btnOK">确定</el-button>
          <el-button size="small" @click="btnCancel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { addPermission, updatePermission, getPermissionDetail } from '@/api/permission'
export default {
  name: 'EditDepts',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      },
      rules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    showText() {
      return this.formData.id ? '编辑权限' : '添加权限'
    }
  },
  methods: {
    // 记录当前添加的类型和父标识
    addPermission(type, pid) {
      this.formData.type = type
      this.formData.pid = pid
    },
    async btnOK() {
      try {
        await this.$refs.perForm.validate()
        if (this.formData.id) {
          // 编辑功能
          await updatePermission(this.formData)
        } else {
          // 添加功能
          await addPermission(this.formData)
        }
        this.$emit('getList')
        this.$emit('update:showDialog', false)
        this.$message.success('添加成功')
      } catch (error) {
        console.log(error)
      }
    },
    btnCancel() {
      this.formData = {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      }
      this.$refs.perForm.resetFields()
      this.$emit('update:showDialog', false)
    },
    async getPermissionDetail(id) {
      this.formData = await getPermissionDetail(id)
    }
  }
}
</script>

<style>

</style>
