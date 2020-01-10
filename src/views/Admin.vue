<template>
    <div class="backdrop">
        <div class="content">
            <div class="fl">
                <img src="../assets/user.png" alt="" class="user-img"><br>
                <el-button size="small" type="primary" @click="upload">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </div>
            <div class="user_msg fl">
                <table>
                    <tbody>
                        <tr>
                            <th class="user-th">
                                账户级别
                            </th>
                            <td v-if="user.Level == 5">
                                管理员
                            </td>
                            <td v-if="user.Level != 5">
                                普通用户
                            </td>
                        </tr>
                        <tr>
                            <th class="user-th">
                                用户名
                            </th>
                            <td>
                                {{ user.User }}
                            </td>
                        </tr>
                        <tr>
                            <th class="user-th">
                                昵称
                            </th>
                            <td>
                                {{ user.Name }}
                            </td>
                            <td>
                                <el-button type="primary" round size="mini" @click="nameChange">修改</el-button>
                            </td>
                        </tr>
                        <tr>
                            <th class="user-th">
                                密码强度
                            </th>
                            <td>
                                {{ user.PwdStrength }}
                            </td>
                            <td>
                                <el-button type="primary" round size="mini" @click="pwdChange">修改</el-button>
                            </td>
                        </tr>
                        <tr>
                            <th class="user-th">
                                邮箱
                            </th>
                            <td>
                                {{ user.Email }}
                            </td>
                            <td>
                                <el-button type="primary" round size="mini" @click="emailChange">修改</el-button>
                            </td>
                        </tr>
                        <tr>
                            <th class="user-th">
                                电话
                            </th>
                            <td>
                                {{ user.Phone.String }}
                            </td>
                            <td>
                                <el-button type="primary" round size="mini" @click="phoneChange">修改</el-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <el-button type="warning" @click="logout" style="margin-top:10px">退出登陆</el-button>
            </div>
        </div>
        <EmailChange :class="hide1" @onCancel="onCancel"></EmailChange>
        <PhoneChange :class="hide2" @onCancel="onCancel"></PhoneChange>
        <PwdChange :class="hide3" @onCancel="onCancel"></PwdChange>
        <NameChange :class="hide4" @onCancel="onCancel"></NameChange>
    </div>
</template>

<script>
import EmailChange from '../components/EmailChange.vue'
import PhoneChange from '../components/PhoneChange.vue'
import PwdChange from '../components/PwdChange.vue'
import NameChange from '../components/NameChange.vue'
export default {
    name: 'Admin',
    data () {
        return {
            user:{
                Name:"",
                User:"",
                Email:"",
                Level:"",
                Phone:{String:""},
                PwdStrength:""
            },
            hide1:"hide",
            hide2:"hide",
            hide3:"hide",
            hide4:"hide",
        }
    },
    methods: {
        upload(){
            alert("本功能暂不开放")
        },
        onCancel(){
            this.hide1="hide";
            this.hide2="hide";
            this.hide3="hide";
            this.hide4="hide";
        },
        
        emailChange(){
            this.hide1=""
        },
        phoneChange(){
            this.hide2=""
        },
        pwdChange(){
            this.hide3=""
        },
        nameChange(){
            this.hide4=""
        },
        logout(){
            this.axios.get(
                this.$store.state.url_prefix+"/logout"
            ).then((response) => {
                if("ok"==response.data.errmsg){
                    this.$message({
                        message: '退出成功！',
                        type: 'success'
                    });
                    this.$router.push({name: 'Login'});
                }
            }).catch(error => {
                this.$message({
                    message: error.response.data.errmsg,
                    type: 'error'
                });
                this.$router.push({name: 'Login'});
            });
        }
    },
    components:{
        EmailChange,
        PhoneChange,
        PwdChange,
        NameChange
    },
    mounted(){
        this.axios.get(
            this.$store.state.url_prefix+"/auth/user/show"
        ).then((response) => {
            if("ok"==response.data.errmsg){
                this.user = response.data.data
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
</script>

<style scoped>
.backdrop{
    height: 90.5%;
    width: 85%;
    float: right;
}
.content{
    width: 70%;
    margin: 50px auto;
}
.user-img{
    width: 200px;
    opacity:0.4;
}
.user_msg{
    margin-left: 128px;
    margin-top: 108px
}
.user-th{
    height: 48px;
    color: #7e8b9c;
    text-align: right;
    font-weight:normal;
}
.user_msg td{
    min-width: 150px;
}
</style>