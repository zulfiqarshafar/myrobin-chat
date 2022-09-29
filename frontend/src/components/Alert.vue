<template>
  <div class="alert" :class="alertType">
    <slot>Alert</slot>
  </div>
</template>

<script>
export default {
  name: "alert",
  props: {
    alertType: String,
  },
};
</script>

<style scoped lang="scss">
.alert {
  border-radius: 8px;
  padding: 16px;

  &.danger {
    border: 1px solid rgb(255, 69, 69);
    background-color: rgba(255, 0, 0, 0.3);
  }
}
</style>
