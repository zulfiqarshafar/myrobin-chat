<template>
  <main>
    <header><h1>Join Chatroom</h1></header>
    <section>
      <form @submit.prevent="onSubmit">
        <input type="text" placeholder="Username" v-model="username" />
        <input type="text" placeholder="RoomID" v-model="roomId" />
        <button :disabled="isDisabled" class="primary-btn">JOIN</button>
      </form>
      <Alert v-if="isError" alertType="danger">{{ errorMessage }}</Alert>
    </section>
  </main>
</template>

<script>
import Alert from "../components/Alert.vue";
import router from "../router";

export default {
  data() {
    return {
      username: null,
      roomId: null,
      isError: false,
      errorMessage: "",
    };
  },
  computed: {
    isDisabled() {
      return !this.username || !this.roomId;
    },
  },
  components: {
    Alert,
  },
  methods: {
    async onSubmit() {
      await fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/room/join`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.username.toLowerCase(),
          roomId: this.roomId.toLowerCase(),
        }),
      })
        .then(async (response) => {
          const res = await response.json();
          if (response.ok) return res;
          throw Error(res.msg);
        })
        .then((data) => {
          router.push({ name: "room", params: { id: this.roomId } });
        })
        .catch((error) => {
          this.isError = true;
          this.errorMessage = error;
        });
    },
  },
};
</script>

<style scoped lang="scss">
main {
  backdrop-filter: blur(12px);
}

form {
  display: flex;
  flex-wrap: wrap;
}

input[type="text"] {
  margin-bottom: 16px;
  text-transform: lowercase;
}

button {
  width: 100%;
  padding: 16px 32px;
  border-radius: 100px;
  margin-bottom: 32px;

  &:disabled {
    cursor: no-drop;
    opacity: 0.3;
  }
}
</style>
