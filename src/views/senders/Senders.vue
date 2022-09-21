<template>
    <div class="card" style="margin-bottom: 15px;margin-top: -25px">
        <div class="card-header">
            <h3 class="card-title">Senders</h3>
            <div class="card-toolbar">
                <!--<el-button  size="small" plain style="border-radius: 75%"><img alt="Logo" src="media/icons/lp/icon-download.png" style="width: 17px;height: 17px"/></el-button>-->
                <a href="#" class="btn btn-icon btn-outline-default  h-35px w-35px btn-outline"
                   style="border-radius: 50%;margin-left: 10px"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         class="bi bi-download" viewBox="0 0 16 16">
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                    </svg>
                </a>
            </div>
        </div>

        <div class="card-body">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small" :label-position="'right'"
                     label-width="auto" ref="searchForm">
                <el-form-item label="Name" prop="name">
                    <el-input v-model="formInline.name"  placeholder="Name"></el-input>
                </el-form-item>
                <el-form-item label="Email" prop="email">
                    <el-input v-model="formInline.email"  placeholder="Email"></el-input>
                </el-form-item>

                <el-form-item label="Status" prop="status" >
                    <el-select v-model="formInline.status" placeholder="Select a status">
                        <el-option label="Created" value="Created"></el-option>
                        <el-option label="Verified" value="Verified"></el-option>
                    </el-select>
                </el-form-item>


            </el-form>
            <el-button @click="resetFormFields" :icon="Search" size="small" style="float: right;">Reset</el-button>
            <el-button type="primary" @click="onSubmitSearchForm" :icon="Search" size="small"
                       style="float: right;margin-right: 10px">Search
            </el-button>

        </div>
    </div>

    <!--<router-link :to="{ name: 'usersDetail', params: { id: 0}}"-->
    <!--&gt;-->
        <!--<el-button type="primary" size="small" style="margin-bottom: 10px">+ New</el-button>-->
    <!--</router-link>-->
    <el-table :data="usersRef" style="width: 100%" height="450" size="default" v-loading="loading">
        <el-table-column fixed prop="name" label="Name" width="150"/>
        <el-table-column prop="email" label="Email" width="250"/>
        <el-table-column prop="createdAt" label="Created At" width="250"/>
        <el-table-column prop="UpdatedAt" label="Updated At" width="250"/>
        <el-table-column prop="status" label="Status" width="130"/>
        <el-table-column fixed="right" label="Action" width="120">



            <template #default="user">


                <router-link :to="{ name: 'usersDetail', params: { id: user.row.id } }"

                >
                    <el-button type="text">Edit</el-button>
                </router-link>


            </template>
        </el-table-column>
    </el-table>

    <el-pagination
            v-model:currentPage="pageNumberRef"
            :page-size="pageSizeRef"
            :small="small"
            :page-sizes="[20, 30, 40, 50]"
            layout="total,sizes, prev, pager, next"
            :total="totalRef"
            style="float: right"
            @size-change="updatePageSize"
            @current-change="updatePageNumber"
    >
    </el-pagination>

</template>

<script lang="ts">
  import { defineComponent, onMounted, onUnmounted } from "vue";
  import { useStore } from "vuex";

  import { reactive } from "vue";
  import { ref } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { getUsersRequest } from "@/latipay/apis/services/UsersService";
  import { reinitializeComponents } from "@/core/plugins/keenthemes";
  import { useI18n } from "vue-i18n";
  import { getIllustrationsPath } from "@/core/helpers/assets";




  export default defineComponent({
    name: "recipients",
    components: {},
    setup() {
      const store = useStore();
      const route = useRoute();
      const router = useRouter();
      const { locale } = useI18n();

      const name = ref<string | null>(null);
      const email = ref<string | null>(null);
      const status = ref<string | null>(null);
      const sort = ref<string | null>(null);
      const pageNumber = ref(1);
      const pageSize = ref(20);

      const loading = ref(false);


      const formInline = reactive({
        name: "",
        status: "",
        email: ""
      });

      const {
        usersRef,
        totalRef,
        pageNumberRef,
        pageSizeRef,
        getUsers
      } = getUsersRequest();


      const getData = async () => {
        loading.value = true;

        // await updateQueries();
        await getUsers(
          formInline.name,
          formInline.email,
          formInline.status,

          sort.value,
          pageNumber.value,
          pageSize.value
        );
        reinitializeComponents();

        loading.value = false;

        console.log(usersRef);
      };

      console.log(usersRef);

      onMounted(async () => {
        // setCurrentPageTitle("Users");
        await getData();
      });

      const updatePageSize = async (val: number) => {
        console.log(`${val} items per page`);
        pageSize.value = val;
        await getData();
      };
      const updatePageNumber = async (val: number) => {
        console.log(`current page: ${val}`);
        pageNumber.value = val;
        await getData();
      };


      return {
        getIllustrationsPath,

        formInline,
        getData,
        loading,
        updatePageSize,
        updatePageNumber,
        usersRef,
        totalRef,
        pageNumberRef,
        pageSizeRef,
        name,
        email,
        status,




      };

    },
    methods: {
      async resetFormFields() {

        (this.$refs["searchForm"] as any).resetFields();

        await this.getData();

      },
      async onSubmitSearchForm() {
        await this.getData();
      }

    }
  });
</script>
