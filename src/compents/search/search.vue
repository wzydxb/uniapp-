<template>
	<view class="container">
	 <view style="z-index: 50;">
		<view class="flex">
			<view  class="searchInput search">
				<input type="text" placeholder="请输入书籍名称" v-model="searchContent" />
				<icon class="icon" type="search"  size="26" @tap="search"/>
			</view>
				<view class="text">
					<text @tap="back">取消</text>
				</view>
		</view>
		<view v-if="!flag">
			<view class="padding">
				<view class="chunk"></view>
				<text style="font-size: 30rpx;">历史搜索</text>
				<view class="hostory">
					<text class="com" v-for="(item,i) in hostriySearch" :key="i" @tap="hostirySearch(item)">{{ item }}</text>
				</view>
			</view>
			<view class="padding">
				<view class="chunk"></view>
				<text style="font-size: 30rpx;">热门搜索</text>
				<view class="hostory">
					<text class="com" v-for="(item,i) in hotsearch" :key="i" @tap="hostirySearch(item)">{{ item }}</text>
				</view>
			</view>
		</view>
		<view v-show="flag">
			<bookList :searchBook = "searchBook"></bookList>
		</view>
	 </view>
		
		<view style="z-index: 999;">
			<loding/>
		</view>
		<Toast />
	</view>
</template>

<script>
	import getBook from "../../http/book/getBook.js";
	import bookList from "../../compents/bookList/bookList.vue";
	import loding from "../../compents/loding.vue";
	export default {
		data() {
			return {
				hotsearch:[],
				searchContent:"",
				flag: false,
				searchBook:[],
				hostriySearch:["JavaScript"]
			}
		},
		methods: {
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			gethotsearch(){
				getBook.hot_search().then(res=>{
					if(res.status!==200){
						return;
					}
					this.hotsearch = res.data.hot
				})
			},
			succeed(res){
				console.log(res)
				if(res.status !== 200)return;
				this.searchBook = res.data.books;
				this.flag = !this.flag;
				this.hostiry(this.searchContent);
			},
			search(){
				if(this.searchContent === ""){
					return;
				}
				getBook.search_book(this.searchContent).then(res=>{
					this.succeed(res);
				})
				.catch(err=>{
					if(err.status === 1){
						this.$common.Toast("没有这本书哦",1000);
					}
				})
			},
			hostirySearch(item){
				getBook.search_book(item).then(res=>{
					this.succeed(res);
				})
			},
			hostiry(text){
				if(this.hostriySearch.includes(text)) return;
				if(text === "") return;
				this.hostriySearch.push(text)
				console.log(this.hostriySearch)
				uni.setStorageSync("hostriySeach",this.hostriySearch);
			},
			getHostriy(){
				let a = uni.getStorageSync("hostriySeach")||[]
				console.log(a)
				this.hostriySearch = a;
			}
		},
		created(){
			this.gethotsearch();
			this.getHostriy();
		},
		components:{ bookList,loding }
	}
</script>

<style>
.search{
	background-color: #f6f6f6;
	border-radius:50rpx;
	width: 80%;
}
.search input{
	float: left;
	margin-top: 10rpx;
}
.search .text{
	padding: 5rpx 5rpx;
}
.icon{
	float: right;
	margin-top: 10rpx;
	margin-right: 40rpx;
}
.chunk{
	height: 15px;
	width: 5px;
	background-color: #000;
	display: inline-block;
	margin-right: 10px;
}
.hostory{
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	margin-top: 24rpx;
	padding-left: 15px;
	width: 630rpx;
}
</style>
