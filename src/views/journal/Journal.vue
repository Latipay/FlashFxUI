<template>
  <el-alert style="margin-top: -35px" title="Coming soon!" type="warning" show-icon :closable="false"/>


  <el-card class="box-card" style="margin-top: 10px">

    <div style="display: flex;justify-content: center; margin-top: 20px;margin-bottom: 20px;">


      <el-form ref="increaseFormRef" :model="increaseForm" label-width="200px" style="width: 100%;"
      >
        <h3 style="margin-left: 20px;float: left">New deposit order</h3>
        <br/>

        <h5 style="margin-left: 30px;margin-bottom: 20px;margin-top: 50px">Provide deposit route</h5>
        <el-form-item label="Country" required prop="country">
          <el-select v-model="increaseForm.country" placeholder="New Zealand" style="width: 50%"
                     disabled
                     filterable>
            <el-option label="New Zealand" value=""></el-option>
            <el-option v-for="item in countries"
                       :key="item" :label="item.name" :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="Currency" required prop="currency">
          <el-select v-model="increaseForm.currency" placeholder="NZD" style="width: 50%"
                     disabled>
            <el-option label="NZD" value=""></el-option>
            <el-option v-for="item in currencies"
                       :key="item" :label="item.name" :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Type" required prop="type">
          <el-select v-model="increaseForm.type" placeholder="please select a type"
                     disabled
                     style="width: 50%">

            <el-option label="Bank" value=""></el-option>
            <el-option label="E-Wallet" value="ChannelFiat"></el-option>
          </el-select>
        </el-form-item>

