<template>
	<div class="goodes">
		{{list}}
	</div>
</template>

<script>
	export default{
		data(){
			return{
				list:{}
			}
		},
		created() {
			this.$http.get('roles')
			.then(req=>{
				this.list=req.data
			})
		}
	}
</script>

<style>
</style>
