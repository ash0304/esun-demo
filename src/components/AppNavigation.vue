<template>
  <nav v-if="showMenu()" class="sidenav-container">
    <ul class="sidenav-menu">
      <!-- 動態生成側邊欄 -->
      <template v-for="(item, index) in pageList" :key="index">
        <li
          v-if="
            item.isValid &&
            item.mainName != '權限管理' &&
            item.mainName != '系統管理'
          "
          class="sidenav-with-sub"
          @click="setActiveBlock(index)"
          :class="{ select: activeBlock == compareMap[index] }"
        >
          {{ item.mainName }}
          <ul class="sidenav-sub-menu">
            <template v-for="(i, d) in item.subFunctions" :key="d">
              <li v-if="i.isValid">
                <router-link :to="i.path">{{ i.subName }}</router-link>
              </li>
            </template>
          </ul>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script>
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import store from '../utilities/store';

export default {
  setup() {
    const route = useRoute();
    const activeBlock = ref('');
    const compareMap = reactive({
      0: 'index',
      1: 'fileScan',
      2: 'fileQueryAndRecord',
      3: 'caseQuery',
      4: 'privilege',
      5: 'system',
    });
    const pageList = ref([]);

    // computed
    const routeList = computed(() => store.getters.routeList);

    onMounted(() => {
      pageList.value = JSON.parse(localStorage.getItem('pageList'));
    });

    // methods
    const setActiveBlock = (menuBlock) => {
      activeBlock.value = compareMap[menuBlock];
    }
    const showMenu = () => {
      const hideMenuRoute = [
        '/',
        '/Signin',
        '/Error500',
        '/Error403',
        '/Error404',
      ];
      return !hideMenuRoute.includes(route.path);
    }

    return {
      route,
      activeBlock,
      compareMap,
      pageList,
      routeList,
      setActiveBlock,
      showMenu
    };
  },
};
</script>
