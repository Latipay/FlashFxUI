<template>

    <div class="card" style="margin-bottom: 15px;margin-top: -25px">
        <div class="card-header">
            <h3 class="card-title">Merchant Settlement Record</h3>
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

                <!--<el-form-item label="Type" prop="type">-->
                <!--<el-select v-model="formInline.type" placeholder="Select a type">-->
                <!--<el-option label="All" value=""></el-option>-->
                <!--<el-option label="MerchantPortal" value="MerchantPortal"></el-option>-->
                <!--<el-option label="MerchantApi" value="MerchantApi"></el-option>-->
                <!--<el-option label="Administration" value="Administration"></el-option>-->
                <!--<el-option label="Scheduled" value="Scheduled"></el-option>-->
                <!--</el-select>-->
                <!--</el-form-item>-->
                <el-row :gutter="0">

                    <el-col :span="8">

                        <el-form-item label="Settlement Currency" prop="currency">

                            <el-select v-model="formInline.currency" placeholder="Select a currency">
                                <el-option label="All" value=""></el-option>
                                <el-option v-for="item in currencies"
                                           :key="item" :label="item.name" :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="System Account Type" prop="accountType">
                            <el-select v-model="formInline.accountType" placeholder="Select a type">
                                <el-option label="All" value=""></el-option>
                                <el-option label="Bank" value="Bank"></el-option>
                                <el-option label="Channel Fiat" value="ChannelFiat"></el-option>
                                <el-option label="Channel DigitalWallet" value="ChannelCrypto"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="0">

                    <el-col :span="8">
                        <el-form-item label="System Account Name" prop="accountName">
                            <el-input v-model="formInline.accountName" placeholder="Account Name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="System Account Number" prop="accountNumber">
                            <el-input v-model="formInline.accountNumber" placeholder="Account Number"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!--<el-form-item>-->
                <!--<el-button type="primary" @click="onSubmit" :icon="Search">Search</el-button>-->
                <!--</el-form-item>-->
                <!--<el-form-item>-->
                <!--<el-button @click="onSubmit" :icon="Search">Reset</el-button>-->
                <!--</el-form-item>-->
            </el-form>
            <el-button @click="resetFormFields" :icon="Search" size="small" style="float: right;">Reset</el-button>
            <el-button type="primary" @click="onSubmitSearchForm" :icon="Search" size="small"
                       style="float: right;margin-right: 10px">Search
            </el-button>

        </div>
    </div>


    <!--accountAddress: string;-->
    <!--accountBank: string;-->
    <!--accountCountry: string;-->
    <!--accountCrypto: string;-->
    <!--accountCurrency: string;-->
    <!--accountName: string;-->
    <!--accountNetwork: string;-->
    <!--accountNumber: string;-->
    <!--accountType: string;-->
    <!--createdAt: string;-->
    <!--id: number;-->
    <!--settlementAmount: number;-->
    <!--settlementCurrency:string;-->
    <!--settlements: MerchantSettlementsResponse-->
    <!--type:string;-->
    <!--updatedAt: string;-->


    <el-table :data="merchantSettlementRecordsRef" style="width: 100%" height="550" size="default" v-loading="loading">
        <el-table-column prop="id" label="Record ID" width="100"/>
        <el-table-column prop="account" label="Merchant Account" width="350">
            <template #default="record">
                <!--{{record.row.settlements[0].accountType ==="BankAccount"? (record.row.settlements[0].accountName +-->
                <!--"-"+record.row.settlements[0].accountCurrency +"-"+record.row.settlements[0].accountNumber) :-->
                <!--(record.row.settlements[0].accountCrypto + "-"+ record.row.settlements[0].accountNetwork-->
                <!--+"-"+record.row.settlements[0].accountAddress )}}-->

                <span v-if="record.row.settlements[0].accountType ==='BankAccount'">
                    <span style="color: #222831"> {{record.row.settlements[0].accountName+ "_" }}</span><span
                        style="color: #3F72AF"> {{record.row.settlements[0].accountCurrency+ "_" }}</span><span
                        style="color: #00ADB5"> {{record.row.settlements[0].accountNumber}}</span>
                </span>
                <span v-else>
                       <span style="color: #222831"> {{record.row.settlements[0].accountCrypto+ "_" }}</span><span
                        style="color: #3F72AF"> {{record.row.settlements[0].accountNetwork+ "_" }}</span><span
                        style="color: #00ADB5"> {{record.row.settlements[0].accountAddress}}</span>
                </span>
            </template>

        </el-table-column>

        <el-table-column prop="account" label="System Account" width="340">
            <template #default="record">
                <!--{{record.row.accountType ==="Bank"? (record.row.accountName + "-"+record.row.accountCurrency-->
                <!--+"-"+record.row.accountNumber) : (record.row.accountCrypto + "-"+ record.row.accountNetwork-->
                <!--+"-"+record.row.accountAddress )}}-->


                <span v-if="record.row.accountType ==='Bank'">
                    <span style="color: #222831"> {{record.row.accountName+ "_" }}</span><span
                        style="color: #3F72AF"> {{record.row.accountCurrency+ "_" }}</span><span
                        style="color: #00ADB5"> {{record.row.accountNumber}}</span>
                </span>
                <span v-if="record.row.accountType ==='ChannelFiat'">
                       <span style="color: #222831"> {{record.row.accountName+ "_" }}</span><span
                        style="color: #3F72AF"> {{record.row.accountCurrency+ "_" }}</span><span
                        style="color: #00ADB5"> {{record.row.accountNumber}}</span>
                </span>
                <span v-if="record.row.accountType ==='ChannelCrypto'">
                       <span style="color: #222831"> {{record.row.accountCrypto+ "_" }}</span><span
                        style="color: #3F72AF"> {{record.row.accountNetwork+ "_" }}</span><span
                        style="color: #00ADB5"> {{record.row.accountAddress}}</span>
                </span>
            </template>

        </el-table-column>

        <el-table-column prop="withdrawalAmount" label="Withdrawal Amount" width="175">

            <template #default="record">
                {{record.row.settlements[0]? record.row.settlements[0].withdrawalAmount + " " +record.row.settlements[0].wallet.currency : "-"}}
            </template>
        </el-table-column>
        <el-table-column prop="settlementAmount" label="Settle Amount" width="160">

            <template #default="record">
                {{(record.row.settlementAmount? record.row.settlementAmount:"-") + " " + record.row.settlementCurrency}}
            </template>
        </el-table-column>
        <el-table-column prop="conversionRate" label="Conversion" width="140">
            <template #default="account">
                {{account.row.settlements[0].conversionRate ? account.row.settlements[0].conversionRate.currency +" " +
                account.row.settlements[0].conversionRate.rate :'-'}}

            </template>
        </el-table-column>

        <el-table-column prop="createdAt" label="Created At" width="250">
            <template #default="createdDate">
                {{ DateTimeUtils.parseDateTime(createdDate.row.createdAt) }}
            </template>
        </el-table-column>
        <el-table-column prop="updatedAt" label="Updated At" width="250">
            <template #default="updatedDate">
                {{ DateTimeUtils.parseDateTime(updatedDate.row.updatedAt) }}
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
  import { reactive } from "vue";
  import { ref } from "vue";
  import { DateTimeUtils } from "@/latipay/utils/DateTimeUtils";
  import { reinitializeComponents } from "@/core/plugins/keenthemes";
  import { EnumsConstant } from "@/store/enums/constants";
  import { getMerchantSettlementsRequest } from "@/latipay/apis/services/MerchantSettlementsService";
  import { getMerchantSettlementRecordsRequest } from "@/latipay/apis/services/MerchantSettlementRecordsService";


  export default defineComponent({
    name: "merchantSettlementRecord",
    components: {},
    setup() {
      const store = useStore();

      const type = ref<string | null>(null);
      const currency = ref<string | null>(null);
      const accountType = ref<string | null>(null);
      const accountName = ref<string | null>(null);
      const accountNumber = ref<string | null>(null);
      const sort = ref<string | null>(null);
      const pageNumber = ref(1);
      const pageSize = ref(20);

      const loading = ref(false);
      const countries = EnumsConstant.CountryCode;
      const currencies = EnumsConstant.CurrencyCode;

      const formInline = reactive({
        type: "",
        currency: "",
        accountType: "",
        accountName: "",
        accountNumber: ""

      });

      const {
        merchantSettlementRecordsRef,
        totalRef,
        pageNumberRef,
        pageSizeRef,
        getMerchantSettlementRecords
      } = getMerchantSettlementRecordsRequest();


      const getData = async () => {
        loading.value = true;

        // await updateQueries();
        await getMerchantSettlementRecords(
          formInline.type,
          formInline.currency,
          formInline.accountType,
          formInline.accountName,
          formInline.accountNumber,

          sort.value,
          pageNumber.value,
          pageSize.value
        );
        reinitializeComponents();

        loading.value = false;

        console.log(merchantSettlementRecordsRef);
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
        merchantSettlementRecordsRef,
        totalRef,
        pageNumberRef,
        pageSizeRef,
        type,
        currency,
        accountType,
        accountNumber,
        accountName,
        currencies,
        DateTimeUtils

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

<style scoped>
    #components-a-popconfirm-demo-placement .ant-btn {
        width: 70px;
        text-align: center;
        padding: 0;
        margin-right: 8px;
        margin-bottom: 8px;
    }
</style>
