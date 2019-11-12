import { api } from "../../api/book/bookApi.js";
import http from "../index.js";
export default{
	get_hot_book(){
		return http.get(api.getHotBook)
	},
	hot_search(){
		return http.get(api.getSearchBook)
	},
	search_book(q,start=0,count=20,summary=1){
		let data = {
			start,
			count,
			summary,
			q
		}
		console.log(data)
		return http.get(api.getSearch,data)
	},
	book_detail(id){
		return http.get("/book/"+ id +"/detail")
	}
}