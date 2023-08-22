<template>
    <n-config-provider :locale="naiveLocales.locale" :date-locale="naiveLocales.dateLocale" :theme="theme">
        <n-message-provider>
            <n-dialog-provider>
                <div :key="localeKey" class="app-container"
                    :class="{ dark: theme?.name === 'dark', mobile: !store.state.desktopModelShow }">
                    <div has-sider class="main-wrap" position="static">
                        <!-- 侧边栏 -->
                        <div v-if="store.state.desktopModelShow">
                            <sidebar />
                        </div>

                        <div class="content-wrap">
                            <router-view class="app-wrap" v-slot="{ Component }">
                                <keep-alive>
                                    <component v-if="$route.meta.keepAlive" :is="Component" />
                                </keep-alive>
                                <component v-if="!$route.meta.keepAlive" :is="Component" />
                            </router-view>
                        </div>

                        <!-- 右侧 -->
                        <rightbar />
                    </div>
                    <!-- 登录/注册公共组件 -->
                    <auth />
                </div>
            </n-dialog-provider>
        </n-message-provider>
        <n-global-style />
    </n-config-provider>
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue';
import { useStore } from 'vuex';
import { darkTheme, zhCN, dateZhCN, enUS, dateEnUS } from 'naive-ui';
import moment from 'moment';
import "moment/dist/locale/zh-cn";
import "moment/dist/locale/en-au";
import { useI18n } from 'vue-i18n';

const localeKey = ref(Date.now())
const store = useStore();
const theme = computed(() => (store.state.theme === 'dark' ? darkTheme : null));
const { locale } = useI18n();

locale.value = localStorage.getItem('PAOPAO_LOCALE') || 'en';
moment.locale({ zh: 'zh-cn', en: 'en-au' }[locale.value]);


const naiveLocales = computed(() => {
    const obj = {
        zh: {
            locale: zhCN,
            dateLocale: dateZhCN,
        },
        en: {
            locale: enUS,
            dateLocale: dateEnUS,
        }
    }
    return obj[locale.value as 'en' | 'zh' || 'en']
})


watch(locale, (n) => {
    localStorage.setItem('PAOPAO_LOCALE', n);
    moment.locale({ zh: 'zh-cn', en: 'en-au' }[n]);

    localeKey.value = Date.now()
})

</script>

<style lang="less">
@import '@/assets/css/main.less';
</style>