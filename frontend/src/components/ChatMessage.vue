<template>
  <div class="chat-message" :class="messageType">
    <div v-if="messageType === 'secondary'" class="chat-message-username">
      {{ chatMessage.user }}
    </div>
    <div class="chat-message-content">
      <p>
        {{ chatMessage.content }}
      </p>
      <div class="chat-message-time">{{ formattedTime }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "chatMessage",
  props: {
    chatMessage: Object,
    user: String,
  },
  computed: {
    formattedTime() {
      const createdAt = new Date(this.chatMessage.createdAt);
      return `${createdAt.getHours()}.${createdAt.getMinutes()}`;
    },
    messageType() {
      return this.user === this.chatMessage.user ? "primary" : "secondary";
    },
  },
};
</script>

<style scoped lang="scss">
.chat-message {
  display: flex;
  flex-wrap: wrap;
  margin: 7px;

  .chat-message-username {
    width: 100%;
    color: #888;
    font-size: 16px;
    margin-bottom: 5px;
  }

  .chat-message-content {
    max-width: 75%;
    padding: 15px 16px;
    border: 1px solid var(--color-border);
    font-size: 14px;
    line-height: 17px;
    box-shadow: 0 7px 15px -5px rgba(0, 0, 0, 0.4);

    .chat-message-time {
      margin-top: 10px;
      font-size: 11px;
    }
  }

  &.primary {
    justify-content: flex-end;
    text-align: right;

    .chat-message-content {
      background-color: var(--color-primary);
      color: white;
      border-radius: 27px 27px 0 27px;
    }
  }

  &.secondary {
    .chat-message-content {
      background-color: var(--color-secondary);
      border-radius: 27px 27px 27px 0;
    }
  }
}
</style>
