<template>
    <n-modal
        v-model:show="store.state.authModalShow"
        class="auth-card"
        preset="card"
        size="small"
        :mask-closable="false"
        :bordered="false"
        :style="{
            width: '360px',
        }"
    >
        <div class="auth-wrap">
            <n-card :bordered="false">
                <n-space justify="center"><n-h3><n-text type="success">{{$t('accountLogin')}}</n-text></n-h3></n-space>
                <n-button
                    type="primary"
                    block
                    secondary
                    strong
                    :loading="loading"
                    @click="handleKoobooLogin"
                >
                {{$t('koobooOneClickLogin')}}
                </n-button>
            </n-card>
            <!-- <n-card :bordered="false">
                <div v-if="!allowUserRegister">
                    <n-space justify="center"><n-h3><n-text type="success">账号登录</n-text></n-h3></n-space>
                    <n-form
                            ref="loginRef"
                            :model="loginForm"
                            :rules="{
                                username: {
                                    required: true,
                                    message: '请输入账户名',
                                },
                                password: {
                                    required: true,
                                    message: '请输入密码',
                                },
                            }"
                        >
                            <n-form-item-row label="账户" path="username">
                                <n-input
                                    v-model:value="loginForm.username"
                                    placeholder="请输入用户名"
                                    @keyup.enter.prevent="handleLogin"
                                />
                            </n-form-item-row>
                            <n-form-item-row label="密码" path="password">
                                <n-input
                                    type="password"
                                    show-password-on="mousedown"
                                    v-model:value="loginForm.password"
                                    placeholder="请输入账户密码"
                                    @keyup.enter.prevent="handleLogin"
                                />
                            </n-form-item-row>
                        </n-form>
                        <n-button
                            type="primary"
                            block
                            secondary
                            strong
                            :loading="loading"
                            @click="handleLogin"
                        >
                            登录
                        </n-button>
                </div>
                <n-tabs
                    v-if="allowUserRegister" 
                    :default-value="store.state.authModelTab"
                    size="large"
                    justify-content="space-evenly"
                >
                    <n-tab-pane name="signin" tab="login">
                        <n-form
                            ref="loginRef"
                            :model="loginForm"
                            :rules="{
                                username: {
                                    required: true,
                                    message: '请输入账户名',
                                },
                                password: {
                                    required: true,
                                    message: '请输入密码',
                                },
                            }"
                        >
                            <n-form-item-row label="账户" path="username">
                                <n-input
                                    v-model:value="loginForm.username"
                                    placeholder="请输入用户名"
                                    @keyup.enter.prevent="handleLogin"
                                />
                            </n-form-item-row>
                            <n-form-item-row label="密码" path="password">
                                <n-input
                                    type="password"
                                    show-password-on="mousedown"
                                    v-model:value="loginForm.password"
                                    placeholder="请输入账户密码"
                                    @keyup.enter.prevent="handleLogin"
                                />
                            </n-form-item-row>
                        </n-form>
                        <n-button
                            type="primary"
                            block
                            secondary
                            strong
                            :loading="loading"
                            @click="handleLogin"
                        >
                            登录
                        </n-button>
                    </n-tab-pane>
                    <n-tab-pane name="signup" tab="register">
                        <n-form
                            ref="registerRef"
                            :model="registerForm"
                            :rules="registerRule"
                        >
                            <n-form-item-row label="username" path="username">
                                <n-input
                                    v-model:value="registerForm.username"
                                    placeholder="用户名注册后无法修改"
                                />
                            </n-form-item-row>
                            <n-form-item-row label="密码" path="password">
                                <n-input
                                    type="password"
                                    show-password-on="mousedown"
                                    placeholder="密码不少于6位"
                                    v-model:value="registerForm.password"
                                    @keyup.enter.prevent="handleRegister"
                                />
                            </n-form-item-row>
                            <n-form-item-row label="repeatPassword" path="repassword">
                                <n-input
                                    type="password"
                                    show-password-on="mousedown"
                                    placeholder="enterNewPasswordAgain"
                                    v-model:value="registerForm.repassword"
                                    @keyup.enter.prevent="handleRegister"
                                />
                            </n-form-item-row>
                        </n-form>
                        <n-button
                            type="primary"
                            block
                            secondary
                            strong
                            :loading="loading"
                            @click="handleRegister"
                        >
                            注册
                        </n-button>
                    </n-tab-pane>
                </n-tabs>
            </n-card> -->
        </div>
    </n-modal>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useStore } from 'vuex';
