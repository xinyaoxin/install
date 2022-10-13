<template>
  <div>
    <p @click="subBtn">this is subtractionNum {{ $store.state.shareCount }}</p>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const subtractionNum = ref(10);

    return {
        subtractionNum
    }
  },
  methods:{
      subBtn(){
          this.subtractionNum--
      }
  }
};
</script>