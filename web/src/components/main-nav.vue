<template>
    <div v-if="store.state.drawerModelShow">
        <n-drawer v-model:show="activeDrawerRef" :width=212 :placement="placementRef" resizable>
            <n-drawer-content>
                <sidebar />
            </n-drawer-content>
        </n-drawer>
    </div>
    <n-card size="small" :bordered="true" class="nav-title-card">
        <template #header>
            <div class="navbar">
                <n-button class="drawer-btn" v-if="store.state.drawerModelShow && !back" @click="activeDrawer" quaternary
                    circle size="medium">
                    <template #icon>
                        <n-icon><dehaze-round /></n-icon>
                    </template>
                </n-button>
                <n-button class="back-btn" v-if="back" @click="goBack" quaternary circle size="small">
                    <template #icon>
                        <n-icon><chevron-left-round /></n-icon>
                    </template>
                </n-button>

                {{ props.title }}


                <div class="right-wrap">
                    <n-dropdown trigger="hover" :options="options" @select="handleSelect">
                        <n-icon>
                            <svg t="1692584154147" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="978" width="200" height="200">
                                <path
                                    d="M547.797333 638.208l-104.405333-103.168 1.237333-1.28a720.170667 720.170667 0 0 0 152.490667-268.373333h120.448V183.082667h-287.744V100.906667H347.605333v82.218666H59.818667V265.386667h459.178666a648.234667 648.234667 0 0 1-130.304 219.946666 643.242667 643.242667 0 0 1-94.976-137.728H211.541333a722.048 722.048 0 0 0 122.453334 187.434667l-209.194667 206.378667 58.368 58.368 205.525333-205.525334 127.872 127.829334 31.232-83.84m231.424-208.426667h-82.218666l-184.96 493.312h82.218666l46.037334-123.306667h195.242666l46.464 123.306667h82.218667l-185.002667-493.312m-107.690666 287.744l66.56-178.005333 66.602666 178.005333z"
                                    p-id="979"></path>
                            </svg>
                        </n-icon>
                    </n-dropdown>

                    <n-switch v-if="props.theme" :value="store.state.theme === 'dark'" @update:value="switchTheme"
                        size="small">
                        <template #checked-icon>
                            <n-icon :component="LightModeOutlined" />
                        </template>
                        <template #unchecked-icon>
                            <n-icon :component="DarkModeOutlined" />
                        </template>
                    </n-switch>
                </div>

            </div>
        </template>
    </n-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useOsTheme, DrawerPlacement } from 'naive-ui';
import { LightModeOutlined, DarkModeOutlined, ChevronLeftRound, DehazeRound } from '@vicons/material';
import { useI18n } from 'vue-i18n';


const store = useStore();
const router = useRouter();
const activeDrawerRef = ref(false)
const placementRef = ref<DrawerPlacement>('left')
const { locale } = useI18n();

const props = withDefaults(
    defineProps<{
        title: string;
        back?: boolean;
        theme?: boolean;
    }>(),
    {
        title: '',
        back: false,
        theme: true,
    }
);
const switchTheme = (theme: boolean) => {
    if (theme) {
        localStorage.setItem('PAOPAO_THEME', 'dark');
        store.commit('triggerTheme', 'dark');
    } else {
        localStorage.setItem('PAOPAO_THEME', 'light');
        store.commit('triggerTheme', 'light');
    }
};
const goBack = () => {
    if (window.history.length <= 1) {
        router.push({
            path: '/',
        });
    } else {
        router.go(-1);
    }
};
const activeDrawer = () => {
    activeDrawerRef.value = true
};

const options = [
    {
        label: '中文',
        key: 'zh',
    },
    {
        label: 'English',
        key: "en"
    },
]

function handleSelect(key: string) {
    locale.value = key;
}

onMounted(() => {
    if (!localStorage.getItem('PAOPAO_THEME')) {
        switchTheme((useOsTheme() as unknown as string) === 'dark');
    }
});
</script>

<style lang="less">
.nav-title-card {
    z-index: 99;
    width: 100%;
    top: 0;
    position: sticky;
    border-radius: 0;
    border-bottom: 0;
    background-color: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(12px);

    .navbar {
        height: 30px;
        position: relative;
        display: flex;
        align-items: center;

        .drawer-btn,
        .back-btn {
            margin-right: 8px;
        }

        .theme-switch-wrap {
            position: absolute;
            right: 0;
            top: calc(50% - 9px);
        }

        .right-wrap {
            position: absolute;
            right: 0;
            top: calc(50% - 9px);
            display: flex;
            align-items: center;
            gap: 12px;
        }
    }
}

.dark {
    .nav-title-card {
        background-color: rgba(16, 16, 20, 0.75);
    }
}
</style>