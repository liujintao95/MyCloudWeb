<template>
    <el-row class="tac">
        <el-col :span="12" class="col2">
            <el-menu :default-active="activeindex" class="el-menu-vertical-demo" :router="true">
                <el-menu-item index="/public">
                    <i class="el-icon-menu"></i>
                    <span slot="title">公共文件</span>
                </el-menu-item>
                <el-menu-item index="/private">
                    <i class="el-icon-edit"></i>
                    <span slot="title">私人文件</span>
                </el-menu-item>
                <el-menu-item index="/upload">
                    <i class="el-icon-edit"></i>
                    <span slot="title">上传列表</span>
                </el-menu-item>
                <el-menu-item index="/admin">
                    <i class="el-icon-setting"></i>
                    <span slot="title">个人设置</span>
                </el-menu-item>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script>
export default {
    name:'Navigation',
    data() {
        return {
        activeindex:"/public",
        flag:false,
        flag2:false,
        }
    },
    methods: {

    },
    mounted() {
        if(location.href.indexOf("/public")!=-1){
            this.activeindex="/public";
        }
        else if(location.href.indexOf("/private")!=-1){
            this.activeindex="/private";
        }
        else if(location.href.indexOf("/upload")!=-1){
            this.activeindex="/upload";
        }
        else if(location.href.indexOf("/admin")!=-1){
            this.activeindex="/admin";
        }
    },
}
</script>

<style scoped>
.col2{
    width: 100% !important; 
}
.tac{
    float: left;
    width: 15%;
    height: 90.5%;
}
.col2, .el-menu-vertical-demo{
    height: 100%;
}
.router-link-active {
    text-decoration: none;
}
</style>