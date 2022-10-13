<template>
  <div>
    <p>我想要的</p>
    <p>{{ $store.getters.showNums }}</p>
    <p @click="addNums">this is addNum{{ addNum }}</p>
    <p class="shareCount">this is shareCount {{ shareCount }}</p>
  </div>
</template>

<script>
import { ref } from "vue";
import { mapMutations, mapState } from "vuex";
import state from "@/store/state";
export default {
  setup() {
    const addNum = ref(1);

    return {
      addNum,
    };
  },

  //方法和属性有对应的两种取用方式，不要再mutations中使用异步代码
  //异步数据操作需要通过actions，在actions中触发mutations
  computed: {
    ...mapState(['shareCount'])
  },
  methods: {
    ...mapMutations(['addNums']),
    addBtn() {
      // this.$store.commit('addNums',3)
      // this.addNums(2)
      // setTimeout(()=>{
      //   this.addNums(2)
      // },
      // 2000)
      // this.$store.dispatch('addAsync')
    },
  },
};
</script>
<style scoped>
.shareCount {
  background-color: green;
}
</style>