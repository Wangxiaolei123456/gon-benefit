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

const chainId = "origin_1170-3";
const irisChainId = "nyancat-9";
const uptickUrl = window.location.protocol+"//"+ window.location.host + "/uptick";
// const uptickUrl = "http://13.212.88.15:26657";
const irisUrl = window.location.protocol+"//"+ window.location.host + "/iris";


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
    const result = await sendMsgsTx(account.bech32Address, [msg], 1000000, "");
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

    const result = await sendMsgsTx(account.bech32Address, [msg], 1000000, "");
    if (result.code == 0) {
        alert("successful ! ");
        const logInfo = JSON.parse(result.rawLog)
        console.log(logInfo);

        document.getElementById('classId3').value = logInfo[0].events[0].attributes[2].value
        document.getElementById('nftId3').value = logInfo[0].events[0].attributes[3].value


    }
    return result;

}


export async function iris2Uptick(denomId, nftId) {

    try {
        let irisAccount = await getAccountInfo(irisChainId);
        let uptickAccount = await getAccountInfo();

        console.log("iris2Uptick uptickAddress ", uptickAccount.bech32Address);
        console.log("iris2Uptick irisAddress ", irisAccount.bech32Address);

        let timespan = (Date.now() + 60000) * 1000000;
        let msg = {
            typeUrl: "/ibc.applications.nft_transfer.v1.MsgTransfer",
            value: [
                "nft-transfer",
                "channel-134",
                denomId,
                [nftId],
                irisAccount.bech32Address,
                uptickAccount.bech32Address,
                [0, 0],
                timespan,
                "iris to uptick"
            ]
        }

        console.log(msg);

        const result = await sendMsgsTx(irisAccount.bech32Address, [msg], 1000000, "", true);
        console.log(result)
        if (result.code == 0) {
            // alert("successful ! ");
            return result;
        } else {
            throw new Error(result.rawLog)
        }
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }

}

export async function uptick2Iris(denomId, nftId) {
    try {

        let uptickAccount = await getAccountInfo();
        let irisAccount = await getAccountInfo(irisChainId);

        console.log("uptick2Iris uptickAddress ", uptickAccount.bech32Address);
        console.log("uptick2Iris irisAddress ", irisAccount.bech32Address);

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
            typeUrl: "/ibc.applications.nft_transfer.v1.MsgTransfer",
            value: [
                "nft-transfer",
                "channel-1",
                denomId,
                [nftId],
                uptickAccount.bech32Address,
                irisAccount.bech32Address,
                [0, 0],
                timespan,
                ""
            ]
        }
        const result = await sendMsgsTx(uptickAccount.bech32Address, [msg], 1000000, "");
        console.log(result)
        if (result.code == 0) {
            // alert("successful ! ");
            return result;
        }
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export async function uptickTransfer(id, denomId, name, recipient) {
    try {
        let account = await getAccountInfo();
        console.log("uptick2Iris 02 ", account.bech32Address);

        let msg = {
            typeUrl: "/uptick.collection.v1.MsgTransferNFT",
            value: [
                id,
                denomId,
                name,
                '',
                '',
                account.bech32Address,
                recipient
            ]
        }
        debugger
        const result = await sendMsgsTx(account.bech32Address, [msg], 1000000, "");
        console.log(result)
        if (result.code == 0) {
            // alert("successful ! ");
            return result;
        }
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }

}


export async function getAccountInfo(pChainId = "origin_1170-3") {

    console.log("xxl getAccountInfo ", pChainId);
    try {
        // keplr 检测
        await window.keplr.enable(pChainId);
        // get account
        const account = await window.keplr.getKey(pChainId);
        return account;
    } catch (error) {
        console.log(error)
    }
}

async function sendMsgsTx(address, msgs, amount, data, isIris = false) {



    let client, fee;
    if (isIris == false) {
        fee = {
            amount: [{
                denom: 'auoc',
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
                denom: 'unyan',
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
    try {
        console.log("###xxl sendMsgsTx", [address, msgs, fee, data]);
        const result = await client.sendMsgsTx(address, msgs, fee, data);
        console.log("###xxl result", result);
        return result;
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }




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

    let value = [
        id,
        name,
        getDenomSchema(),
        sender,
        id
    ]
    let msg = {
        typeUrl: "/uptick.collection.v1.MsgIssueDenom",
        value
    }
    msgs.push(msg);
console.log("zxx=====297")
    let nftIds = []
    for (var i = 0; i < amount; i++) {

        let nftID = getNftId();
		console.log("nftID",nftID);
        nftIds.push(nftID)
        msg = {
            typeUrl: "/uptick.collection.v1.MsgMintNFT",
            value: [
                nftID,
                id,
                name,
                uri,
                data,
                accountInfo.bech32Address,
                accountInfo.bech32Address
            ]
        }
        msgs.push(msg);
    }

    console.log("xxl --- msgs");
    console.log(msgs);
    const result = await sendMsgsTx(accountInfo.bech32Address, msgs, 1000000, "");

    //code 0代表成功 不用查询
    if (result.code == 0) {
        console.log("xxl --- successful");
        return {
            tokenId: id,
            nftIds: nftIds.join(','),
            hash: result.transactionHash
        }
    }
    console.log(result)
    throw new Error(result.log);
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


