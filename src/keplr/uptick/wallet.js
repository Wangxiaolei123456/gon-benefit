const md5 = require('md5');
const BigNumber = require('big-number');
const iris = require("@irisnet/irishub-sdk");
const long = require('long');

import {
    SigningStargateClient,
} from '@uptsmart/stargate'

import {
    getRanHex
} from "../../utils/helper";

const chainId = "uptick_7000-1";
const irisChainId = "gon-irishub-1";
const uptickUrl = "http://localhost:8080/uptick";
const irisUrl = "http://localhost:8080/iris";

let config = {
    node: uptickUrl,
    chainNetwork: "uptickUrl",
    chainId: "uptick_7000-1",
    //gas: process.env.VUE_APP_IRIS_BASE_GAS,
    gas: '10000000',
    fee: {
        denom: 'auptick',
        amount: '75000'
    },
};

// irisnet sdk 初始化
const client = iris
    .newClient(config)
    .withKeyDAO({
        write: () => { },
        read: () => {
            return '';
        }
    })
    .withRpcConfig({
        timeout: 50000
    });

export async function iris2Uptick(typeUrl, port, channel, classId, tokenIdsList, sender, receiver, memo) {

    //
    let account = await getAccountInfo("gon-irishub-1");
    console.log("account address is : ", account.bech32Address);

    let timespan = (Date.now() + 60000) * 1000000;
    let msg = {
        typeUrl: typeUrl,
        value: [
            port, channel, classId, tokenIdsList, sender, receiver, [0, 0], timespan, memo
        ]
    }

    console.log(msg);

    const result = await sendMsgsTx(sender, [msg], 1000000, "0x1234", true);
    if (result.code == 0) {
        alert("successful ! ");
    }
    return result;

}


export async function convertCosmosNFT2ERC(typeUrl, classId, nftId, sender, receiver, contractAddress, tokenId) {

    //
    let account = await getAccountInfo();
    console.log("xxl convertCosmosNFT2ERC 00 ", account.bech32Address);
    console.log('wwww', typeUrl, classId, nftId, sender, receiver, contractAddress, tokenId);

    // classId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    // nftId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    // receiver: jspb.Message.getFieldWithDefault(msg, 3, ""),
    // sender: jspb.Message.getFieldWithDefault(msg, 4, ""),
    // contractAddress: jspb.Message.getFieldWithDefault(msg, 5, ""),
    // tokenId: jspb.Message.getFieldWithDefault(msg, 6, "")
    let msg = {
        typeUrl: typeUrl,
        value: [
            classId, nftId, receiver, sender, contractAddress, tokenId]
    }
    const result = await sendMsgsTx(account.bech32Address, [msg], 1000000, "0x1234");
    if (result.code == 0) {
        alert("successful ! ");
        const logInfo = JSON.parse(result.rawLog)
        document.getElementById('contractAddress2').value = logInfo[0].events[0].attributes[4].value
        document.getElementById('tokenId2').value = logInfo[0].events[0].attributes[5].value
    }
    return result;


}
// await convertCosmosNFT2ERC(classId,nftId,sender,receiver,contractAddress,tokenId);   
export async function convertERC2CosmosNFT(typeUrl, classId, nftId, sender, receiver, contractAddress, tokenId) {

    //
    let account = await getAccountInfo();
    console.log("xxl convertERC2CosmosNFT 01 ", account.address);

    // contractAddress: jspb.Message.getFieldWithDefault(msg, 1, ""),
    // tokenId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    // receiver: jspb.Message.getFieldWithDefault(msg, 3, ""),
    // sender: jspb.Message.getFieldWithDefault(msg, 4, ""),
    // classId: jspb.Message.getFieldWithDefault(msg, 5, ""),
    // nftId: jspb.Message.getFieldWithDefault(msg, 6, "")
    let msg = {
        typeUrl: typeUrl,
        value: [
            contractAddress,
            tokenId, receiver, sender, classId, nftId]
    }

    const result = await sendMsgsTx(account.bech32Address, [msg], 1000000, "0x1234");
    if (result.code == 0) {
        alert("successful ! ");
        const logInfo = JSON.parse(result.rawLog)
        console.log(logInfo);

        document.getElementById('classId3').value = logInfo[0].events[0].attributes[2].value
        document.getElementById('nftId3').value = logInfo[0].events[0].attributes[3].value


    }
    return result;

}

export async function uptick2Iris(typeUrl, port, channel, classId, tokenIdsList, sender, receiver, memo) {

    let account = await getAccountInfo();
    console.log("uptick2Iris 02 ", account.bech32Address);

    // sourcePort: jspb.Message.getFieldWithDefault(msg, 1, ""),
    // sourceChannel: jspb.Message.getFieldWithDefault(msg, 2, ""),
    // classId: jspb.Message.getFieldWithDefault(msg, 3, ""),
    // tokenIdsList: (f = jspb.Message.getRepeatedField(msg, 4)) == null ? undefined : f,
    // sender: jspb.Message.getFieldWithDefault(msg, 5, ""),
    // receiver: jspb.Message.getFieldWithDefault(msg, 6, ""),
    // timeoutHeight: (f = msg.getTimeoutHeight()) && ibc_core_client_v1_client_pb.Height.toObject(includeInstance, f),
    // timeoutTimestamp: jspb.Message.getFieldWithDefault(msg, 8, 0),
    // memo: jspb.Message.getFieldWithDefault(msg, 9, ""
    let timespan = (Date.now() + 60000) * 1000000;
    let msg = {
        typeUrl: typeUrl,
        value: [
            port, channel, classId, tokenIdsList, sender, receiver, [0, 0], timespan, memo
        ]
    }

    const result = await sendMsgsTx(account.bech32Address, [msg], 1000000, "0x1234");
    if (result.code == 0) {
        alert("successful ! ");
    }
    return result;

}


