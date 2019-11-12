import Vuex from "../store/index.js"
export default{
	Toast(msg="未传参",time){
		Vuex.commit("setToastMsg",msg);
		Vuex.commit("changeToastShow");
		setTimeout(()=>{
			Vuex.commit("changeToastShow");
		},time);
	}
}