<template>
  <div>
    <el-dialog title="分配权限" :visible="showPermDialog" @close="btnCancel">
      <el-tree
        ref="permTree"
        :data="permData"
        :props="defaultProps"
        :default-expand-all="true"
        show-checkbox
        :check-strictly="true"
        node-key="id"
        :default-checked-keys="selectCheck"
      />
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
import { getPermissionList } from '@/api/permission'
import { tranListToTreeData } from '@/utils'
import { getRoleDetail, assignPerm } from '@/api/setting'
export default {
  name: 'AssignPermission',
  props: {
    showPermDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      permData: [], // 专门用来接收权限数据 树形数据
      defaultProps: {
        // 定义显示字段的名称和子属性的字段名称
        label: 'name'
      },
      roleId: null, // 用来记录当前分配权限的id
      selectCheck: [] // 定义一个数组来接收 已经选中的节点
    }
  },
  methods: {
    async getPermissionList(id) {
      // 获取数据
      this.permData = tranListToTreeData(await getPermissionList(), '0')
      this.roleId = id
      const { permIds } = await getRoleDetail(id) // 当前角色所拥有的权限点的数据
      this.selectCheck = permIds
    },
    async btnOK() {
      await assignPerm({ permIds: this.$refs.permTree.getCheckedKeys(), id: this.roleId })
      this.$message.success('分配权限成功')
      this.$emit('update:showPermDialog', false)
    },
    btnCancel() {
      this.selectCheck = [] // 重置数据
      this.$emit('update:showPermDialog', false)
    }
  }
}
</script>

<style>

</style>
