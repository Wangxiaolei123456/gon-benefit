import axios from "axios";
const service = axios.create({
    timeout: 300000,
  });


export function getChainListInfo(params) {
    return service.post('/gonapi/nft/getCrossChainListByTxid', 
        transObjToParamStr(params)
    )
}
export function getInfoByAddress(params) {
    return service.post('/gonapi/nft/getCrossChainListByAddress', 
        transObjToParamStr(params)
    )
}

export function uploadJsonData(params) {
    return service.post('/upJson', 
        transObjToParamStr(params)
    )
}

export function requestCreateNFT(params) {
    return service.post('/gonapi/nft', 
        transObjToParamStr(params)
    )
}

export function requestTranserNFT(params) {
    return service.post('/gonapi/nft/edit', 
        transObjToParamStr(params)
    )
}

export function getMyCardList(params,type) {
   
    return service.post('/gonapi/nft/searchPage?type='+type, transObjToParamStr(params))
}
// 修改个人信息
export function editUserInfo(params) {
   
    return service.post('/gonapi//user/edit', transObjToParamStr(params))
}
// 获取个人信息
export function getUserInfo(params) {
   
    return service.get('/gonapi/user/info?'+transObjToParamStr(params))
}
// 创建用户
export function createInfo(params) {
   
    return service.post('/gonapi/user',transObjToParamStr(params))
}
///nft/nftInfo
export function cardDetail(params) {
   
    return service.post('/gonapi/nft/nftInfo',transObjToParamStr(params))
}
// http://192.168.111.223:3000/api/nft/updateUser?owner=uptick1sww4j9gjcqka8fp8caw5skt0z5u34xkqqkguxn
export function updateUser(params) {
    return service.get('/gonapi/nft/updateUser?'+transObjToParamStr(params))
}

function transObjToParamStr(object) {
   
let arr=[]
    for (const key in object) {
        if (Object.hasOwnProperty.call(object, key)) {
            const element = object[key];
            arr.push(`${key}=${element}`);
        }
    }
    return arr.join('&');
}