<template>
    <div class="login">
        <div class="loginwarrp">
            <p class="amazing">
                <img src="">      
            </p>
            <div class="logo">云盘</div>
            <div class="demo-input-suffix">
                <form @submit.prevent="Login">
                    <li>
                        <el-input name="user" v-model="user" placeholder="请输入用户名" class="input-long" prefix-icon="el-icon-service"></el-input>
                    </li>
                    <li>
                        <el-input name ="pwd" v-model="passwd" type="password" placeholder="请输入密码" class="input-long" prefix-icon="el-icon-edit"></el-input>
                    </li>
                    <div class="button-dev">
                        <el-button type="primary" class="button" native-type="submit">登录</el-button>
                    </div>
                    <div class="button-dev2">
                        <el-button type="success" class="button" @click="register">注册</el-button>
                    </div>
                </form>
            </div>
        </div>
        <div class="shadow-w"></div>
    </div>
</template>

<script>
export default {
    name: 'login',
    data () {
        return {
        user: '',
        passwd: '',
        }
    },
    inject:["reload"],
    methods:{
        onCancel(){
        },
        register(){
            this.$router.push({name: 'register'});
        },
        setCookie(name,value){
            var Days = 30;
            var exp = new Date();
            exp.setTime(exp.getTime() + Days*24*60*60*1000);
            document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
        },
        Login(){
            var data={
                user:this.user,
                pwd:this.passwd
            }
            this.axios.get(
                this.$store.state.url_prefix+"/sign",
                {
                    params:data
                }
            ).then((response) => {
                if("ok"==response.data.errmsg){
                    this.$message({
                        message: "登录成功！",
                        type: 'success'
                    });
                    sessionStorage.setItem('level' , response.data.data.level);
                    this.setCookie("token",response.data.data.token) 
                    this.reload()
                    this.$router.push({name: 'private'});
                } else {
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
  padding-top: 20px
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

