<template>
  <nav v-if="showMenu()" class="sidenav-container">
    <ul class="sidenav-menu">
      <!-- 動態生成側邊欄 -->
      <template v-for="(item, index) in pageList" :key="index">
        <li
          v-if="item.isValid"
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
import { mapGetters } from 'vuex';

export default {
  data: function () {
    return {
      activeBlock: '',
      compareMap: {
        0: 'index',
        1: 'fileScan',
        2: 'fileQueryAndRecord',
        3: 'caseQuery',
        4: 'privilege',
        5: 'system',
      },
      pageList: [],
    };
  },
  mounted() {
    this.pageList = JSON.parse(localStorage.getItem('pageList'));
  },
  computed: {
    ...mapGetters(['routeList']),
  },
  methods: {
    setActiveBlock(menuBlock) {
      this.activeBlock = this.compareMap[menuBlock];
    },
    showMenu() {
      const hideMenuRoute = [
        '/',
        '/Signin',
        '/Error500',
        '/Error403',
        '/Error404',
      ];
      return !hideMenuRoute.includes(this.$route.path);
    },
  },
};
</script>
