<template>
  <main>
    <header>
      <img class="logo" src="../assets/images/logo.png" alt="Logo" />
      <h1>Join Chatroom</h1>
    </header>
    <section>
      <form @submit.prevent="onSubmit">
        <input type="text" placeholder="Username" v-model="username" />
        <input type="text" placeholder="RoomID" v-model="roomId" />
        <button type="submit" :disabled="isDisabled" class="primary-btn">
          JOIN
        </button>
      </form>
      <Alert v-if="isError" alertType="danger">{{ errorMessage }}</Alert>
    </section>
  </main>
</template>

<script>
import router from "../router";
import Alert from "../components/Alert.vue";

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
header {
  flex-direction: column;
  .logo {
    width: 35%;
    margin-bottom: 15px;
  }
}

form {
  display: flex;
  flex-wrap: wrap;
  margin-top: 5%;
}

input[type="text"] {
  margin-bottom: 16px;
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
