<template>
    <div class="EmailChange">
        <div class="modal">
            <div class="content">
                <div class="demo-input-suffix">
                    原密码：
                    <el-input
                        type="password"
                        placeholder="请输入原密码"
                        v-model="input">
                    </el-input>
                </div>
                <div class="demo-input-suffix">
                    新密码：
                    <el-input
                        type="password"
                        placeholder="请输入新密码"
                        v-model="input2">
                    </el-input>
                </div>
                <div class="demo-input-suffix">
                    <el-input
                        type="password"
                        placeholder="请再次输入新密码"
                        v-model="input3">
                    </el-input>
                </div>
                <div class="button">
                    <el-button type="primary" @click="onSubmit">修改</el-button>
                    <el-button @click="onCancel">取消</el-button>
                </div>
            </div>
        </div>
        <div class="shadow"></div>
    </div>
</template>

<script>
export default {
    name: 'EmailChange',
    data () {
        return {
            input:"",
            input2:"",
            input3:""
        }
    },
    inject:["reload"],
    methods: {
        onSubmit() {
            var _this = this
            var data = {
                pwd: this.input,
                newPwd: this.input2,
                rNewPwd: this.input3,
            }
            this.axios.post(
                this.$store.state.url_prefix+"/auth/user/change/password",
                this.$qs.stringify(data)
            ).then((response) => {
                if("ok"==response.data.errmsg){
                    this.$message({
                        message: '修改成功！',
                        type: 'success'
                    });
                    _this.reload();
                }else {
                    this.$message({
                    message: response.data.errmsg,
                    type: 'error'
                });
                }
            }).catch(error => {
                this.$message({
                    message: error.response.data.errmsg,
                    type: 'error'
                });
                _this.reload();
            });
        },
        onCancel(){
            this.$emit("onCancel")
        },
    },
}
</script>

<style scoped>
.modal{
    position: fixed;
    top:50%;
    left: 50%;
    width: 550px;
    max-height: 750px;
    margin-top: -300px;
    margin-left: -325px;
    background-color: #fff;
    z-index: 10;
    overflow: auto;
}
.content{
    margin: 40px 40px 40px 30px;
}
.button{
    text-align: right;
    margin-top: 10px;
}
.demo-input-suffix{
    margin-bottom: 10px
}
</style>