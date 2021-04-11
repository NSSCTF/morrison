<template>
    <el-row>
        <el-col>
            <el-card>
                <div style="font-size: 32px;text-align: center">
                    <p>添加题目</p>
                </div>
                <el-form :model="problem" label-width="100px">
                    <el-form-item label="题目名" style="width: 30rem">
                        <el-input v-model="problem.title" maxlength="63" show-word-limit></el-input>
                    </el-form-item>
                    <el-form-item label="镜像名" style="width: 30rem">
                        <el-autocomplete
                            style="width: 100%"
                            v-model="problem.docker"
                            :fetch-suggestions="queryDockerName"
                            placeholder="无须docker则留空"
                            :trigger-on-focus="false"
                        ></el-autocomplete>
                    </el-form-item>
                    <el-form-item label="题目附件">
                        <el-upload
                            with-credentials
                            :limit="1"
                            :http-request="uploadProblemAnnex"
                            :on-exceed="handleUploadOnExceed"
                        >
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="题目价格">
                        <el-input-number size="medium" v-model="problem.price" :min="0"></el-input-number>
                    </el-form-item>
                    <el-form-item label="题目标签">
                        <el-tag
                            :key="tag"
                            v-for="tag in problem.tag"
                            closable
                            :disable-transitions="false"
                            @close="handleTagClose(tag)"
                        >{{ tag }}</el-tag>
                        <el-input
                            class="input-new-tag"
                            v-if="tagInputVisible"
                            v-model="tagInputValue"
                            size="small"
                            maxlength="8"
                            show-word-limit
                            @keyup.enter="handleInputConfirm"
                            @blur="handleInputConfirm"
                        ></el-input>
                        <el-button
                            v-else-if="problem.tag.length < 8"
                            class="button-new-tag"
                            size="small"
                            @click="showInput"
                        >+ New Tag</el-button>
                    </el-form-item>
                    <el-form-item label="有无提示">
                        <el-switch v-model="problem.hintType"></el-switch>
                    </el-form-item>
                    <div v-if="problem.hintType == true">
                        <el-form-item label="提示价格">
                            <el-input-number size="medium" v-model="problem.hintPrice" :min="0"></el-input-number>
                        </el-form-item>
                        <el-form-item label="提示">
                            <el-input v-model="problem.hint"></el-input>
                        </el-form-item>
                    </div>
                    <el-form-item label="分数类型">
                        <el-radio-group v-model="problem.pointType">
                            <el-radio :label="0">动态积分</el-radio>
                            <el-radio :label="1">静态积分</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="静态积分" v-if="problem.pointType == 1">
                        <el-input-number size="medium" v-model="problem.point" :step="10"></el-input-number>
                    </el-form-item>
                    <el-form-item label="Flag类型">
                        <el-radio-group v-model="problem.flagType">
                            <el-radio :label="0">动态Flag</el-radio>
                            <el-radio :label="1">静态Flag</el-radio>
                            <el-radio :label="2">Checker</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="静态Flag" v-if="problem.flagType == 1">
                        <el-input v-model="problem.staticflag" maxlength="127" show-word-limit></el-input>
                    </el-form-item>
                    <el-form-item label="题目来源">
                        <el-radio-group v-model="problem.source">
                            <el-radio :label="1">NSSCTF</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="题目类型">
                        <el-radio-group v-model="problem.type">
                            <el-radio :label="1">WEB</el-radio>
                            <el-radio :label="2">PWN</el-radio>
                            <el-radio :label="3">REVERSE</el-radio>
                            <el-radio :label="4">CRYPTO</el-radio>
                            <el-radio :label="5">MISC</el-radio>
                            <el-radio :label="6">ANDROID</el-radio>
                            <el-radio :label="7">ETH</el-radio>
                            <el-radio :label="8">IOT</el-radio>
                            <el-radio :label="9">AI</el-radio>
                            <el-radio :label="10">EGG</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="题目简介">
                        <el-input
                            type="textarea"
                            v-model="problem.desc"
                            :autosize="{ minRows: 3, maxRows: 10 }"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
            <br />
        </el-col>
    </el-row>
</template>

<script lang="ts">
import { reactive, ref, toRefs } from "@vue/reactivity";
import { nextTick } from 'vue';
import Notification from '@/utils/notification'
import { postAddProblem, postQueryDockerName,postUploadProblemAnnex  } from '@/restful/admin'

export default {
    setup() {
        const state = reactive({
            problem: {
                title: '',
                desc: '',
                point: 500,
                source: 1,
                docker: 1,
                price: 0,
                type: 1,
                pointType: 0,
                flagType: 0,
                staticflag: '',
                hintType: false,
                hintPrice: 0,
                hint: '',
                annex: '',
                tag: [] as string[]
            },
            tagInputVisible: false,
            tagInputValue: ''
        });

        const queryDockerName = (name: any, cb: any) => {
            postQueryDockerName(name).then((res: any) => {
                let names: {}[] = [];
                for (let name of res.data) {
                    names.push({value:name});
                }
                cb(names);
            })
        }

        const handleTagClose = (tag: string) => {
            state.problem.tag.splice(state.problem.tag.indexOf(tag), 1);
        }

        const showInput = async () => {
            state.tagInputVisible = true;
        }

        const handleInputConfirm = () => {
            let inputValue = state.tagInputValue;
            if (inputValue) {
                state.problem.tag.push(inputValue);
            }
            state.tagInputVisible = false;
            state.tagInputValue = '';
        }

        const onSubmit = () => {
            postAddProblem(state.problem).then(res => {
                if (res.code == 200) {
                    Notification.success({
                        message: "提交成功！"
                    })
                } else {
                    Notification.warning({
                        message: "提交错误，请检查内容！"
                    })
                }
            })
        }

        const handleUploadOnExceed = () => {
            Notification.warning({
                message: "最多只能上传一个文件！多个文件请打包上传。"
            })
        }

        const uploadProblemAnnex = (content: any) => {
            let formData = new FormData();
            formData.append('file', content.file);
            postUploadProblemAnnex(formData).then((res: any) => {
                if (res.code == 200) {
                    Notification.success({
                        message: "附件上传成功！"
                    })
                    state.problem.annex = res.data;
                } else {
                    Notification.error({
                        message: "附件上传失败！"
                    })
                }
            })
        }

        return {
            ...toRefs(state),

            queryDockerName,
            handleTagClose,
            showInput,
            handleInputConfirm,
            onSubmit,
            uploadProblemAnnex,
            handleUploadOnExceed
        }
    }
}
</script>

<style lang="scss">
.el-tag + .el-tag {
    margin-left: 10px;
}
.button-new-tag {
    width: 120px;
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}
.input-new-tag {
    width: 120px;
    margin-left: 10px;
    vertical-align: bottom;
}
</style>