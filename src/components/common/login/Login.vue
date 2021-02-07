<template>
	<div class="login">
		<div class="login-box">
			<div class="lg-img">
				<img src="~assets/img/04.jpg" />
			</div>
			<el-form :model="Form" label-width="0px" :rules="rules" ref="Form" class="demo-Form">
				<el-form-item prop="username">
					<el-input v-model="Form.username" prefix-icon="iconfont icon-user"></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input v-model="Form.password" prefix-icon="iconfont icon-3702mima" type="password">

					</el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('Form')">立即创建</el-button>
					<el-button @click="resetForm('Form')">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import {
		postLoginData
	} from 'network/login/Login.js'
	export default {
		data() {
			var checkpass = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('密码不能为空！'))
				}
				setTimeout(() => {
					if (Number.isInteger(+value)) {
						callback()
					} else {
						callback(new Error('请输数字'))
					}
				}, 100)
			}
			return {
				Form: {
					username: '',
					password: ''
				},
				rules: {
					username: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}],
					password: [{
							validator: checkpass,
							trigger: 'blur'
						},
						{
							min: 6,
							max: 12,
							message: '请输入长度在 6 到 12 个数字',
							trigger: 'blur'
						}
					]
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate(valid => {
					if (valid) {
						postLoginData(this.Form)
							.then(res => {
								console.log(res)
								if (res.meta.status==200) {
									this.$message({
										showClose: true,
										message: res.meta.msg,
										type: 'success'
									});
		// 1.将登录成功之后的token,保存到客户端的sessionStorage 中
		// 1.1项目中出了登录之外的其他API接口，必须在登录之后才能访问
		// 1.2 token只应在当前网站打开期间生效，所以将token 保存在sessionStorage 中
							window.sessionStorage.setItem("token",res.data.token)
		// 2.通过编程式导航跳转到后台主页，路由地址是/home
							this.$router.replace('/home')

								} else {
									this.$message({
										showClose: true,
										message: res.meta.msg,
										type: 'error'
									});
								}
							})
							.catch(err => {
								this.$message({
									showClose: true,
									message: '登录失败' + err,
									type: 'warning'
								});
							})
					} else {
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>

<style lang="less" scoped>
	.login {
		height: 100%;
		background-color: #2b4b6b;
		text-align: center;
	}

	.demo-Form {
		width: 100%;
		position: absolute;
		bottom: 0;
		padding: 0 20px;
		box-sizing: border-box;
	}

	.login-box {
		padding: 10px;
		width: 450px;
		height: 300px;
		border-radius: 3px;
		background-color: white;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);

		.lg-img {
			width: 130px;
			height: 130px;
			border: 1px solid #eee;
			border-radius: 50%;
			box-shadow: 0 0 10px #2c20aa;
			position: absolute;
			left: 50%;
			transform: translate(-50%, -50%);

			img {
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}
	}
</style>
