<template>
  <main>
    <header><h1>Join Chatroom</h1></header>
    <section>
      <form>
        <input type="text" placeholder="Username" />
        <input type="text" placeholder="RoomID" />
        <button class="primary-btn">JOIN</button>
      </form>
    </section>
  </main>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
form {
  display: flex;
  flex-wrap: wrap;
}

input[type="text"] {
  margin-bottom: 16px;
}

button {
  width: 100%;
  padding: 16px 32px;
  border-radius: 100px;
}
</style>
