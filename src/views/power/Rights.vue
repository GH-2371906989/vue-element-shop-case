<template>
	<div class="rights">
		<!-- 面包屑导航区域 -->
		<bread-crumb>
			<template #breadcrumb-item>
				<el-breadcrumb-item>权限管理</el-breadcrumb-item>
				<el-breadcrumb-item>权限列表</el-breadcrumb-item>
			</template>
		</bread-crumb>
		<!-- 卡片视图区域 -->
		<el-card class="box-card">
			<!-- 表格区域 -->
			<el-table :data="rithtlist" border style="width: 100%" stripe>
				<el-table-column type="index" label="#">
				</el-table-column>
				<el-table-column prop="authName" label="权限名称">
				</el-table-column>
				<el-table-column prop="path" label="路径">
				</el-table-column>
				<el-table-column prop="level" label="权限等级">
					<template slot-scope="scope">
						<el-tag type="success" v-if="scope.row.level==='0'">一级</el-tag>
						<el-tag type="info" v-else-if="scope.row.level=='1'">二级</el-tag>
						<el-tag type="warning" v-else>三级</el-tag>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
	</div>
</template>

<script>
	/* 组件 */
	import BreadCrumb from 'components/common/breadcrumb/BreadCrumb.vue'

	/* network */
	import {
		request
	} from 'network/request.js'
	export default {
		data() {
			return {
				rithtlist: []
			}
		},
		components: {
			BreadCrumb
		},
		methods: {
			getrightslist() {
				request({
						url: "rights/list"
					})
					.then(req => {
						if (req.meta.status != 200) {
							this.$message.error(req.meta.msg)
						} else {
							this.rithtlist = req.data
						}
					})
			}
		},
		created() {
			this.getrightslist()
		}

	}
</script>

<style>
</style>
