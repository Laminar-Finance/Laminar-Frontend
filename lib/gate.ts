import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";

const url =
  "https://eth-kovan.alchemyapi.io/v2/nl2PDNZm065-H3wMj2z1_mvGP81bLfqX";
const customHttpProvider = new ethers.providers.JsonRpcProvider(url);

export async function connect() {
    console.log('starting to create bridge')
    const sf = await Framework.create({
        networkName: "kovan",
        provider: customHttpProvider
    });
    
    console.log("superfluid framework", sf);

    const signer = sf.createSigner({
        privateKey:
          "0xd2ebfb1517ee73c4bd3d209530a7e1c25352542843077109ae77a2c0213375f1",
        provider: customHttpProvider
    });

    const DAIxContract = await sf.loadSuperToken("fDAIx");
    const DAIx = DAIxContract.address;

    console.log("DAIx address", DAIx);

    const signerAddress = await signer.getAddress();

    console.log("signer address", signerAddress);

    const flowInfo = await sf.cfaV1.getFlow({
        superToken: DAIx,
        sender: "0x2d774f0a26226c7a0f387ca72003B52a00E12a39",
        receiver: "0x59e30814f1D71a458E9FA6ab453F3e4CB1090E57",
        providerOrSigner: signer
    })

    console.log("flowinfo", flowInfo);

    // const accountInfo = await sf.cfaV1.getAccountFlowInfo({
    //     superToken: DAIx,
    //     account: signerAddress,
    //     providerOrSigner: signer
    // });

    // console.log("account info", accountInfo);
}