<template>

    <div v-if="isEdit === false">
        <el-page-header content="Add New Account Source" @back="$router.go(-1)" style="margin-top: -25px;margin-bottom: 15px"/>
    </div>
    <div v-if="isEdit === true">
        <el-page-header content="Edit Account Source" @back="$router.go(-1)" style="margin-top: -25px;margin-bottom: 15px"/>
    </div>

    <el-card class="box-card">

        <div style="display: flex;justify-content: center; margin-top: 20px;margin-bottom: 20px;">

            <el-form ref="formRef" :model="accountSourceForm" label-width="150px" style="width: 100%;"  :rules="rules" v-loading="loadingRef">

                <el-form-item label="Type" required prop="type">
                    <el-select v-model="accountSourceForm.type" placeholder="please select a merchant"
                               style="width: 50%">
                        <el-option label="Bank" value="Bank"></el-option>
                        <el-option label="Channel-Fiat" value="ChannelFiat"></el-option>
                        <el-option label="Channel-DigitalWallet" value="ChannelCrypto"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Name" prop="name" required >
                    <el-input v-model="accountSourceForm.name"  style="width: 50%"></el-input>
                </el-form-item>
                <el-form-item label="Abbreviation" prop="alternativeName">
                    <el-input v-model="accountSourceForm.alternativeName"  style="width: 50%"></el-input>
                </el-form-item>

                <el-form-item label="Country" required prop="country">
                    <el-select v-model="accountSourceForm.country" placeholder="please select a country" style="width: 50%">
                        <el-option  v-for="item in countries"
                                    :key="item" :label="item.name" :value="item.code" >
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="Website" prop="website">
                    <el-input v-model="accountSourceForm.website"  style="width: 50%"></el-input>
                </el-form-item>

                <el-form-item label="Contact Email" prop="email">
                    <el-input v-model="accountSourceForm.email"  style="width: 50%"></el-input>
                </el-form-item>


                <el-form-item>
                    <el-button type="primary" @click="onSubmit('accountSourceForm')">Submit</el-button>
                </el-form-item>
            </el-form>
        </div>

    </el-card>

</template>

<script lang="ts">
  import { defineComponent, onMounted, onUnmounted } from "vue";
  import { useStore } from "vuex";
  import { Actions } from "../../../store/enums/StoreEnums";
  import { getIllustrationsPath } from "../../../core/helpers/assets";
  import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";
  import { ref,unref } from "vue";
  import { reactive } from "vue";
  import { EnumsConstant } from "@/store/enums/constants";
  import { ElMessage } from "element-plus";
  import {
    getAccountSourceRequest,
    postAccountSourceRequest,
    putAccoutSourceRequest
  } from "@/latipay/apis/services/AccountSourcesService";
  import { AccountSourcesResponse, AddAccountSource } from "@/latipay/apis/models/accountSource/AccountSourcesResponse";
  import router from "@/router";



  export default defineComponent({
    name: "accountSourceDetail",
    components: {},
    props: {
      id: Number
    },
    setup(props) {
      const store = useStore();
      const formRef = ref();
      const countries = EnumsConstant.CountryCode;
      const accountSourceForm = reactive({
        name: "",
        alternativeName: "",
        country: "",
        website: "",
        email: "",
        type: ""
      });

      const rules = reactive({
        name: [
          { required: true, message: 'Please input name', trigger: 'blur' }
          // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
        ],
        country: [
          { required: true, message: 'Please select a country', trigger: 'blur' }
        ],
        type: [
          { required: true, message: 'Please select a type', trigger: 'blur' }
        ]
      });

      const isEdit = ref(true);
      const id = props.id ?? 0;
      if (id === 0) {
        isEdit.value = false;
      }


      const successAlert = (message => {
        ElMessage({
          showClose: true,
          message: message,
          type: "success"
        });
      });

      const failAlert = (message => {

        ElMessage.error(message)
      });

      // const { putErrorRef, putUserRef, putUser } = putAccoutSourceRequest();
      const loadingRef = ref(false);
      const { errorRef, accountSourceRef, getAccountSource } = getAccountSourceRequest();
      const { putErrorRef, putAccountSourceRef, putAccountSource } = putAccoutSourceRequest();
      const { postErrorRef, postAccountSourceRef, postAccountSource } = postAccountSourceRequest();
      const fetchAccountSource = async (id: number) => {
        loadingRef.value = true;
        await getAccountSource(id);
        loadingRef.value = false;
      };

      onMounted(async () => {

        if (isEdit.value) {
          await fetchAccountSource(id);
          if (accountSourceRef) {
            if (accountSourceRef.value) {
              accountSourceForm.name = accountSourceRef.value.name;
              accountSourceForm.type = accountSourceRef.value.type;
              accountSourceForm.alternativeName = accountSourceRef.value.alternativeName;
              accountSourceForm.country = accountSourceRef.value.country;
              accountSourceForm.website = accountSourceRef.value.website;
              accountSourceForm.email = accountSourceRef.value.email;
              // userForm.name = accountSourceRef.value.name;
              // userForm.email = accountSourceRef.value.email;
            }
          }
        }
      });


      const onSubmit = async () => {

        const form = unref(formRef);
        if (!form) {
          return
        }
        try {
          await form.validate();
          if (!isEdit.value) {

            const newAccountSource = new AddAccountSource();

            newAccountSource.alternativeName = accountSourceForm.alternativeName;
            newAccountSource.name = accountSourceForm.name;
            newAccountSource.type = accountSourceForm.type;
            newAccountSource.country = accountSourceForm.country;
            newAccountSource.website = accountSourceForm.website;
            newAccountSource.email = accountSourceForm.email;
            newAccountSource.region = 'International';

            await postAccountSourceInfo( newAccountSource as unknown as AccountSourcesResponse);

          } else {
            if (accountSourceRef.value) {
              accountSourceRef.value.name = accountSourceForm.name;
              accountSourceRef.value.type = accountSourceForm.type;
              accountSourceRef.value.alternativeName = accountSourceForm.alternativeName;
              accountSourceRef.value.country = accountSourceForm.country;
              accountSourceRef.value.website = accountSourceForm.website;
              accountSourceRef.value.email = accountSourceForm.email;


              await putAccountSourceInfo(id, accountSourceRef.value as unknown as AccountSourcesResponse);

            }
          }
        } catch (err) {
          console.log(err)
        }

      };

      const putAccountSourceInfo = async (id: number, data: AccountSourcesResponse) => {
        loadingRef.value = true;
        await putAccountSource(id, data);

        if (!putErrorRef.value) {
          loadingRef.value = false;

          successAlert("Update account source successfully!");
          router.go(-1);

        }else {
          failAlert("Something wrong happened! Please have a check.");
        }
      };


      const postAccountSourceInfo = async ( data: AccountSourcesResponse) => {
        loadingRef.value = true;
        await postAccountSource(data);

        if (!postErrorRef.value) {
          loadingRef.value = false;

          successAlert("Add account source successfully!");
          router.go(-1);



        }else {
          failAlert("Something wrong happened! Please have a check.");
        }


      };



      return {
        getIllustrationsPath,
        accountSourceForm,
        countries,
        accountSourceRef,
        isEdit,
        rules,
        formRef,
        onSubmit,
        loadingRef
      };
    }
  });
</script>
