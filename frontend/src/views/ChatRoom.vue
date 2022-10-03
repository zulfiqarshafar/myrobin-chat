<template>
  <main>
    <header>
      <button class="exit-btn" @click="goBack">Exit</button>
      <h1 class="roomId">{{ roomId }}</h1>
    </header>
    <section>
      <div class="chat-message-container">
        <ChatMessage
          v-for="(chatMessage, index) in chatMessages"
          :chatMessage="chatMessage"
          :user="user"
          :index="index"
          :key="chatMessage.id"
        />
      </div>
    </section>
    <footer>
      <form @submit.prevent="onSubmit" class="message-input-container">
        <input v-model="content" type="text" placeholder="Type message" />
        <button type="submit" class="send-btn primary-btn">
          <img src="../assets/images/send-icon.png" />
        </button>
      </form>
    </footer>
  </main>
</template>

<script>
import router from "../router";
import SocketService from "../services/SocketService.js";
import ChatMessage from "../components/ChatMessage.vue";

export default {
  data() {
    return {
      user: this.$cookies.get("myrobinusername"),
      roomId: this.$route.params.id,
      content: null,
      chatMessages: [],
    };
  },
  components: {
    ChatMessage,
  },
  methods: {
    getChatMessages(data) {
      this.chatMessages = data;
    },
    onSubmit() {
      SocketService.sendMessage({
        roomId: this.roomId,
        user: this.user,
        content: this.content,
      });
      this.content = null;
    },
    async goBack() {
      await fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/room/exit`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.user.toLowerCase(),
          roomId: this.roomId.toLowerCase(),
        }),
      })
        .then(async (response) => {
          const res = await response.json();
          if (response.ok) return res;
          throw Error(res.msg);
        })
        .then((data) => {
          SocketService.disconnect(this.roomId);
          router.push({ name: "home" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    if (!this.user) {
      router.push({ path: "/", replace: true });
    } else {
      SocketService.setupSocketConnection(this.roomId);
      SocketService.getChatMessages(this.getChatMessages);
    }
  },
};
</script>

<style scoped lang="scss">
.exit-btn {
  position: absolute;
  left: 0;
  background: none;
  border: none;
  font-size: 18px;
  font-weight: 600;
  color: var(--color-primary);
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
}

.chat-message-container {
  display: flex;
  flex-direction: column-reverse;
  overflow-y: scroll;
  border-top: 1px solid var(--color-border);
  padding: 30px 0;
  height: 100%;
}

.message-input-container {
  background-color: var(--color-secondary);
  border: 1px solid var(--color-border);
  border-radius: 100px;
  transition: 0.5s;

  &:focus-within {
    border: 1px solid darken(#e8e8e8, 50%);
  }

  input[type="text"] {
    border: none;
    width: calc(100% - 38px);
    background: none;
  }

  .send-btn {
    position: absolute;
    right: 0;
    margin: 8px;
    width: 34px;
    height: 34px;
    border-radius: 50%;

    img {
      width: 20px;
      height: 20px;
      margin: 8px 0;
    }
  }
}
</style>
