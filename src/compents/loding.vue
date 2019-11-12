<template>
	<view class="shade" v-show="getLoding">
		<view class="loding">
			<text class="text">Loding...</text>
		</view>
	</view>
</template>

<script>
	export default{
		computed:{
			getLoding(){
				return this.$store.state.Loding;
			}
		}
	}
</script>

<style>
	.loding{
		width: 200rpx;
		height: 200rpx;
		background-color: rgba(0,0,0,.7);
		position: fixed;
		top:50%;
		left: 50%;
		transform: translate(-50%,-80%);
		text-align: center;
		border-radius: 15px;
		line-height: 200rpx;
	}
	.loding .text{
		color: #fff;
	}

</style>
