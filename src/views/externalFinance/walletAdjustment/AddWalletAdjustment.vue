<template>
    <el-page-header content="Adjust Balance" @back="$router.go(-1)" style="margin-top: -25px;margin-bottom: 15px" v-if="stepIndex === 0"/>
    <el-page-header content="Adjust Balance" @back="backToStepOne" style="margin-top: -25px;margin-bottom: 15px" v-if="stepIndex === 1"/>
    <el-card class="box-card">


        <el-steps :active="stepIndex" finish-status="success" simple
                  style="margin-top: 15px;margin-bottom:25px;background-color: white">
            <el-step title="Select Wallet"></el-step>
            <el-step title="Adjust Balance"></el-step>
            <el-step title="Confirm"></el-step>
        </el-steps>
        <div style="display: flex;justify-content: center;">

            <el-form ref="stepOneFormRef" :model="stepOneForm" label-width="150px" v-if="stepIndex === 0" style="width: 700px" v-loading="loadingRef">

                <el-form-item label="Merchant Name" required prop="merchantId">
                    <el-select v-model="stepOneForm.merchantId" placeholder="please select a merchant"
                               style="width: 50%" filterable @change="handleMerchant">
                        <el-option v-for="item in merchantsRef"
                                   :key="item" :label="item.name + '-'+ item.id" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Wallet Name" required prop="walletId">
                    <el-select v-model="stepOneForm.walletId" placeholder="please select a wallet" style="width: 50%" filterable>
                        <el-option v-for="item in walletsRef"
                                   :key="item" :label="item.name + '-'+ item.currency + '-' + item.id" :value="item.id">
                        </el-option>
                    </el-select>
                    {{walletsRef.filter( it => it.id === +stepOneForm.walletId)[0] ?
                    ('AB: '+ walletsRef.filter( it => it.id === +stepOneForm.walletId)[0].availableBalance+' '+ walletsRef.filter( it => it.id === +stepOneForm.walletId)[0].currency +' | UAB: '+walletsRef.filter( it => it.id === +stepOneForm.walletId)[0].unavailableBalance+' '+ walletsRef.filter( it => it.id === +stepOneForm.walletId)[0].currency ):''}}

                </el-form-item>



                <el-form-item>
                    <el-button type="primary" @click="onToStepTwo">Next</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div v-if="stepIndex === 1">

            <div style="display: flex;justify-content: center;margin-bottom: 15px ">

                <div class="card card-flush"
                     style="width: 700px; border-color: lightgray;border-style:solid;border-width: 1px">

                    <div class="card-body py-5">
                        <el-descriptions
                                class="margin-top"
                                :title="walletsRef.filter( it => it.id === +stepOneForm.walletId)[0] ?walletsRef.filter( it => it.id === +stepOneForm.walletId)[0].name:'-'"
                                :column="3"
                                :size="small"

                        >
                            <template #extra>
                                <button type="button" class="btn btn-sm btn-light-primary" @click="displayTransaction">
                                    Transaction history
                                </button>
                            </template>
                            <el-descriptions-item label="Wallet ID:"> {{stepOneForm.walletId}}</el-descriptions-item>
                            <el-descriptions-item label="Merchant ID:">{{stepOneForm.merchantId}}</el-descriptions-item>
                            <el-descriptions-item label="Available Balance:">{{walletsRef.filter( it => it.id === +stepOneForm.walletId)[0] ?walletsRef.filter( it => it.id === +stepOneForm.walletId)[0].availableBalance+' '+ walletsRef.filter( it => it.id === +stepOneForm.walletId)[0].currency:'-'}}</el-descriptions-item>
                            <el-descriptions-item label="Unavailable Balance:">{{walletsRef.filter( it => it.id === +stepOneForm.walletId)[0] ?walletsRef.filter( it => it.id === +stepOneForm.walletId)[0].unavailableBalance+' '+ walletsRef.filter( it => it.id === +stepOneForm.walletId)[0].currency:'-'}}</el-descriptions-item>
                            <el-descriptions-item label="Status:">
                                <el-tag size="small">{{walletsRef.filter( it => it.id === +stepOneForm.walletId)[0] ? (walletsRef.filter( it => it.id === +stepOneForm.walletId)[0].enabled ? 'Active':'Disabled'):'-'}}</el-tag>
                            </el-descriptions-item>
                        </el-descriptions>
                    </div>
                </div>
            </div>
            <div style="display: flex;justify-content: center;">

                <el-form ref="stepTwoFormRef" :model="stepTwoForm" label-width="170px" label-position="left" v-loading="loadingRef"
                         style="width: 700px">

                    <el-form-item label="Adjust Balance Type" required prop="balanceType">
                        <el-select v-model="stepTwoForm.balanceType" placeholder="please select a type"
                                   style="width: 100%">
                            <el-option label="Available Balance" value="Available"></el-option>
                            <el-option label="Unavailable Balance" value="Unavailable"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="Adjustment" required prop="amount">

                        <el-input
                                v-model="stepTwoForm.amount"
                                placeholder="Please input a amount"
                                class="input-with-select"
                                type="number"


                        >
                            <template #prepend>
                                <el-select v-model="stepTwoForm.adjustType" placeholder="Type" style="width: 130px;" >
                                    <el-option label="Increase" value="increase"></el-option>
                                    <el-option label="Decrease" value="decrease"></el-option>

                                </el-select>
                            </template>
                            <template #append>
                                {{walletsRef.filter( it => it.id === +stepOneForm.walletId)[0] ?walletsRef.filter( it => it.id === +stepOneForm.walletId)[0].currency:'-'}}
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="Reason" required prop="reason">

                        <textarea
                                :rows="2"
                                type="textarea"
                                style="width: 100%"
                                placeholder="Please input the reason for adjustment"
                                class="el-textarea__inner"
                                v-model.lazy="stepTwoForm.reason"
                        >
                         </textarea>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="onToStepThree">Confirm</el-button>
                    </el-form-item>
                </el-form>


            </div>


        </div>

        <div v-if="stepIndex === 2">

            <div style="display: flex;justify-content: center;margin-bottom: 15px;margin-top: 20px ">


                <el-result
                        icon="success"
                        title="Adjust Successful"
                        sub-title="You can review your adjust list or create a new one"
                >
                    <template #extra>
                        <el-button @click="checkSuccess">Check Statement</el-button>
                        <el-button type="primary" @click="stepIndex = 0">Create New</el-button>
                    </template>
                </el-result>


            </div>
        </div>


    </el-card>

    <el-card class="box-card" style="margin-top: 20px" v-if="stepIndex === 1 && showHistory === true">
        <el-table :data="walletStatementsRef" style="width: 100%" height="550" size="default" v-loading="loadingRef">
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
    </el-card>


