<template>
	<div class="breadcrumb">
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
		  <slot name="breadcrumb-item"></slot>
		</el-breadcrumb>
	</div>
</template>

<script>
	export default{
		
	}
</script>

<style>
	.breadcrumb{
		margin-bottom: 20px;
	}
</style>
