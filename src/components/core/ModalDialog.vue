<template>
  <div class="modal is-active">
    <div class="modal-background" />
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          {{ title }}
        </p>
        <button
          class="delete"
          aria-label="close"
          @click="$emit('cancel')"
        />
      </header>
      <section class="modal-card-body">
        <p>{{ subtitle }}</p>
      </section>
      <footer class="modal-card-foot">
        <button
          class="button is-medium"
          @click="$emit('cancel')"
        >
          {{ cancelText }}
        </button>
        <button
          class="button is-medium"
          :class="confirmBtnClass"
          @click="$emit('confirm')"
        >
          {{ confirmText }}
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: {
     title: { type: String, default: "" },
     subtitle: { type: String, default: "" },
     cancelText: { type: String, default: "Cancel" },
     confirmText: { type: String, default: "Confirm" },
     confirmBtnClass: { type: String, default:"is-danger" },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  text-align: center;
  justify-content: space-around;
}
</style>