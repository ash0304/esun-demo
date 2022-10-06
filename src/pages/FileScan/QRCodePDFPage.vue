<template>
  <div>
    <vue-pdf-embed
      ref="pdfRef"
      v-if="tempPDFstring"
      :source="tempPDFstring"
      @rendered="handlePrint"
    />
    <div>測試</div>
  </div>
</template>
<script>
import VuePdfEmbed from 'vue-pdf-embed';
import { mapGetters } from 'vuex';

export default {
  name: 'QRCodePDFPage',
  components: { VuePdfEmbed },
  data() {
    return {
      PDFsource: '',
    };
  },
  computed: {
    ...mapGetters(['tempPDFstring']),
  },
  mounted() {
    console.log(this.$route)
  },
  methods: {
    handlePrint() {
      this.$refs.pdfRef.print();
    },
  },
};
</script>
