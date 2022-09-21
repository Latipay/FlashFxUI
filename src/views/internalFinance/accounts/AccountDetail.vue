<template>
    <div v-if="isEdit === false">
        <el-page-header content="Add New Account" @back="$router.go(-1)" style="margin-top: -25px;margin-bottom: 15px"/>
    </div>
    <div v-if="isEdit === true">
        <el-page-header content="Edit Account" @back="$router.go(-1)" style="margin-top: -25px;margin-bottom: 15px"/>
    </div>

    <el-card class="box-card">

        <el-row>
            <el-col :span="24">
        <el-descriptions style="float: right" column="1">

            <el-descriptions-item label="Available Balance" >{{(isEdit && accountRef )? accountRef.availableBalance : 0.00}} {{ ' ' + accountForm.currency}}</el-descriptions-item>
            <el-descriptions-item label="Unavailable Balance" >{{(isEdit && accountRef ) ? accountRef.unavailableBalance : 0.00}}{{ ' ' + accountForm.currency}}</el-descriptions-item>
        </el-descriptions>
            </el-col>
        </el-row>
        <el-row >
            <el-col :span="24">
        <div style="display: flex;justify-content: center; margin-top: 20px;margin-bottom: 20px;">



            <el-form ref="formRef" :model="accountForm" label-width="200px" style="width: 100%;" v-loading="loadingRef"
                     :rules="rules">

                <el-form-item label="Account Type" required prop="type" >
                    <el-select v-model="accountForm.type" placeholder="please select a type"
                               style="width: 50%" :disabled="isEdit">
                        <el-option label="Bank" value="Bank"></el-option>
                        <el-option label="Channel Fiat" value="ChannelFiat"></el-option>
                        <el-option label="Channel DigitalWallet" value="ChannelCrypto"></el-option>
                    </el-select>
                </el-form-item>


                <el-form-item label="Country" required prop="country">
                    <el-select v-model="accountForm.country" placeholder="please select a country" style="width: 50%"
                               filterable>
                        <el-option v-for="item in countries"
                                   :key="item" :label="item.name" :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Currency" required prop="currency" >
                    <el-select v-model="accountForm.currency" placeholder="please select a currency" style="width: 50%" :disabled="isEdit">
                        <el-option v-for="item in currencies"
                                   :key="item" :label="item.name" :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Source" required prop="sourceId"
                              :rules="[{ required: true, message: 'source is required', trigger: 'blur' }]">
                    <el-select v-model="accountForm.sourceId" placeholder="please select a source" style="width: 50%" :disabled="isEdit">

                        <!--<el-option label="Please select a source" :value="0"></el-option>-->
                        <el-option v-for="item in accountSourcesRef"
                                   :key="item" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="accountForm.type === 'ChannelCrypto' ? 'Wallet address':'Account No.'" required
                              prop="accountNumber">
                    <el-input v-model="accountForm.accountNumber" style="width: 50%"></el-input>
                </el-form-item>
                <el-form-item label="Account Name" required prop="accountName">
                    <el-input v-model="accountForm.accountName" style="width: 50%"></el-input>
                </el-form-item>
                <el-form-item label="CNAPS Code" required prop="cnapsCode"
                              v-if="accountForm.country === 'CN' && accountForm.type === 'Bank'">
                    <el-input v-model="accountForm.cnapsCode" style="width: 50%"></el-input>
                </el-form-item>

                <el-form-item label="UKey Expiration Date" prop="ukeyExpiryDate"
                              v-if="accountForm.country === 'CN' && accountForm.type === 'Bank'">
                    <el-date-picker v-model="accountForm.ukeyExpiryDate" type="date" placeholder="Pick a day"
                                    style="width: 50%"/>
                </el-form-item>


                <el-form-item label="Swift Code" required prop="swiftCode"
                              v-if="accountForm.type === 'Bank'  &&  accountForm.country">
                    <el-input v-model="accountForm.swiftCode" style="width: 50%"></el-input>
                </el-form-item>


                <el-form-item label="ACH Code (9-digit)" prop="routingCode1"
                              v-if="accountForm.type === 'Bank' && accountForm.currency === 'USD'">
                    <el-input v-model="accountForm.routingCode1" style="width: 50%"></el-input>
                </el-form-item>

                <el-form-item label="BSB Number (6-digit)" prop="routingCode1"
                              v-if="accountForm.type === 'Bank' && accountForm.currency === 'AUD'">
                    <el-input v-model="accountForm.routingCode1" style="width: 50%"></el-input>
                </el-form-item>

                <el-form-item label="Sort Code (6-digit)" prop="routingCode1"
                              v-if="accountForm.type === 'Bank' && accountForm.currency === 'GBP'">
                    <el-input v-model="accountForm.routingCode1" style="width: 50%"></el-input>
                </el-form-item>

                <el-form-item label="IFSC Code (11-digit)" prop="routingCode1"
                              v-if="accountForm.type === 'Bank' && accountForm.currency === 'INR'">
                    <el-input v-model="accountForm.routingCode1" style="width: 50%"></el-input>
                </el-form-item>

                <el-form-item label="Bank Code (4-digit)" prop="routingCode1"
                              v-if="accountForm.type === 'Bank' && accountForm.currency === 'JPY'">
                    <el-input v-model="accountForm.routingCode1" style="width: 50%"></el-input>
                </el-form-item>

                <el-form-item label="Transit Code (5-digit)" prop="routingCode1"
                              v-if="accountForm.type === 'Bank' && accountForm.currency === 'CAD'">
                    <el-input v-model="accountForm.routingCode1" style="width: 50%"></el-input>
                </el-form-item>

                <el-form-item label="Institution Code (3-digit)" prop="routingCode2"
                              v-if="accountForm.type === 'Bank' && accountForm.currency === 'CAD'">
                    <el-input v-model="accountForm.routingCode2" style="width: 50%"></el-input>
                </el-form-item>

                <el-form-item label="Branch" required prop="branch" v-if="accountForm.type === 'Bank'">
                    <el-input v-model="accountForm.branch" style="width: 50%"></el-input>
                </el-form-item>
                <el-form-item label="Branch Address" required prop="branchAddress" v-if="accountForm.type === 'Bank'">
                    <el-input v-model="accountForm.branchAddress" style="width: 50%"></el-input>
                </el-form-item>

                <el-form-item label="Network" required prop="cryptoNetwork" v-if="accountForm.type === 'ChannelCrypto'">
                    <el-input v-model="accountForm.cryptoNetwork" style="width: 50%"></el-input>
                </el-form-item>


                <el-form-item label="Status" required prop="status">
                    <el-switch
                            v-model="accountForm.status"
                            class="mb-2"
                            active-text=""
                            inactive-text=""
                    >
                    </el-switch>
                </el-form-item>


                <el-form-item label="Description" required prop="description">
                    <el-input
                            v-model="accountForm.description"
                            :rows="2"
                            type="textarea"
                            style="width: 50%"
                            placeholder="Please input description"
                    />
                </el-form-item>
                <el-form-item label="Comment"  prop="remarks">
                    <el-input
                            v-model="accountForm.remarks"
                            :rows="2"
                            type="textarea"
                            style="width: 50%"
                            placeholder="Please input"
                    />
                </el-form-item>
                <!--<el-form-item label="Comment" prop="Comment" >-->

                <!--<el-input-->
                <!--v-model="accountForm.comment"-->
                <!--:rows="2"-->
                <!--style="width: 50%"-->
                <!--type="textarea"-->
                <!--placeholder="Please input"-->
                <!--/>-->
                <!--</el-form-item>-->


                <el-form-item>
                    <el-button type="primary" @click="onSubmit">Submit</el-button>
                </el-form-item>
            </el-form>
        </div>
            </el-col>
        </el-row>


    </el-card>

