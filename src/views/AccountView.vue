<template>
    <van-cell-group>
        <van-cell title="当前账户" :value="currentAccount" />
        <van-cell title="账户票数" :value="amount" />
        <van-cell title="委托账户" :value="delegator" />
        <van-cell title="是否已投票" :value="isvoted" />
        <van-cell title="投票ID" :value="tagretId" />
    </van-cell-group>
</template>

<script>
import useWeb3 from '@/hooks/userWeb3';
import { showDialog } from 'vant';
const { web3, voteContract, getAccount } = await useWeb3();
export default {
    data(){
        return{
            currentAccount:"",
            amount:0,
            delegator:"",
            isvoted:"",
            tagretId:"",
        }
    },
    async mounted() {
        this.currentAccount = await getAccount();
        const voter = await voteContract.methods.voters(this.currentAccount).call();
        this.amount = voter.amount;
        this.delegator = voter.delegator;
        this.isvoted = voter.isvoted;
        this.tagretId = voter.tagretId;
    },
}
</script>

<style lang="scss" scoped></style>