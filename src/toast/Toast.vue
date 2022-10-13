<template>
  <div class="toast" v-show="isShow">
    <p>{{ message }}</p>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const message = ref("");
    const isShow = ref(false);
    return {
      message,
      isShow
    };
  },
  methods: {
    show(message = "默认文本", duration = 1000) {
      this.message = message;
      this.isShow = true;

      // 指定时间后弹框消失
      setTimeout(() => {
        this.isShow = false;
      }, duration);
    },
  },
};
</script>

<style>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 140px;
  height: 40px;
  background-color: black;
  opacity: 0.7;
  border-radius: 4px;
  text-align: center;
  line-height: 40px;
  color: white;
  z-index: 100;
}
</style>