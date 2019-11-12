import http from "../index.js"
import { api } from "../../api/periodical/periodical.js";
export default{
	get_new_periodical(){
		return http.get(api.periodical)
	},
	next_peridical(index){
		const i = parseInt(index)
		return http.get("/classic/"+ i +"/previous")
	},
	previous_peridcal(index){
		const i = parseInt(index)
		return http.get("/classic/"+ i +"/next");
	},
	previous_like(data){
		return http.post(api.like,data)
	},
	previous_unlike(data){
		return http.post(api.unlike,data)
	}
	
}