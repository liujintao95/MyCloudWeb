<template>
    <div class="upload">
        <div class="divButton">
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

