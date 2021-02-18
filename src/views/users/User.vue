<template>
	<div class="user">
		<!-- 面包屑导航区域 -->
		<bread-crumb>
			<template #breadcrumb-item>
				<el-breadcrumb-item>用户管理</el-breadcrumb-item>
				<el-breadcrumb-item>用户列表</el-breadcrumb-item>
			</template>
		</bread-crumb>
		<!-- 卡片视图区域 -->
		<el-card class="box-card">			
			<el-row :gutter="20">
				<!-- 查询区域 -->
				<el-col :span="10">
					<el-input placeholder="请输入内容" v-model="queryinfo.query" clearable @clear="inputclear">
						<el-button slot="append" icon="el-icon-search" @click="getuserlist()"></el-button>
					</el-input>
				</el-col>
				<!-- 添加区域 -->
				<el-col :span="6">
					<el-button type="primary" @click="adialogVisible = true">
						添加用户
					</el-button>
				</el-col>
			</el-row>
			<!-- 表格区域 -->
			<el-table :data="userlist" height="250" border style="width: 100%">
				<el-table-column type="index" label="#">
				</el-table-column>
				<el-table-column prop="username" label="姓名">
				</el-table-column>
				<el-table-column prop="email" label="邮箱" width="180px">
				</el-table-column>
				<el-table-column prop="mobile" label="电话">
				</el-table-column>
				<el-table-column prop="role_name" label="超级管理员">
				</el-table-column>
				<el-table-column  label="状态">
					<template slot-scope="scope">
						<el-switch v-model="scope.row.mg_state" active-color="#55aaff" inactive-color="#ff4949" @change="userstatechange(scope.row)">
						</el-switch>
					</template>
				</el-table-column>
				<!-- 操作区域 -->
				<el-table-column label="操作" width="180px">
					<template slot-scope="scope">
						<el-tooltip content="编辑" placement="top" :enterable="false">
							<!-- 编辑 -->
							<el-button type="primary" icon="el-icon-edit" size="mini" @click="editform(scope.row.id)">
								
							</el-button>
						</el-tooltip>
						<el-tooltip content="删除" placement="top" :enterable="false">
							<!-- 删除 -->
							<el-button type="danger" icon="el-icon-delete" size="mini" @click="userdelect(scope.row)">
								
							</el-button>
						</el-tooltip>
						<el-tooltip content="分派角色" placement="top" :enterable="false">
							<!-- 分派角色 -->
							<el-button type="warning" icon="el-icon-setting" size="mini">
								
							</el-button>
						</el-tooltip>
					</template>
				</el-table-column>
			</el-table>
			<div style="text-align: center;">
				<el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="total" :page-size="2"
				 :page-sizes="[1,2,4,6,8,10]" @size-change="userSizeChange" @current-change="userCurrentChange" :current-page="queryinfo.pagenum">
				</el-pagination>
			</div>
		</el-card>
		<!-- 添加用户的dialog -->
		<el-dialog title="添加用户" :visible.sync="adialogVisible">
			<!-- 主题区域 -->
			<el-form :model="form" label-position="top" status-icon :rules="rules" ref="ruleForm">
				<el-form-item label="用户名:" prop="username" :label-width="formLabelWidth">
					<el-input v-model="form.username" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码:" prop="password" :label-width="formLabelWidth">
					<el-input v-model="form.password" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="电子邮件:" prop="email" :label-width="formLabelWidth">
					<el-input v-model="form.email" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="电话号码:" prop="mobile" :label-width="formLabelWidth">
					<el-input v-model="form.mobile" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<!-- 底部区域 -->
			<div slot="footer" class="dialog-footer">
				<el-button @click="resetForm">取 消</el-button>
				<el-button type="primary" @click="submitForm()">
					提交
				</el-button>
			</div>
		</el-dialog>
		<!-- 编辑用户的dialog -->
		<el-dialog title="编辑用户" :visible.sync="edialogVisible">
			<!-- 主题区域 -->
			<el-form :model="eform" label-position="top" status-icon :rules="erules" ref="eruleForm">
				<el-form-item label="用户名:" :label-width="formLabelWidth">
					<el-input v-model="eform.username" autocomplete="off" disabled></el-input>
				</el-form-item>
				<el-form-item label="电子邮件:" prop="email" :label-width="formLabelWidth">
					<el-input v-model="eform.email" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="电话号码:" prop="mobile" :label-width="formLabelWidth">
					<el-input v-model="eform.mobile" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<!-- 底部区域 -->
			<div slot="footer" class="dialog-footer">
				<el-button @click="eresetForm">取 消</el-button>
				<el-button type="primary" @click="esubmitForm">
					提交
				</el-button>
			</div>
		</el-dialog>
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
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				}
				if (value.length >= 7 && value.length <= 15) {
					callback();
				} else {
					callback(new Error('长度在7~15'));
				}
			};
			var validatemobile = (rule, value, callback) => {
				const reg = /^1[3|4|5|6|7|8|9]\d{9}$/;
				if (!value) {
					return callback(new Error('请填写手机号码！'))
				} else if (!reg.test(value)) {
					return callback(new Error('请填写正确的手机号码！'))
				} else {
					callback()
				}
			};
			return {
				/* 控制用户编辑框的显示与隐藏 */
				edialogVisible: false,
				/* 添加用户表单form表单 */
				eform: {},
				/* 控制用户添加框的显示与隐藏 */
				adialogVisible: false,
				/* 添加用户表单form表单 */
				form: {
					username: '',
					password: '',
					email: '',
					mobile: ''
				},
				formLabelWidth: '120px',
				queryinfo: {
					query: '',
					pagenum: 1,
					pagesize: 2
				},
				userlist: [],
				total: 0,
				erules: {
					email: [{
							required: true,
							message: '请输入邮箱地址',
							trigger: 'blur'
						},
						{
							type: 'email',
							message: '请输入正确的邮箱地址',
							trigger: 'blur'
						}
					],
					mobile: [{
							required: true,
							message: '请输入电话号码',
							trigger: 'blur'
						},
						{
							validator: validatemobile,
							trigger: 'blur'
						}
					]
				},
				rules: {
					username: [{
							required: true,
							message: '请输入姓名',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 10,
							message: '长度在 3 到 10 个字符',
							trigger: 'blur'
						}
					],
					password: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					email: [{
							required: true,
							message: '请输入邮箱地址',
							trigger: 'blur'
						},
						{
							type: 'email',
							message: '请输入正确的邮箱地址',
							trigger: 'blur'
						}
					],
					mobile: [{
							required: true,
							message: '请输入电话号码',
							trigger: 'blur'
						},
						{
							validator: validatemobile,
							trigger: 'blur'
						}
					]
				}
			}
		},
		components: {
			BreadCrumb
		},
		methods: {
			userdelect(val) {
				this.$confirm('此用户将永久产出，是否确定删除用户:' + val.username, '确认信息', {
						distinguishCancelAndClose: true,
						confirmButtonText: '删除',
						cancelButtonText: '取消删除'
					})
					.then(() => {
						request({
								url: "/users/" + val.id,
								method: "delete"
							})
							.then(req => {
								if (req.meta.status != 200)
									return this.$message.error(req.meta.msg)

								//记录总页数,
								//此时已经实现删除操作，所以total的值需要减1，Math.ceil是向上取整，保证始终大于等于1
								const totalPage = Math.ceil((this.total - 1) / this.queryinfo.pagesize)
								//记录当前页码
								//记住删除最后一条数据时当前码是最后一页
								const pagenum = this.queryinfo.pagenum > totalPage ? totalPage : this.queryinfo.pagenum
								//实现跳转
								this.queryinfo.pagenum = pagenum < 1 ? 1 : pagenum
								console.log(this.queryinfo.pagenum)
								this.getuserlist(this.queryinfo.pagenum)

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
			eresetForm() {
				this.edialogVisible = false
				this.$refs.eruleForm.resetFields();
			},
			esubmitForm() {
				this.$refs.eruleForm.validate((valid) => {
					if (valid) {
						request({
								url: '/users/' + this.eform.id,
								method: "put",
								data: {
									email: this.eform.email,
									mobile: this.eform.mobile
								}
							})
							.then(req => {
								if (req.meta.status != 200)
									return this.$message.error(req.meta.msg)
								this.edialogVisible = false
								this.getuserlist()
								return this.$message.success(req.meta.msg)
							})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			editform(id) {
				request({
						url: "users/" + id,
						method: "get"
					})
					.then(req => {
						if (req.meta.status != 200)
							return this.$message.error(req.meta.msg)
						this.eform = req.data
						this.edialogVisible = true
					})
			},
			submitForm() {
				this.$refs.ruleForm.validate((valid) => {
					if (valid) {
						request({
								url: "/users",
								method: "post",
								data: this.form
							})
							.then(req => {
								if (req.meta.status != 201) {
									this.$message.error(req.meta.msg)
								}
								this.$message.success(req.meta.msg)
								this.adialogVisible = false
								this.getuserlist()
								this.$refs.ruleForm.resetFields();
							})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm() {
				this.adialogVisible = false
				this.$refs.ruleForm.resetFields();
			},
			inputclear() {
				this.getuserlist()
			},
			userstatechange(val) {
				request({
						url: '/users/' + val.id + '/state/' + val.mg_state,
						method: "put"
					})
					.then(req => {
						if (req.meta.status != 200) {
							val.mg_state = !val.mg_state
							this.$message.error(req.meta.msg)
						}
						this.$message.success(req.meta.msg)
					})
			},
			userSizeChange(val) {
				this.queryinfo.pagesize = val
				this.getuserlist()
			},
			userCurrentChange(val) {
				this.queryinfo.pagenum = val
				this.getuserlist()
			},
			getuserlist() {
				request({
						url: '/users',
						params: this.queryinfo
					})
					.then(req => {
						if (req.meta.status == 200) {
							this.userlist = req.data.users
							this.total = req.data.total
						}
					})
			}
		},
		created() {
			this.getuserlist()
		}
	}
</script>

<style>
</style>
