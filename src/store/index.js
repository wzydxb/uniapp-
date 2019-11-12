import vuex from "vuex";
import Vue from "vue";
import store from "./store.js";
import http from "../http/index.js";
Vue.use(vuex);
export default new vuex.Store({
	state:store,
	mutations:{
			changeLoding(state,flag){
			state.Loding = flag;
		},
		changeToastShow(state){
			state.ToastShow = !state.ToastShow
		},
		setToastMsg(state,msg){
			state.ToastMsg = msg;
		},
		SET_USER_INFO(state,uersinfo){
			state.userInfo = uersinfo;
		},
		POST_LIKE_INFO(state,data){
			http.get(`classic/300/1/favor`)
		}
	},
	getters:{
		getloding(state){
			return state.Loding;
		},
		Getuserinfo(state){
			return state.userInfo;
		}
	},
	actions:{
		Setuserinfo({ commit },userinfo){
			commit("SET_USER_INFO",userinfo);
		},
		postlikeinfo({ commit },data){
			commit("POST_LIKE_INFO",data)
		}
	}
})