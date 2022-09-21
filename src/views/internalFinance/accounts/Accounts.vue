<template>
    <div class="card" style="margin-bottom: 15px;margin-top: -25px">
        <div class="card-header">
            <h3 class="card-title">Accounts</h3>
            <div class="card-toolbar">

                <!--<el-button size="small" round type="primary" plain>All</el-button>-->
                <!--<el-button size="small" type="text"><span style="color: gray">Bank</span></el-button>-->
                <!--<el-button size="small" type="text"><span style="color: gray">Channel</span></el-button>-->
                <!--<el-button size="small" type="text"><span style="color: gray">Digital Wallet</span></el-button>-->
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

                <el-row :gutter="0">

                    <el-col :span="8">
                        <el-form-item label="Country" prop="country">
                            <el-select v-model="formInline.country" placeholder="Country" filterable>

                                <el-option v-for="item in countries"
                                           :key="item" :label="item.name" :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="Type" prop="type">
                            <el-select v-model="formInline.type" placeholder="Select a type">
                                <el-option label="All" value=""></el-option>
                                <el-option label="Bank" value="Bank"></el-option>
                                <el-option label="Channel Fiat" value="ChannelFiat"></el-option>
                                <el-option label="Channel DigitalWallet" value="ChannelCrypto"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <!--<el-form-item label="Account Source" prop="sourceName">-->
                    <!--<el-option label="All" value=""></el-option>-->
                    <!--<el-option  v-for="item in accountSources"-->
                    <!--:key="item" :label="item.name" :value="item.name" >-->
                    <!--</el-option>-->

                    <!--</el-form-item>-->

                    <el-col :span="8">
                        <el-form-item label="Currency" prop="currency">

                            <el-select v-model="formInline.currency" placeholder="Select a currency">
                                <el-option label="All" value=""></el-option>
                                <el-option v-for="item in currencies"
                                           :key="item" :label="item.name" :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="0">

                    <el-col :span="8">
                        <el-form-item label="Account Source" prop="sourceName">
                            <el-input v-model="formInline.sourceName" placeholder="Account Source"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="Account Name" prop="accountName">
                            <el-input v-model="formInline.accountName" placeholder="Account Name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="Account Number" prop="accountNumber">
                            <el-input v-model="formInline.accountNumber" placeholder="Account Number"></el-input>
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

    <router-link :to="{ name: 'accountDetail', params: { id: 'add'}}"
    >
        <el-button type="primary" size="small" style="margin-bottom: 10px">+ New</el-button>
    </router-link>

    <el-table :data="accountsRef" style="width: 100%" height="550" size="default" v-loading="loading">
        <el-table-column fixed  width="15"/>
        <el-table-column fixed prop="id" label="ID" width="80"/>
        <el-table-column prop="source.name" label="Source" width="120"/>
        <el-table-column prop="source.type" label="Type" width="170">
            <template #default="account">
                {{account.row.source.type === 'ChannelCrypto' ? 'ChannelDigitalWallet' : account.row.source.type}}
            </template>
        </el-table-column>
        <el-table-column prop="source.country" label="Country" width="120">
            <template #default="account">
                {{ account.row.source.country === 'XX' ? 'ALL' : account.row.source.country }}
            </template>
        </el-table-column>
        <el-table-column prop="accountName" label="Account Name" width="180"/>
        <el-table-column prop="accountNumber" label="Account Number" width="180"/>
        <el-table-column prop="currency" label="Currency" width="140"/>
        <el-table-column prop="availableBalance" label="Balance" width="140"/>
        <el-table-column prop="unavailableBalance" label="U/N Balance" width="140"/>
        <el-table-column prop="createdAt" label="Created At" width="250">
            <template #default="account">
                {{ DateTimeUtils.parseDateTime(account.row.createdAt) }}
            </template>
        </el-table-column>
        <el-table-column prop="updatedAt" label="Updated At" width="250">
            <template #default="account">
                {{ DateTimeUtils.parseDateTime(account.row.updatedAt) }}
            </template>
        </el-table-column>


        <el-table-column  prop="enabled" label="Status" fixed="right" width="80">

            <template #default="statusTag">
                <!--<el-tag v-if="statusTag.row.enabled" class="ml-2" type="success" size="small">Active-->
                <!--</el-tag>-->
                <!--<el-tag v-if="!statusTag.row.enabled" class="ml-2" type="danger" size="small">Disabled-->
                <!--</el-tag>-->

                <span class="badge badge-light-success" v-if="statusTag.row.enabled === true">Active</span>
                <span class="badge badge-light-danger" v-if="statusTag.row.enabled === false">Disabled</span>
            </template>
        </el-table-column>
        <el-table-column fixed="right" label="Action" width="80">
            <template #default="record">


                <router-link :to="{ name: 'accountDetail', params: { id: record.row.id, account: record.row } }"

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
  import { Actions } from "../../../store/enums/StoreEnums";
  import { getIllustrationsPath } from "../../../core/helpers/assets";
  import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";
  import { reactive } from "vue";
  import { ref } from "vue";
  import { DateTimeUtils } from "@/latipay/utils/DateTimeUtils";
  import { reinitializeComponents } from "@/core/plugins/keenthemes";
  import { getAccountsRequest } from "@/latipay/apis/services/AccountsService";
  import { EnumsConstant } from "@/store/enums/constants";
  import { AccountSourcesResponse } from "@/latipay/apis/models/accountSource/AccountSourcesResponse";


  export default defineComponent({
    name: "accounts",
    components: {},
    setup() {
      const store = useStore();


      const sourceName = ref<string | null>(null);
      const type = ref<string | null>(null);
      const country = ref<string | null>(null);
      const currency = ref<string | null>(null);
      const accountName = ref<string | null>(null);
      const accountNumber = ref<string | null>(null);
      const sort = ref<string | null>(null);
      const pageNumber = ref(1);
      const pageSize = ref(20);

      const loading = ref(false);
      const countries = EnumsConstant.CountryCode;
      const currencies = EnumsConstant.CurrencyCode;
      const accountSources: AccountSourcesResponse[] = [];

      const formInline = reactive({
        type: "",
        country: "",
        sourceName: "",
        currency: "",
        accountName: "",
        accountNumber: ""

      });

      const {
        accountsRef,
        totalRef,
        pageNumberRef,
        pageSizeRef,
        getAccounts
      } = getAccountsRequest();


      const getData = async () => {
        loading.value = true;

        // await updateQueries();
        await getAccounts(
          formInline.type,
          formInline.country,
          formInline.sourceName,
          formInline.currency,
          formInline.accountName,
          formInline.accountNumber,

          sort.value,
          pageNumber.value,
          pageSize.value
        );
        reinitializeComponents();

        loading.value = false;

        console.log(accountsRef);
      };

      const onSubmit = () => {
        console.log("submit!");
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
        onSubmit,
        countries,

        getData,
        loading,
        updatePageSize,
        updatePageNumber,
        accountsRef,
        totalRef,
        pageNumberRef,
        pageSizeRef,
        type,
        country,
        sourceName,
        currency,
        accountName,
        accountNumber,
        accountSources,
        currencies,
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
