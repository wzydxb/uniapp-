import Fly from "flyio/dist/npm/wx";
import {config} from "./api.js";
import vuex from "../store/index.js";
let fly = new Fly();
fly.config.baseURL="http://jsonplaceholder.typicode.com";
fly.config.timeout=10000;
fly.config.headers = { appkey: config.appkey};
fly.config.headers["Content-Type"] = "application/json";
fly.interceptors.request.use((request)=>{
	vuex.commit("changeLoding",true);
});
fly.interceptors.response.use(response=>{
	vuex.commit("changeLoding",false);
},error=>{
	vuex.commit("changeLoding",false);
	console.log(error)
})
export default{
	get(url,data){
		return new Promise((resolve,reject)=>{
			fly.get(config.api_base_url+url,data)
			.then(res=>{
				resolve(res);
			})
			.catch(err=>{
				reject(err);
			})
		})
	},
	post(url,data){
		return new Promise((resolve,reject)=>{
			fly.post(config.api_base_url+url,data)
			.then(res=>{
				resolve(res);
			})
			.catch(err=>{
				reject(err);
			})
		})
	}
}