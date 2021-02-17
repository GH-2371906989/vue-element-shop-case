<template>
	<el-container class="home-container">
		<!-- 头部区域 -->
		<el-header>
			<div>
				<span>后台管理系统</span>
			</div>
			<el-dropdown @command="signout">
				<i class="el-icon-setting" style="margin-right: 15px"></i>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item command="新增">新增</el-dropdown-item>
					<el-dropdown-item command="退出" divided>退出</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</el-header>
		<el-container>			
			<!-- 侧边栏区域 -->
			<el-aside :width="isCollapse?'64px':'200px'">
				<div class="toggle-button" @click="isCollapse=!isCollapse">
					|||
				</div>
				<el-menu  class="el-menu-vertical-demo" default-active=""
				background-color="#313743" text-color="#fff" unique-opened
				active-text-color="#458ff1" :collapse="isCollapse"
				:collapse-transition="false" router> 
					<!-- 菜单循环-->
					<el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
						<template slot="title">
							<i :class="iconsobj[item.authName]"></i>
							<span>{{" "+item.authName}}</span>
						</template>
						<!-- 子菜单循环 -->
						<el-menu-item :index="'/'+citem.path" 
						v-for="citem in item.children">
						        <i class="el-icon-setting"></i>
						        <span slot="title">{{citem.authName}}</span>
						      </el-menu-item>
					</el-submenu>
				</el-menu>
			</el-aside>
			<!-- 主体区域 -->
			<el-main>
				<router-view />
			</el-main>
		</el-container>
	</el-container>
</template>



<script>
	import {
		request
	} from 'network/request.js'
	export default {
		data() {
			return {
				menulist:[],
				iconsobj:{
					'用户管理':"iconfont icon-users",
					'权限管理':"iconfont icon-tijikongjian",
					'商品管理':"iconfont icon-shangpin",
					'订单管理':"iconfont icon-danju",
					'数据统计':"iconfont icon-baobiao",
				},
				isCollapse:false
			}
		},
		methods: {
			signout(command) {
				if (command == "退出") {
					window.sessionStorage.clear()
					this.$router.replace('/login')
				}
			},
			grtMenuList() {
				request({
						url: "/menus"
					})
					.then(res => {
						if (res.meta.status != 200)
							return this.$message({
								message: res.meta.msg,
								type: 'warning'
							});
						this.menulist=res.data
					})
			}
		},
		created() {
			this.grtMenuList();
		}
	}
</script>

<style lang="less" scoped>
	.el-header {
		background-color: #363d40;
		display: flex;
		justify-content: space-between;
		align-items: center;

		span {
			font-size: 25px;
			color: white;
		}
	}

	.el-aside {
		background-color: #313743;
		.el-menu{
			border-right: 0px;
		}
	}

	.el-main {
		background-color: #e9edf1;
	}

	.home-container {
		height: 100%;
	}
	.toggle-button{
		background-color: #475167;
		text-align: center;
		font-size: 10px;
		line-height: 24px;
		color: #fff;
		letter-spacing: 0.2em;
		cursor: pointer;
	}
</style>
