<template>
  <tree
    :config="config"
    :nodes="nodes"
    @node-Focus="nodeFocus($event)"
    @node-Checked="nodeChecked($event)"
    @node-Unchecked="nodeUnchecked($event)"
    @node-Dragstart="nodeDragstart($event)"
    @node-Over="nodeOver($event)"
    @node-Enter="nodeEnter($event)"
    @node-Drop="nodeDrop($event)"
    @node-Dragend="nodeDragend($event)"
  >
    <template #before-input="props">
      <span v-if="props.node.type == 0">
        <img src="@/assets/images/icon-layer.png" width="20" height="20" />
      </span>
      <span v-else-if="props.node.type == 1">
        <img src="@/assets/images/icon-laptop.png" width="20" height="20" />
      </span>
      <span v-else-if="props.node.type == 2">
        <img src="@/assets/images/icon-folder.png" width="20" height="20" />
      </span>
    </template>
  </tree>
</template>

<style>
.input-wrapper {
  font-size: 16px;
}
</style>

<script>
import tree from "vue3-treeview";
import "vue3-treeview/dist/style.css";

export default {
  name: "TreeView",
  components: {
    tree,
  },
  props: {
    config: {
      type: Object,
    },
    nodes: {
      type: Object,
    },
  },
  emits: [
    "nodeFocus",
    "nodeChecked",
    "nodeUnchecked",
    "nodeDragstart",
    "nodeOver",
    "nodeDrop",
    "nodeDragend"
  ],
  methods: {
    nodeFocus(event) {
      this.$emit("nodeFocus", event);
    },
    nodeChecked(event) {
      this.$emit("nodeChecked", event);
    },
    nodeUnchecked(event) {
      this.$emit("nodeUnchecked", event);
    },
    nodeDragstart(event) {
      this.$emit("nodeDragstart", event);
    },
    nodeOver(event) {
      this.$emit("nodeOver", event);
    },
    nodeEnter(event) {
      this.$emit("nodeEnter", event);
    },
    nodeDrop(event) {
      this.$emit("nodeDrop", event);
    },
    nodeDragend(event) {
      this.$emit("nodeDragend", event);
    },
  },
};
</script>