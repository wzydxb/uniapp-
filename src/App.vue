<script>
	export default {
		created: function() {
			uni.getUserInfo({
				withCredentials:true,
				success:(errMsg)=>{
					this.$store.dispatch("Setuserinfo",errMsg.userInfo);
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	.searchInput{
			height: 80rpx;
			margin:10px 0;
			text-align: center;
			line-height: 80rpx;
			color: #999;
	}
	.container{
		padding-top: 10px;
	}
	.flex{
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.padding{
		padding: 20rpx;
	}
	.com{
		font-size: 24rpx;
		margin-right: 30rpx;
		background: #f5f5f5;
		border-radius: 20rpx;
		padding: 0px 25rpx;
		line-height: 55rpx;
		height: 55rpx;
		margin-bottom: 22rpx;
	}
	.shade{
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,.5);
		position: fixed;
		top: 0;
		left: 0;
	}
	
	.com-one {
		background: #fffadd;
	}
	
	.com-two {
		background-color: #eefaff;
	}
	
	.com-three {
		background-color: #f1f6f0;
	}
</style>
