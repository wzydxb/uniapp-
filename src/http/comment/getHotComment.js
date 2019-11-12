import http from "../index.js";
export default{
	get_hot_comment(id){
		const bookid = parseInt(id)
		return http.get(`/book/${bookid}/short_comment`)
	},
	get_study_comment(data){
		return http.post(`/book/add/short_comment`,data)
	}
}