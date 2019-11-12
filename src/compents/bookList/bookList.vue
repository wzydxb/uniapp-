<template>
	<view class="flex bookList">
		<view class="leftBook" v-for="(item,i) in bookList" :key="i" @tap="details(item.id)">
			<view class="leftBookItem">
				<cover-image :src="item.image"></cover-image>
			</view>
			<view style="position: relative;">
				<view class="bookmsg">
					<text class="describe">{{ item.title }}</text>
					<br />
					<text class="bookmsgitem describe">{{ item.author }}</text>
				</view>
					<text class="like">喜欢</text>
			</view>
		</view>
	</view>
</template>

<script>
		import getBook from "../../http/book/getBook.js";
		export default{
			data(){
				return{
					bookList:[]
				}
			},
			methods:{
				get(){
					getBook.get_hot_book().then(res=>{
						if(res.status !== 200)return;
							this.bookList = res.data
					});
				},
				details(id){
					console.log(id)
					uni.navigateTo({
						url:`/pages/bookDetails/bookDetails?bookId=${id}`
					})
				}
			},
			created(){
				this.get();
			},
			props:["searchBook"],
			watch:{
				"$props.searchBook":function(newmsg){
					this.bookList = newmsg;
				}
			}
		}
</script>

<style>
	.leftBook {
		height: 390rpx;
		width: 260rpx;
		background-color: #fff;
		margin: 10px;
		box-shadow: 0 0 5px #ccc;
	}

	.bookList {
		flex-direction: row;
		flex-wrap: wrap;
	}

	.leftBook .leftBookItem {
		height: 270rpx;
		width: 260rpx;
	}

	.bookmsg {
		overflow: hidden;
		text-align: left;
		padding-left: 4rpx;
		line-height: 15px;
	}

	.bookmsg text {
		font-size: 24rpx;
	}

	.bookmsgitem {
		color: #999;
	}

	.like {
		font-size: 22rpx;
		color: #BBB529;
		position: absolute;
		right: 10rpx;
	}
	  .describe {
	    overflow: hidden;
	    text-overflow: ellipsis;
	    font-size: 12px;
	    display: -webkit-box;
	    -webkit-line-clamp: 1;
	    -webkit-box-orient: vertical;
	  }
</style>
