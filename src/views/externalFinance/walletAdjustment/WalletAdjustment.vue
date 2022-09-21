<template>
  <div class="card" style="margin-bottom: 15px;margin-top: -25px">
    <div class="card-header">
      <h3 class="card-title">Wallet Adjustment</h3>
      <div class="card-toolbar">

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
        <el-form-item label="Merchant ID" prop="merchantId">
          <el-input v-model="formInline.merchantId" placeholder="Merchant ID"></el-input>
        </el-form-item>
        <el-form-item label="Wallet ID" prop="walletId">
          <el-input v-model="formInline.walletId" placeholder="Wallet ID"></el-input>
        </el-form-item>
        <el-form-item label="Currency" prop="currency">

          <el-select v-model="formInline.currency" placeholder="Select a currency">
            <el-option label="All" value=""></el-option>
            <el-option v-for="item in currencies"
                       :key="item" :label="item.name" :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>


      </el-form>
      <el-button @click="resetFormFields" :icon="Search" size="small" style="float: right;">Reset</el-button>
      <el-button type="primary" @click="onSubmitSearchForm" :icon="Search" size="small"
                 style="float: right;margin-right: 10px">Search
      </el-button>

    </div>
  </div>

  <router-link :to="{ name: 'addWalletAdjustment', params: { id: 'add'}}"
  >
    <el-button type="primary" size="small" style="margin-bottom: 10px">+ New</el-button>
  </router-link>

  <el-table :data="walletStatementsRef" style="width: 100%" height="550" size="default" v-loading="loading">


    <el-table-column type="expand" fixed width="20">
      <template #default="walletStatement">
        <p style="margin-left: 10px">Reason: <br/>{{ walletStatement.row.remarks }}</p>
      </template>
    </el-table-column>
    <el-table-column  prop="id" label="ID" width="80"/>
    <el-table-column prop="merchantId" label="Merchant" width="250">
      <template #default="walletStatement">
        {{walletStatement.row.merchant? (walletStatement.row.merchant.name +'-'+ walletStatement.row.merchantId ):'-'}}
      </template>
    </el-table-column>
    <el-table-column prop="walletId" label="Wallet" width="250">
      <template #default="walletStatement">
        {{walletStatement.row.wallet? (walletStatement.row.wallet.name +'-'+ walletStatement.row.walletId ):'-'}}
      </template>
    </el-table-column>
    <!--<el-table-column prop="transactionId" label="Transaction Id" width="130"/>-->
    <el-table-column prop="type" label="Type" width="130"/>
    <el-table-column prop="currency" label="currency" width="120"/>
    <el-table-column prop="balanceType" label="Change Balance" width="200"/>
    <el-table-column prop="amount" label="Change Amount" width="200"/>
    <el-table-column prop="availableBalance" label="Available Balance" width="160"/>
    <el-table-column prop="unavailableBalance" label="Unavailable Balance" width="170"/>
    <el-table-column prop="createdAt" label="Created At" width="250">
      <template #default="walletStatement">
        {{ DateTimeUtils.parseDateTime(walletStatement.row.createdAt) }}
      </template>
    </el-table-column>
    <el-table-column prop="updatedAt" label="Updated At" width="250">
      <template #default="walletStatement">
        {{ DateTimeUtils.parseDateTime(walletStatement.row.updatedAt) }}
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
  import { Actions } from "../../../store/enums/StoreEnums";
  import { getIllustrationsPath } from "../../../core/helpers/assets";
  import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";
  import { ref } from "vue";
  import { reactive } from "vue";
  import { DateTimeUtils } from "@/latipay/utils/DateTimeUtils";

  import { reinitializeComponents } from "@/core/plugins/keenthemes";
  import { EnumsConstant } from "@/store/enums/constants";
  import { getWalletStatementsRequest } from "@/latipay/apis/services/WalletStatementsService";


  export default defineComponent({
    name: "walletAdjustment",
    components: {},
    setup() {
      const store = useStore();
      const merchantId = ref<string | null>(null);
      const walletId = ref<string | null>(null);
      const type = ref<string | null>(null);
      const currency = ref<string | null>(null);

      const sort = ref<string | null>(null);
      const pageNumber = ref(1);
      const pageSize = ref(20);

      const loading = ref(false);
      const countries = EnumsConstant.CountryCode;
      const currencies = EnumsConstant.CurrencyCode;


      const formInline = reactive({
        merchantId: "",
        walletId: "",
        currency: "",
      });

      const {
        walletStatementsRef,
        totalRef,
        pageNumberRef,
        pageSizeRef,
        getWalletStatements
      } = getWalletStatementsRequest();


      const getData = async () => {
        loading.value = true;

        // await updateQueries();
        await getWalletStatements(
                formInline.merchantId,
                formInline.walletId,
                'Adjust',
                formInline.currency,

                sort.value,
                pageNumber.value,
                pageSize.value
        );
        reinitializeComponents();

        loading.value = false;

        console.log(walletStatementsRef);
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
        countries,

        getData,
        loading,
        updatePageSize,
        updatePageNumber,
        walletStatementsRef,
        totalRef,
        pageNumberRef,
        pageSizeRef,
        merchantId,
        walletId,
        type,
        currency,
        DateTimeUtils,
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

