<template>
    <div class="attachment-wrap">
        <div
            class="attach-item"
            v-for="attachment in attachments"
            :key="attachment.id"
        >
            <n-button
                @click.stop="openDownload(attachment)"
                type="primary"
                size="tiny"
                dashed
            >
                <template #icon>
                    <n-icon>
                        <cloud-download-outline />
                    </n-icon>
                </template>{{$t('attachments')}}</n-button>
        </div>

        <!-- 删除确认 -->
        <n-modal
            v-model:show="showDownloadModal"
            :mask-closable="false"
            preset="dialog"
            :title="$t('downloadPrompt')"
            :content="downloadTip"
            :positive-text="$t('confirmDownload')"
            :negative-text="$t('cancel')"
            icon-placement="top"
            @positive-click="execDownloadAction"
        />
    </div>
</template>

<script setup lang="ts">
import { h, ref } from 'vue';
import { CloudDownloadOutline } from '@vicons/ionicons5';
import { precheckAttachment, getAttachment } from '@/api/user';
import { useI18n } from 'vue-i18n';

const $t = useI18n().t;
const props = withDefaults(
    defineProps<{
        attachments: Item.PostItemProps[];
        price?: number;
    }>(),
    {
        attachments: () => [],
        price: 0,
    }
);
const showDownloadModal = ref(false);
const downloadTip = ref<any>('');
const attachmentID = ref(0);

const download = (attachment: Item.PostItemProps) => {
    showDownloadModal.value = true;
    attachmentID.value = attachment.id;

    downloadTip.value = $t('freeAttachmentDownloadPrompt');
    if (attachment.type === 8) {
        downloadTip.value = () =>
            h('div', {}, [
                h(
                    'p',
                    {},
                    '这是一个收费附件，下载将收取' +
                        (props.price / 100).toFixed(2) +
                        '元'
                ),
            ]);

        precheckAttachment({
            id: attachmentID.value,
        })
            .then((res) => {
                if (res.paid) {
                    downloadTip.value = () =>
                        h('div', {}, [
                            h(
                                'p',
                                {},
                                $t('paidOrFreeDownloadPrompt')
                            ),
                        ]);
                }
            })
            .catch((err) => {
                showDownloadModal.value = false;
            });
    }
};
const execDownloadAction = () => {
    getAttachment({
        id: attachmentID.value,
    })
        .then((res) => {
            window.open(res.signed_url.replace('http://', 'https://'), '_blank');
        })
        .catch((err) => {
            console.log(err);
        });
};


// 直接下载，不搞收费
const openDownload = (attachment: Item.PostItemProps) => {

    window.open(attachment.content.replace('http://', 'https://'), '_blank');

}
</script>

<style lang="less" scoped>
.attach-item {
    margin: 10px 0;
}
</style>