<template>
	<view style="background-color: #f6f6f6;">
		<view style="background-color: #fff; padding-bottom: 20rpx;">
			<view class="cover flex">
				<image :src="bookDetail.image"></image>
			</view>
			<view class="flex detail">
				<text class="title">{{ bookDetail.title }}</text>
				<text class="author">{{ bookDetail.author[0] }}</text>
			</view>
		</view>
		<view class="comment">
			<view style="text-align: center; padding: 20rpx;">
				<h3>短评</h3>
			</view>
			<view class="comment-item">
				<view :class="i=='0'?'com com-one' : (i=='1' ? 'com com-two' : (i=='2'?'com com-three':'com'))" v-for="(item,i) in hotcomment"
				 :key="i">
					<text>{{ item.content }}</text>
					<text style="margin: 0 10rpx;color: #ccc;">
						+{{ item.nums }}
					</text>
				</view>
			</view>
		</view>


		<view class="msgdetail">
			<h3 style="color: #000;">内容简介</h3>
			<text style="margin: 20rpx 0;">{{bookDetail.summary}}</text>
		</view>

		<view style="padding: 30rpx 0;">
			<view style="background-color: #fff;">
				<view style="text-align: center;">
					<h3 style="color: #000;">书籍信息</h3>
				</view>
				<view style="text-align: left; font-size: 32rpx; padding-top: 30rpx;">
					<view style="color: #999; padding-left: 30rpx;">
						<text>出版社:{{ bookDetail.publisher }}</text>
						<text>出版年:{{bookDetail.pubdate}}</text>
					</view>
					<view class="bookmsg">
						<text>出版号:{{bookDetail.isbn}}</text>
						<text>页数:{{bookDetail.pages}}</text>
						<text>定价:{{bookDetail.price}}</text>
						<text>装配:{{bookDetail.binding}}</text>
						<text>书名:{{bookDetail.title}}</text>
						<text>译者:{{bookDetail.subtitle}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="commentInput" @tap="this.commentShow = !this.commentShow">
			<uni-icons type="contact" size="30"></uni-icons>
			<text style="color: #999; font-size: 22rpx;">留下精彩评论</text>
		</view>
		<view v-show="commentShow">
			<comment
				:propMsg = "hotcomment" 
				:bookId = "bookId" 
				@changeCommentShow="this.commentShow = false" 
				@addNums="a">
			</comment>
		</view>
	</view>
</template>

<script>
	import uniIcons from "@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue"
	import getBook from "../../http/book/getBook.js";
	import getHotComment from "../../http/comment/getHotComment.js";
	import comment from "../../compents/details/comment/comment.vue"
	export default {
		data() {
			return {
				bookDetail: {},
				hotcomment: [],
				commentShow: false,
				bookId: "",
				commentNums:0
			}
		},
		methods: {
			getComment(id) {
				return getHotComment.get_hot_comment(id).then(res => {
					console.log(res)
					if (res.status !== 200) return;
					this.hotcomment = res.data.comments
				})
			},
			a(context){
				this.hotcomment.some(item=>{
					if(item.content == context){
						item.nums++
					}
				})
			}
		},
		computed:{
		},
		onLoad(options) {
			this.bookId = options.bookId
			getBook.book_detail(options.bookId).then(res => {
				if (res.status !== 200) return;
				this.bookDetail = res.data;
			});
			this.getComment(options.bookId)
		},
		components:{ uniIcons, comment }
	}
</script>

<style>
	.detail {
		background-color: #fff;
		flex-direction: column;
	}

	.detail .author {
		color: #999;
		font-size: 24rpx;
	}

	.detail .title {
		color: black;
		line-height: 80rpx;
	}

	.cover {
		height: 390rpx;
		width: 260rpx;
		margin: 10px;
		background-color: #fff;
	}

	.cover image {
		height: 390rpx;
		width: 260rpx;
		transform: translate(230rpx, 0);
	}

	.comment {
		background-color: #fff;
		margin: 20rpx 0;
	}

	.comment-item {
		display: flex;
		flex-wrap: wrap;
		margin-top: 30rpx;
		padding: 0rpx 30rpx;
	}
	.msgdetail {
		text-align: center;
		background-color: #fff;
		padding: 30rpx;
		color: #999;
	}
	.bookmsg{
		color: #999;
		line-height: 80rpx;
		display: flex;
		padding-bottom: 30rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
		flex-direction: column;
		margin-bottom: 100rpx;
	}
	.bookmsg text{
		text-align: left;
	}
	.commentInput{
		width: 100%;
		background-color: #fff;
		padding: 20rpx;
		position: fixed;
		bottom: 0;
	}
</style>