</template>

<script lang="ts">
  import { defineComponent, onMounted, onUnmounted, watch } from "vue";
  import { useStore } from "vuex";
  import { Actions } from "../../../store/enums/StoreEnums";
  import { getIllustrationsPath } from "../../../core/helpers/assets";
  import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";
  import { unref, ref } from "vue";
  import Vue from "vue";
  import { reactive } from "vue";
  import { getMerchantsRequest } from "@/latipay/apis/services/MerchantsService";
  import { reinitializeComponents } from "@/core/plugins/keenthemes";
  import { EnumsConstant } from "@/store/enums/constants";
  import { getWalletsRequest } from "@/latipay/apis/services/WalletsService";
  import { ElMessage } from "element-plus";
  import { DateTimeUtils } from "@/latipay/utils/DateTimeUtils";
  import { WalletsResponse } from "@/latipay/apis/models/wallet/WalletsResponse";
  import {
    getWalletStatementsRequest,
    postWalletStatementRequest
  } from "@/latipay/apis/services/WalletStatementsService";
  import { PostWalletParameter } from "@/latipay/apis/models/walletStatement/WalletStatementsResponse";


  export default defineComponent({
    name: "addWalletAdjustment",
    components: {},


    setup() {
      const store = useStore();
      const sort = ref<string | null>(null);
      const pageNumber = ref(1);
      const pageSize = ref(1000);
      const adjustPageNumber = ref(1);
      const adjustPageSize = ref(20);
      const stepOneFormRef = ref();
      const stepTwoFormRef = ref();
      const stepIndex = ref(0);

      const loadingRef = ref(false);
      const showHistory = ref(false);
      const currencies = EnumsConstant.CurrencyCode;


      const stepOneForm = reactive({
        merchantId: "",
        walletId: "",
        // currency: ""
      });

      const stepTwoForm = reactive({
        adjustType: "",
        balanceType:"",
        amount: "",
        reason: ""
      });

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

      const {
        merchantsRef,
        getMerchants
      } = getMerchantsRequest();


      const getMerchantData = async () => {
        loadingRef.value = true;

        // await updateQueries();
        await getMerchants(
          null,
          null,
          null,
          null,
          'Verified',
          true,
          sort.value,
          pageNumber.value,
          pageSize.value
        );
        reinitializeComponents();

        loadingRef.value = false;

        console.log(merchantsRef);
      };

      const {
        walletsRef,
        getWallets
      } = getWalletsRequest();


      const getWalletData = async () => {
        loadingRef.value = true;

        // await updateQueries();
        await getWallets(
          +stepOneForm.merchantId,
          null,
          sort.value,
          pageNumber.value,
          pageSize.value
        );
        reinitializeComponents();

        loadingRef.value = false;

        console.log(walletsRef);
      };

      const handleMerchant = async () => {
        console.log(stepOneForm.merchantId);
        if(stepOneForm.merchantId){
          await getWalletData();
        }

      };
      const onToStepTwo = async () => {

        const form = unref(stepOneFormRef);
        if (!form) {
          return
        }
        try {
          await form.validate();
          if (stepOneForm.merchantId && stepOneForm.walletId ) {
            stepIndex.value = 1;


          }
        } catch (err) {
          console.log(err)
        }

      };

      const onToStepThree = async () => {


        const form = unref(stepTwoFormRef);
        if (!form) {
          return
        }
        try {
          await form.validate();
          if ( +stepTwoForm.amount <= 0 ) {
            failAlert("Input amount must be larger than 0.");

          }else {

            let newAdjust = new PostWalletParameter();
            newAdjust.balanceType = stepTwoForm.balanceType;
            newAdjust.merchantId = +stepOneForm.merchantId;
            newAdjust.walletId = +stepOneForm.walletId;
            if (stepTwoForm.adjustType === 'increase') {
              newAdjust.amount = +stepTwoForm.amount;
            }else if (stepTwoForm.adjustType === 'decrease'){
              newAdjust.amount = +stepTwoForm.amount * -1;
            }
            newAdjust.remarks = stepTwoForm.reason;


            await postAdjustData(newAdjust);
          }
        } catch (err) {
          console.log(err)
        }

      };
      const { postErrorRef, postWalletStatement } = postWalletStatementRequest();
      const postAdjustData = async ( data: PostWalletParameter) => {
        loadingRef.value = true;
        await postWalletStatement(data);

        if (!postErrorRef.value) {
          loadingRef.value = false;

          successAlert("Adjust wallet balance successfully!");
          stepIndex.value = 2;
          stepTwoForm.adjustType = "";
          stepTwoForm.amount = "";
          stepTwoForm.balanceType = "";
          stepTwoForm.reason = "";

        }else {
          failAlert("Something wrong happened! Please have a check.");
          loadingRef.value = false;
        }


      };
      const backToStepOne = async () => {
        stepIndex.value = 0;
      };

      const displayTransaction = async () => {
        showHistory.value = true;
        await getTransactionsData();
      };

      const {
        walletStatementsRef,
        totalRef,
        pageNumberRef,
        pageSizeRef,
        getWalletStatements
      } = getWalletStatementsRequest();


      const getTransactionsData = async () => {
        loadingRef.value = true;

        // await updateQueries();
        await getWalletStatements(
          null,
          stepOneForm.walletId,
          'Adjust',
          null,

          sort.value,
          adjustPageNumber.value,
          adjustPageSize.value
        );
        reinitializeComponents();

        loadingRef.value = false;

        console.log(walletStatementsRef);
      };

      const updatePageSize = async (val: number) => {
        console.log(`${val} items per page`);
        adjustPageSize.value = val;
        await getMerchantData();
      };
      const updatePageNumber = async (val: number) => {
        console.log(`current page: ${val}`);
        adjustPageNumber.value = val;
        await getMerchantData();
      };

      const checkSuccess = async () => {
        stepIndex.value = 1;
        displayTransaction();
      };

      onMounted(async () => {
        // setCurrentPageTitle("Users");
        await getMerchantData();
      });

      // const onToStepTwo = () => {
      //   stepIndex = 1;
      //   console.log(stepIndex);
      // };


      return {
        getIllustrationsPath,
        stepOneForm,
        stepTwoForm,
        merchantsRef,
        currencies,
        loadingRef,
        handleMerchant,
        walletsRef,
        onToStepTwo,
        stepIndex,
        stepOneFormRef,
        onToStepThree,
        backToStepOne,
        showHistory,
        totalRef,
        pageNumberRef,
        pageSizeRef,
        displayTransaction,
        updatePageSize,
        updatePageNumber,
        stepTwoFormRef,
        checkSuccess,
        DateTimeUtils,
        walletStatementsRef

      };
    },
    methods: {
      // onToStepTwo() {
      //   this.stepIndex = 1;
      //
      // },
      //
      // onToStepThree() {
      //   this.stepIndex = 2;
      //
      // }
    }

  });
</script>

<style>
    .input-with-select .el-input-group__prepend {
        background-color: var(--el-fill-color-blank);
    }
</style>
