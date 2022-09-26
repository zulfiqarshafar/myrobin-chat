<template>
  <main>
    <header><h1>Join Chatroom</h1></header>
    <section>
      <form>
        <input type="text" placeholder="Username" />
        <input type="text" placeholder="RoomID" />
        <button>JOIN</button>
      </form>
    </section>
  </main>
</template>

<script>
export default {
  name: "Login",
};
</script>

<style scoped lang="scss">
form {
  display: flex;
  flex-wrap: wrap;
}

input {
  width: 100%;
  height: 50px;
  padding: 16px;
  margin-bottom: 16px;
  background-color: var(--color-secondary);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-weight: 500;
  font-size: 16px;
}

button {
  width: 100%;
  padding: 16px 32px;
  background: var(--color-primary);
  border: none;
  border-radius: 100px;
  color: var(--color-main);
  font-weight: 600;
  font-size: 16px;
  transition: 0.3s;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
}
</style>
