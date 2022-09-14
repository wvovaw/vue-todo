<template>
  <div class="editable-span">
    <span
      v-show="!isEditing"
      @dblclick="toggleEdit"
    >{{ data }}</span>
    <input
      onkeypress="this.style.width = this.value.length + 2 + 'ch';"
      class="tiny-input"
      type="text"
      v-show="isEditing"
      v-model="data2"
      @blur="confirmEdit()"
      @keydown.enter="confirmEdit()"
      ref="input"
    >
  </div>
</template>

<script>
export default {
  name: "EditableSpan",
  props: {
    data: { type: String, default: "" },
  },
  emits: ["update:data"],
  data() {
    return {
      data2: this.data,
      isEditing: false,
    };
  },
  methods: {
    toggleEdit() {
      if (!this.isEditing) {
        this.isEditing = true;
        this.$refs.input.style.width = this.$refs.input.value.length + 2 + 'ch';
        setTimeout(() => this.$refs.input.focus(), 0);
      } else {
        this.isEditing = false;
        this.$refs.input.blur();
      }
    },
    confirmEdit() {
      if (this.data2 != "") this.$emit("update:data", this.data2);
      this.isEditing = false;
    },
    cancelEdit() {
      this.data2 = this.data;
      this.$emit("update:data", this.data2);
      this.isEditing = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.tiny-input {
  max-width: fit-content;
}
</style>