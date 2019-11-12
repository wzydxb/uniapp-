<template>
	<view class="Toast" v-show="getToastShow">
		<view style="padding: 0 20rpx; font-size: 28rpx;">
			<text>{{ getToastMsg }}</text>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			
		},
		computed:{
			getToastShow(){
				return this.$store.state.ToastShow
			},
			getToastMsg(){
				return this.$store.state.ToastMsg
			}
		}
	}
</script>

<style>
	.Toast{
		min-width: 200rpx;
		min-height: 200rpx;
		background-color: rgba(0,0,0,.5);
		position: fixed;
		left: 50%;
		top: 40%;
		transform: translate(-50%,-50%);
		color: #fff;
		text-align: center;
		line-height: 200rpx;
		border-radius: 15px;
	}
</style>
