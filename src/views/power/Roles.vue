<template>
	<div class="roles">
		<!-- 面包屑导航区域 -->
		<bread-crumb>
			<template #breadcrumb-item>
				<el-breadcrumb-item>权限管理</el-breadcrumb-item>
				<el-breadcrumb-item>角色列表</el-breadcrumb-item>
			</template>
		</bread-crumb>
		<!-- 卡片视图区域 -->
		<el-card class="box-card">
			<!-- 添加区域 -->
			<el-col :span="6">
				<el-button type="primary" @click="adialogVisible = true">
					添加角色
				</el-button>
			</el-col>
			<!-- 角色表格区域 -->
			<el-table :data="roleslist" border style="width: 100%" stripe>
				<!-- 展开列 -->
				<el-table-column type="expand">
					<!-- 展开列的渲染 -->
					<template slot-scope="scope">
						<el-row v-for="(item1,i1 ) in scope.row.children" 
						:key="item1.id" :class="['bd-buttom',i1===0?'bdtop':'','vcenter']">
							<!-- 一级权限区域 -->
							<el-col :span="5">
								<el-tag type="success" closable
								@close="removerightbyid(scope.row,item1.id)">
									{{item1.authName}}
								</el-tag>	
								<i class="el-icon-caret-right"></i>
							</el-col>
							<!-- 二级/三级权限区域 -->
							<el-col :span="19">
								<!-- 渲染二级菜单 -->
								<el-row v-for="(item2,i2 ) in item1.children"
								:key="item2.id" 
								:class="['bd-buttom',i2===0?'bdtop':'','vcenter']">
									<el-col :span="6">
										<el-tag type="info" closable
										@close="removerightbyid(scope.row,item2.id)">
											{{item2.authName}}
										</el-tag>	
										<i class="el-icon-caret-right"></i>
									</el-col>
									<el-col :span="18">
										<el-tag type="warning" closable
										v-for="(item3,i3 ) in item2.children"
										:key="item3.id" 
										@close="removerightbyid(scope.row,item3.id)">
											{{item3.authName}}
										</el-tag>
									</el-col>
								</el-row>
							</el-col>
						</el-row>
					</template>
				</el-table-column>
				<!-- 索引列 -->
				<el-table-column type="index" label="#">
				</el-table-column>
				<el-table-column prop="roleName" label="角色名称">
				</el-table-column>
				<el-table-column prop="roleDesc" label="角色描述">
				</el-table-column>
				<!-- 操作区域 -->
				<el-table-column label="操作" width="300px">
					<template slot-scope="scope">
						<el-tooltip content="编辑" placement="top" :enterable="false">
							<!-- 编辑 -->
							<el-button type="primary" icon="el-icon-edit" 
							size="mini" >
								编辑
							</el-button>
						</el-tooltip>
						<el-tooltip content="删除" placement="top" :enterable="false">
							<!-- 删除 -->
							<el-button type="danger" icon="el-icon-delete" 
							size="mini" >
								删除
							</el-button>
						</el-tooltip>
						<el-tooltip content="分派角色" placement="top" 
						:enterable="false">
							<!-- 分派角色 -->
							<el-button type="warning" icon="el-icon-setting" 
							size="mini">
								分配权限
							</el-button>
						</el-tooltip>
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
	export default{
		data() {
			return {
				roleslist: []
			}
		},
		components: {
			BreadCrumb
		},
		methods: {
			/* 根据ID删除对应的权限 */
			removerightbyid(role,rightId){
				this.$confirm('此权限将永久删除，是否确定删除', '确认信息', {
						distinguishCancelAndClose: true,
						confirmButtonText: '删除',
						cancelButtonText: '取消删除'
					})
					.then(() => {
						request({
							url:"roles/"+role.id+"/rights/"+rightId,
							method: "delete"
						})
						.then(req=>{
							if (req.meta.status != 200) {
								this.$message.error(req.meta.msg)
							} else {
								this.$message.success(req.meta.msg)
								role.children=req.data
							}
						})
					})
					.catch(action => {
						this.$message({
							type: 'info',
							message: action === 'cancel' ?
								'放弃删除并离开页面' :
								'停留在当前页面'
						})
					});
			},
			getroleslist() {
				request({
						url: "roles"
					})
					.then(req => {
						if (req.meta.status != 200) {
							this.$message.error(req.meta.msg)
						} else {
							this.roleslist = req.data
						}
					})
			}
		},
		created() {
			this.getroleslist()
		}
	}
</script>

<style scoped>
	.el-tag{
		margin: 7px;
	}
	.bdtop{
		border-top: 1px solid #eee;
	}
	.bd-buttom{
		border-bottom: 1px solid #eee;
	}
	.vcenter{
		display: flex;
		align-items: center;
	}
</style>
