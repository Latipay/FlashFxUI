<template>
    <el-alert style="margin-top: -35px" title="Setup and download feature will be released in next version! Currently please contact IT team for help." type="warning" show-icon  :closable="false"/>
    <div class="card" style="margin-bottom: 15px;margin-top: 10px">
        <div class="card-header">
            <h3 class="card-title">Pricing Plan</h3>
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
                <el-form-item label="Wallet ID" prop="walletId">
                    <el-input v-model="formInline.walletId" placeholder="Wallet ID"></el-input>
                </el-form-item>
                <el-form-item label="Merchant ID" prop="merchantId">
                    <el-input v-model="formInline.merchantId" placeholder="Merchant ID"></el-input>
                </el-form-item>

                <el-form-item label="Channel Name" prop="channelName">
                    <el-input v-model="formInline.channelName" placeholder="Channel Name"></el-input>
                </el-form-item>
                <el-form-item label="Gateway Name" prop="gatewayName">
                    <el-input v-model="formInline.gatewayName" placeholder="Gateway Name"></el-input>
                </el-form-item>




            </el-form>
            <el-button @click="resetFormFields" :icon="Search" size="small" style="float: right;">Reset</el-button>
            <el-button type="primary" @click="onSubmitSearchForm" :icon="Search" size="small"
                       style="float: right;margin-right: 10px">Search
            </el-button>

        </div>
    </div>


    <!--<el-table :data="pricingPlansRef" style="width: 100%" height="450" size="default" v-loading="loading">-->
        <!--<el-table-column fixed prop="id" label="ID" width="100"/>-->
        <!--<el-table-column prop="slug" label="Slug" width="310"/>-->
        <!--<el-table-column prop="name" label="Entity Name" width="230"/>-->
        <!--<el-table-column prop="type" label="Type" width="110"/>-->
        <!--<el-table-column prop="status" label="Status" width="110"/>-->
        <!--<el-table-column prop="enabled" label="Enabled" width="110">-->
            <!--<template #default="record">-->
                <!--{{ record.row.enabled === true ? "Yes" : "No"}}-->
            <!--</template>-->
        <!--</el-table-column>-->

    <!--</el-table>-->

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
  import { Actions } from "../../../store/enums/StoreEnums";
  import { getIllustrationsPath } from "../../../core/helpers/assets";
  import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";
  import { reactive } from "vue";
  import { ref } from "vue";
  import { reinitializeComponents } from "@/core/plugins/keenthemes";
  import { getPricingPlansRequest } from "@/latipay/apis/services/PricingPlansService";


  export default defineComponent({
    name: "pricingPlan",
    components: {},
    setup() {
      const store = useStore();

      const walletId = ref<string | null>(null);
      const merchantId = ref<string | null>(null);
      const gatewayName = ref<string | null>(null);
      const channelName = ref<string | null>(null);


      const pageNumber = ref(1);
      const pageSize = ref(20);
      const sort = ref<string | null>(null);

      const loading = ref(false);


      const formInline = reactive({
        walletId: "",
        merchantId: "",
        gatewayName: "",
        channelName: "",
      });

      const {
        pricingPlansRef,
        totalRef,
        pageNumberRef,
        pageSizeRef,
        getPricingPlans
      } = getPricingPlansRequest();


      const getData = async () => {
        loading.value = true;

        // await updateQueries();
        await getPricingPlans(
          formInline.walletId,
          formInline.merchantId,
          formInline.gatewayName,
          formInline.channelName,

          sort.value,
          pageNumber.value,
          pageSize.value
        );
        reinitializeComponents();

        loading.value = false;

        console.log(pricingPlansRef);
      };

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
        walletId,
        merchantId,
        getData,
        loading,
        updatePageSize,
        updatePageNumber,
        pricingPlansRef,
        totalRef,
        pageNumberRef,
        pageSizeRef
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
