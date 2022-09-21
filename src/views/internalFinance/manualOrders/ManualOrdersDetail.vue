<template>


    <div v-if="orderType && orderType === 'Increase'">
        <el-page-header content="Add New Increase Order" @back="$router.go(-1)"
                        style="margin-top: -25px;margin-bottom: 15px"/>
    </div>
    <div v-if="orderType && orderType === 'Decrease'">
        <el-page-header content="Add New Decrease Order" @back="$router.go(-1)"
                        style="margin-top: -25px;margin-bottom: 15px"/>
    </div>
    <div v-if="orderType && orderType === 'Transfer'">
        <el-page-header content="Add New Transfer Order" @back="$router.go(-1)"
                        style="margin-top: -25px;margin-bottom: 15px"/>
    </div>


    <el-card class="box-card">

        <div style="display: flex;justify-content: center; margin-top: 20px;margin-bottom: 20px;">


            <el-form ref="increaseFormRef" :model="increaseForm" label-width="200px" style="width: 100%;"
                     v-if="orderType && orderType === 'Increase'" v-loading="loadingRef">


                <el-form-item label="Account" required prop="accountToId">

                    <el-select v-model="increaseForm.accountToId" placeholder="please select an account" style="width: 50%" filterable>

                        <!--<el-option label="Please select a source" :value="0"></el-option>-->
                        <el-option v-for="item in accountsRef"
                                   :key="item" :label="item.source.name +'-'+item.accountName +'-'+item.accountNumber + ' '+ item.currency" :value="item.id">

                            <span style="float: left">{{ item.source.name +'-'+item.accountName +'-'+item.accountNumber}}</span>
                            <span
                                    style="
          float: right;
          color: var(--el-text-color-secondary);
          font-size: 13px;
        "
                            >{{ item.currency }}</span>
                        </el-option>
                    </el-select>
                    {{accountsRef.filter( it => it.id === +increaseForm.accountToId)[0] ?
                    ('AB: '+ accountsRef.filter( it => it.id === +increaseForm.accountToId)[0].availableBalance+' '+ accountsRef.filter( it => it.id === +increaseForm.accountToId)[0].currency +' | UAB: '+accountsRef.filter( it => it.id === +increaseForm.accountToId)[0].unavailableBalance+' '+ accountsRef.filter( it => it.id === +increaseForm.accountToId)[0].currency ):''}}

                </el-form-item>


                <!--<el-form-item label="Country" required prop="country">-->
                <!--<el-select v-model="accountForm.country" placeholder="please select a country" style="width: 50%"-->
                <!--filterable>-->
                <!--<el-option v-for="item in countries"-->
                <!--:key="item" :label="item.name" :value="item.code">-->
                <!--</el-option>-->
                <!--</el-select>-->
                <!--</el-form-item>-->
                <el-form-item label="Type" required prop="type">
                    <el-select v-model="increaseForm.type" placeholder="please select a type"
                               style="width: 50%">
                        <el-option label="Interest" value="Interest"></el-option>
                        <el-option label="Received" value="Received"></el-option>
                    </el-select>
                </el-form-item>


                <el-form-item label="Tag" prop="tag">
                    <el-input v-model="increaseForm.tag" style="width: 50%"></el-input>
                </el-form-item>

                <el-form-item label="Change Balance Type" required prop="balanceTypeTo">
                    <el-select v-model="increaseForm.balanceTypeTo" placeholder="please select a type"
                               style="width: 50%">
                        <el-option label="Available Balance" value="Available"></el-option>
                        <el-option label="Unavailable Balance" value="Unavailable"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="Change amount" required prop="amountTo">
                    <el-input v-model="increaseForm.amountTo" placeholder="Please input amount" style="width: 50%">
                        <template #append>{{accountsRef.filter( it => it.id === +increaseForm.accountToId)[0] ? accountsRef.filter( it => it.id === +increaseForm.accountToId)[0].currency:''}}</template>
                        <!--<template #append>{{accountsRef ? accountsRef.value.filter( it => it.id === +increaseForm.accountToId)[0].currency :''}}</template>-->
                    </el-input>
                </el-form-item>
                <el-form-item label="Comment" prop="comment">
                    <el-input
                            v-model="increaseForm.comment"
                            :rows="2"
                            type="textarea"
                            style="width: 50%"
                            placeholder="Please input"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmitIncrease">Submit</el-button>
                </el-form-item>
            </el-form>
            <el-form ref="decreaseFormRef" :model="decreaseForm" label-width="200px" style="width: 100%;"
                     v-if="orderType && orderType === 'Decrease'" v-loading="loadingRef">

                <el-form-item label="Account" required prop="accountFromId">

                    <el-select v-model="decreaseForm.accountFromId" placeholder="please select an account" style="width: 50%" filterable>

                        <!--<el-option label="Please select a source" :value="0"></el-option>-->
                        <el-option v-for="item in accountsRef"
                                   :key="item" :label="item.source.name +'-'+item.accountName +'-'+item.accountNumber + ' '+ item.currency" :value="item.id">

                            <span style="float: left">{{ item.source.name +'-'+item.accountName +'-'+item.accountNumber}}</span>
                            <span
                                    style="
          float: right;
          color: var(--el-text-color-secondary);
          font-size: 13px;
        "
                            >{{ item.currency }}</span>
                        </el-option>
                    </el-select>
                    {{accountsRef.filter( it => it.id === +decreaseForm.accountFromId)[0] ?
                    ('AB: '+ accountsRef.filter( it => it.id === +decreaseForm.accountFromId)[0].availableBalance+' '+ accountsRef.filter( it => it.id === +decreaseForm.accountFromId)[0].currency +' | UAB: '+accountsRef.filter( it => it.id === +decreaseForm.accountFromId)[0].unavailableBalance+' '+ accountsRef.filter( it => it.id === +decreaseForm.accountFromId)[0].currency ):''}}

                </el-form-item>

                <el-form-item label="Type" required prop="type">
                    <el-select v-model="decreaseForm.type" placeholder="please select a type"
                               style="width: 50%">
                        <el-option label="Transaction Fee" value="TransactionFee"></el-option>
                        <el-option label="Settlement Fee" value="SettlementFee"></el-option>
                        <el-option label="Paid" value="Paid"></el-option>
                    </el-select>
                </el-form-item>


                <el-form-item label="Tag" prop="tag">
                    <el-input v-model="decreaseForm.tag" style="width: 50%"></el-input>
                </el-form-item>

                <el-form-item label="Change Balance Type" required prop="balanceTypeFrom">
                    <el-select v-model="decreaseForm.balanceTypeFrom" placeholder="please select a type"
                               style="width: 50%">
                        <el-option label="Available Balance" value="Available"></el-option>
                        <el-option label="Unavailable Balance" value="Unavailable"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="Change amount" required prop="amountFrom">
                    <el-input v-model="decreaseForm.amountFrom" placeholder="Please input amount" style="width: 50%">
                        <template #append>{{accountsRef.filter( it => it.id === +decreaseForm.accountFromId)[0] ? accountsRef.filter( it => it.id === +decreaseForm.accountFromId)[0].currency:''}}</template>
                        <!--<template #append>{{accountsRef ? accountsRef.value.filter( it => it.id === +increaseForm.accountToId)[0].currency :''}}</template>-->
                    </el-input>
                </el-form-item>
                <el-form-item label="Comment" prop="comment">
                    <el-input
                            v-model="decreaseForm.comment"
                            :rows="2"
                            type="textarea"
                            style="width: 50%"
                            placeholder="Please input"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmitDecrease">Submit</el-button>
                </el-form-item>
            </el-form>
            <el-form ref="transferFormRef" :model="transferForm" label-width="200px" style="width: 100%;"
                     v-if="orderType && orderType === 'Transfer'" v-loading="loadingRef">

                <el-form-item label="From Account" required prop="accountFromId">

                    <el-select v-model="transferForm.accountFromId" placeholder="please select an account" style="width: 50%" filterable>

                        <!--<el-option label="Please select a source" :value="0"></el-option>-->
                        <el-option v-for="item in accountsRef"
                                   :key="item" :label="item.source.name +'-'+item.accountName +'-'+item.accountNumber + ' '+ item.currency" :value="item.id">

                            <span style="float: left">{{ item.source.name +'-'+item.accountName +'-'+item.accountNumber}}</span>
                            <span
                                    style="
          float: right;
          color: var(--el-text-color-secondary);
          font-size: 13px;
        "
                            >{{ item.currency }}</span>
                        </el-option>
                    </el-select>
                    {{accountsRef.filter( it => it.id === +transferForm.accountFromId)[0] ?
                    ('AB: '+ accountsRef.filter( it => it.id === +transferForm.accountFromId)[0].availableBalance+' '+ accountsRef.filter( it => it.id === +transferForm.accountFromId)[0].currency +' | UAB: '+accountsRef.filter( it => it.id === +transferForm.accountFromId)[0].unavailableBalance+' '+ accountsRef.filter( it => it.id === +transferForm.accountFromId)[0].currency ):''}}

                </el-form-item>

                <el-form-item label="To Account" required prop="accountToId">

                    <el-select v-model="transferForm.accountToId" placeholder="please select an account" style="width: 50%" filterable>

                        <!--<el-option label="Please select a source" :value="0"></el-option>-->
                        <el-option v-for="item in accountsRef"
                                   :key="item" :label="item.source.name +'-'+item.accountName +'-'+item.accountNumber + ' '+ item.currency" :value="item.id">

                            <span style="float: left">{{ item.source.name +'-'+item.accountName +'-'+item.accountNumber}}</span>
                            <span
                                    style="
          float: right;
          color: var(--el-text-color-secondary);
          font-size: 13px;
        "
                            >{{ item.currency }}</span>
                        </el-option>
                    </el-select>
                    {{accountsRef.filter( it => it.id === +transferForm.accountToId)[0] ?
                    ('AB: '+ accountsRef.filter( it => it.id === +transferForm.accountToId)[0].availableBalance+' '+ accountsRef.filter( it => it.id === +transferForm.accountToId)[0].currency +' | UAB: '+accountsRef.filter( it => it.id === +transferForm.accountToId)[0].unavailableBalance+' '+ accountsRef.filter( it => it.id === +transferForm.accountToId)[0].currency ):''}}

                </el-form-item>

                <el-form-item label="Change Balance Type" required prop="balanceTypeFrom" v-if="transferForm.accountFromId === transferForm.accountToId">
                    <el-select v-model="transferForm.balanceTypeFrom" placeholder="please select a type"
                               style="width: 50%">
                        <el-option label="Available Balance" value="Available"></el-option>
                        <el-option label="Unavailable Balance" value="Unavailable"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="Type" required prop="type">
                    <el-select v-model="transferForm.type" placeholder="please select a type"
                               style="width: 50%">
                        <el-option label="Adjust" value="Adjust"></el-option>
                        <el-option label="Exchange" value="Exchange"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="Tag" prop="tag">
                    <el-input v-model="transferForm.tag" style="width: 50%"></el-input>
                </el-form-item>

                <el-form-item label="Change amount" required prop="amountFrom">
                    <el-input v-model="transferForm.amountFrom" placeholder="Please input amount" style="width: 50%">
                        <template #append>{{accountsRef.filter( it => it.id === +transferForm.accountFromId)[0] ? accountsRef.filter( it => it.id === +transferForm.accountFromId)[0].currency:''}}</template>
                        <!--<template #append>{{accountsRef ? accountsRef.value.filter( it => it.id === +increaseForm.accountToId)[0].currency :''}}</template>-->
                    </el-input>
                </el-form-item>

                <el-form-item label="Conversion Rate" prop="rate" v-if="transferForm.type === 'Exchange'">
                    <el-input v-model="transferForm.rate" style="width: 50%"></el-input>
                </el-form-item>
                <el-form-item label="Comment" prop="comment">
                    <el-input
                            v-model="transferForm.comment"
                            :rows="2"
                            type="textarea"
                            style="width: 50%"
                            placeholder="Please input"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmitTransfer">Submit</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-card>

