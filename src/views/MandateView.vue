<template>
    <van-form>

        <van-cell-group inset>
            <van-field v-model="hostAddress" name="主持人" label="主持人" placeholder="主持人" readonly />
            <van-field v-model="voters" name="投票人地址" label="投票人地址" autosize type="textarea" placeholder="投票人地址"
                :rules="[{ required: true, voters: '投票人地址' }]" />
        </van-cell-group>
        <div style="margin: 16px;">
            <van-button type="success" @click="addVoters">提交</van-button>
        </div>
    </van-form>
</template>

<script>
import useWeb3 from '@/hooks/userWeb3';
import { showDialog } from 'vant';
const { web3, voteContract, getAccount } = await useWeb3();


export default {
    data() {
        return {
            hostAddress: "",
            voters: "",
        }
    },
    async mounted() {
        this.hostAddress = await voteContract.methods.host().call();
    },
    methods: {
        async addVoters() {
            const address = this.voters.split(",");
            const accounts = await getAccount();
            voteContract.methods.mandate(address).send({
                from: accounts
            }).on('receipt', () => {
                showDialog({
                    title: '提示',
                    message: '选票分发成功',
                })
            })

        }
    }
}
</script>

<style lang="scss" scoped></style>