<!--        <el-form-item label="Amount" required prop="amount">-->
<!--          <el-input v-model="10000" placeholder="10000" style="width: 50%" disabled></el-input>-->
<!--        </el-form-item>-->

        <h5 style="margin-left: 30px;margin-bottom: 20px;margin-top: 50px">Select a Remitter account</h5>
        <el-form-item label="Remitter Account" required prop="accountToId">

          <el-select v-model="increaseForm.accountToId" placeholder="please select an account" style="width: 50%"
                     disabled
                     filterable>

            <!--<el-option label="Please select a source" :value="0"></el-option>-->
            <el-option label="BA0001 MR H Chen AUD 12023200003131" value=""></el-option>
            <el-option v-for="item in accountsRef"
                       :key="item"
                       :label="item.source.name +'-'+item.accountName +'-'+item.accountNumber + ' '+ item.currency"
                       :value="item.id">

                              <span
                                  style="float: left">{{
                                  item.source.name + '-' + item.accountName + '-' + item.accountNumber
                                }}</span>
              <span
                  style="
                          float: right;
                          color: var(--el-text-color-secondary);
                          font-size: 13px;
                        "
              >{{ item.currency }}</span>
            </el-option>
          </el-select>
          <br/>

          <a style="color:#0077b5;margin-left: 0px;margin-bottom: 0px"><strong>Click to create a new remitter account! </strong></a>
        </el-form-item>
        <h5 style="margin-left: 30px;margin-bottom: 20px;margin-top: 50px">Select a CFG Funding account</h5>
        <el-form-item label="CFG Funding Account" required prop="accountToId">

          <el-select v-model="increaseForm.accountToId" placeholder="please select an account" style="width: 50%" disabled
                     filterable>

            <!--<el-option label="Please select a source" :value="0"></el-option>-->
            <el-option label="BA0001 MR H Chen AUD 12023200003131" value=""></el-option>
            <el-option v-for="item in accountsRef"
                       :key="item"
                       :label="item.source.name +'-'+item.accountName +'-'+item.accountNumber + ' '+ item.currency"
                       :value="item.id">

                              <span
                                  style="float: left">{{
                                  item.source.name + '-' + item.accountName + '-' + item.accountNumber
                                }}</span>
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

        <h5 style="margin-left: 30px;margin-bottom: 20px;margin-top: 50px">Provide extra transaction detail</h5>
        <el-form-item label="Remitter Purpose" prop="tag">
          <el-input v-model="increaseForm.tag" style="width: 50%" placeholder="Remitter Purpose" disabled></el-input>
        </el-form-item>
        <el-form-item label="Remitter Source of Fund" prop="comment">
          <el-input
              v-model="increaseForm.comment"
              :rows="2"
              disabled
              type="textarea"
              style="width: 50%"
              placeholder="Remitter Source of Fund"
          />
        </el-form-item>
        <el-form-item label="Statement of Narrative" prop="comment" disabled>
          <el-input
              v-model="increaseForm.comment"
              disabled
              :rows="2"
              type="textarea"
              style="width: 50%"
              placeholder="Statement of Narrative"
          />
        </el-form-item>

        <el-form-item label="Attachment" prop="comment">
          <el-upload
              class="upload-demo"
              drag
              style="width:100%;"
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
          >
            <el-icon class="el-icon--upload">
              <upload-filled/>
            </el-icon>
            <div class="el-upload__text">
              Drop file here or <em>click to upload</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">
              </div>
            </template>
          </el-upload>
        </el-form-item>

        <!--        <h3 style="margin-left: 30px;margin-bottom: 20px;margin-top: 50px">Select a pay-out route</h3>-->
        <!--        <el-form-item label="Route" required prop="accountToId">-->

        <!--          <el-select v-model="increaseForm.accountToId" placeholder="please select an account" style="width: 50%"-->
        <!--                     filterable>-->

        <!--            &lt;!&ndash;<el-option label="Please select a source" :value="0"></el-option>&ndash;&gt;-->
        <!--            <el-option label="Swift-BNZ" value=""></el-option>-->
        <!--            <el-option v-for="item in accountsRef"-->
        <!--                       :key="item"-->
        <!--                       :label="item.source.name +'-'+item.accountName +'-'+item.accountNumber + ' '+ item.currency"-->
        <!--                       :value="item.id">-->

        <!--                      <span-->
        <!--                          style="float: left">{{-->
        <!--                          item.source.name + '-' + item.accountName + '-' + item.accountNumber-->
        <!--                        }}</span>-->
        <!--              <span-->
        <!--                  style="-->
        <!--                  float: right;-->
        <!--                  color: var(&#45;&#45;el-text-color-secondary);-->
        <!--                  font-size: 13px;-->
        <!--                "-->
        <!--              >{{ item.currency }}</span>-->
        <!--            </el-option>-->
        <!--          </el-select>-->

        <!--        <h5 style="margin-left: 30px;margin-bottom: 20px;margin-top: 50px">1.Select an allocation</h5>-->
        <!--        <el-form-item label="Allocation" required prop="allocation">-->
        <!--          <el-select v-model="increaseForm.allocation" placeholder="please select an allocation" style="width: 50%"-->
        <!--                     filterable>-->
        <!--            <el-option-->
        <!--                        label="CFG NZ" value="item.code">-->
        <!--            </el-option>-->
        <!--          </el-select>-->
        <!--        </el-form-item>-->

        <!--        <h5 style="margin-left: 30px;margin-bottom: 20px;margin-top: 50px">2.Select a Type-A customer</h5>-->
        <!--        <el-form-item label="Customer" required prop="accountToId">-->

        <!--          <el-select v-model="increaseForm.accountToId" placeholder="please select a customer" style="width: 50%"-->
        <!--                     filterable>-->

        <!--            &lt;!&ndash;<el-option label="Please select a source" :value="0"></el-option>&ndash;&gt;-->
        <!--            <el-option label="CA0001 MR Haoli Chen" value=""></el-option>-->
        <!--            <el-option v-for="item in accountsRef"-->
        <!--                       :key="item"-->
        <!--                       :label="item.source.name +'-'+item.accountName +'-'+item.accountNumber + ' '+ item.currency"-->
        <!--                       :value="item.id">-->

        <!--                              <span-->
        <!--                                  style="float: left">{{-->
        <!--                                  item.source.name + '-' + item.accountName + '-' + item.accountNumber-->
        <!--                                }}</span>-->
        <!--              <span-->
        <!--                  style="-->
        <!--                          float: right;-->
        <!--                          color: var(&#45;&#45;el-text-color-secondary);-->
        <!--                          font-size: 13px;-->
        <!--                        "-->
        <!--              >{{ item.currency }}</span>-->
        <!--            </el-option>-->
        <!--          </el-select>-->
        <!--          <br/>-->

        <!--          <el-descriptions :column="2" style="width: 500px;margin-top: 10px">-->
        <!--            <el-descriptions-item label="Customer Status:">-->
        <!--              <span class="badge badge-light-success">Active</span>-->
        <!--            </el-descriptions-item>-->
        <!--            <el-descriptions-item label="Screening Status:">-->
        <!--              <span class="badge badge-light-success">Pass</span>-->
        <!--            </el-descriptions-item>-->
        <!--            <el-descriptions-item label="Primary ID:">-->
        <!--              <span class="badge badge-light-success">Valid</span>-->
        <!--            </el-descriptions-item>-->
        <!--            <el-descriptions-item label="Ongoing Check:">-->
        <!--              <span class="badge badge-light-success">No Need</span>-->
        <!--            </el-descriptions-item>-->


        <!--          </el-descriptions>-->


        <!--        </el-form-item>-->
        <!--        <h5 style="margin-left: 30px;margin-bottom: 20px;margin-top: 50px">3.Select a signatory </h5>-->
        <!--        <el-form-item label="Signatory" required prop="accountToId">-->

        <!--          <el-select v-model="increaseForm.accountToId" placeholder="please select an account" style="width: 50%"-->
        <!--                     filterable>-->

        <!--            <el-option label="SI0001 MR Haoli Chen" value=""></el-option>-->
        <!--            <el-option v-for="item in accountsRef"-->
        <!--                       :key="item"-->
        <!--                       :label="item.source.name +'-'+item.accountName +'-'+item.accountNumber + ' '+ item.currency"-->
        <!--                       :value="item.id">-->

        <!--                              <span-->
        <!--                                  style="float: left">{{-->
        <!--                                  item.source.name + '-' + item.accountName + '-' + item.accountNumber-->
        <!--                                }}</span>-->
        <!--              <span-->
        <!--                  style="-->
        <!--                          float: right;-->
        <!--                          color: var(&#45;&#45;el-text-color-secondary);-->
        <!--                          font-size: 13px;-->
        <!--                        "-->
        <!--              >{{ item.currency }}</span>-->
        <!--            </el-option>-->
        <!--          </el-select>-->
        <!--          <br/>-->

        <!--          <el-descriptions :column="2" style="width: 500px;margin-top: 10px">-->
        <!--            <el-descriptions-item label="Signatory Status:">-->
        <!--              <span class="badge badge-light-danger">Inactive</span>-->
        <!--            </el-descriptions-item>-->
        <!--            <el-descriptions-item label="Screening Status:">-->
        <!--              <span class="badge badge-light-danger">Hit</span>-->
        <!--            </el-descriptions-item>-->
        <!--            <el-descriptions-item label="Primary ID:">-->
        <!--              <span class="badge badge-light-danger">Document Expired</span>-->
        <!--            </el-descriptions-item>-->
        <!--            <el-descriptions-item label="Ongoing Check:">-->
        <!--              <span class="badge badge-light-warning">Check Required</span>-->
        <!--            </el-descriptions-item>-->


        <!--          </el-descriptions>-->

        <!--        </el-form-item>-->

        <!--        &lt;!&ndash;<el-form-item label="Country" required prop="country">&ndash;&gt;-->
        <!--        &lt;!&ndash;<el-select v-model="accountForm.country" placeholder="please select a country" style="width: 50%"&ndash;&gt;-->
        <!--        &lt;!&ndash;filterable>&ndash;&gt;-->
        <!--        &lt;!&ndash;<el-option v-for="item in countries"&ndash;&gt;-->
        <!--        &lt;!&ndash;:key="item" :label="item.name" :value="item.code">&ndash;&gt;-->
        <!--        &lt;!&ndash;</el-option>&ndash;&gt;-->
        <!--        &lt;!&ndash;</el-select>&ndash;&gt;-->
        <!--        &lt;!&ndash;</el-form-item>&ndash;&gt;-->
        <!--        <el-form-item label="Type" required prop="type">-->
        <!--          <el-select v-model="increaseForm.type" placeholder="please select a type"-->
        <!--                     style="width: 50%">-->
        <!--            <el-option label="Interest" value="Interest"></el-option>-->
        <!--            <el-option label="Received" value="Received"></el-option>-->
        <!--          </el-select>-->
        <!--        </el-form-item>-->


        <!--        <el-form-item label="Tag" prop="tag">-->
        <!--          <el-input v-model="increaseForm.tag" style="width: 50%"></el-input>-->
        <!--        </el-form-item>-->

        <!--        <el-form-item label="Change Balance Type" required prop="balanceTypeTo">-->
        <!--          <el-select v-model="increaseForm.balanceTypeTo" placeholder="please select a type"-->
        <!--                     style="width: 50%">-->
        <!--            <el-option label="Available Balance" value="Available"></el-option>-->
        <!--            <el-option label="Unavailable Balance" value="Unavailable"></el-option>-->
        <!--          </el-select>-->
        <!--        </el-form-item>-->

        <!--        <el-form-item label="Change amount" required prop="amountTo">-->
        <!--          <el-input v-model="increaseForm.amountTo" placeholder="Please input amount" style="width: 50%">-->
        <!--            <template #append>-->
        <!--              {{-->
        <!--                accountsRef.filter(it => it.id === +increaseForm.accountToId)[0] ? accountsRef.filter(it => it.id === +increaseForm.accountToId)[0].currency : ''-->
        <!--              }}-->
        <!--            </template>-->
        <!--            &lt;!&ndash;<template #append>{{accountsRef ? accountsRef.value.filter( it => it.id === +increaseForm.accountToId)[0].currency :''}}</template>&ndash;&gt;-->
        <!--          </el-input>-->
        <!--        </el-form-item>-->
                <el-form-item label="Comment" prop="comment" >
                  <el-input
                      v-model="increaseForm.comment"
                      :rows="2"
                      type="textarea"
                      style="width: 50%"
                      placeholder="Please input comment"
                  />
                </el-form-item>
<!--        <a style="color:#0077b5;margin-left: 150px;margin-bottom: 20px"><strong> This customer doesn't have USD remitter account. Click to create a new remitter account! </strong></a>-->
        <el-form-item>
          <el-button type="primary" style="margin-top: 20px">Save</el-button>
          <el-button type="danger" style="margin-top: 20px">Reject</el-button>
          <el-button type="success" style="margin-top: 20px" >Approve</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>


</template>

<script lang="ts">
import {defineComponent, onMounted, onUnmounted, reactive, ref} from "vue";
import {useStore} from "vuex";
import {Actions} from "../../store/enums/StoreEnums";
import {getIllustrationsPath} from "../../core/helpers/assets";
import {setCurrentPageTitle} from "@/core/helpers/breadcrumb";
import {EnumsConstant} from "@/store/enums/constants";
import {getAccountsRequest} from "@/latipay/apis/services/AccountsService";
import {reinitializeComponents} from "@/core/plugins/keenthemes";

export default defineComponent({
  name: "journal",
  components: {},
  setup() {
    const store = useStore();

    const currencies = EnumsConstant.CurrencyCode;
    const increaseFormRef = ref();
    const countries = EnumsConstant.CountryCode;
    const loadingRef = ref(false);


    const increaseForm = reactive({
      accountToId: "",
      type: "",
      tag: "",
      balanceTypeTo: "",
      amountTo: "",
      comment: "",
      allocation: ""
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

      if (accountsRef.value) {
        accountsRef.value = accountsRef.value.filter(it => it.enabled === true);
      }
      console.log(accountsRef);
    };

    onMounted(async () => {
      setCurrentPageTitle("Journal");
      await getAccountsData();
    });

    return {
      currencies,
      increaseForm,
      accountsRef,
      countries

    };

  },
});
</script>
