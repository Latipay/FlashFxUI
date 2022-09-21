<template>

  <div class="card" style="margin-bottom: 15px;margin-top: -25px;border-radius: 10px" >
    <div class="card-header">
      <h3 class="card-title">Merchants
        <el-dropdown style="margin-left: 15px" >
          <el-button style="background-color: #30AADD;color: white;border-radius: 15px" size="small">
            <span style="font-size: 13px">Latipay NZ</span> <div style="width: 13px;height: 13px;float: right; display: flex;justify-content: center; align-items: center;margin-left: 5px"><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ba633cb8=""><path fill="currentColor" d="M104.704 338.752a64 64 0 0 1 90.496 0l316.8 316.8 316.8-316.8a64 64 0 0 1 90.496 90.496L557.248 791.296a64 64 0 0 1-90.496 0L104.704 429.248a64 64 0 0 1 0-90.496z"></path></svg></div>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item disabled>Latipay AU</el-dropdown-item>
              <el-dropdown-item disabled>CFG AU</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </h3>



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
    <div class="card-body" >
      <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small" :label-position="'right'"
               label-width="auto" ref="searchForm">
        <el-row :gutter="0">

          <el-col :span="8">
            <el-form-item label="ID" prop="id">
              <el-input v-model="formInline.id" placeholder="ID"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Slug" prop="slug">
              <el-input v-model="formInline.slug" placeholder="Slug"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Name" prop="name">
              <el-input v-model="formInline.name" placeholder="Name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0">

          <el-col :span="8">
            <el-form-item label="Type" prop="type">
              <el-select v-model="formInline.type" placeholder="Select a type">
                <el-option label="Company" value="Company"></el-option>
                <el-option label="Individual" value="Individual"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Status" prop="status">
              <el-select v-model="formInline.status" placeholder="Select a status">
                <el-option label="Created" value="Created"></el-option>
                <el-option label="Verified" value="Verified"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Enabled" prop="enabled">
              <el-select v-model="formInline.enabled" placeholder="Select Yes or No">
                <el-option label="Yes" value="true"></el-option>
                <el-option label="No" value="false"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>


      </el-form>
      <el-button @click="resetFormFields" :icon="Search" size="small" style="float: right;">Reset</el-button>
      <el-button type="primary" @click="onSubmitSearchForm" :icon="Search" size="small"
                 style="float: right;margin-right: 10px">Search
      </el-button>

    </div>
  </div>

  <router-link :to="{ name: 'recipientDetail', params: { id: 'add'}}"
  >
    <el-button type="primary" size="small" style="margin-bottom: 10px">+ New recipient</el-button>
  </router-link>


  <el-table :data="merchantsRef" style="width: 100%;border-radius: 10px" height="450" size="large" v-loading="loading">
    <el-table-column fixed  width="15"/>
    <el-table-column fixed prop="id" label="ID" width="80"/>
    <el-table-column prop="slug" label="Slug" width="250" >

      <template #default="props">
        <div @click="copySlug(props.row.slug)">
          {{props.row.slug.toString().substring(0,18) +'... ' }}
          <svg style="height: 16px;width: 16px;color: grey"  viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ba633cb8=""><path fill="currentColor" d="M768 832a128 128 0 0 1-128 128H192A128 128 0 0 1 64 832V384a128 128 0 0 1 128-128v64a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64h64z"></path><path fill="currentColor" d="M384 128a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64H384zm0-64h448a128 128 0 0 1 128 128v448a128 128 0 0 1-128 128H384a128 128 0 0 1-128-128V192A128 128 0 0 1 384 64z"></path></svg>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="Merchant Name" width="300"/>
    <el-table-column prop="name" label="Trading As" width="300"/>
    <el-table-column prop="type" label="Type" width="150"/>
    <el-table-column prop="status" label="Status" width="110">
      <template #default="props">
        <span class="badge badge-light-dark" v-if="props.row.status === 'Created'">Created</span>
        <span class="badge badge-light-warning" v-if="props.row.status === 'Verified'">Verified</span>
      </template>
    </el-table-column>
    <el-table-column prop="enabled" label="Enabled" width="110">
      <template #default="record">
        <span class="badge badge-light-success" v-if="record.row.enabled === true">Yes</span>
        <span class="badge badge-light-danger" v-if="record.row.enabled === false">No</span>

      </template>
    </el-table-column>

    <el-table-column fixed="right" label="Action" width="80">



      <template #default="viewMerchant">


        <!--<router-link :to="{ name: 'merchantDetail', params: { id: viewMerchant.row.id, merchantDetail: viewMerchant.row } }"-->

        <!--&gt;-->
        <!--<el-button type="text">View</el-button>-->
        <!--</router-link>-->

        <el-dropdown>
          <!--<div style="font-size: 20px">-->

          <!--<el-icon><expand /></el-icon>-->

          <!--<expand style="width: 1em; height: 1em; margin-right: 8px" />-->
          <!--&lt;!&ndash;<span>&ndash;&gt;-->
          <!--&lt;!&ndash;<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ba633cb8=""><path fill="currentColor" d="M128 192h768v128H128V192zm0 256h512v128H128V448zm0 256h768v128H128V704zm576-352 192 160-192 128V352z"></path></svg>&ndash;&gt;-->
          <!--&lt;!&ndash;</span>&ndash;&gt;-->
          <!--</div>-->


          <span class="el-dropdown-link" style="display: flex;justify-content: center;"> <img
              src="media/icons/duotune/general/gen059.svg"
              style="width: 16px;height: 16px;" alt="img"/></span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item> <router-link :to="{ name: 'merchantDetail', params: { id: viewMerchant.row.id, merchantDetail: viewMerchant.row } }"

              >View</router-link></el-dropdown-item>
              <el-dropdown-item disabled>Disable</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
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
      style="float: right;margin-top: 10px"
      background
      @size-change="updatePageSize"
      @current-change="updatePageNumber"

  >
  </el-pagination>
