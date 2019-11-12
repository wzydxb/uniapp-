<template>
	<view>
		<view class="head header">
			<view class="head">
				<text style="font-size: 30rpx;">
					NO.<text style="font-size: 60rpx; font-weight: 500;">{{ data.index | addZero }}</text>
				</text>
				<view class="homeHead">
					<text>九月</text>
					<br />
					<text>2019</text>
				</view>
			</view>
			<view>
				<image src="../../static/like/dislike.png" class="img" @tap="likes" v-show="likeShow"></image>
				<image src="../../static/like/like.png" class="img" @tap="UNlikes" v-show="!likeShow"></image>
				<image src="../../static/like/share.png" class="img"></image>
			</view>
		</view>
		<view class="body">
			<view class="bodyImg">
				<image :src="data.image" style="height: 500rpx; width: 100%;"></image>
			</view>
			<view class="title">
				<text :style="data.index==7?'':'color: #fff;'">{{ msg[0] }}</text>
				<br />
				<text>{{ msg[1] }}</text>
				<text>。</text>
			</view>
			<view class="bodymsg">
				{{ data.content }}
			</view>
			<view class="select">
				<image src="../../static/arrows/arrowsLeft.png" class="img" @tap="shangyige"></image>
				<text style="line-height: 80rpx; font-size: 26rpx;">{{ data.title }}</text>
				<image src="../../static/arrows/arrowsRight.png" class="img" @tap="nextPeri"></image>
			</view>
		</view>
		
	</view>
</template>

<script>
	import periodical from "../../http/periodical/periodical.js"
	import filters from "../../filters/index.js";
	export default {
		data() {
			return {
				title: 'Hello',
				data:{},
				index:1,
				likeShow:true
			}
		},
		computed:{
			msg(){
				switch(this.data.type){
					case 100: return "电影";
					break;
					case 200: return "音乐";
					break;
					case 300: return "句子";
					break;
				}
			}
		},
			filters,
		created() {
			this.getPeridical()
			this.postlikeinfo()
		},
		methods: {
			postlikeinfo(){
				const data = {
					type: this.data.type,
					id: this.data.id
				}
				console.log(data)
				this.$store.dispatch("postlikeinfo",data).then(res=>{
					console.log(res)
				})
			},
			getPeridical(){
				periodical.get_new_periodical().then(res=>{
					if(res.status!==200)return;
					this.data = res.data;
				})
			},
			nextPeri(){
				if(this.data.index === 1)return
				periodical.next_peridical(this.data.index).then(res=>{
					this.data = res.data
				})
			},
			async shangyige(){
				if(this.data.index === 8)return
				await periodical.previous_peridcal(this.data.index).then(res=>{
					this.data = res.data;
				})
			},
			likes(){
				console.log(this.data)
				const data = {
					art_id: this.data.id,
					type: this.data.type
				}
				this.likeShow = !this.likeShow;
				periodical.previous_like(data).then(res=>{
					console.log("收藏成功");
				}).catch(()=>{
					this.likeShow = !this.likeShow;
					console.log("收藏失败");
				})
			},
			UNlikes(){
				this.likeShow = !this.likeShow;
				periodical.previous_unlike().then(res=>{
					console.log(res)
				}).catch(()=>{
					this.likeShow = !this.likeShow;
				})
			}
		}
	}
</script>

<style>
	.title{
		font-size: 60rpx;
		font-weight: 100;
		font-family: "楷体";
		display: flex;
		flex-direction: column;
		position: absolute;
		top: 560rpx;
		left: 5%;
	}
	.bodymsg{
		text-align: center;
		padding-left: 100rpx;
		padding-right: 100rpx;
		padding-top: 130rpx;
		height: 200rpx;
	}
	.bodyImg{
		height: 500rpx;
		width: 100%;
	}
	.select{
		display: flex;
		justify-content: space-between;
		padding: 10rpx;
		width: 500rpx;
		background-color: #f6f6f6;
		margin-left: 120rpx;
	}
	.img{
		width: 40rpx; height: 40rpx;padding: 20rpx;
	}
	.head{
		display: flex;
		padding: 10rpx 20rpx;
	}
	.header{
		justify-content: space-between;
	}
	.homeHead{
		height: 50rpx;
		line-height: 30rpx;
		font-size: 20rpx;
		border-left: 1px solid black;
		padding: 0 20rpx;
		margin: 20rpx 20rpx;
	}
</style>
