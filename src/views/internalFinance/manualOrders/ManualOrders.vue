<template>
  <div class="card" style="margin-bottom: 15px;margin-top: -25px">
    <div class="card-header">
      <h3 class="card-title">Manual Orders</h3>
      <div class="card-toolbar">

        <!--<el-button size="small" round type="primary" plain>All</el-button>-->
        <!--<el-button size="small" type="text"><span style="color: gray">Increase</span></el-button>-->
        <!--<el-button size="small" type="text"><span style="color: gray">Decrease</span></el-button>-->
        <!--<el-button size="small" type="text"><span style="color: gray">Transfer</span></el-button>-->

        <el-radio-group v-model="selectedType" size="small">
          <el-radio-button label="All" @click="refreshAllList"/>
          <el-radio-button label="Increase" @click="refreshIncreaseList"/>
          <el-radio-button label="Decrease" @click="refreshDecreaseList"/>
          <el-radio-button label="Transfer" @click="refreshTransferList"/>
        </el-radio-group>
        <!--<el-button  size="small" plain style="border-radius: 75%"><img alt="Logo" src="media/icons/lp/icon-download.png" style="width: 17px;height: 17px"/></el-button>-->
        <a href="#" class="btn btn-icon btn-outline-default  h-35px w-35px btn-outline" style="border-radius: 50%;margin-left: 10px"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
          </svg>
        </a>
      </div>
    </div>
    <div class="card-body">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small"  :label-position="'right'" label-width="auto" ref="searchForm">
        <el-form-item label="From Account" prop="accountFromId">
          <!--<el-input v-model="formInline.accountFromId" placeholder="From Account ID"></el-input>-->

          <el-select v-model="formInline.accountFromId" placeholder="please select an account" style="width: 100%" filterable>

            <!--<el-option label="Please select a source" :value="0"></el-option>-->
            <el-option v-for="item in accountsRef"
                       :key="item" :label="item.source.name +'_'+item.accountName +'_'+item.accountNumber + ' '+ item.currency" :value="item.id">

              <span style="float: left">{{ item.source.name +'_'+item.accountName +'_'+item.accountNumber}}</span>
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
          <el-select v-model="formInline.accountToId" placeholder="please select an account" style="width: 100%" filterable>

            <!--<el-option label="Please select a source" :value="0"></el-option>-->
            <el-option v-for="item in accountsRef"
                       :key="item" :label="item.source.name +'_'+item.accountName +'_'+item.accountNumber + ' '+ item.currency" :value="item.id">

              <span style="float: left">{{ item.source.name +'_'+item.accountName +'_'+item.accountNumber}}</span>
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

  <router-link :to="{ name: 'manualOrdersDetail', params: { id: 'increase'}}"
  >
    <el-button type="primary" size="small" style="margin-bottom: 10px;margin-right: 15px">+ Increase</el-button>
  </router-link>
  <router-link :to="{ name: 'manualOrdersDetail', params: { id: 'decrease'}}"
  >
    <el-button type="primary" size="small" style="margin-bottom: 10px;margin-right: 15px">- Decrease</el-button>
  </router-link>
  <router-link :to="{ name: 'manualOrdersDetail', params: { id: 'transfer'}}"
  >
    <el-button type="primary" size="small" style="margin-bottom: 10px">Transfer</el-button>
  </router-link>


  <el-table :data="manualOrdersRef" style="width: 100%" height="550" size="default" v-loading="loadingRef">

    <el-table-column type="expand" fixed width="20">
      <template #default="account">
        <p style="margin-left: 10px">Comment: <br/>{{ account.row.remarks }}</p>
      </template>
    </el-table-column>
    <el-table-column fixed prop="id" label="ID" width="60"/>

    <el-table-column prop="type" label="Operation Type" width="140"/>
    <el-table-column prop="orderType" label="Type" width="140"/>
    <el-table-column prop="tag" label="Tag" width="140"/>
    <el-table-column prop="accountFrom" label="From account" width="350">
      <template #default="account">
        <!--{{account.row.accountFrom? (account.row.accountFrom.source.name +'-'+ account.row.accountFrom.accountName +'-' + account.row.accountFrom.accountNumber):'-'}}-->

        <span v-if="account.row.accountFrom">
                    <span style="color: #222831"> {{account.row.accountFrom.source.name+ '_' }}</span><span style="color: #3F72AF"> {{account.row.accountFrom.accountName+ '_' }}</span><span style="color: #00ADB5"> {{account.row.accountFrom.accountNumber}}</span>
                </span>
        <span v-else>
                    -
                </span>
      </template>
    </el-table-column>
    <el-table-column prop="accountTo" label="To account" width="350">
      <template #default="account">
        <!--{{account.row.accountTo? (account.row.accountTo.source.name +'-'+ account.row.accountTo.accountName +'-' + account.row.accountTo.accountNumber):'-'}}-->

        <span v-if="account.row.accountTo">
                    <span style="color: #222831"> {{account.row.accountTo.source.name+ '_' }}</span><span style="color: #3F72AF"> {{account.row.accountTo.accountName+ '_' }}</span><span style="color: #00ADB5"> {{account.row.accountTo.accountNumber}}</span>
                </span>
        <span v-else>
                    -
                </span>
      </template>
    </el-table-column>
    <el-table-column prop="balanceType" label="Balance From-To" width="185">
      <template #default="account" >
        <div v-if="account.row.balanceTypeFrom && account.row.balanceTypeTo">{{(account.row.balanceTypeFrom ? account.row.balanceTypeFrom : '')}}->{{(account.row.balanceTypeTo ?account.row.balanceTypeTo :'')}}</div>
        <div v-if="account.row.balanceTypeFrom && !account.row.balanceTypeTo">{{(account.row.balanceTypeFrom ? account.row.balanceTypeFrom : '')}}</div>
        <div v-if="!account.row.balanceTypeFrom && account.row.balanceTypeTo">{{(account.row.balanceTypeTo ?account.row.balanceTypeTo :'')}}</div>
      </template>
    </el-table-column>
    <el-table-column prop="amountFrom" label="Amount" width="120">

      <template #default="account">
        {{account.row.type === 'Increase' ? account.row.amountTo : (account.row.orderType === 'Decrease'? account.row.amountFrom :  (account.row.accountFrom ? account.row.amountFrom :account.row.amountTo ))}}
      </template>
    </el-table-column>
    <el-table-column prop="currencyFrom" label="Currency" width="120">
      <template #default="account">
        {{account.row.type === 'Increase' ? account.row.currencyTo : (account.row.orderType === 'Decrease'? account.row.currencyFrom : (account.row.accountFrom ? account.row.currencyFrom :account.row.currencyTo ))}}
      </template>
    </el-table-column>
    <el-table-column prop="conversionRate.rate" label="Conversion Rate" width="140">
      <template #default="account">
        {{account.row.conversionRate ? account.row.conversionRate.currency +' ' + account.row.conversionRate.rate:'-'}}
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
    <el-table-column prop="operatedBy.name" label="Registered User" width="140"/>
    <el-table-column prop="approvedBy.name" label="ApprovedUser" width="130"/>
    <el-table-column fixed="right" label="Action" width="120">
      <template #default="record">


        <el-tag v-if="record.row.status === 'Completed'" class="ml-2" type="success" size="small">Completed
        </el-tag>
        <el-tag v-if="record.row.status === 'Failed'" class="ml-2" type="danger" size="small">Rejected
        </el-tag>

        <el-popover
                placement="left"
                title="Approve Confirmation"
                :width="400"
                trigger="click"
                v-if="record.row.status === 'Created'"

        >
          <template #reference>
            <img alt="Logo" src="media/icons/lp/tick.png" class="h-25px" />
          </template>

          <el-row>
            <span style="color: gray">Input amount <strong>or</strong> conversion rate</span>
          </el-row>
          <el-row style="margin-top: 10px;">

            <el-input v-model="inputAmount" placeholder="Please input the amount" size="small" @input="blurAmount(record.row)">

              <template #append><span style="color: #165DFF">{{record.row.accountTo.currency}}</span></template>
              <template #prepend>Amount</template>
            </el-input>

          </el-row>
          <el-row style="margin-top: 10px;margin-bottom: 10px">

            <el-input v-model="inputRate" placeholder="Please input the rate" size="small" @input="blurRate(record.row)">
              <template #prepend>Conversion Rate</template>
            </el-input>

          </el-row>
          <span>Comment</span>
          <el-row style="margin-top: 5px">

            <textarea
                    :rows="2"
                    type="textarea"
                    style="width: 100%"
                    placeholder="Please input"
                    class="el-textarea__inner"
                    v-model.lazy="record.row.remarks"
            >
            </textarea>

          </el-row>
          <el-row style="margin-top: 10px">


            <el-col :span="24">




              <div style="float: right;">   <el-button type="success" size="small" @click="popUpConfirm(record)">Confirm</el-button></div>
              <div style="float: right;margin-right: 10px"></div>
              <!---->
              <!--<div style="float: right;"><a href="#" class="btn btn-success" size="small">Confirm</a></div>-->
              <!--<div style="float: right;margin-right: 10px"><a href="#"-->
              <!--class="btn btn-secondary">Cancel</a></div>-->
            </el-col>


          </el-row>
        </el-popover>

        <el-popover
                placement="left"
                title="Please confirm!"
                :width="300"
                trigger="click"
                v-if="record.row.status === 'Created'"


        >
          <template #reference>
            <img alt="Logo" src="media/icons/lp/cancel.png" class="h-25px" />
          </template>
          <div>
            <el-row style="margin-bottom: 10px">
              You will reject this exchange order and this action can not be undo.
            </el-row>
            <span>Comment</span>
            <el-row style="margin-top: 5px;margin-bottom: 10px">


              <textarea
                        :rows="2"
                        type="textarea"
                        style="width: 100%"
                        placeholder="Please input"

                        class="el-textarea__inner" v-model.lazy="record.row.remarks"
                >
            </textarea>

            </el-row>
            <el-row>

              <el-col :span="24">
                <div style="float: right;"><el-button type="danger" size="small" @click="popUpCancel(record)" >Reject</el-button></div>
                <div style="float: right;margin-right: 10px">
                </div>
              </el-col>

            </el-row>
          </div>
        </el-popover>

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
import { reactive } from 'vue'
import { EnumsConstant } from "@/store/enums/constants";
import { reinitializeComponents } from "@/core/plugins/keenthemes";
import {
  approveManualOrderRequest,
  getManualOrdersRequest, rejectManualOrderRequest
} from "@/latipay/apis/services/ManualOrdersService";
import { DateTimeUtils } from "@/latipay/utils/DateTimeUtils";
import {
  ApproveManualOrder,
  ManualOrdersResponse,
  RejectManualOrder
} from "@/latipay/apis/models/manualOrder/ManualOrdersResponse";
import { ElMessage } from "element-plus";
import { getAccountsRequest } from "@/latipay/apis/services/AccountsService";
export default defineComponent({
  name: "manualOrders",
  components: {},
  setup() {
    const store = useStore();

    const accountFromId = ref<string | null>(null);
    const accountToId = ref<string | null>(null);
    const inputAmount = ref<number | null>(null);
    const inputRate = ref<number | null>(null);
    const sort = ref<string | null>(null);
    const pageNumber = ref(1);
    const pageSize = ref(20);
    const visible = ref(false);
    const selectedType = ref("All");

    const loadingRef = ref(false);
    const countries = EnumsConstant.CountryCode;


    const formInline = reactive({
      accountFromId: "",
      accountToId: "",
    });

    const {
      manualOrdersRef,
      totalRef,
      pageNumberRef,
      pageSizeRef,
      getManualOrders
    } = getManualOrdersRequest();


    const getData = async () => {
      loadingRef.value = true;

      // await updateQueries();
      await getManualOrders(
              formInline.accountFromId,
              formInline.accountToId,
              selectedType.value === 'All'? null: selectedType.value,
              sort.value,
              pageNumber.value,
              pageSize.value
      );
      reinitializeComponents();

      loadingRef.value = false;

      console.log(manualOrdersRef);
    };

    const onSubmit = () => {
      console.log("submit!");
    };

    const {
      accountsRef,

      getAccounts
    } = getAccountsRequest();
    const getAccountsData = async () => {
      loadingRef.value = true;

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

      loadingRef.value = false;

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

    const blurAmount =(async (data) => {
      console.log(data);
      if (inputAmount.value) {
        const rate = +(inputAmount.value / data.amountFrom).toFixed(4);
        inputRate.value = rate;
      }
      // reinitializeComponents();

    });

    const blurRate =(async (data) => {
      console.log("!231");
      if (inputRate.value) {
        inputAmount.value = data.amountFrom * inputRate.value;
      }
      // reinitializeComponents();
    });



    const { patchErrorRef: approveErrorRef, approveManualOrder } = approveManualOrderRequest();
    const { patchErrorRef, rejectManualOrder } = rejectManualOrderRequest();


    const popUpConfirm = async (record) => {
      console.log(record.row);
      const approveBody = new ApproveManualOrder();
      const rateString = record.row.conversionRate;
      rateString.rate = inputRate.value;
      if (inputRate.value) {
        approveBody.amountTo = record.row.amountFrom * inputRate.value;
      }else if (inputAmount.value){
        approveBody.amountTo = inputAmount.value;
      }

      approveBody.conversionRate = JSON.stringify(rateString);
      approveBody.remarks = record.row.remarks;
      await approveManualOrderInfo(record.row.id, approveBody as unknown as ManualOrdersResponse);
    };


    const popUpCancel = async (record) => {
      console.log(record);
      console.log(record.row);
      const rejectBody = new RejectManualOrder();

      rejectBody.remarks = record.row.remarks;
      await rejectManualOrderInfo(record.row.id, rejectBody as unknown as ManualOrdersResponse);

    };

    const approveManualOrderInfo = async (id: number, data: ManualOrdersResponse) => {
      loadingRef.value = true;
      await approveManualOrder(id, data);

      if (!approveErrorRef.value) {
        loadingRef.value = false;

        successAlert("Approve order successfully!");

        await getData();
      }else{
        loadingRef.value = false;
        await getData();
        failAlert("Something wrong happened! Please have a check.");
      }

      console.log(approveErrorRef);

    };
    const rejectManualOrderInfo = async (id: number, data: ManualOrdersResponse) => {
      loadingRef.value = true;
      await rejectManualOrder(id, data);

      if (!patchErrorRef.value) {
        loadingRef.value = false;

        successAlert("Reject order successfully!");
        await getData();

      }else{
        loadingRef.value = false;
        await getData();
        failAlert("Something wrong happened! Please have a check.");
      }

      console.log(patchErrorRef);

    };

    const refreshIncreaseList = async () => {

      console.log(selectedType.value);
      selectedType.value = "Increase";
      await getData();
    };
    const refreshDecreaseList = async () => {

      console.log(selectedType.value);
      selectedType.value = "Decrease";
      await getData();
    };
    const refreshTransferList = async () => {

      console.log(selectedType.value);
      selectedType.value = "Transfer";
      await getData();
    };

    const refreshAllList = async () => {

      console.log(selectedType.value);
      selectedType.value = "";
      await getData();
    };



    return {
      getIllustrationsPath,
      formInline,
      onSubmit,
      countries,
      accountsRef,
      refreshIncreaseList,
      refreshDecreaseList,
      refreshTransferList,
      getData,
      updatePageSize,
      updatePageNumber,
      manualOrdersRef,
      totalRef,
      refreshAllList,
      DateTimeUtils,
      pageNumberRef,
      pageSizeRef,
      accountFromId,
      accountToId,
      popUpConfirm,
      loadingRef,
      popUpCancel,
      inputAmount,
      inputRate,
      blurAmount,
      blurRate,
      visible,
      selectedType,



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
