<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <template v-slot:after>
          <el-button size="small" type="primary" @click="addPermission(1,'0')">添加权限</el-button>
        </template>
      </page-tools>
      <el-table :data="list" border row-key="id">
        <el-table-column label="名称" prop="name" />
        <el-table-column align="center" label="标识" prop="code" />
        <el-table-column align="center" label="描述" prop="description" />
        <el-table-column align="center" label="操作">
          <template slot-scope="{row}">
            <!-- type 为 1 为访问权限 type 为 2 为功能权限 -->
            <el-button v-if="row.type === 1" type="text" @click="addPermission(2,row.id)">添加</el-button>
            <el-button type="text" @click="editPermission(row.id)">编辑</el-button>
            <el-button type="text" @click="delPermission(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <PermissionDepts ref="PermissionRef" :show-dialog.sync="showDialog" @getList="getPermissionList" />
  </div>
</template>

<script>
import { getPermissionList, delPermission } from '@/api/permission'
import { tranListToTreeData } from '@/utils'
import PermissionDepts from '@/views/permission/components/PermissionDepts.vue'
export default {
  name: 'Permission',
  components: {
    PermissionDepts
  },
  data() {
    return {
      list: [], // 权限数据
      showDialog: false
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    // 获取所有权限
    async getPermissionList() {
      // 将数据转为树形
      this.list = tranListToTreeData(await getPermissionList(), '0')
    },
    // 删除权限
    async delPermission(id) {
      try {
        await this.$confirm('确定要删除该数据吗？')
        await delPermission(id)
        this.getPermissionList()
        this.$message.success('删除成功')
      } catch (error) {
        console.log(error)
      }
    },
    addPermission(type, pid) {
      this.showDialog = true
      this.$refs.PermissionRef.addPermission(type, pid)
    },
    editPermission(id) {
      this.$refs.PermissionRef.getPermissionDetail(id)
      this.showDialog = true
    }
  }
}
</script>

<style>

</style>
