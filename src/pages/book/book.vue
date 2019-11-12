<template>
	<view>
		<view class="search">
			<view class="searchInput" @tap="moveSearch">
				请输入你想看的书籍<icon type="search" size="20" />
			</view>
		</view>
		<view class="backcolor">
			<h3>精选</h3> 
			<bookList />
		</view>
	</view>
</template>
<script>

	import bookList from "../../compents/bookList/bookList.vue"
	export default {
		methods: {
			moveSearch(){
				uni.navigateTo({
					url:"/compents/search/search",
					animationType:"slide-in-bottom"
				})
			}
		},
		components:{
			bookList
		}
	}
</script>

<style>
.search{
		background-color: #f6f6f6;
		border-radius:50px;
		text-align: center;
		padding: 0 10px;
	}
	.backcolor{
		text-align: center;
		background-color: #f6f6f6;
		box-shadow: 0 2px 2px 2px black outset;
	}
</style>