export async function getAccountInfo(pChainId = "uptick_7000-1") {

    console.log("xxl getAccountInfo ", pChainId);
    try {
        // keplr 检测
        await window.keplr.enable(pChainId);
        // get account
        const account = await window.keplr.getKey(pChainId);
        debugger
        return account;
    } catch (error) {
        console.log(error)
    }
}

// export async function getAccountInfo() {

// 	try {
// 		await window.keplr.enable(chainId);
// 		// get accountInfo
// 		const accountKeplr = await window.keplr.getKey(chainId);
// 		console.log("xxl accountKeplr 000------");
// 		console.log(accountKeplr);

// 		const offlineSigner = window.getOfflineSigner(chainId);
// 		// const offlineSigner = window.getOfflineSignerOnlyAmino(chainId);
// 		const accounts = await offlineSigner.getAccounts();

// 		console.log("xxl accounts 011------");
// 		console.log(accounts);

// 		let accountIris = await client.auth.queryAccount(accountKeplr.bech32Address);

// 		console.log("xxl accountIris 111------");
// 		let accountNumber = accountIris["accountNumber"]
// 		let sequence = accountIris["sequence"]
// 		console.log(accountIris);
// 		if(accountNumber == undefined){
// 			accountNumber = accountIris["account"].value.accountNumber;
// 		}
// 		if(sequence == undefined){
// 			sequence = accountIris["account"].value.sequence;
// 		}

// 		return {
// 			address: accountKeplr["address"],
// 			bech32Address: accountKeplr["bech32Address"],
// 			pubKey: accountKeplr["pubKey"],
// 			accountNumber: accountNumber,
// 			sequence: sequence,
// 			isNanoLedger: accountKeplr["isNanoLedger"],
// 			name:accountKeplr['name']
// 		}
// 	} catch (error) {
// 		console.log(error);
// 		console.log('denied getAccountInfo');
// 	}

// }

async function sendMsgsTx(address, msgs, amount, data, isIris = false) {



    let client, fee;
    if (isIris == false) {
        fee = {
            amount: [{
                denom: 'auptick',
                amount: amount,
            }],
            gas: '10000000',
        };
        const offlineSigner = await window.getOfflineSigner(chainId);

        client = await SigningStargateClient.connectWithSigner(
            uptickUrl,
            offlineSigner
        )
    } else {
        fee = {
            amount: [{
                denom: 'uiris',
                amount: amount,
            }],
            gas: '10000000',
        };

        const offlineSigner = await window.getOfflineSigner(irisChainId);

        client = await SigningStargateClient.connectWithSigner(
            irisUrl,
            offlineSigner
        )

    }
debugger
    console.log("###xxl sendMsgsTx", [address, msgs, fee, data]);
    const result = await client.sendMsgsTx(address, msgs, fee, data);
    console.log("###xxl result", result);
    return result;



}

export async function issueUptickDenomAndMint(
    orgName,
    sender,
    recipient,
    uri,
    data,
    amount,
) {

    let accountInfo = await getAccountInfo()
    let msgs = [];
    let name = getDenomName(orgName, accountInfo.bech32Address);
    let id = getDenomId(name)

    let value = {
        id,
        name,
        schema: getDenomSchema(),
        sender
    }
    let msg = {
        type: "/uptick.collection.v1.Msg/IssueDenom",
        value
    }
    msgs.push(msg);
// debugger
//     for (var i = 0; i < amount; i++) {

//         let nftID = getNftId();
//         msg = {
//             type: "/uptick.collection.v1.Msg/MintNFT",
//             value: {
//                 id: nftID,
//                 denomId: id,
//                 name: name,
//                 uri: uri,
//                 data: data,
//                 sender: accountInfo.bech32Address,
//                 recipient: recipient
//             }
//         }
//         msgs.push(msg);

//     }

    console.log("xxl --- msgs");
    console.log(msgs);
    debugger
    // let txInfo = await signAndBroadcastTx(accountInfo, msgs);
    const result = await sendMsgsTx(accountInfo.bech32Address, [msg], 1000000, "0x1234");
    if (result.code == 0) {
        alert("successful ! ");
    }
    return result;

    // console.log("https://gon.ping.pub/iris/tx/" + txInfo.hash)
    // return {
    // 	txInfo,
    // 	denomInfo: msgs
    // }
}

function getDenomName(name, address) {

    let denomName = name + "_" + Math.floor(Date.now() / 1000) + "_" + address.substr(address.length - 4);
    return denomName;

}

