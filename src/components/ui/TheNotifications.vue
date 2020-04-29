<template>
  <ul v-if="notifications.length > emptyNotifications" class="notifications">
    <template v-for="(notification, index) in notifications">
      <li
        v-if="index < maxNotifications"
        :key="index"
        :class="['notification', { [`is-${notification.type}`]: messageTypes.includes(`is-${notification.type}`) }]"
      >
        <button class="delete" @click="deleteNotification(notification.datetime)"/>
        {{ notification.message }}
      </li>
    </template>
  </ul>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'TheNotifications',
  data () {
    return {
      maxNotifications: 5,
      emptyNotifications: 0,
      messageTypes: ['is-info', 'is-success', 'is-warning', 'is-danger']
    }
  },
  computed: {
    ...mapState({ notifications: state => state.ui.notifications.reverse() })
  },
  methods: {
    ...mapMutations(['deleteNotification'])
  }
}
</script>

<style scoped>
  .notifications {
    position: fixed;
    top: 0;
    margin: 0;
    padding: 0;
    padding-top: 8px;
    list-style-type: none;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    z-index: 100;
  }

  @media screen and (max-width: 768px) {
    .notifications .notification {
      width: 95%;
    }
  }

  @media screen and (min-width: 769px) {
    .notifications .notification {
      width: 50%;
    }
  }
</style>
