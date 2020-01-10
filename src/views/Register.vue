<template>
    <div class="Register">
        <div class="loginwarrp">
            <p class="amazing">
                <img src="">      
            </p>
            <div class="logo">云盘</div>
            <div class="demo-input-suffix">
                <form @submit.prevent="Register">
                    <li>
                        <el-input name="user" v-model="user" placeholder="请输入用户名" class="input-long" prefix-icon="el-icon-user" auto-complete="new-password"></el-input>
                    </li>
                    <li>
                        <el-input name="email" v-model="email" placeholder="请输入邮箱" class="input-long" prefix-icon="el-icon-message" auto-complete="new-password"></el-input>
                    </li>
                    <li>
                        <el-input name ="pwd" v-model="pwd" type="password" placeholder="请输入密码" class="input-long" prefix-icon="el-icon-edit" auto-complete="new-password"></el-input>
                    </li>
                    <li>
                        <el-input name ="rpwd" v-model="rpwd" type="password" placeholder="请再次输入密码" class="input-long" prefix-icon="el-icon-edit" auto-complete="new-password"></el-input>
                    </li>
                    <div class="button-dev">
                        <el-button type="primary" class="button" native-type="submit">注册</el-button>
                    </div>
                    <div class="button-dev2">
                        <el-button type="success" class="button" @click="Cancel">退出</el-button>
                    </div>
                </form>
            </div>
        </div>
        <div class="shadow-w"></div>
    </div>
</template>

<script>
export default {
    name: 'Register',
    data () {
        return {
        user: '',
        email: '',
        pwd: '',
        rpwd: '',
        }
    },
    inject:["reload"],
    methods:{
        Cancel(){
            this.$router.push({name: 'Login'});
        },
        Register(){
            var data = {
                user:this.user,
                email:this.email,
                pwd:this.pwd,
                rpwd:this.rpwd
            }
            this.$axios.post(
                this.$store.state.url_prefix+"/register",
                this.$qs.stringify(data)
            ).then((response) => {
                if("ok"==response.data.errmsg){
                    this.$alert('点击确定进行跳转', '注册成功！', {
                        confirmButtonText: '确定',
                        callback: this.$router.push({name: 'private'})
                    });
                    return;
                }
                else{
                    this.$alert(response.data.errmsg, '注册失败！', {
                        confirmButtonText: '确定',
                        callback: this.$router.push({name: 'register'})
                    });
                    return;
                }
            }).catch(error => {
                this.$message({
                    message: error.response.data.errmsg,
                    type: 'error'
                });
            });
        }
    }
}
</script>

<style scoped>
span{
  display: inline-block;
  width: 22%;
}
li{
  padding-top: 15px
}
.amazing{
  text-align: center
}
.logo{
  font-size: 3em;
  text-align: center;
  color: rgb(64, 158, 211);
  font-weight:bold;
}
.input-long{
  width: 16%;
}
.demo-input-suffix{
  background: #FFFFFF;
  text-align: center;
  padding-top: 55px;
}
.button-dev{
  float: right;
  margin-top: 20px;
  width: 100%;
}
.button-dev2{
  float: right;
  margin-top: 10px;
  width: 100%;
}
.button{
  width: 16%;
  text-align: center
}
.loginwarrp{
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 10;
  overflow: auto;
}
.shadow-w{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 1;
  background-color: #FFF;
  z-index: 9;
}
</style>

