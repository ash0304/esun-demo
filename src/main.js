import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import * as yup from "yup";
import store from '@/utilities/store.js'
import '@/assets/scss/main.scss'
import "bootstrap"
import "@/utilities/validation";
import 'default-passive-events'

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')

const DEFAULT_TITLE = '玉山銀行｜文件影像管理系統';
router.afterEach((to) => {
    document.title = `${DEFAULT_TITLE} - ${to.meta.title}`;
});

app.config.globalProperties.$yup = yup;

const TreeType = {
    ROOT: 0, CATEGORY: 1, CASE: 2, FILE: 3
}

app.config.globalProperties.$treeType = TreeType;