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
        <div style="height:78px">
            <el-pagination
                style="margin-left: 43%; margin-top: 28px;"
                background
                layout="prev, pager, next"
                :current-page.sync="currentPage"
                @current-change="CurrentPageChange"
                :total="totalData"
                :page-size="10">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import CryptoJS from 'crypto-js'
export default {
    name: 'upload',
    data () {
        return {
            tableData: [],
            currentPage: 1,
            totalData: NaN
        }
    },
    inject:["reload"],
    methods:{
        async CreateUpload(data){
            let res
            await this.axios.post(
                this.$store.state.url_prefix+"/auth/file/rapid_upload",
                this.$qs.stringify({hash: data.hash})
            ).then(async (response) => {
                if("ok"==response.data.errmsg){
                    if(!response.data.data){
                        if(data.size <= 5 * 1024 *1024){
                            await this.axios.post(
                                this.$store.state.url_prefix+"/auth/file/init",
                                this.$qs.stringify(data)
                            ).then((response) => {
                                res = response.data.errmsg
                            }).catch(error => {
                                res = error.response.data.errmsg
                            })
                        } else {
                            await this.axios.post(
                                this.$store.state.url_prefix+"/auth/block/init",
                                this.$qs.stringify(data)
                            ).then((response) => {
                                res = response.data.errmsg
                            }).catch(error => {
                                res = error.response.data.errmsg
                            })
                        }
                    } else{
                        res = "ok"
                    }
                } else {
                    res = response.data.errmsg
                }
            }).catch(error => {
                res = error.response.data.errmsg
            })
            return res
        },
        async CreateDir(dirList){
            let res
            await this.axios.post(
                this.$store.state.url_prefix+"/auth/dir/save",
                this.$qs.stringify({dirList: JSON.stringify(dirList)})
            ).then((response) => {
                res = response.data.errmsg
            }).catch(error => {
                res = error.response.data.errmsg
            })
            return res
        },
        CreateInit(file){
            var _this = this
            var reader = new FileReader()
            reader.readAsArrayBuffer(file)
            reader.onload = function () {
                var wordArray = CryptoJS.lib.WordArray.create(reader.result.slice(0,2000))
                var data = {
                    hash : CryptoJS.SHA256(wordArray).toString(),
                    fileName : file.name,
                    size : file.size,
                }
                _this.CreateUpload(data).then((response) => {
                    if (response == "ok"){
                        var filePath = file.webkitRelativePath
                        var pathList = filePath.split("/")
                        var dirList = new Array()
                        for(var i=0; i<pathList.length; i++) {
                            var dirObj = new Object()
                            if(i==0){
                                dirObj.curDir = ""
                                dirObj.fileName = pathList[i]
                                dirObj.fileHash = ""
                                dirList.push(dirObj)
                            } else if(i + 1 == pathList.length){
                                dirObj.curDir = pathList.slice(0,i).join('/')
                                dirObj.fileName = pathList[i]
                                dirObj.fileHash = data.hash
                                dirList.push(dirObj)
                            } else {
                                dirObj.curDir = pathList.slice(0,i).join('/')
                                dirObj.fileName = pathList[i]
                                dirObj.fileHash = ""
                                dirList.push(dirObj)
                            }
                        }
                        _this.CreateDir(dirList).then((response) => {
                            if(response == "ok"){
                                _this.$message({
                                    message: data.filePath+"上传成功！",
                                    type: 'success'
                                })
                            } else {
                                _this.$message({
                                    message: response,
                                    type: 'error'
                                })
                            }
                        })
                    } else {
                        _this.$message({
                            message: response,
                            type: 'error'
                        })
                    }
                })
            }
        },
        IteratesDir(event){
            if (!event.target.files[0].size) return
            for(var i=0; i<event.target.files.length; i++){
                this.CreateInit(event.target.files[i])
            }
            this.UploadShow()
        },
        UploadShow(){
            this.axios.get(
                this.$store.state.url_prefix+"/auth/file/upload_show",
                {
                    params:{page: this.currentPage}
                }
            ).then((response) => {
                if("ok"==response.data.errmsg){
                    this.tableData = response.data.data
                    this.totalData = response.data.count
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
        },
        CurrentPageChange(page){
            this.currentPage = page;
            this.UploadShow()
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

