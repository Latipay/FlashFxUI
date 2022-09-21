<template>
    <div v-if="isEdit === false">
        <el-page-header content="Add New User" @back="$router.go(-1)" style="margin-top: -25px;margin-bottom: 15px"/>
    </div>
    <div v-if="isEdit === true">
        <el-page-header content="Edit User" @back="$router.go(-1)" style="margin-top: -25px;margin-bottom: 15px"/>
    </div>


    <el-card class="box-card">

        <div style="display: flex;justify-content: center; margin-top: 20px;margin-bottom: 20px;">

            <el-form ref="formRef" :model="userForm" label-width="150px" style="width: 100%;">


                <el-form-item label="Name" required>
                    <el-input v-model="userForm.name" style="width: 50%"></el-input>
                </el-form-item>
                <el-form-item label="Email" required>
                    <el-input v-model="userForm.email" style="width: 50%"></el-input>
                </el-form-item>
                <el-form-item label="Password" required>
                    <el-input v-model="userForm.password" style="width: 50%"></el-input>
                </el-form-item>


                <el-form-item>
                    <el-button type="primary" @click="onSubmit">Submit</el-button>
                </el-form-item>
            </el-form>
        </div>

    </el-card>

</template>

<script lang="ts">
  import { defineComponent, onMounted, onUnmounted } from "vue";
  import { useStore } from "vuex";

  import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";
  import { ref } from "vue";
  import { reactive } from "vue";
  import { getIllustrationsPath } from "@/core/helpers/assets";
  import { getUserRequest, putUserRequest } from "@/latipay/apis/services/UsersService";
  import { UsersResponse } from "@/latipay/apis/models/user/UsersResponse";
  import { ElMessage } from "element-plus";


  export default defineComponent({
    name: "usersDetail",
    components: {},
    props: {
      id: Number
    },
    setup(props) {
      const store = useStore();

      const isEdit = ref(true);
      const id = props.id ?? 0;
      if (id === 0) {
        isEdit.value = false;
      }
      const userForm = reactive({
        name: "",
        email: "",
        password: ""

      });

      const successAlert = (message => {
        ElMessage({
          showClose: true,
          message: message,
          type: "success"
        });
      });

      const { errorRef, userRef, getUser } = getUserRequest();

      const { putErrorRef, putUserRef, putUser } = putUserRequest();
      const loadingRef = ref(false);

      const onSubmit = async () => {
        if (!isEdit.value) {
          console.log("submit!");
        } else {
          if (userRef.value) {
            userRef.value.name = userForm.name;
            userRef.value.email = userForm.email;
            userRef.value.password = userForm.password;
          }


          await putUserInfo(id, userRef.value as unknown as UsersResponse);
          console.log("submit!");
        }


      };

      const putUserInfo = async (id: number, data: UsersResponse) => {
        loadingRef.value = true;
        await putUser(id, data);

        if (!putErrorRef.value) {
          loadingRef.value = false;

          successAlert("Update user successfully!");


        }

        console.log(putErrorRef);

      };

      const fetchUser = async (id: number) => {
        loadingRef.value = true;
        await getUser(id);
        loadingRef.value = false;
      };

      onMounted(async () => {
        console.log("submit!");
        if (isEdit.value) {
          await fetchUser(id);
          if (userRef) {
            if (userRef.value) {
              userForm.name = userRef.value.name;
              userForm.email = userRef.value.email;
            }
          }
        }
      });


      return {
        getIllustrationsPath,
        userForm,
        onSubmit,
        isEdit
      };
    },
    methods: {

      goBack() {
        this.$router.back();
      }
    }
  });
</script>
