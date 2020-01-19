<template>
    <div class="upload">
        <div class="divButton">
            <input type="file" name="fileList" multiple directory mozdirectory webkitdirectory @change="IteratesDir($event)" ref="file">
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
                            <el-button type="warning" plain size="mini" v-else-if="scope.row.state==-1">暂停</el-button>
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
            tableData: []
        }
    },
    inject:["reload"],
    methods:{
        CreateInit(file){
            var _this = this
            var reader = new FileReader()
            reader.readAsArrayBuffer(file)
            reader.onload = function () {
                var wordArray = CryptoJS.lib.WordArray.create(reader.result)
                var data = {
                    hash : CryptoJS.SHA256(wordArray).toString(),
                    fileName : file.name,
                    size : file.size,
                }

                _this.axios.post(
                    _this.$store.state.url_prefix+"/auth/file/rapid_upload",
                    _this.$qs.stringify({hash: data.hash})
                ).then((response) => {
                    if("ok"==response.data.errmsg){
                        if(response.data.data){
                            _this.$message({
                                message: "上传成功！",
                                type: 'success'
                            });
                        } else {
                            if(file.size <= 5 * 1024 *1024){
                                _this.axios.post(
                                    _this.$store.state.url_prefix+"/auth/file/init",
                                    _this.$qs.stringify(data)
                                ).then((response) => {
                                    if("ok"==response.data.errmsg){
                                        _this.$message({
                                            message: "上传成功！",
                                            type: 'success'
                                        });
                                    } else {
                                        _this.$message({
                                            message: response.data.errmsg,
                                            type: 'error'
                                        })
                                    }
                                }).catch(error => {
                                    _this.$message({
                                        message: error.response.data.errmsg,
                                        type: 'error'
                                    })
                                })
                            } else {
                                _this.axios.post(
                                    _this.$store.state.url_prefix+"/auth/block/init",
                                    _this.$qs.stringify(data)
                                ).then((response) => {
                                    if("ok"==response.data.errmsg){
                                        _this.$message({
                                            message: "上传成功！",
                                            type: 'success'
                                        })
                                    } else {
                                        _this.$message({
                                            message: response.data.errmsg,
                                            type: 'error'
                                        })
                                    }
                                }).catch(error => {
                                    _this.$message({
                                        message: error.response.data.errmsg,
                                        type: 'error'
                                    })
                                })
                            }
                        }
                        
                    } else {
                        _this.$message({
                            message: response.data.errmsg,
                            type: 'error'
                        })
                    }
                }).catch(error => {
                    _this.$message({
                        message: error.response.data.errmsg,
                        type: 'error'
                    })
                })    
            }
        },
        IteratesDir(event){
            if (!event.target.files[0].size) return
            for(var i=0; i<event.target.files.length; i++){
                this.CreateInit(event.target.files[i])
            }
        },
        UploadShow(){
            this.axios.get(
                this.$store.state.url_prefix+"/auth/file/upload_show"
            ).then((response) => {
                if("ok"==response.data.errmsg){
                    this.tableData = response.data.data
                }
                else{
                    this.tableData = []
                }
            }).catch(error => {
                this.$message({
                    message: error.response.data.errmsg,
                    type: 'error'
                });
            });
        }
    },
    mounted() {
        this.UploadShow()
    },
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

