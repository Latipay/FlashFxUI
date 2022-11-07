<template>


  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
  >
    <el-menu-item index="1">Send</el-menu-item>
    <el-menu-item index="2">Receive</el-menu-item>
  </el-menu>
  <div class="col-lg-4" style="margin-bottom: 30px;margin-top:30px">
    <div class="card card-stretch-50 shadow mb-5">
      <div class="card-header">
        <h3 class="card-title">Current Balance</h3>
        <el-button v-if="!refreshPending" type="text" style="font-size: 16px" @click="refreshBalance()">Refresh
        </el-button>
        <el-button v-if="refreshPending" type="text" style="font-size: 16px" loading>Refreshing</el-button>
        <!--        <el-button type="text" style="font-size: 16px" @click="showSendForm()">Send</el-button>-->
      </div>
      <div class="card-body">
        <span style="color: gray"><strong>AUD</strong></span>
        <h1 v-loading="refreshPending">AU$
          {{ getAccountBalanceRef ? (getAccountBalanceRef[0] ? getAccountBalanceRef[0].cleared.toFixed(2) : '') : '' }}</h1>


      </div>


    </div>
  </div>
  <el-dialog
      v-model="dialogVisible"
      title="Cancel sending the payment"
      width="30%"

  >
    <span>All the changes will be lost.</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">No, STAY</el-button>
        <el-button type="primary" @click="confirmCancelSend"
        >Yes, CANCEL</el-button
        >
      </span>
    </template>
  </el-dialog>

  <el-card class="box-card" v-if="showSend">

    <svg v-if="!sendFundSuccess" @click="cancelSend()" style="width:30px;height: 30px;float: right"
         viewBox="0 0 1024 1024"
         xmlns="http://www.w3.org/2000/svg"
         data-v-029747aa="">
      <path fill="currentColor"
            d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"></path>
    </svg>

    <el-steps :active="stepIndex" finish-status="success"
              style="margin-top: 15px;margin-bottom:25px;background-color: white">
      <el-step title="Step 1 of 4" description="Transfer amount"></el-step>
      <el-step title="Step 2 of 4" description="Choose a sender/sub-client"></el-step>
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
            <div style="float: right;font-size: 15px;color: gray"><strong>1 AUD = {{ quoteRef ? quoteRef.bid : '' }}
              {{ stepOneForm.receivedCurrency ? stepOneForm.receivedCurrency : '-' }}</strong></div>
            <br/>
            <div style="float: right;margin-top: 10px">Your current balance is:</div>
            <br/>
            <div style="float: right;font-size: 15px;color: gray" v-loading="refreshPending"><strong> AUD {{
                getAccountBalanceRef ? (getAccountBalanceRef[0] ? getAccountBalanceRef[0].cleared : '') : ''
              }}</strong></div>
          </el-col>
          <el-col :span="20">
            <el-form-item label="You send" required prop="sendAmount">
              <el-input
                  v-model="stepOneForm.sendAmount"
                  type="number"
                  style="width: 400px"
                  :precision="3"
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
                  :precision="3" :step="0.1"
                  :controls="false"
                  class="input-with-select"
                  @change="handleReceivedAmountChange"
              >
                <template #prepend>
                  <el-select v-model="stepOneForm.receivedCurrency" placeholder="Currency"
                             @change="handleSelectCurrency"
                             style="width: 115px;background-color:transparent;">
                    <el-option label="USD" value="USD"/>
                    <el-option label="NZD" value="NZD"/>
                    <el-option label="EUR" value="EUR"/>
                    <el-option label="GBP" value="GBP"/>
                    <el-option label="HKD" value="HKD"/>
                    <el-option label="SGD" value="SGD"/>
                    <el-option label="AED" value="AED"/>
                    <el-option label="CAD" value="CAD"/>
                    <el-option label="CHF" value="CHF"/>
                    <el-option label="CNY" value="CNY"/>
                    <el-option label="DKK" value="DKK"/>
                    <el-option label="ILS" value="ILS"/>
                    <el-option label="INR" value="INR"/>
                    <el-option label="JPY" value="JPY"/>
                    <el-option label="MXN" value="MXN"/>
                    <el-option label="MYR" value="MYR"/>
                    <el-option label="NOK" value="NOK"/>
                    <el-option label="PHP" value="PHP"/>
                    <el-option label="SEK" value="SEK"/>
                    <el-option label="THB" value="THB"/>
                    <el-option label="TRY" value="TRY"/>
                    <el-option label="ZAR" value="ZAR"/>
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

              <el-option v-for="item in getRecipientsRef.filter(it => it.currency === stepOneForm.receivedCurrency)"
                         :key="item"
                         :label="(item.firstName? ('Individual: '+item.firstName + ' ' + item.lastName) : 'Entity: ' + item.companyName) + '-'+item.country +'_'+item.currency "
                         :value="item.id">


              </el-option>

              <!--              <span-->
              <!--                  style="float: left">{{-->
              <!--                  item.accountIdType+ ':' + item.accountName + '-' + item.accountNo-->
              <!--                }}</span>-->
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

          <el-form-item label="Select a sender" prop="senderId">

            <el-select v-model="stepTwoForm.senderId" placeholder="please select a sender"
                       @change="handleChooseSender"
                       style="width: 400px"
                       filterable>


              <el-option v-for="item in getSendersRef"
                         :key="item"
                         :label="item.firstName? ('Individual-'+item.firstName + ' ' + item.lastName) : 'Entity-' + item.companyName "
                         :value="item.id">


              </el-option>


            </el-select>


          </el-form-item>

          OR

          <el-form-item label="Select a sub-client" prop="subclientId" style="margin-top: 15px">

            <el-select v-model="stepTwoForm.subclientId" placeholder="please select a sub-client"
                       @change="handleChooseSubclient"
                       style="width: 400px"
                       filterable>


              <el-option v-for="item in getSubclientsRef.filter(it => it.status === 'ACTIVE' )"
                         :key="item"
                         :label="item.clientType === 'INDIVIDUAL'? ('Individual-'+item.fullName ) : 'Entity-' + item.legalName "
                         :value="item.id">


              </el-option>


            </el-select>


          </el-form-item>

          <!--          <span-->
          <!--              style="     margin-left: 180px;-->

          <!--                          color: var(&#45;&#45;el-text-color-secondary);-->
          <!--                          font-size: 16px;-->
          <!--                        "-->
          <!--          >Address Info:</span>-->
          <!--          <br/>-->
          <!--          <span-->
          <!--              style="     margin-left: 180px;-->


          <!--                          color: var(&#45;&#45;el-text-color-secondary);-->
          <!--                          font-size: 15px;-->
          <!--                        "-->
          <!--          >{{-->
          <!--              stepTwoForm.senderId ? (getSendersRef.filter(it => it.id === stepTwoForm.senderId)[0].address.street + ' ' + getSendersRef.filter(it => it.id === stepTwoForm.senderId)[0].address.state) : ''-->
          <!--            }}</span>-->
          <!--          <br/>-->
          <!--          <span-->
          <!--              style="     margin-left: 180px;-->

          <!--                          color: var(&#45;&#45;el-text-color-secondary);-->
          <!--                          font-size: 15px;-->
          <!--                        "-->
          <!--          >{{-->
          <!--              stepTwoForm.senderId ? (getSendersRef.filter(it => it.id === stepTwoForm.senderId)[0].address.suburb + ' ' + getSendersRef.filter(it => it.id === stepTwoForm.senderId)[0].address.postcode) : ''-->
          <!--            }}</span>-->
          <!--          <br/>-->
          <!--          <span-->
          <!--              style="     margin-left: 180px;-->


          <!--                          color: var(&#45;&#45;el-text-color-secondary);-->
          <!--                          font-size: 15px;-->
          <!--                        "-->
          <!--          >{{-->
          <!--              stepTwoForm.senderId ? (getSendersRef.filter(it => it.id === stepTwoForm.senderId)[0].address.country) : ''-->
          <!--            }}</span>-->
          <el-form-item style="margin-top: 10px">
            <el-button type="primary" @click="stepIndex = 0">Back</el-button>
            <el-button type="primary" @click="onToStepThree">Next</el-button>
          </el-form-item>
        </el-form>


      </div>
    </div>


    <div v-if="stepIndex === 3">

      <div v-if="!sendFundSuccess"
           style="display: flex;justify-content: center;margin-bottom: 15px;margin-top: 20px;width: 100%">


        <el-row>

          <el-col :span="24">

            <el-descriptions title="Please confirm the details of this transfer">
              <el-descriptions-item label="Amount you're sending">
                <div style="font-size: 15px;color: #3043AC"><strong>AUD {{ stepOneForm.sendAmount }}</strong></div>
              </el-descriptions-item>
              <el-descriptions-item label="Amount they'll receive">
                <div style="font-size: 15px;color: #3043AC">
                  <strong>{{ stepOneForm.receivedCurrency + ' ' + stepOneForm.receivedAmount }}</strong></div>
              </el-descriptions-item>
              <el-descriptions-item label="Final exchange rate">
                <div style="font-size: 15px;color: #3043AC"><strong>1 AUD = {{ quoteRef ? quoteRef.bid : '' }}
                  {{ stepOneForm.receivedCurrency ? stepOneForm.receivedCurrency : '-' }}</strong></div>
              </el-descriptions-item>
              <el-descriptions-item label="Who you're sending to">
                <div style="font-size: 15px;color: #3043AC"><strong>{{
                    stepThirdForm.recipientId ?
                        (getRecipientsRef.filter(it => it.id === stepThirdForm.recipientId)[0].firstName ?
                            'Individual: ' + getRecipientsRef.filter(it => it.id === stepThirdForm.recipientId)[0].firstName + ' ' + getRecipientsRef.filter(it => it.id === stepThirdForm.recipientId)[0].lastName
                            : 'Entity: ' + getRecipientsRef.filter(it => it.id === stepThirdForm.recipientId)[0].companyName) : ''
                  }}<br/>

                  <!--                  {{-->
                  <!--                    stepThirdForm.recipientId ?-->
                  <!--                        ( getRecipientsRef.filter(it => it.id === stepThirdForm.recipientId)[0].firstName ?-->
                  <!--                            'Individual: '+getRecipientsRef.filter(it => it.id === stepThirdForm.recipientId)[0].firstName + ' ' + getRecipientsRef.filter(it => it.id === stepThirdForm.recipientId)[0].lastName-->
                  <!--                            : 'Entity: ' + getRecipientsRef.filter(it => it.id === stepThirdForm.recipientId)[0].companyName  ): ''-->
                  <!--                  }}<br/>-->

                  {{
                    stepThirdForm.recipientId ?
                        ((getRecipientsRef.filter(it => it.id === stepThirdForm.recipientId)[0].accountName ? getRecipientsRef.filter(it => it.id === stepThirdForm.recipientId)[0].accountName : '') + ' ' + getRecipientsRef.filter(it => it.id === stepThirdForm.recipientId)[0].accountNo
                        ) : ''
                  }} <br/>

                  {{
                    stepThirdForm.recipientId ?
                        (getRecipientsRef.filter(it => it.id === stepThirdForm.recipientId)[0].bic ? getRecipientsRef.filter(it => it.id === stepThirdForm.recipientId)[0].bic : ''
                        ) : ''
                  }} </strong></div>
              </el-descriptions-item>
            </el-descriptions>
          </el-col>
        </el-row>


      </div>

      <div v-if="!sendFundSuccess"
           style="display: flex;justify-content: center;margin-bottom: 15px;margin-top: 20px;width: 100%">
        <el-row>

          <el-col :span="24">
            <el-button type="primary" @click="stepIndex = 2">Back</el-button>
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
      <div style="display: flex;justify-content: center;">
      <er-row >
        <el-col :span="24">
          <el-button type="primary" @click="donePayout">Done</el-button>
        </el-col>
      </er-row>
      </div>
    </div>

  </el-card>


</template>

<script lang="ts">
import {defineComponent, onMounted, onUnmounted} from "vue";
import {useStore} from "vuex";
import {Actions} from "../../store/enums/StoreEnums";
import {getIllustrationsPath} from "../../core/helpers/assets";
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
import {ElMessageBox} from 'element-plus'
import {getAccountBalanceRequest} from "@/latipay/apis/services/AccountBalanceService";
import {getSendersRequest} from "@/latipay/apis/services/SenderService";
import {getQuoteRequest} from "@/latipay/apis/services/QuoteService";
import {getRecipientsRequest} from "@/latipay/apis/services/RecipientService";
import router from "@/router";
import {postAccountSourceRequest} from "@/latipay/apis/services/AccountSourcesService";
import {postSendFundRequest} from "@/latipay/apis/services/SendFundService";
import {AddAccountSource} from "@/latipay/apis/models/accountSource/AccountSourcesResponse";
import {AddSendFund} from "@/latipay/apis/models/sendFund/SendFundResponse";
import {getSubclientRequest} from "@/latipay/apis/services/SubclientService";

export default defineComponent({
  name: "internationalPayout",
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
    const clearedAUD = ref(0.00);
    const pendingAUD = ref(0.00);
    const loadingRef = ref(false);
    const refreshPending = ref(false);
    const sendFundSuccess = ref(false);
    const showSend = ref(false);
    const currencies = EnumsConstant.CurrencyCode;
    const dialogVisible = ref(false)

    const activeIndex = ref('0')


    const stepOneForm = reactive({
      sendAmount: "200.000",
      receivedAmount: "",
      receivedCurrency: "EUR"
    });

    const stepTwoForm = reactive({
      senderId: "",
      balanceType: "",
      amount: "",
      reason: "",
      subclientId: ""
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

    const handleReceivedAmountChange = async (value: number) => {
      loadingRef.value = true;
      console.log(value)
      stepOneForm.receivedAmount = Number(value).toFixed(3);
      await getQuoteRef(stepOneForm.receivedCurrency, stepOneForm.receivedCurrency, stepOneForm.receivedAmount.toString());
      stepOneForm.sendAmount = quoteRef.value ? Number(quoteRef.value.fromAmount).toFixed(3) : ''
      console.log(quoteRef)
      loadingRef.value = false;
    }
    const handleSendAmountChange = async (value: number) => {
      console.log(value)
      loadingRef.value = true;
      stepOneForm.sendAmount = Number(value).toFixed(3)

      await getQuoteRef('AUD', stepOneForm.receivedCurrency, stepOneForm.sendAmount.toString());
      stepOneForm.receivedAmount = quoteRef.value ? Number(quoteRef.value.toAmount).toFixed(3) : ''
      console.log(quoteRef)
      loadingRef.value = false;
    }

    const handleSelectCurrency = async (value: string) => {
      console.log(value)
      loadingRef.value = true;
      // stepOneForm.sendAmount = Number(value).toFixed(2)
      if (stepOneForm.sendAmount) {

        await getQuoteRef('AUD', stepOneForm.receivedCurrency, stepOneForm.sendAmount.toString());
        loadingRef.value = false;
      } else {
        await getQuoteRef('AUD', stepOneForm.receivedCurrency, "200");
        loadingRef.value = false;
      }
      stepOneForm.receivedAmount = quoteRef.value ? Number(quoteRef.value.toAmount).toFixed(3) : ''
      console.log(quoteRef)

    }

    const {
      getQuoteRef,
      errorRef: getQuoteErrorRef,
      quoteRef
    } = getQuoteRequest();


    const {
      getAccountBalanceRef,
      responseRef, errorRef,
      getAccountBalance
    } = getAccountBalanceRequest();


    const onSubmit = () => {
      console.log("submit!");
    };


    onMounted(async () => {
      // setCurrentPageTitle("Users");
      await getBalance();

      await getQuoteRef('AUD', stepOneForm.receivedCurrency, stepOneForm.sendAmount.toString());
      stepOneForm.receivedAmount = quoteRef.value ? Number(quoteRef.value.toAmount).toFixed(3) : ''


    });

    const getBalance = async () => {
      loadingRef.value = true;

      // await updateQueries();
      await getAccountBalance();
      reinitializeComponents();

      loadingRef.value = false;
      // clearedAUD.value = getAccountBalanceRef ? getAccountBalanceRef;
      console.log(getAccountBalanceRef);
    };


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
      if (+key === 1) {
        showSend.value = true;
      } else {
        showSend.value = false;
      }
    }


    const showSendForm = () => {
      console.log("showSendForm!");
      showSend.value = true;
    };


    const refreshBalance = async () => {
      console.log("showSendForm!");
      refreshPending.value = true;
      await getAccountBalance();
      reinitializeComponents();
      refreshPending.value = false;
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
          console.log("fffff");
          await getSenderData();
          await getSubclientData();


        }
      } catch (err) {
        console.log(err)
      }

    };


    const {
      getSendersRef,
      totalRef,
      pageNumberRef,
      pageSizeRef,
      getSenders
    } = getSendersRequest();


    const getSenderData = async () => {
      loadingRef.value = true;

      // await updateQueries();
      await getSenders(
          sort.value,
          pageNumber.value,
          pageSize.value
      );
      reinitializeComponents();

      loadingRef.value = false;
      console.log("getSendersRef");
      console.log(getSendersRef);
    };

    const {
      getSubclientsRef,
      totalRef: subclientTotalRef,
      pageNumberRef: subclientPageNumberRef,
      pageSizeRef: subclientPageSizeRef,
      getSubclients
    } = getSubclientRequest();


    const getSubclientData = async () => {
      loadingRef.value = true;

      // await updateQueries();
      await getSubclients(
          sort.value,
          pageNumber.value,
          pageSize.value
      );
      reinitializeComponents();

      loadingRef.value = false;
      console.log("getSubclientsRef");
      console.log(getSubclientsRef);
    };

    const onToStepThree = async () => {


      const form = unref(stepTwoFormRef);
      if (!form) {
        return
      }
      try {
        await form.validate();
        if (stepTwoForm.senderId || stepTwoForm.subclientId) {
          stepIndex.value = 2
          await getRecipientData();


        } else {
          failAlert("Please choose a sender or a subclient!");
        }
      } catch (err) {
        console.log(err)
      }

    };


    const {
      getRecipientsRef,
      totalRef: recipientTotalRef,
      pageNumberRef: recipientPageNumberRef,
      pageSizeRef: recipientPageSizeRef,
      getRecipients
    } = getRecipientsRequest();


    const getRecipientData = async () => {
      loadingRef.value = true;

      // await updateQueries();
      await getRecipients(
          sort.value,
          pageNumber.value,
          pageSize.value
      );
      reinitializeComponents();

      loadingRef.value = false;
      console.log("getRecipientsRef");
      console.log(getRecipientsRef);
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

    const {postErrorRef, postSendFundRef, postSendFund} = postSendFundRequest();


    const sendFund = async () => {

      console.log("ffrfr")
      const newSendFund = new AddSendFund();
      loadingRef.value = true;

      newSendFund.fromCurrency = "AUD"
      newSendFund.toCurrency = stepOneForm.receivedCurrency
      newSendFund.amount = +stepOneForm.sendAmount
      newSendFund.currency = "AUD"
      newSendFund.quoteId = quoteRef.value ? quoteRef.value.id : ''
      newSendFund.reason = stepThirdForm.paymentReason
      newSendFund.sourceOfFunds = stepThirdForm.sourceOfFund
      newSendFund.senderId = stepTwoForm.senderId
      newSendFund.recipientId = stepThirdForm.recipientId
      newSendFund.externalReference = stepThirdForm.paymentReference
      newSendFund.externalId = ""
      newSendFund.subClientId = stepTwoForm.subclientId
      newSendFund.callbackUri = ""

      await postSendFund(newSendFund);

      if (!postErrorRef.value) {
        loadingRef.value = false;
        console.log("333333" + postErrorRef.value)
        stepIndex.value = 4;

        sendFundSuccess.value = true;


      } else {
        failAlert("Something wrong happened! Please have a check.");
      }


    };

    const cancelSend = async () => {

      console.log("ffrfr")
      dialogVisible.value = true;


    };
    const handleChooseSender = async () => {

      console.log("ffrfr")
      stepTwoForm.subclientId = ""


    };
    const handleChooseSubclient = async () => {

      console.log("ffrfr")

      stepTwoForm.senderId = ""
    };



    const confirmCancelSend = async () => {

      console.log("ffrfr")
      stepIndex.value = 0

      showSend.value = false;
      activeIndex.value = '0';
      reinitializeComponents();
      location.reload()


    };

    const donePayout = async () => {

      console.log("ffrfr")
      stepIndex.value = 0

      sendFundSuccess.value = false


    };

    const handleSendClose = (done: () => void) => {
      ElMessageBox.confirm('Are you sure to cancel this dialog?')
          .then(() => {
            done()
          })
          .catch(() => {
            // catch error
          })
    }


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
      sendFundSuccess,
      getBalance,
      getAccountBalanceRef,
      clearedAUD,
      pendingAUD,
      refreshPending,
      refreshBalance,
      cancelSend,
      getSendersRef,
      quoteRef,
      dialogVisible,
      handleSendClose,
      confirmCancelSend,
      getRecipientsRef,
      getSubclientsRef,
      handleSelectCurrency,
      donePayout,
      handleChooseSender,
      handleChooseSubclient


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
