<template>
	<view>
		<view>
			<image src="../../static/users/my@bg.png" class="bg"></image>
			<image :src="userInfo.avatarUrl" class="headImg"></image>
			<text class="nickname">{{ userInfo.nickName }}</text>
		</view>
		<view class="like">
			<view style="text-align: center;"><text>喜欢</text></view>
			<view class="likeBook"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{}
			}
		},
		methods: {
			getuserinfo(){
				this.userInfo = this.$store.getters.Getuserinfo
				console.log(this.userInfo)
			}
		},
		mounted() {
			this.getuserinfo();
		}
	}
</script>

<style>
	.bg{
		width: 100%;
		position: relative;
	}
	.headImg{
		position: absolute;
		width: 150rpx;
		height: 150rpx;
		border-radius: 75rpx;
		left: 300rpx;
		top: 200rpx;
	}
	.nickname{
		text-align: center;
		position: absolute;
		left: 340rpx;
		top: 370rpx;
	}
	.like{
		background-color: #f6f6f6;
		padding: 20rpx 0;
	}
</style>
