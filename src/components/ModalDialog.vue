<template>
  <div class="modal">
    <section class="modal-content">
      <div class="container">
        <h1>Delete note</h1>
        <p>Are you sure you want to delete this note?</p>
        <div class="clearfix">
          <button
            class="cancelbtn"
            @click="$emit('cancel')"
          >
            Cancel
          </button>
          <button
            class="confirmbtn"
            @click="$emit('confirm')"
          >
            Delete
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {};
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
  padding: 1rem 1rem;
  margin: 1rem 0;
  border: none;
  float: left;
  width: 50%;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
  &.cancelbtn {
    background-color: #ccc;
    &:hover {
      background-color: rgb(173, 173, 173);
    }
  }
  &.confirmbtn {
    background-color: rgb(231, 54, 54);
    &:hover {
      background-color: rgb(189, 39, 39);
    }
  }
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