<template>
    <van-divider>投票看板</van-divider>
    <van-cell-group>
        <van-cell v-for="(item, index) in bords" :title="item.name">
            <template #right-icon>
                <van-button :disabled="voteBtn" @click="vote(index)">{{ item.totalAmount }}</van-button>
            </template>
        </van-cell>
    </van-cell-group>

    <van-cell-group inset>
        <van-field v-model="delegateAddress" name="委托人地址" label="委托人地址" placeholder="委托人地址" />

        <div style="margin: 16px;">
            <van-button type="success" @click="delegate">委托他人代投</van-button>
        </div>
    </van-cell-group>

</template>

<script>
import { showDialog } from 'vant';
import useWeb3 from '@/hooks/userWeb3';
const { web3, voteContract, getAccount } = await useWeb3();
const account = await getAccount();
export default {
    data() {
        return {
            bords: [],
            voteBtn: false,
            delegateAddress:""
        }
    },
    async mounted() {
        this.initEventListen();
        this.initBordData();
    },
    methods: {
        async initBordData() {
            const bords = await voteContract.methods.getBordInfo().call();
            this.bords = bords;
            const voter = await voteContract.methods.voters(account).call();
            this.voteBtn = voter.isvoted
        },
        async vote(index) {
            const result = await voteContract.methods.vote(index).send({
                from: account
            })

        },
        async initEventListen() {
            voteContract.events.VoteSuccess({ fromBlock: 0 }, (er, evenet) => {
                console.log("监听执行...", evenet)
            }).on('data', (evenet) => {
                console.log("智能合约触发的事件", evenet)
                this.initBordData();
            })
        },
        async delegate(){
            await voteContract.methods.delegator(this.delegateAddress).send({
                from: account
            }).on('receipt',(event)=>{
                showDialog({
                    title: '提示',
                    message: '委托成功',
                })
                this.initBordData();
            })
        }
    }
}
</script>

<style lang="scss" scoped></style>