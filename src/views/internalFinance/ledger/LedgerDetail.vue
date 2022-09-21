<template>
    <div class="card" style="margin-bottom: 15px;margin-top: -25px">
        <div class="card-header">
            <h3 class="card-title">Partner XXXX</h3>
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

            <el-descriptions
                    class="margin-top"
                    :title="'Overview'"
                    :column="3"
                    :size="small"
                    style="margin-bottom: 10px"

            >
                <template #extra>
                    <!--<button type="button" class="btn btn-sm btn-light-primary" @click="displayTransaction">-->
                        <!--Transaction history-->
                    <!--</button>-->
                </template>
                <el-descriptions-item label="Currency:"></el-descriptions-item>
                <el-descriptions-item label="Available Balance:">$</el-descriptions-item>
                <el-descriptions-item label="Unavailable Balance:">$</el-descriptions-item>

            </el-descriptions>

            <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small" :label-position="'right'"
                     label-width="auto" ref="searchForm">
                <el-form-item label="Manual Order ID" prop="operationId">
                    <el-input v-model="formInline.operationId" placeholder="Manual Order ID"></el-input>
                </el-form-item>
                <el-form-item label="From Account" prop="accountFromId">
                    <!--<el-input v-model="formInline.accountFromId" placeholder="From Account ID"></el-input>-->

                    <el-select v-model="formInline.accountFromId" placeholder="please select an account"
                               style="width: 100%" filterable>

                        <!--<el-option label="Please select a source" :value="0"></el-option>-->
                        <el-option v-for="item in accountsRef"
                                   :key="item"
                                   :label="item.source.name +'_'+item.accountName +'_'+item.accountNumber + ' '+ item.currency"
                                   :value="item.id">

                            <span style="float: left">{{ item.source.name +"_"+item.accountName +"_"+item.accountNumber}}</span>
                            <span
                                    style="
          float: right;
          color: var(--el-text-color-secondary);
          font-size: 13px;
        "
                            >{{ item.currency }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="To Account" prop="accountToId">
                    <!--<el-input v-model="formInline.accountToId" placeholder="To Account ID"></el-input>-->
                    <el-select v-model="formInline.accountToId" placeholder="please select an account"
                               style="width: 100%" filterable>

                        <!--<el-option label="Please select a source" :value="0"></el-option>-->
                        <el-option v-for="item in accountsRef"
                                   :key="item"
                                   :label="item.source.name +'_'+item.accountName +'_'+item.accountNumber + ' '+ item.currency"
                                   :value="item.id">

                            <span style="float: left">{{ item.source.name +"_"+item.accountName +"_"+item.accountNumber}}</span>
                            <span
                                    style="
          float: right;
          color: var(--el-text-color-secondary);
          font-size: 13px;
        "
                            >{{ item.currency }}</span>
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


    <!--availableBalance: number;-->
    <!--createdAt: string;-->
    <!--id: number;-->
    <!--operation: ManualOrdersResponse-->
    <!--operationId: number;-->
    <!--unavailableBalance: number;-->
    <!--updatedAt: string;-->
    <!--balanceType: string;-->
    <!--accountId: number;-->
    <!--currency: string;-->
    <el-table :data="accountStatementsRef" style="width: 100%" height="550" size="default" v-loading="loading">
        <el-table-column  prop="" width="15"/>
        <el-table-column prop="id" label="ID" width="80"/>

        <el-table-column prop="operation" label="From Account" width="330">

            <template #default="account">

                <span v-if="account.row.operation.accountFrom">
                    <span style="color: #222831"> {{account.row.operation.accountFrom.source.name+ "_" }}</span><span
                        style="color: #3F72AF"> {{account.row.operation.accountFrom.accountName+ "_" }}</span><span
                        style="color: #00ADB5"> {{account.row.operation.accountFrom.accountNumber}}</span>
                </span>
                <span v-else>
                    -
                </span>

                <!--{{account.row.operation.accountFrom? (account.row.operation.accountFrom.source.name +'-'+ account.row.operation.accountFrom.accountName +'-' + account.row.operation.accountFrom.accountNumber):'-'}}-->
            </template>


        </el-table-column>
        <el-table-column prop="operation" label="To Account" width="330">

            <template #default="account">

                <span v-if="account.row.operation.accountTo">
                    <span style="color: #222831"> {{account.row.operation.accountTo.source.name+ "_" }}</span><span
                        style="color: #3F72AF"> {{account.row.operation.accountTo.accountName+ "_" }}</span><span
                        style="color: #00ADB5"> {{account.row.operation.accountTo.accountNumber}}</span>
                </span>
                <span v-else>
                    -
                </span>

                <!--{{account.row.operation.accountFrom? (account.row.operation.accountFrom.source.name +'-'+ account.row.operation.accountFrom.accountName +'-' + account.row.operation.accountFrom.accountNumber):'-'}}-->
            </template>
        </el-table-column>
        <el-table-column prop="operation" label="Related Order" width="250">
            <template #default="account">
                {{account.row.operation.id + "-"+ account.row.operation.type + "-"+ account.row.operation.orderType}}
            </template>
        </el-table-column>
        <el-table-column prop="accountId" label="Record Account ID" width="330">
            <!--<template #default="account">-->
            <!--{{(account.row.operation.accountFrom && account.row.operation.accountFromId === account.row.accountId) ? (account.row.operation.accountFrom.source.name +'-'+ account.row.operation.accountFrom.accountName +'-' + account.row.operation.accountFrom.accountNumber):-->
            <!--(account.row.operation.accountTo && account.row.operation.accountToId === account.row.accountId)? (account.row.operation.accountTo.source.name +'-'+ account.row.operation.accountTo.accountName +'-' + account.row.operation.accountTo.accountNumber):'-' }}-->
            <!--</template>-->


            <template #default="account">

                <span v-if="account.row.operation.accountFrom && account.row.operation.accountFromId === account.row.accountId">
                    <span style="color: #222831"> {{account.row.operation.accountFrom.source.name+ "_" }}</span><span
                        style="color: #3F72AF"> {{account.row.operation.accountFrom.accountName+ "_" }}</span><span
                        style="color: #00ADB5"> {{account.row.operation.accountFrom.accountNumber}}</span>
                </span>
                <span v-else>
                   <span style="color: #222831"> {{account.row.operation.accountTo.source.name+ "_" }}</span><span
                        style="color: #3F72AF"> {{account.row.operation.accountTo.accountName+ "_" }}</span><span
                        style="color: #00ADB5"> {{account.row.operation.accountTo.accountNumber}}</span>
                </span>

                <!--{{account.row.operation.accountFrom? (account.row.operation.accountFrom.source.name +'-'+ account.row.operation.accountFrom.accountName +'-' + account.row.operation.accountFrom.accountNumber):'-'}}-->
            </template>
        </el-table-column>
        <el-table-column prop="balanceType" label="Change Balance" width="200"/>
        <el-table-column prop="amount" label="Change Amount" width="200">

            <template #default="account">
                 <span v-if="account.row.operation.accountFrom && account.row.operation.accountFromId === account.row.accountId">
                    <span style="color: #222831"> {{account.row.amount+ " " + account.row.operation.accountFrom.currency }}</span>
                 </span>
                <span v-else>
                    <span style="color: #222831"> {{account.row.amount+ " " + account.row.operation.accountTo.currency }}</span>
                </span>

            </template>
        </el-table-column>

        <el-table-column prop="availableBalance" label="Available Balance" width="160">
            <template #default="account">
                <span v-if="account.row.operation.accountFrom && account.row.operation.accountFromId === account.row.accountId">
                    <span style="color: #222831"> {{account.row.availableBalance+ " " + account.row.operation.accountFrom.currency }}</span>
                </span>
                <span v-else>
                    <span style="color: #222831"> {{account.row.availableBalance+ " " + account.row.operation.accountTo.currency }}</span>
                </span>
            </template>

        </el-table-column>
        <el-table-column prop="unavailableBalance" label="Unavailable Balance" width="170">
            <template #default="account">
                <span v-if="account.row.operation.accountFrom && account.row.operation.accountFromId === account.row.accountId">
                    <span style="color: #222831"> {{account.row.unavailableBalance+ " " + account.row.operation.accountFrom.currency }}</span>
                </span>
                <span v-else>
                    <span style="color: #222831"> {{account.row.unavailableBalance+ " " + account.row.operation.accountTo.currency }}</span>
                </span>
            </template>
        </el-table-column>
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
  import { DateTimeUtils } from "@/latipay/utils/DateTimeUtils";

  import { reinitializeComponents } from "@/core/plugins/keenthemes";
  import { EnumsConstant } from "@/store/enums/constants";
  import { ref } from "vue";
  import { reactive } from "vue";
  import { getAccountStatementsRequest } from "@/latipay/apis/services/AccountStatementsService";
  import { getAccountsRequest } from "@/latipay/apis/services/AccountsService";


  export default defineComponent({
    name: "ledgerDetail",
    components: {},
    props: {
      id: Number
    },
    setup(props) {
      const store = useStore();

      const operationId = ref<string | null>(null);
      const accountFromId = ref<string | null>(null);
      const accountToId = ref<string | null>(null);

      const sort = ref<string | null>(null);
      const pageNumber = ref(1);
      const pageSize = ref(20);

      const loading = ref(false);
      const countries = EnumsConstant.CountryCode;


      const formInline = reactive({
        operationId: "",
        accountFromId: "",
        accountToId: ""
      });

      const {
        accountStatementsRef,
        totalRef,
        pageNumberRef,
        pageSizeRef,
        getAccountStatements
      } = getAccountStatementsRequest();


      const getData = async () => {
        loading.value = true;

        // await updateQueries();
        await getAccountStatements(
          formInline.operationId,
          formInline.accountFromId,
          formInline.accountToId,


          sort.value,
          pageNumber.value,
          pageSize.value
        );
        reinitializeComponents();

        loading.value = false;

        console.log(accountStatementsRef);
      };

      const {
        accountsRef,

        getAccounts
      } = getAccountsRequest();
      const getAccountsData = async () => {
        loading.value = true;

        // await updateQueries();
        await getAccounts(
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          1,
          10000
        );
        reinitializeComponents();

        loading.value = false;

        console.log(accountsRef);
      };


      onMounted(async () => {
        // setCurrentPageTitle("Users");
        await getData();
        await getAccountsData();
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
        accountsRef,
        getData,
        loading,
        updatePageSize,
        updatePageNumber,
        accountStatementsRef,
        totalRef,
        pageNumberRef,
        pageSizeRef,
        operationId,
        accountFromId,
        accountToId,
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