</template>

<script lang="ts">
  import { defineComponent, onMounted, onUnmounted } from "vue";
  import { useStore } from "vuex";
  import { Actions } from "../../../store/enums/StoreEnums";
  import { getIllustrationsPath } from "../../../core/helpers/assets";
  import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";
  import { ref, unref } from "vue";
  import { reactive } from "vue";
  import { EnumsConstant } from "@/store/enums/constants";
  import { getAccountSourcesRequest } from "@/latipay/apis/services/AccountSourcesService";
  import { reinitializeComponents } from "@/core/plugins/keenthemes";
  import { getAccountRequest, postAccountRequest, putAccoutRequest } from "@/latipay/apis/services/AccountsService";
  import { ElMessage } from "element-plus";
  import { AccountsResponse, AddAccount } from "@/latipay/apis/models/account/AccountsResponse";
  import router from "@/router";
  import { DateTimeUtils } from "@/latipay/utils/DateTimeUtils";
  import { AccountSourcesResponse } from "@/latipay/apis/models/accountSource/AccountSourcesResponse";

  export class RoutingCode {
    codeName = "";
    code = "";

  }

  export default defineComponent({
    name: "accountDetail",
    components: {},
    props: {
      id: Number
    },
    setup(props) {
      const store = useStore();

      const isEdit = ref(true);
      const id = props.id ?? 0;
      if (id === 0) {
        isEdit.value = false;
      }

      const countries = EnumsConstant.CountryCode;
      const currencies = EnumsConstant.CurrencyCode;
      const sort = ref<string | null>(null);
      const pageNumber = ref(1);
      const pageSize = ref(1000);
      const loadingRef = ref(false);
      const routingCode1 = ref<string | null>(null);
      const routingCode2 = ref<string | null>(null);
      const formRef = ref();
      const accountForm = reactive({
        id: "",
        country: "",
        type: "",
        currency: "",
        sourceId: 1,
        accountNumber: "",
        accountName: "",
        remarks: "",
        status: true,
        routingCode1: "",
        routingCode2: "",
        cryptoNetwork: "",
        branch: "",
        branchAddress: "",
        swiftCode: "",
        cnapsCode: "",
        description: "",
        ukeyExpiryDate: ""


      });

      // const rules1 = reactive({
      //   accountNumber: [
      //     { required: true, message: 'Please input the account number', trigger: 'blur' }
      //   ]
      // });

      const rules = reactive({
        sourceId: [
          { required: true, message: "source is required", trigger: "blur" }
        ]
      });


      const successAlert = (message => {
        ElMessage({
          showClose: true,
          message: message,
          type: "success"
        });
      });

      const failAlert = (message => {

        ElMessage.error(message);
      });


      const {
        accountSourcesRef,
        getAccountSources
      } = getAccountSourcesRequest();


      const getAccountSourcesData = async () => {
        loadingRef.value = true;

        // await updateQueries();
        await getAccountSources(
          null,
          null,
          null,
          null,

          sort.value,
          pageNumber.value,
          pageSize.value
        );
        reinitializeComponents();

        loadingRef.value = false;
        // let accountSourcesArray =   accountSourcesRef.value as unknown as AccountSourcesResponse[];
        // for(let i in accountSourcesArray){
        //     i.id =
        // }
        console.log(accountSourcesRef);
      };

      const { errorRef, accountRef, getAccountRef } = getAccountRequest();
      const { postErrorRef, postAccountRef, postAccount } = postAccountRequest();
      const { putErrorRef, putAccountRef, putAccount } = putAccoutRequest();


      onMounted(async () => {


        setCurrentPageTitle("Account Source");

        await getAccountSourcesData();

        if (isEdit.value) {
          await fetchAccount(id);
          if (accountRef) {
            if (accountRef.value) {

              console.log(accountRef.value);
              accountForm.accountName = accountRef.value.accountName;
              accountForm.accountNumber = accountRef.value.accountNumber;
              accountForm.currency = accountRef.value.currency;
              accountForm.remarks = accountRef.value.remarks;
              accountForm.type = accountRef.value.source.type;
              accountForm.status = accountRef.value.enabled;
              accountForm.country = accountRef.value.source.country;
              accountForm.sourceId = accountRef.value.sourceId;
              accountForm.description = accountRef.value.description;
              if (accountRef.value.source.type === "ChannelCrypto") {

                accountForm.cryptoNetwork = accountRef.value.cryptoNetwork;
                accountForm.type = "ChannelCrypto";

              } else if (accountRef.value.source.type === "ChannelFiat") {

                accountForm.type = "ChannelFiat";

              } else {

                accountForm.branch = accountRef.value.branch;
                accountForm.branchAddress = accountRef.value.branchAddress;
                accountForm.swiftCode = accountRef.value.swiftCode;
                accountForm.type = "Bank";

                if (accountRef.value.source.country.toString() === "CN") {

                  accountForm.cnapsCode = accountRef.value.cnapsCode;
                  accountForm.ukeyExpiryDate = accountRef.value.ukeyExpiryDate;


                } else {

                  if (accountRef.value.currency.toString() === "CAD") {

                    let jsonArray = JSON.parse(accountRef.value.routingCodes) as RoutingCode[];
                    if (jsonArray.length > 0) {
                      if (jsonArray.filter(it => it.codeName === "Transit Code")) {
                        accountForm.routingCode1 = jsonArray.filter(it => it.codeName === "Transit Code")[0].code;
                      }
                      if (jsonArray.filter(it => it.codeName === "Institution Code")) {
                        accountForm.routingCode2 = jsonArray.filter(it => it.codeName === "Institution Code")[0].code;
                      }

                    }

                  } else if (accountRef.value.currency.toString() === "USD") {

                    let jsonArray = JSON.parse(accountRef.value.routingCodes) as RoutingCode[];
                    if (jsonArray.length > 0) {
                      if (jsonArray.filter(it => it.codeName === "ACH Code")) {
                        accountForm.routingCode1 = jsonArray.filter(it => it.codeName === "ACH Code")[0].code;
                      }
                    }

                  } else if (accountRef.value.currency.toString() === "GBP") {

                    let jsonArray = JSON.parse(accountRef.value.routingCodes) as RoutingCode[];
                    if (jsonArray.length > 0) {
                      if (jsonArray.filter(it => it.codeName === "Sort Code")) {
                        accountForm.routingCode1 = jsonArray.filter(it => it.codeName === "Sort Code")[0].code;
                      }
                    }

                  } else if (accountRef.value.currency.toString() === "AUD") {


                    let jsonArray = JSON.parse(accountRef.value.routingCodes) as RoutingCode[];
                    if (jsonArray.length > 0) {
                      if (jsonArray.filter(it => it.codeName === "BSB Number")) {
                        accountForm.routingCode1 = jsonArray.filter(it => it.codeName === "BSB Number")[0].code;
                      }
                    }

                  } else if (accountRef.value.currency.toString() === "INR") {


                    let jsonArray = JSON.parse(accountRef.value.routingCodes) as RoutingCode[];
                    if (jsonArray.length > 0) {
                      if (jsonArray.filter(it => it.codeName === "IFSC Code")) {
                        accountForm.routingCode1 = jsonArray.filter(it => it.codeName === "IFSC Code")[0].code;
                      }
                    }

                  } else if (accountRef.value.currency.toString() === "JPY") {

                    let jsonArray = JSON.parse(accountRef.value.routingCodes) as RoutingCode[];
                    if (jsonArray.length > 0) {
                      if (jsonArray.filter(it => it.codeName === "Bank Code")) {
                        accountForm.routingCode1 = jsonArray.filter(it => it.codeName === "Bank Code")[0].code;
                      }
                    }

                  }

                }


              }

            }
          }
        }
      });

      const fetchAccount = async (id: number) => {
        loadingRef.value = true;
        await getAccountRef(id);
        loadingRef.value = false;
      };

      const onSubmit = async () => {
        const form = unref(formRef);
        if (!form) {
          return;
        }

        try {
          await form.validate();
          if (!isEdit.value) {

            const newAccount = new AddAccount();

            newAccount.accountName = accountForm.accountName;
            newAccount.accountNumber = accountForm.accountNumber;
            newAccount.availableBalance = 0;
            newAccount.unavailableBalance = 0;
            newAccount.enabled = accountForm.status;
            newAccount.currency = accountForm.currency;
            newAccount.remarks = accountForm.remarks;
            newAccount.sourceId = +accountForm.sourceId;
            newAccount.description = accountForm.description;

            if (accountForm.type === "ChannelCrypto") {

              newAccount.cryptoNetwork = accountForm.cryptoNetwork;
              newAccount.type = "ChannelCrypto";


            } else if (accountForm.type === "ChannelFiat") {

              newAccount.type = "ChannelFiat";

            } else {

              newAccount.branch = accountForm.branch;
              newAccount.branchAddress = accountForm.branchAddress;
              newAccount.type = "Bank";
              newAccount.swiftCode = accountForm.swiftCode;

              if (accountForm.country === "CN") {

                newAccount.cnapsCode = accountForm.cnapsCode;
                newAccount.ukeyExpiryDate = (new Date(accountForm.ukeyExpiryDate)).toISOString();

              } else {

                let code1 = new RoutingCode();
                let code2 = new RoutingCode();
                let codeArray: RoutingCode[] = [];

                if (accountForm.currency === "CAD") {


                  code1.codeName = "Transit Code";
                  code1.code = accountForm.routingCode1;

                  code2.codeName = "Institution Code";
                  code2.code = accountForm.routingCode2;


                  codeArray.push(code1);
                  codeArray.push(code2);

                  newAccount.routingCodes = JSON.stringify(codeArray);


                } else if (accountForm.currency === "USD") {

                  code1.codeName = "ACH Code";
                  code1.code = accountForm.routingCode1;
                  codeArray.push(code1);
                  newAccount.routingCodes = JSON.stringify(codeArray);

                } else if (accountForm.currency === "GBP") {
                  code1.codeName = "Sort Code";
                  code1.code = accountForm.routingCode1;
                  codeArray.push(code1);
                  newAccount.routingCodes = JSON.stringify(codeArray);

                } else if (accountForm.currency === "AUD") {
                  code1.codeName = "BSB Number";
                  code1.code = accountForm.routingCode1;
                  codeArray.push(code1);
                  newAccount.routingCodes = JSON.stringify(codeArray);

                } else if (accountForm.currency === "INR") {
                  code1.codeName = "IFSC Code";
                  code1.code = accountForm.routingCode1;
                  codeArray.push(code1);
                  newAccount.routingCodes = JSON.stringify(codeArray);

                } else if (accountForm.currency === "JPY") {
                  code1.codeName = "Bank Code";
                  code1.code = accountForm.routingCode1;
                  codeArray.push(code1);
                  newAccount.routingCodes = JSON.stringify(codeArray);

                }

              }


            }


            console.log(newAccount);
            await postAccountInfo(newAccount as unknown as AccountsResponse);

          } else {

            if(accountRef.value) {


              accountRef.value.accountName = accountForm.accountName;
              accountRef.value.accountNumber = accountForm.accountNumber;
              accountRef.value.enabled = accountForm.status;
              accountRef.value.currency = accountForm.currency;
              accountRef.value.remarks = accountForm.remarks;
              accountRef.value.sourceId = +accountForm.sourceId;
              accountRef.value.description = accountForm.description;
              if (accountForm.type === "ChannelCrypto") {

                accountRef.value.cryptoNetwork = accountForm.cryptoNetwork;
                accountRef.value.source.type = "ChannelCrypto";


              } else if (accountForm.type === "ChannelFiat") {

                accountRef.value.source.type = "ChannelFiat";

              } else {

                accountRef.value.branch = accountForm.branch;
                accountRef.value.branchAddress = accountForm.branchAddress;
                accountRef.value.source.type = "Bank";
                accountRef.value.swiftCode = accountForm.swiftCode;

                if (accountForm.country === "CN") {

                  accountRef.value.cnapsCode = accountForm.cnapsCode;
                  accountRef.value.ukeyExpiryDate = (new Date(accountForm.ukeyExpiryDate)).toISOString();

                } else {

                  let code1 = new RoutingCode();
                  let code2 = new RoutingCode();
                  let codeArray: RoutingCode[] = [];

                  if (accountForm.currency === "CAD") {


                    code1.codeName = "Transit Code";
                    code1.code = accountForm.routingCode1;

                    code2.codeName = "Institution Code";
                    code2.code = accountForm.routingCode2;


                    codeArray.push(code1);
                    codeArray.push(code2);

                    accountRef.value.routingCodes = JSON.stringify(codeArray);


                  } else if (accountForm.currency === "USD") {

                    code1.codeName = "ACH Code";
                    code1.code = accountForm.routingCode1;
                    codeArray.push(code1);
                    accountRef.value.routingCodes = JSON.stringify(codeArray);

                  } else if (accountForm.currency === "GBP") {
                    code1.codeName = "Sort Code";
                    code1.code = accountForm.routingCode1;
                    codeArray.push(code1);
                    accountRef.value.routingCodes = JSON.stringify(codeArray);

                  } else if (accountForm.currency === "AUD") {
                    code1.codeName = "BSB Number";
                    code1.code = accountForm.routingCode1;
                    codeArray.push(code1);
                    accountRef.value.routingCodes = JSON.stringify(codeArray);

                  } else if (accountForm.currency === "INR") {
                    code1.codeName = "IFSC Code";
                    code1.code = accountForm.routingCode1;
                    codeArray.push(code1);
                    accountRef.value.routingCodes = JSON.stringify(codeArray);

                  } else if (accountForm.currency === "JPY") {
                    code1.codeName = "Bank Code";
                    code1.code = accountForm.routingCode1;
                    codeArray.push(code1);
                    accountRef.value.routingCodes = JSON.stringify(codeArray);

                  }

                }


              }


              console.log(accountRef.value);

              await putAccountInfo(id, accountRef.value as unknown as AccountsResponse);
            }

          }
        } catch (err) {
          loadingRef.value = false;
          console.log(err);
        }
      };

      const postAccountInfo = async (data: AccountsResponse) => {
        loadingRef.value = true;
        await postAccount(data);

        if (!postErrorRef.value) {
          loadingRef.value = false;

          successAlert("Add account successfully!");
          router.go(-1);


        } else {
          loadingRef.value = false;
          failAlert("Something wrong happened! Please have a check.");
        }


      };

      const putAccountInfo = async (id: number, data: AccountsResponse) => {
        loadingRef.value = true;
        await putAccount(id, data);

        if (!putErrorRef.value) {
          loadingRef.value = false;

          successAlert("Update account successfully!");
          router.go(-1);

        } else {
          loadingRef.value = false;
          failAlert("Something wrong happened! Please have a check.");
        }
      };


      return {
        getIllustrationsPath,
        accountForm,
        onSubmit,
        countries,
        currencies,
        accountSourcesRef,
        accountRef,
        rules,
        formRef,
        isEdit,
        routingCode1,
        routingCode2,
        DateTimeUtils,
        loadingRef
      };
    }
  });
</script>
