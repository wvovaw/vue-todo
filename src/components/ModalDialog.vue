<template>
  <div class="modal">
    <section class="modal-content">
      <div class="container">
        <h1>{{ title }}</h1>
        <p>{{ subtitle }}</p>
        <div class="clearfix">
          <button
            class="cancelbtn"
            @click="$emit('cancel')"
          >
            {{ cancelText }}
          </button>
          <button
            class="confirmbtn is-danger"
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
     title: { type: String, default() {} },
     subtitle: { type: String, default() {} },
     cancelText: { type: String, default() {return "Cancel"} },
     confirmText: { type: String, default() {return "Confirm"} }
  },
};
</script>

<style lang="scss" scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #000000cc;
  padding-top: 10%;
}

.modal-content {
  background-color: white;
  margin: 5% auto 15% auto;
  width: 60%;
}

button {
  width: 30%;
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