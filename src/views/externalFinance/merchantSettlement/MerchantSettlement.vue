<template>


  <!--  <el-menu-->
  <!--      :default-active="activeIndex"-->
  <!--      class="el-menu-demo"-->
  <!--      mode="horizontal"-->
  <!--      :ellipsis="false"-->
  <!--      @select="handleSelect"-->
  <!--  >-->
  <!--    <el-menu-item index="1">Create</el-menu-item>-->
  <!--    <div class="flex-grow"/>-->
  <!--    <el-menu-item index="2">Create</el-menu-item>-->
  <!--  </el-menu>-->
  <div class="col-lg-4" style="margin-bottom: 30px;margin-top:30px">
    <div class="card card-stretch-50 shadow mb-5">
      <div class="card-header">
        <h3 class="card-title">Current Balance</h3>
        <el-button type="text" style="font-size: 16px" @click="showSendForm()">Send</el-button>
      </div>
      <div class="card-body">
        <span style="color: gray"><strong>AUD</strong></span>
        <h1>AU$ 19860.00</h1></div>
    </div>
  </div>


  <el-card class="box-card" v-if="showSend">


    <el-steps :active="stepIndex" finish-status="success"
              style="margin-top: 15px;margin-bottom:25px;background-color: white">
      <el-step title="Step 1 of 4" description="Transfer amount"></el-step>
      <el-step title="Step 2 of 4" description="Choose a sender"></el-step>
      <el-step title="Step 3 of 4" description="Choose a recipient"></el-step>
      <el-step title="Step 4 of 4" description="Verify details"></el-step>
    </el-steps>
    <div style="display: flex;justify-content: center;">


      <el-form ref="stepOneFormRef" :model="stepOneForm" label-width="150px" v-if="stepIndex === 0"
               style="width: 1000px"
               v-loading="loadingRef">
        <el-row>
          <el-col :span="4"><h3 style="float: right">
            How much would you like to send?
          </h3>
            <br/>
            <div style="float: right;margin-top: 10px">Estimated exchange rate:</div>

            <br/>
            <div style="float: right;font-size: 15px;color: gray"><strong>1 AUD = 0.75733 USD</strong></div>
            <br/>
            <div style="float: right;margin-top: 10px">Your current balance is:</div>
            <br/>
            <div style="float: right;font-size: 15px;color: gray"><strong> AUD 19,620.25</strong></div>
          </el-col>
          <el-col :span="20">
            <el-form-item label="You send" required prop="sendAmount">
              <el-input
                  v-model="stepOneForm.sendAmount"
                  type="number"
                  style="width: 400px"
                  :controls="false"
                  @change="handleSendAmountChange"
              >
                <template #prepend>AUD</template>
              </el-input>
            </el-form-item>
            <el-form-item label="They receive" required prop="receivedAmount">
              <el-input
                  v-model="stepOneForm.receivedAmount"
                  style="width: 400px"
                  type="number"
                  :precision="2" :step="0.1"
                  :controls="false"
                  class="input-with-select"
                  @change="handleReceivedAmountChange"
              >
                <template #prepend>
                  <el-select v-model="stepOneForm.receivedCurrency" placeholder="Currency"
                             style="width: 115px;background-color:transparent;">
                    <el-option label="USD" value="USD"/>
                    <el-option label="AUD" value="AUD"/>
                    <el-option label="NZD" value="NZD"/>
                    <el-option label="EUR" value="EUR"/>
                    <el-option label="GBP" value="GBP"/>
                    <el-option label="HKD" value="HKD"/>
                    <el-option label="SGD" value="SGD"/>
                  </el-select>
                </template>
              </el-input>


            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
          </el-col>
          <el-col :span="20">
            <el-form-item>
              <el-button type="primary" @click="onToStepTwo">Next</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>


    </div>

    <div v-if="stepIndex === 2">

      <div style="display: flex;justify-content: center;">

        <el-form ref="stepThirdFormRef" :model="stepThirdForm" label-width="250px" label-position="left"
                 v-loading="loadingRef"
                 style="width: 700px">

          <el-form-item label="Select a recipient" required prop="recipientId">

            <el-select v-model="stepThirdForm.recipientId" placeholder="please select a recipient" style="width: 400px"
                       filterable>

              <!--<el-option label="Please select a source" :value="0"></el-option>-->
              <el-option label="BA0001 MR H Chen AUD 12023200003131" value="1"></el-option>
              <!--              <el-option v-for="item in accountsRef"-->
              <!--                         :key="item"-->
              <!--                         :label="item.source.name +'-'+item.accountName +'-'+item.accountNumber + ' '+ item.currency"-->
              <!--                         :value="item.id">-->

              <!--                              <span-->
              <!--                                  style="float: left">{{-->
              <!--                                  item.source.name + '-' + item.accountName + '-' + item.accountNumber-->
              <!--                                }}</span>-->
              <!--                <span-->
              <!--                    style="-->
              <!--                          float: right;-->
              <!--                          color: var(&#45;&#45;el-text-color-secondary);-->
              <!--                          font-size: 13px;-->
              <!--                        "-->
              <!--                >{{ item.currency }}</span>-->
              <!--              </el-option>-->
            </el-select>


          </el-form-item>

          <el-form-item label="What's the payment reason?" required prop="paymentReason">

            <el-select v-model="stepThirdForm.paymentReason" placeholder="please select a payment reason"
                       style="width: 400px"
                       filterable>

              <el-option label="Family" value="FAMILY"></el-option>
              <el-option label="Business" value="BUSINESS"></el-option>
              <el-option label="Travel" value="TRAVEL"></el-option>
              <el-option label="Property" value="PROPERTY"></el-option>
              <el-option label="Investment" value="INVESTMENT"></el-option>
              <el-option label="Study" value="STUDY"></el-option>
              <el-option label="Living expenses" value="LIVING_EXPENSES"></el-option>


            </el-select>


          </el-form-item>
          <el-form-item label="What's the source of funds?" required prop="sourceOfFund">

            <el-select v-model="stepThirdForm.sourceOfFund" placeholder="please select a source of funds"
                       style="width: 400px"
                       filterable>
              <el-option label="Salary" value="SALARY"></el-option>
              <el-option label="Credit card" value="CREDIT_CARD"></el-option>
              <el-option label="Business funds" value="BUSINESS_FUNDS"></el-option>
              <el-option label="Rental income" value="RENTAL_INCOME"></el-option>
              <el-option label="Sale of assets" value="ASSETS_SALE"></el-option>
              <el-option label="Payment from 3rd party" value="THIRD_PARTY_PAYMENT"></el-option>
              <el-option label="Savings" value="SAVINGS"></el-option>
              <el-option label="Gift / Loan from family or friends" value="FAMILY_OR_FRIENDS"></el-option>
              <el-option label="Inheritance" value="INHERITANCE"></el-option>
            </el-select>


          </el-form-item>
          <el-form-item label="Payment reference" prop="paymentReference">
            <el-input
                v-model="stepThirdForm.paymentReference"
                :rows="2"
                type="textarea"
                style="width: 100%"
                placeholder="Optional data sent to the recipient's financial institution"
            />

          </el-form-item>


          <el-form-item>
            <el-button type="primary" @click="stepIndex = 1">Back</el-button>
            <el-button type="primary" @click="onToStepFour">Next</el-button>
          </el-form-item>
        </el-form>


      </div>


    </div>

    <div v-if="stepIndex === 1">


      <div style="display: flex;justify-content: center;">

        <el-form ref="stepTwoFormRef" :model="stepTwoForm" label-width="170px" label-position="left"
                 v-loading="loadingRef"
                 style="width: 700px">

          <el-form-item label="Select a sender" required prop="senderId">

            <el-select v-model="stepTwoForm.senderId" placeholder="please select an account" style="width: 400px"
                       filterable>

              <!--<el-option label="Please select a source" :value="0"></el-option>-->
              <el-option label="BA0001 MR H Chen AUD 12023200003131" value="1"></el-option>
              <!--              <el-option v-for="item in accountsRef"-->
              <!--                         :key="item"-->
              <!--                         :label="item.source.name +'-'+item.accountName +'-'+item.accountNumber + ' '+ item.currency"-->
              <!--                         :value="item.id">-->

              <!--                              <span-->
              <!--                                  style="float: left">{{-->
              <!--                                  item.source.name + '-' + item.accountName + '-' + item.accountNumber-->
              <!--                                }}</span>-->
              <!--                <span-->
              <!--                    style="-->
              <!--                          float: right;-->
              <!--                          color: var(&#45;&#45;el-text-color-secondary);-->
              <!--                          font-size: 13px;-->
              <!--                        "-->
              <!--                >{{ item.currency }}</span>-->
              <!--              </el-option>-->
            </el-select>


          </el-form-item>


          <el-form-item>
            <el-button type="primary" @click="stepIndex = 0">Back</el-button>
            <el-button type="primary" @click="onToStepThree">Next</el-button>
          </el-form-item>
        </el-form>


      </div>
    </div>


    <div v-if="stepIndex === 3">

      <div v-if="!sendFundSuccess" style="display: flex;justify-content: center;margin-bottom: 15px;margin-top: 20px;width: 100%">


        <el-row>

          <el-col :span="24">

            <el-descriptions title="Please confirm the details of this transfer">
              <el-descriptions-item label="Amount you're sending">
                <div style="font-size: 15px;color: #3043AC"><strong>AUD 200.25</strong></div>
              </el-descriptions-item>
              <el-descriptions-item label="Amount they'll receive">
                <div style="font-size: 15px;color: #3043AC"><strong>USD 140.35</strong></div>
              </el-descriptions-item>
              <el-descriptions-item label="Final exchange rate">
                <div style="font-size: 15px;color: #3043AC"><strong>1 AUD = 0.75536 USD</strong></div>
              </el-descriptions-item>
              <el-descriptions-item label="Who you're sending to">
                <div style="font-size: 15px;color: #3043AC"><strong>lewis chen <br/>

                  40 armadale rd, auckland

                  auckland Auckland AU 1050 <br/>

                  1213131324343434343 <br/>

                  CTBAAU2S</strong></div>
              </el-descriptions-item>
            </el-descriptions>
          </el-col>
        </el-row>


      </div>

      <div v-if="!sendFundSuccess"  style="display: flex;justify-content: center;margin-bottom: 15px;margin-top: 20px;width: 100%">
        <el-row>

          <el-col :span="24">
            <el-button type="primary" @click="sendFund">Confirm and Send</el-button>
          </el-col>
        </el-row>
      </div>




    </div>
    <div v-if="stepIndex === 4">

      <div style="display: flex;justify-content: center;margin-bottom: 15px;margin-top: 20px ">


        <el-result
            icon="success"
            title="Send Successful"
            sub-title="You can review this payment ledger in your FlashFX portal"
        >
          <template #extra>
            <!--            <el-button @click="checkSuccess">Check Statement</el-button>-->
            <!--            <el-button type="primary" @click="stepIndex = 0">Create New</el-button>-->
          </template>
        </el-result>


      </div>
    </div>

  </el-card>


</template>

<script lang="ts">
import {defineComponent, onMounted, onUnmounted} from "vue";
import {useStore} from "vuex";
import {Actions} from "../../../store/enums/StoreEnums";
import {getIllustrationsPath} from "../../../core/helpers/assets";
import {setCurrentPageTitle} from "@/core/helpers/breadcrumb";
import {reactive} from "vue";
import {ref, unref} from "vue";
import {DateTimeUtils} from "@/latipay/utils/DateTimeUtils";
import {reinitializeComponents} from "@/core/plugins/keenthemes";
import {EnumsConstant} from "@/store/enums/constants";
import {
  approveMerchantSettlementRequest,
  getMerchantSettlementsRequest, rejectMerchantSettlementRequest
} from "@/latipay/apis/services/MerchantSettlementsService";
import {ElMessage} from "element-plus";
import useClipboard from "vue-clipboard3";
import {
  ApproveMerchantSettlement,
  RejectMerchantSettlement
} from "@/latipay/apis/models/merchantSettlement/MerchantSettlementsResponse";
import {getAccountsRequest} from "@/latipay/apis/services/AccountsService";
import {ConversionRate} from "@/latipay/apis/models/manualOrder/ManualOrdersResponse";
import {PostWalletParameter} from "@/latipay/apis/models/walletStatement/WalletStatementsResponse";

export default defineComponent({
  name: "merchantSettlement",
  components: {},
  setup() {
    const store = useStore();
    const sort = ref<string | null>(null);
    const pageNumber = ref(1);
    const pageSize = ref(1000);

    const stepOneFormRef = ref();
    const stepTwoFormRef = ref();
    const stepThirdFormRef = ref();
    // const stepFourFormRef = ref();
    const stepIndex = ref(0);

    const loadingRef = ref(false);
    const sendFundSuccess = ref(false);
    const showSend = ref(false);
    const currencies = EnumsConstant.CurrencyCode;

    const activeIndex = ref('1')


    const stepOneForm = reactive({
      sendAmount: "200.00",
      receivedAmount: "",
      receivedCurrency: ""
    });

    const stepTwoForm = reactive({
      senderId: "",
      balanceType: "",
      amount: "",
      reason: ""
    });

    const stepThirdForm = reactive({
      recipientId: "",
      paymentReason: "",
      sourceOfFund: "",
      paymentReference: ""
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

    const handleReceivedAmountChange = (value: number) => {
      console.log(value)
      stepOneForm.receivedAmount = Number(value).toFixed(2)
    }
    const handleSendAmountChange = (value: number) => {
      console.log(value)
      stepOneForm.sendAmount = Number(value).toFixed(2)
    }


    const {
      merchantSettlementsRef,
      totalRef,
      pageNumberRef,
      pageSizeRef,
      getMerchantSettlements
    } = getMerchantSettlementsRequest();


    const onSubmit = () => {
      console.log("submit!");
    };


    onMounted(async () => {
      // setCurrentPageTitle("Users");

    });

    const updatePageSize = async (val: number) => {
      console.log(`${val} items per page`);
      pageSize.value = val;

    };
    const updatePageNumber = async (val: number) => {
      console.log(`current page: ${val}`);
      pageNumber.value = val;

    };

    const handleSelect = (key: string, keyPath: string[]) => {
      console.log(key, keyPath)
    }


    const showSendForm = () => {
      console.log("showSendForm!");
      showSend.value = true;
    };

    const onToStepTwo = async () => {
      console.log("tttt")
      const form = unref(stepOneFormRef);
      if (!form) {

        return
      }

      console.log("vvvvv")
      try {
        await form.validate();
        if (stepOneForm.sendAmount && stepOneForm.receivedCurrency && stepOneForm.receivedAmount) {
          stepIndex.value = 1;
          console.log("fffff")


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
        if (stepTwoForm.senderId) {
          stepIndex.value = 2


        } else {
          failAlert("Input amount must be larger than 0.");
        }
      } catch (err) {
        console.log(err)
      }

    };
    const onToStepFour = async () => {


      const form = unref(stepThirdFormRef);
      if (!form) {
        return
      }
      try {
        await form.validate();
        if (stepThirdForm.recipientId && stepThirdForm.sourceOfFund && stepThirdForm.paymentReason) {
          stepIndex.value = 3


        } else {
          failAlert("Input amount must be larger than 0.");
        }
      } catch (err) {
        console.log(err)
      }

    };
    const sendFund = async () => {

      console.log("ffrfr")
      stepIndex.value = 4

      sendFundSuccess.value = true;


    };


    const {patchErrorRef: approveErrorRef, approveMerchantSettlement} = approveMerchantSettlementRequest();
    const {patchErrorRef, rejectMerchantSettlement} = rejectMerchantSettlementRequest();


    return {
      getIllustrationsPath,
      stepIndex,
      activeIndex,
      showSend,
      stepOneFormRef,
      showSendForm,
      onSubmit,
      handleSelect,
      updatePageSize,
      updatePageNumber,
      merchantSettlementsRef,
      totalRef,
      pageNumberRef,
      pageSizeRef,
      loadingRef,
      stepOneForm,
      stepTwoForm,
      handleReceivedAmountChange,
      handleSendAmountChange,
      onToStepTwo,
      onToStepThree,
      stepTwoFormRef,
      stepThirdFormRef,
      stepThirdForm,
      onToStepFour,
      sendFund,
      sendFundSuccess


    };
  },

  methods: {}
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

.flex-grow {
  flex-grow: 1;
}

.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}
</style>
