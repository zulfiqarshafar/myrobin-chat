<template>
  <main>
    <header>
      <router-link to="/" class="exit-btn">Exit</router-link>
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
      <div class="message-input-container">
        <input type="text" placeholder="Type message" />
        <button class="send-btn primary-btn">
          <img src="../assets/images/send-icon.png" />
        </button>
      </div>
    </footer>
  </main>
</template>

<script>
import ChatMessage from "../components/ChatMessage.vue";

export default {
  data() {
    return {
      user: "User 1",
      roomId: "123",
      chatMessages: [
        {
          id: "6",
          user: "User 1",
          content: "I am good",
          time: "10.09 AM",
          date: "28/09/2022",
        },
        {
          id: "5",
          user: "User 2",
          content: "What about you?",
          time: "10.09 AM",
          date: "28/09/2022",
        },
        {
          id: "4",
          user: "User 2",
          content: "Nothing much",
          time: "10.09 AM",
          date: "28/09/2022",
        },
        {
          id: "3",
          user: "User 1",
          content: "How's it going?",
          time: "10.07 AM",
          date: "28/09/2022",
        },
        {
          id: "2",
          user: "User 2",
          content: "Hi there",
          time: "10.04 AM",
          date: "28/09/2022",
        },
        {
          id: "1",
          user: "User 1",
          content: "Hello",
          time: "10.02 AM",
          date: "28/09/2022",
        },
      ],
    };
  },
  components: {
    ChatMessage,
  },
};
</script>

<style scoped lang="scss">
.exit-btn {
  position: absolute;
  left: 0;
  font-size: 18px;
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
  input[type="text"] {
    border-radius: 100px;
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
