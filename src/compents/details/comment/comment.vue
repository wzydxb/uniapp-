<template>
	<view>
		<view class="shade">
			<view class="mm">
				<view class="flex cencl">
					<text style="color: #999;" @tap="popshow">取消</text>
					<text @tap="studyComment">确认</text>
				</view>
				<view class="comment-item">
					<view
						:class="i=='0'?textStyle.one:(i=='1'?textStyle.two:textStyle.three)"
						v-for="(item,i) in NewPropMsg"
						:key="i"
						@tap="a(item.content)"
					>
						<text>{{ item.content }}</text>
					</view>
				</view>
				<view  class="searchInput search">
					<input type="text" placeholder="留下评论吧" v-model="commentMsg" />
				</view>
			</view>
		</view>
		<view>
			<toast></toast>
		</view>
		<view>
			<loding></loding>
		</view>
	</view>
</template>

<script>
	import getHotComment from "../../../http/comment/getHotComment.js";
	export default {
		data() {
			return {
				commentMsg:"",
				textStyle:{
					one:"com com-one",
					two:"com com-two",
					three:"com com-three"
				}
			}
		},
		methods: {
			a(content){
				this.commentMsg = content;
			},
			popshow(){
				this.$emit("changeCommentShow");
			},
			studyComment(){
				const data = {
					book_id: this.$props.bookId,
					content: this.commentMsg
				}
				if(this.commentMsg == ""){
					this.$common.Toast("评论不能为空",1000);
					return;
				}
				getHotComment.get_study_comment(data).then(res=>{
					console.log(res)
					if(res.status !== 201)return;
					this.$emit("addNums",this.commentMsg);
					this.$common.Toast("评论成功",1000);
				})
			}
		},
		props:["propMsg","bookId"],
		computed:{
			NewPropMsg(){
				return this.$props.propMsg.slice(0,3)
			}
		}
	}
</script>

<style>
	.shade{
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,.5);
		position: fixed;
		top: 0;
		left: 0;
	}
	.shade .mm{
		width: 100%;
		height: 300rpx;
		position: absolute;
		bottom: 0;
		background-color: #fff;
	}
	.search{
		background-color: #f6f6f6;
		border-radius:50rpx;
		width: 100%;
	}
	.cencl{
		padding: 20rpx;
		justify-content: space-between;
	}
	.comment-item {
		display: flex;
		flex-wrap: wrap;
		margin-top: 30rpx;
		padding: 0rpx 30rpx;
	}
</style>
