<template>
	<div>
		<el-button type="info" @click="signout">
			退出
		</el-button>
	</div>
</template>

<script>
	export default{
		methods:{
			signout(){
				window.sessionStorage.clear()
				this.$router.replace('/login')
			}
		}
	}
</script>

<style>
</style>
