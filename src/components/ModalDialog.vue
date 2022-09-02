<template>
  <div class="modal">
    <section class="modal-content">
      <div class="container">
        <h1>{{ title }}</h1>
        <p>{{ subtitle }}</p>
        <div class="clearfix">
          <button
            @click="$emit('cancel')"
          >
            {{ cancelText }}
          </button>
          <button
            :class="confirmBtnClass"
            @click="$emit('confirm')"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </section>
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
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #000000cc;
}

.modal-content {
  background-color: white;
  margin: 5% auto 15% auto;
  width: 60%;
  text-align: center;
}

button {
  width: 40%;
  padding: 1rem 5%;
}

.container {
  padding: 1rem;
  .clearfix::after {
    content: "";
    clear: both;
    display: table;
  }
}
</style>