</template>

<script lang="ts">
  import { defineComponent, onMounted, onUnmounted } from "vue";
  import { useStore } from "vuex";
  import { Actions } from "../../../store/enums/StoreEnums";
  import { getIllustrationsPath } from "../../../core/helpers/assets";
  import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";
  import { ref,unref } from "vue";
  import { reactive } from "vue";
  import { EnumsConstant } from "@/store/enums/constants";

  import router from "@/router";
  import { postManualOrderRequest } from "@/latipay/apis/services/ManualOrdersService";
  import { ElMessage } from "element-plus";
  import { getAccountsRequest } from "@/latipay/apis/services/AccountsService";
  import { reinitializeComponents } from "@/core/plugins/keenthemes";
  import {
    AddDecreaseManualOrder,
    AddIncreaseManualOrder, AddTransferManualOrder, ConversionRate,
    ManualOrdersResponse
  } from "@/latipay/apis/models/manualOrder/ManualOrdersResponse";

  export default defineComponent({
    name: "manualOrdersDetail",
    components: {},
    props: {
      id: String
    },
    setup(props) {
      const store = useStore();
      let orderType = "";
      const id = props.id ?? "";
      if (id === "increase") {
        orderType = "Increase";
      } else if (id === "decrease") {
        orderType = "Decrease";
      } else if (id === "transfer") {
        orderType = "Transfer";
      }

      const currencies = EnumsConstant.CurrencyCode;
      const increaseFormRef = ref();
      const decreaseFormRef = ref();
      const transferFormRef = ref();
      const loadingRef = ref(false);


      const increaseForm = reactive({
        accountToId: "",
        type: "",
        tag: "",
        balanceTypeTo: "",
        amountTo: "",
        comment: ""
      });
      const decreaseForm = reactive({
        accountFromId: "",
        type: "",
        tag: "",
        balanceTypeFrom: "",
        amountFrom: "",
        currencyFrom: "",
        comment: ""
      });
      const transferForm = reactive({
        accountFromId: "",
        accountToId: "",
        amountTo: "",
        currencyTo: "",
        amountFrom: "",
        currencyFrom: "",
        balanceTypeFrom: "",
        balanceTypeTo: "",
        tag: "",
        type: "",
        comment: "",
        rate:""
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

      onMounted(async () => {
        await getAccountsData();
      });

      const {
        accountsRef,
        totalRef,
        pageNumberRef,
        pageSizeRef,
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

       if ( accountsRef.value ){
         accountsRef.value = accountsRef.value.filter(it => it.enabled === true);
       }
        console.log(accountsRef);
      };

      const { postErrorRef, postManualOrderRef, postManualOrder } = postManualOrderRequest();

      const onSubmitIncrease = async () => {
        const form = unref(increaseFormRef);
        if (!form) {
          return
        }
        try {
          await form.validate();


            const newIncrease = new AddIncreaseManualOrder();

          newIncrease.accountToId = +increaseForm.accountToId;
          newIncrease.tag = increaseForm.tag;
          newIncrease.orderType = increaseForm.type;
          newIncrease.balanceTypeTo = increaseForm.balanceTypeTo;
          newIncrease.amountTo = +increaseForm.amountTo;
          if (accountsRef.value){
             if (accountsRef.value.filter( it => it.id === +increaseForm.accountToId)[0]){
               newIncrease.currencyTo = accountsRef.value.filter( it => it.id === +increaseForm.accountToId)[0].currency
             }
          }
          newIncrease.comment = increaseForm.comment;
          newIncrease.type = 'increase';

            await postManualOrderInfo( newIncrease as unknown as ManualOrdersResponse);


        } catch (err) {
          loadingRef.value = false;
          console.log(err)
        }



      };
      const onSubmitDecrease = async () => {

        const form = unref(decreaseFormRef);
        if (!form) {
          return
        }
        try {
          await form.validate();


          const newDecrease = new AddDecreaseManualOrder();

          newDecrease.accountFromId = +decreaseForm.accountFromId;
          newDecrease.tag = decreaseForm.tag;
          newDecrease.orderType = decreaseForm.type;
          newDecrease.balanceTypeFrom = 'Available';
          newDecrease.amountFrom = +decreaseForm.amountFrom;
          if (accountsRef.value){
            if (accountsRef.value.filter( it => it.id === +decreaseForm.accountFromId)[0]){
              newDecrease.currencyFrom= accountsRef.value.filter( it => it.id === +decreaseForm.accountFromId)[0].currency
            }
          }
          newDecrease.comment = increaseForm.comment;
          newDecrease.type = 'decrease';

          await postManualOrderInfo( newDecrease as unknown as ManualOrdersResponse);


        } catch (err) {
          loadingRef.value = false;
          console.log(err)
        }

      };
      const onSubmitTransfer = async () => {
        const form = unref(transferFormRef);
        if (!form) {
          return
        }
        try {
          await form.validate();


          const newTransfer = new AddTransferManualOrder();

          if (+transferForm.accountFromId === +transferForm.accountToId  && transferForm.type === 'Adjust' ) {

            if (transferForm.balanceTypeFrom === 'Available'){
              newTransfer.balanceTypeFrom = transferForm.balanceTypeFrom;
              newTransfer.balanceTypeTo = 'Unavailable';
            }else{
              newTransfer.balanceTypeFrom = 'Unavailable';
              newTransfer.balanceTypeTo = 'Available';
            }
            newTransfer.amountFrom = +transferForm.amountFrom;
            newTransfer.amountTo = +transferForm.amountFrom;
            if (accountsRef.value) {
              if (accountsRef.value.filter(it => it.id === +transferForm.accountFromId)[0]) {
                newTransfer.currencyFrom = accountsRef.value.filter(it => it.id === +transferForm.accountFromId)[0].currency
              }
            }
            newTransfer.currencyTo = newTransfer.currencyFrom;

          }else if (+transferForm.accountFromId !== +transferForm.accountToId  && transferForm.type !== 'Exchange') {
            if (accountsRef.value) {

                  if (accountsRef.value.filter(it => it.id === +transferForm.accountFromId)[0].currency === accountsRef.value.filter(it => it.id === +transferForm.accountToId)[0].currency){

                    console.log("111");

                    newTransfer.balanceTypeFrom = 'Available';
                    newTransfer.balanceTypeTo = 'Available';
                    newTransfer.amountFrom = +transferForm.amountFrom;
                    newTransfer.amountTo = +transferForm.amountFrom;
                    newTransfer.currencyFrom = accountsRef.value.filter(it => it.id === +transferForm.accountFromId)[0].currency;
                    newTransfer.currencyTo = newTransfer.currencyFrom;

                  }

            }
          }else if(+transferForm.accountFromId !== +transferForm.accountToId  && transferForm.type === 'Exchange'){
            if (accountsRef.value) {

              if (accountsRef.value.filter(it => it.id === +transferForm.accountFromId)[0].currency !== accountsRef.value.filter(it => it.id === +transferForm.accountToId)[0].currency){

                console.log("111");

                newTransfer.balanceTypeFrom = 'Available';
                newTransfer.balanceTypeTo = 'Available';
                newTransfer.amountFrom = +transferForm.amountFrom;
                newTransfer.currencyFrom = accountsRef.value.filter(it => it.id === +transferForm.accountFromId)[0].currency;
                newTransfer.currencyTo = accountsRef.value.filter(it => it.id === +transferForm.accountToId)[0].currency;

                const newRate = new ConversionRate();
                newRate.currency = accountsRef.value.filter(it => it.id === +transferForm.accountFromId)[0].currency+'/'+accountsRef.value.filter(it => it.id === +transferForm.accountToId)[0].currency;
                newRate.rate = +transferForm.rate;
                newTransfer.conversionRate = JSON.stringify(newRate);
              }

            }


          }
          newTransfer.orderType = transferForm.type;
          newTransfer.accountFromId = +transferForm.accountFromId;
          newTransfer.accountToId = +transferForm.accountToId;
          newTransfer.tag = transferForm.tag;
          newTransfer.remarks = transferForm.comment;
          newTransfer.type = 'transfer';

          await postManualOrderInfo( newTransfer as unknown as ManualOrdersResponse);


        } catch (err) {
          loadingRef.value = false;
          console.log(err)
        }
      };




      const postManualOrderInfo = async ( data: ManualOrdersResponse) => {
        loadingRef.value = true;
        await postManualOrder(data);

        if (!postErrorRef.value) {
          loadingRef.value = false;

          successAlert("Add manual order successfully!");
          router.go(-1);



        }else {
          loadingRef.value = false;
          failAlert("Something wrong happened! Please have a check.");
        }


      };


      return {
        getIllustrationsPath,
        increaseForm,
        decreaseForm,
        transferForm,
        onSubmitIncrease,
        onSubmitDecrease,
        onSubmitTransfer,
        orderType,
        currencies,
        increaseFormRef,
        loadingRef,
        decreaseFormRef,
        transferFormRef,
        accountsRef

      };
    }
  });
</script>