</template>

<script lang="ts">
  import { defineComponent, onMounted, onUnmounted } from "vue";
  import { useStore } from "vuex";
  import { Actions } from "../../store/enums/StoreEnums";
  import { getIllustrationsPath } from "../../core/helpers/assets";
  import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";
  import { reactive } from "vue";
  import { ref } from "vue";
  import { reinitializeComponents } from "@/core/plugins/keenthemes";
  import { getLatipayChannelsRequest } from "@/latipay/apis/services/LatipayChannelsService";
  import { DateTimeUtils } from "@/latipay/utils/DateTimeUtils";
  import { ElMessage } from "element-plus";
  import useClipboard from 'vue-clipboard3'
  import { getMerchantsRequest } from "@/latipay/apis/services/MerchantsService";
  export default defineComponent({
    name: "channels",
    components: {},
    setup() {
      const store = useStore();


      const id = ref<string | null>(null);
      const slug = ref<string | null>(null);
      const name = ref<string | null>(null);
      const type = ref<string | null>(null);
      const status = ref<string | null>(null);
      const enabled = ref<string | null>(null);
      const pageNumber = ref(1);
      const pageSize = ref(20);
      const sort = ref<string | null>(null);

      const loading = ref(false);

      const { toClipboard } = useClipboard();
      const formInline = reactive({
        id: "",
        slug: "",
        name: "",
        type: "",
        status: "",
        enabled: null
      });

      const {
        merchantsRef,
        totalRef,
        pageNumberRef,
        pageSizeRef,
        getMerchants
      } = getMerchantsRequest();


      const getData = async () => {
        loading.value = true;

        // await updateQueries();
        await getMerchants(
            formInline.id,
            formInline.slug,
            formInline.name,
            formInline.type,
            formInline.status,
            formInline.enabled,

            sort.value,
            pageNumber.value,
            pageSize.value
        );
        reinitializeComponents();

        loading.value = false;

        console.log(merchantsRef);
      };

      console.log(merchantsRef);

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

      const copySlug = async (slug: string) => {
        try {
          await toClipboard(slug);
          ElMessage({
            showClose: true,
            message: 'Copy successfully!',
            type: "success"
          });
        } catch (e) {
          console.error(e)
        }
      };


      return {
        getIllustrationsPath,
        formInline,
        id,
        slug,
        name,
        type,
        status,
        copySlug,
        enabled,
        getData,
        loading,
        updatePageSize,
        updatePageNumber,
        merchantsRef,
        totalRef,
        pageNumberRef,
        pageSizeRef


      };

    },
    data() {
      return {};
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