function getDenomId(name) {

    let preFix = process.env.VUE_APP_PREFIX;
    return preFix + md5(name);

}

function getDenomSchema() {

    let json = {
        "type": "/uptick.souvenirCard"
    };
    return JSON.stringify(json);

}

function getNftId() {

    let preFix = process.env.VUE_APP_PREFIX;
    return preFix + getRanHex(16);

}

function addSendMsg(msgs, fromAddress, adminAddres, fee, denom) {

    let retMsgs = msgs;
    let bigFee = BigNumber(NumberMul(fee, 1000000))
    let iconDenom;
    if (denom == null) {
        iconDenom = process.env.VUE_APP_IRIS_DENOM
    } else {
        iconDenom = denom
    }

    const amount = [{
        denom: iconDenom,
        amount: bigFee.toString()
    }];

    let feeMsg = {
        type: 'iris.types.TxType.MsgSend',
        value: {
            from_address: fromAddress,
            to_address: adminAddres,
            amount
        }
    }
    retMsgs.push(feeMsg)

    return retMsgs;

}

function NumberMul(arg1, arg2) {
    var m = 0;
    var s1 = arg1.toString();
    var s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length;
    } catch (e) {
        console.log(e)
    }
    try {
        m += s2.split(".")[1].length;
    } catch (e) {
        console.log(e)
    }

    return (
        (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
        Math.pow(10, m)
    );
}

async function signAndBroadcastTx(accountInfo, msgs, memo = ' ') {
    try {
        console.log("0");
        //set fee
        let txLen = msgs.length;

        let pulsFee = BigNumber(process.env.VUE_APP_IRIS_STEP_GAS)
            .multiply(txLen - 1)
        let baseGas = process.env.VUE_APP_IRIS_BASE_GAS
        if (txLen == 1) {
            baseGas = 150000
        }
        let totalGas = BigNumber(baseGas)
            .plus(pulsFee)
            .toString();

        console.log("xxl totalGas 0....");
        console.log(totalGas);
        console.log("xxl totalGas 1....");

        client.withGas(totalGas);
        let totalFeeAmount = BigNumber(totalGas).divide(10).multiply(3).toString()
        let newFee = {
            denom: process.env.VUE_APP_IRIS_DENOM,
            amount: totalFeeAmount
        };


        client.withFee(newFee);

        client.auth.defaultStdFee = {
            "amount": [newFee],
            "gasLimit": totalGas
        }
        //


        // 构建 sdk base Tx
        let bTx = {};
        bTx.account_number = accountInfo.accountNumber;
        // xxl 0107 fix sequence is 0 bug
        //bTx.sequence = accountInfo.sequence == 0 ? 1:accountInfo.sequence;
        bTx.sequence = accountInfo.sequence + "";
        bTx.memo = memo;

        console.log(1);
        // 构建 sdk 离线签名结构
        console.log("xxl msgs 0....");
        console.log(msgs);
        console.log("xxl msgs 1....");
        debugger
        let tx_o = client.tx.buildTx(msgs, bTx);
        // console.log(Buffer.from(accountInfo.pubKey).toString('hex'));
        tx_o.setPubKey(Buffer.from(accountInfo.pubKey).toString('hex'));

        console.log(1.2);
        console.log(bTx);
        let signDoc = tx_o.getSignDoc(bTx.account_number, chainId);
        console.log(2);
        // 构建 keplr 离线签名结构

        debugger

        // keplr 签名
        let s;
        // let s = await window.keplr.signDirect(keplr_signDoc_obj.chainId, accountInfo.bech32Address,
        // 		keplr_signDoc_obj);


        let keplr_signDoc_obj = {
            bodyBytes: signDoc.getBodyBytes(),
            authInfoBytes: signDoc.getAuthInfoBytes(),
            chainId: chainId,
            accountNumber: new long(signDoc.getAccountNumber())
        };
        s = await window.keplr.signDirect(keplr_signDoc_obj.chainId, accountInfo.bech32Address,
            keplr_signDoc_obj);



        console.log("keplr_sign_____", JSON.stringify(s));
        console.log(4);

        // 将 keplr 签名整合到 sdk 离线签名结构
        tx_o.addSignature(s.signature.signature);
        // 更新gas相关签名，防止修改GAS 导致失败
        tx_o.authInfo = iris.types.tx_tx_pb.AuthInfo.deserializeBinary(s.signed.authInfoBytes);
        // 更新gas相关签名，防止修改 导致失败
        tx_o.body = iris.types.tx_tx_pb.TxBody.deserializeBinary(s.signed.bodyBytes);


        console.log(5);
        console.log(tx_o);
        // tx_o.txData.msgs[0].type = 'cosmos-sdk/MsgSend'

debugger
        // sdk broadcast tx
        //let res = await client.tx.broadcast(tx_o, iris.types.BroadcastMode.Commit);
        let res = await client.tx.broadcast(tx_o, iris.types.BroadcastMode.Sync);
        console.log('res:', res);

        return res;

    } catch (error) {

        console.log(error);
        console.log('signAndBroadcastTx error');
    }
}
