import Vue from "vue";
import VueRouter from "vue-router";
import WalletConnect from "@/components/connectWallet/index.vue";

Vue.use(VueRouter);
//解决编程式路由往同一地址跳转时会报错的情况
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;
//push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
   if (onResolve || onReject)
      return originalPush.call(this, location, onResolve, onReject);
   return originalPush.call(this, location).catch(err => err);
};
//replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
   if (onResolve || onReject)
      return originalReplace.call(this, location, onResolve, onReject);
   return originalReplace.call(this, location).catch(err => err);
};

const routes = [
   {
      path: "/",
      redirect: '/index',
   },
   {
      path: "/index",
      name: "WalletConnect",
      component: WalletConnect,
   },
   {
      path: "/test",
      name: "Test",
      component: () => import("@/components/test"),
   },
   {
      path: "/createNFT",
      name: "createNFT",
      component: () => import("@/components/createNFT/index"),
   },
   {

      path: "/Home",
      name: "Home",
      component: () => import("@/components/Home/index"),
   },
   {
      path: "/profile",
      name: "Profile",
      component: () => import("@/components/profile/index"),
   },
   {
      path: "/cardDetail",
      name: "cardDetail",
      component: () => import("@/components/cardDetail/index"),
   },
   {
      path: "/crossChain",
      name: "crossChain",
      component: () => import("@/components/crossChain/index"),
   },
   {
      path: "/receiveCode",
      name: "receiveCode",
      component: () => import("@/components/receiveCode/index"),
   },
   {
      path: "/transfer",
      name: "transfer",
      component: () => import("@/components/transfer/index"),
   },
   

];



const router = new VueRouter({
  mode: 'history',
   base: process.env.BASE_URL,
   routes,
   scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
         return savedPosition
      } else {
         return { x: 0, y: 0 }
      }
   }
});

export default router;