import { userLogin, userRegister, userInfo } from '@/api/auth';
import type { FormInst, FormItemRule } from 'naive-ui';
import { useI18n } from 'vue-i18n';

const $t = useI18n().t;
const allowUserRegister = ref(import.meta.env.VITE_ALLOW_USER_REGISTER.toLowerCase() === 'true')
const store = useStore();

const loading = ref(false);
const loginRef = ref<FormInst>();
const loginForm = reactive({
    username: '',
    password: '',
});
const registerRef = ref<FormInst>();
const registerForm = reactive({
    username: '',
    password: '',
    repassword: '',
});
const registerRule = {
    username: {
        required: true,
        message: '请输入账户名',
    },
    password: {
        required: true,
        message: '请输入密码',
    },
    repassword: [
        {
            required: true,
            message: '请输入密码',
        },
        {
            validator: (rule: FormItemRule, value: any) => {
                return (
                    !!registerForm.password &&
                    registerForm.password.startsWith(value) &&
                    registerForm.password.length >= value.length
                );
            },
            message: 'passwordsDoNotMatch',
            trigger: 'input',
        },
    ],
};
const handleLogin = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();

    loginRef.value?.validate((errors) => {
        if (!errors) {
            loading.value = true;

            userLogin({
                username: loginForm.username,
                password: loginForm.password,
            })
                .then((res) => {
                    const token = res?.token || '';
                    // 写入用户信息
                    localStorage.setItem('PAOPAO_TOKEN', token);

                    return userInfo(token);
                })
                .then((res) => {
                    window.$message.success('登录成功');
                    loading.value = false;

                    store.commit('updateUserinfo', res);
                    store.commit('triggerAuth', false);
                    store.commit('refresh')
                    loginForm.username = '';
                    loginForm.password = '';
                })
                .catch((err) => {
                    loading.value = false;
                });
        }
    });
};

const handleRegister = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();

    registerRef.value?.validate((errors) => {
        if (!errors) {
            loading.value = true;

            userRegister({
                username: registerForm.username,
                password: registerForm.password,
            })
                .then((res) => {
                    return userLogin({
                        username: registerForm.username,
                        password: registerForm.password,
                    });
                })
                .then((res) => {
                    const token = res?.token || '';
                    // 写入用户信息
                    localStorage.setItem('PAOPAO_TOKEN', token);

                    return userInfo(token);
                })
                .then((res) => {
                    window.$message.success('注册成功');
                    loading.value = false;

                    store.commit('updateUserinfo', res);
                    store.commit('triggerAuth', false);
                    registerForm.username = '';
                    registerForm.password = '';
                    registerForm.repassword = '';
                })
                .catch((err) => {
                    loading.value = false;
                });
        }
    });
};


const getCookie = (cookieName: string) => {
  const cookieValue = document.cookie.replace(
    new RegExp("(?:(?:^|.*;\\s*)" + cookieName + "\\s*\\=\\s*([^;]*).*$)|^.*$"),
    "$1"
  );
  return cookieValue;
}

function clearCookie(cookieName: string) {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

const handleKoobooLogin = () => {

    // 开发环境直接输入jwt_token用于测试
    if (import.meta.env.MODE === 'development') {
        const jwt_token = prompt('开发环境, 请输入jwt_token: ')
        if (jwt_token) {
            document.cookie = `jwt_token=${jwt_token};`
            location.reload()
        }
        return
    }

    clearCookie('jwt_token')
    // 需要是同一个站点才能拿到cookie
    location.href = `${import.meta.env.VITE_HOST}/_Admin/login?returnurl=${location.href}`
}

onMounted(() => {
    // 使用kooboo的jwt_token登录
    const jwt_token = getCookie("jwt_token");
    // console.log(jwt_token);
    jwt_token && localStorage.setItem("PAOPAO_TOKEN", jwt_token);
    const token = localStorage.getItem('PAOPAO_TOKEN') || '';
    if (token) {
        userInfo(token)
            .then((res) => {
                store.commit('updateUserinfo', res);
                store.commit('triggerAuth', false);
            })
            .catch((err) => {
                store.commit('userLogout');
            });
    } else {
        store.commit('userLogout');
    }
});
</script>

<style lang="less" scoped>
.auth-wrap {
    margin-top: -30px;
}
.dark {
    .auth-wrap {
        background-color: rgba(16, 16, 20, 0.75);
    }
}
</style>