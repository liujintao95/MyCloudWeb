<template>
    <div class="upload">
        <div class="divButton">
            <input type="file" name="fileList" multiple directory mozdirectory webkitdirectory @change="UploadInit($event)" ref="file">
            <el-button class="uploadButton" type="primary" icon="el-icon-upload">上传文件</el-button>
        </div>
        <div>
            <template>
                <el-table
                    :data="tableData"
                    border
                    style="width: 80%; margin-left: 17%;">
                    <el-table-column
                        prop="name"
                        label="文件名">
                    </el-table-column>
                    <el-table-column
                        prop="size"
                        label="文件大小"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="progress"
                        label="进度"
                        width="280">
                        <template slot-scope="scope">
                            <el-progress :percentage="scope.row.progress"></el-progress>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="state"
                        label="操作"
                        width="180"
                        align="center">
                        <template slot-scope="scope">
                            <el-button type="primary" plain size="mini" v-if="scope.row.state==0">上传</el-button>
                            <el-button type="warning" plain size="mini" v-else-if="scope.row.state==1">暂停</el-button>
                            <el-button type="danger" plain size="mini" v-else>删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
    </div>
</template>

<script>
import CryptoJS from 'crypto-js'
export default {
    name: 'upload',
    data () {
        return {
            tableData: [{
                id: 23,
                name: '本地文件',
                size: '1.1Gb',
                progress: 27,
                state: 0,
            }, {
                id: 24,
                name: '个人文件',
                size: '1.7Gb',
                progress: 100,
                state: 2,
            }, {
                id: 25,
                name: '个人视频',
                size: '700Mb',
                progress: 37,
                state: 1,
            }, {
                id: 26,
                name: '图片',
                size: '500Kb',
                progress: 22,
                state: 1,
            }]
        }
    },
    inject:["reload"],
    methods:{
        UploadInit(event){
            if (!event.target.files[0].size) return
            for(var i=0; i<event.target.files.length; i++){
                var reader = new FileReader()
                var data = {
                    "fileName" : event.target.files[i].name,
                    "size" : event.target.files[i].size,
                }
                reader.readAsArrayBuffer(event.target.files[i])
                reader.onload = function () {
                    var wordArray = CryptoJS.lib.WordArray.create(reader.result)
                    // eslint-disable-next-line no-unused-vars
                    data["hash"] = CryptoJS.SHA256(wordArray).toString()
                    // eslint-disable-next-line no-console
                    console.log(data)
                    
                    // if event.target.files[i].size
                    // this.$axios.post(
                    //     this.$store.state.url_prefix+"/block/init",
                    //     this.$qs.stringify(data)
                    // ).then((response) => {
                    //     if("ok"==response.data.errmsg){
                    //         this.$alert('点击确定进行跳转', '注册成功！', {
                    //             confirmButtonText: '确定',
                    //             callback: this.$router.push({name: 'private'})
                    //         });
                    //         return;
                    //     }
                    //     else{
                    //         this.$alert(response.data.errmsg, '注册失败！', {
                    //             confirmButtonText: '确定',
                    //             callback: this.$router.push({name: 'register'})
                    //         });
                    //         return;
                    //     }
                    // }).catch(error => {
                    //     this.$message({
                    //         message: error.response.data.errmsg,
                    //         type: 'error'
                    //     });
                    // });
                };
            }
        }
    }
}
</script>

<style scoped>
.divButton{
    height: 108px;
    line-height: 108px;
}
.uploadButton{
    margin-left: 58px;
}
.opButton{
    text-align: center;
}
</style>

