<template>
  <div class="home">
    <p>asd</p>
    <img alt="Vue logo" src="../assets/logo.png" />
    <test-a></test-a>
    <!-- <test-b></test-b> -->
    <button @click="throwerrs">toastClick</button>
    <button @click="postLogin">登录接口</button>
    <div class="scroll">
      <div class="header">头部标题</div>
      <div class="nav" :class="navBarFixed == true ? 'navBarWrap' : ''">
        吸顶内容区
      </div>
    </div>
    <button @click="btn">Change</button>
    <p>{{ obj1 }}</p>
    <Adds />
    <subtraction></subtraction>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="age" label="Age" />
      <el-table-column prop="id" label="Id" />
      <el-table-column prop="addr" label="Address" />
    </el-table>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";

import {
  getListAPI,
  postLoginAPI,
  getUserListAPI,
  postComputeAPI,
  accessAPI
} from "@/api/api";
import { reactive, ref } from "@vue/reactivity";

import Adds from "../components/Adds.vue";
import Subtraction from "../components/Subtraction.vue";
import { onBeforeMount, onMounted } from "@vue/runtime-core";

export default {
  name: "HomeView",
  components: {
    ElMessage,
    Adds,
    Subtraction,
  },
  setup() {
    const obj1 = reactive({
      n: "asd",
      m: "qwe",
    });
    const navBarFixed = false;
    const params = {
      username: "admin",
      password: "123456",
    };
    const tableData = ref([]);

    const getUserList = () => {
      getUserListAPI().then((res) => {
        tableData.value = res.data.list;
        console.log("this,tableData");
      });
    };

    const getAccess = () => {
      accessAPI().then((res) => {
        console.log("getAccess******************",res);
      }).catch((err) => console.log("getAccess******************",err))
    };

    const postCompute = () => {
      const resData = {
        id: 1,
      };
      postComputeAPI().then((res) => {
        console.log("postComputeAPI", res);
      });
    };

    onMounted(() => {
      // getUserList();
      // postCompute();
      getAccess()
    });

    return {
      navBarFixed,
      params,
      obj1,
      tableData,
      getUserList,
      getAccess,
      postCompute,
    };
  },

  mounted() {
    console.log("**************mounted getList");
    this.getList();
    console.log("this.tableData", this.tableData);
  },
  methods: {
    btn() {
      this.obj1.m = "jkl;kjklk";
    },
    throwerrs() {
      this.$toast.show("成功", 1500);
    },
    watchScroll() {
      console.log(11111);
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      console.log(scrollTop);
      //  当滚动超过 90 时，实现吸顶效果
      if (scrollTop > 90) {
        this.navBarFixed = true;
      } else {
        this.navBarFixed = false;
      }
    },
    watchClick() {
      console.log("this is watch click");
    },
    //promise调用，链式调用， getList()括号内只接受参数；
    //   get不传参
    getList() {
      console.log("开始在mounted调用");
      getListAPI()
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
        .finally(() => {
          console.log("this is finally log");
        });
    },
    postLogin(params) {
      console.log("开始调用登录接口");
      postLoginAPI(this.params)
        .then((res) => {
          console.log(res);
          if (res.data.code === "200") {
            if (res.data.data.success) {
              ElMessage(res.data.data.msg);
            } else {
              ElMessage(res.data.data.msg);
            }
          }
        })
        .finally(() => {
          console.log("登录结束");
        });
    },
    // getUserList() {
    //   console.log("查询用户列表接口");
    //   getUserListAPI()
    //     .then((res) => {
    //       this.tableData = res.data.list;
    //       console.log("getUserListAPI", this.tableData);
    //     })
    //     .finally(() => {
    //       console.log("查询用户列表接口结束");
    //     });
    // },
  },
};
</script>
<style scoped>
.scroll {
  height: 2000px;
}
.header {
  height: 90px;
  background: blue;
  text-align: center;
  color: #fff;
}
.nav {
  padding: 15px;
  width: 100%;
  box-sizing: border-box;
  background: greenyellow;
  text-align: center;
  height: 300px;
}
.navBarWrap {
  position: fixed;
  top: 0;
  z-index: 999;
}
</style>
