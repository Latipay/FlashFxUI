<template>
    <div class="card" style="margin-bottom: 15px;margin-top: -25px">
        <div class="card-header">
            <h3 class="card-title">Transactions</h3>
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
                <el-row :gutter="0">

                    <el-col :span="8">
                        <div class="grid-content "/>
                        <el-form-item label="Transaction ID" prop="id">
                            <el-input v-model="formInline.id" placeholder="Transaction ID"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content "/>
                        <el-form-item label="Merchant ID" prop="merchantId">
                            <el-input v-model="formInline.merchantId" placeholder="Merchant ID"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content"/>
                        <el-form-item label="Wallet ID" prop="walletId">
                            <el-input v-model="formInline.walletId" placeholder="Wallet ID"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="0">

                    <el-col :span="8">
                        <el-form-item label="Type" prop="type">
                            <el-select v-model="formInline.type" placeholder="Select a type">
                                <el-option label="Online" value="Online"></el-option>
                                <el-option label="Offline" value="Offline"></el-option>
                                <el-option label="Refund" value="Refund"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="Channel" prop="channel">
                            <el-select v-model="formInline.channel" placeholder="Select a channel">
                                <el-option label="Wyre" value="Wyre"></el-option>
                                <el-option label="Azupay" value="Azupay"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="Gateway" prop="gateway">
                            <el-select v-model="formInline.gateway" placeholder="Select a gateway">
                                <el-option label="Crypto OTC" value="Crypto"></el-option>
                                <el-option label="PayID" value="PayId"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="0">

                    <el-col :span="8">
                        <el-form-item label="Collection Currency" prop="currencyFrom">
                            <el-select v-model="formInline.currencyFrom" placeholder="Select a currency">
                                <el-option label="NZD" value="NZD"></el-option>
                                <el-option label="AUD" value="AUD"></el-option>
                                <el-option label="BTC" value="BTC"></el-option>
                                <el-option label="USDT" value="USDT"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="Credit Currency" prop="currencyTo">
                            <el-select v-model="formInline.currencyTo" placeholder="Select a currency">
                                <el-option label="NZD" value="NZD"></el-option>
                                <el-option label="AUD" value="AUD"></el-option>
                                <el-option label="BTC" value="BTC"></el-option>
                                <el-option label="USDT" value="USDT"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="Status" prop="status">
                            <el-select v-model="formInline.status" placeholder="Select a status">
                                <el-option label="Created" value="Created"></el-option>
                                <el-option label="Completed" value="Completed"></el-option>
                                <el-option label="Cancelled" value="Cancelled"></el-option>
                                <el-option label="Failed" value="Failed"></el-option>
                                <el-option label="Expired" value="Expired"></el-option>
                            </el-select>
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

    <!--<router-link :to="{ name: 'usersDetail', params: { id: 0}}"-->
    <!--&gt;-->
    <!--<el-button type="primary" size="small" style="margin-bottom: 10px">+ New</el-button>-->
    <!--</router-link>-->


    <el-table :data="transactionsRef" style="width: 100%" height="450" size="default" v-loading="loading">

        <!--<el-table-column type="expand">-->
        <!--<template #default="props">-->
        <!--<span style="margin-left: 10px"> Reference: {{ props.row.reference }} </span>-->
        <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column fixed prop="id" label="ID" width="80"/>
        <el-table-column prop="slug" label="Slug" width="250" >

            <template #default="props">
            <div @click="copySlug(props.row.slug)">
                {{props.row.slug.toString().substring(0,18) +'... ' }}
                <svg style="height: 16px;width: 16px;color: grey"  viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ba633cb8=""><path fill="currentColor" d="M768 832a128 128 0 0 1-128 128H192A128 128 0 0 1 64 832V384a128 128 0 0 1 128-128v64a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64h64z"></path><path fill="currentColor" d="M384 128a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64H384zm0-64h448a128 128 0 0 1 128 128v448a128 128 0 0 1-128 128H384a128 128 0 0 1-128-128V192A128 128 0 0 1 384 64z"></path></svg>
            </div>
        </template>
        </el-table-column>
        <el-table-column prop="merchantId" label="Merchant ID" width="250">
            <template #default="props">
                {{props.row.merchantId + "-"+props.row.merchant.name}}
            </template>
        </el-table-column>
        <el-table-column prop="walletId" label="Wallet ID" width="250">
            <template #default="props">
                {{props.row.walletId + "-"+props.row.wallet.name}}
            </template>
        </el-table-column>
        <el-table-column prop="type" label="Type" width="130"/>
        <el-table-column prop="channel" label="Channel" width="130"/>
        <el-table-column prop="gateway" label="Gateway" width="130"/>
        <el-table-column prop="amountPaid" label="Pay Amount" width="150">
            <template #default="props">
                {{props.row.currencyPaid?  props.row.currencyPaid + " "+props.row.amountPaid:'-'}}
            </template>
        </el-table-column>
        <el-table-column prop="amountFrom" label="Collect Amount" width="150">
            <template #default="props">
                {{props.row.amountFrom ? props.row.currencyFrom + " "+props.row.amountFrom :'-'}}
            </template>
        </el-table-column>
        <el-table-column prop="amountTo" label="Credit Amount" width="150">
            <template #default="props">
                {{props.row.amountTo ? props.row.currencyTo + " "+props.row.amountTo :'-'}}
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
        <el-table-column fixed="right" prop="status" label="Status" width="130">
            <template #default="props">
                <el-tag v-if="props.row.status === 'Created'" class="ml-2" type="info" size="small">Created
                </el-tag>
                <el-tag v-if="props.row.status === 'Completed'" class="ml-2" type="success" size="small">Completed
                </el-tag>
                <el-tag v-if="props.row.status === 'Cancelled'" class="ml-2" size="small">Cancelled
                </el-tag>
                <el-tag v-if="props.row.status === 'Failed'" class="ml-2" type="danger" size="small">Failed
                </el-tag>
                <el-tag v-if="props.row.status === 'Expired'" class="ml-2" type="warning" size="small">Expired
                </el-tag>

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
  import { Actions } from "../../store/enums/StoreEnums";
  import { getIllustrationsPath } from "../../core/helpers/assets";
  import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";
  import { reinitializeComponents } from "@/core/plugins/keenthemes";
  import { reactive } from "vue";
  import { ref } from "vue";
  import { getTransactionsRequest } from "@/latipay/apis/services/TransactionsService";
  import { DateTimeUtils } from "@/latipay/utils/DateTimeUtils";
  import { ElMessage } from "element-plus";
  import useClipboard from 'vue-clipboard3'

  export default defineComponent({
    name: "transactions",
    components: {},
    setup() {
      const store = useStore();


      const name = ref<string | null>(null);
      const email = ref<string | null>(null);
      const status = ref<string | null>(null);
      const sort = ref<string | null>(null);
      const pageNumber = ref(1);
      const pageSize = ref(20);

      const loading = ref(false);

      const { toClipboard } = useClipboard();
      const formInline = reactive({

        id: "",
        merchantId: "",
        walletId: "",
        type: "",
        gateway: "",
        channel: "",
        currencyFrom: "",
        currencyTo: "",
        status: ""

      });

      const {
        transactionsRef,
        totalRef,
        pageNumberRef,
        pageSizeRef,
        getTransactions
      } = getTransactionsRequest();


      const getData = async () => {
        loading.value = true;

        // await updateQueries();
        await getTransactions(
          formInline.id,
          formInline.merchantId,
          formInline.walletId,
          formInline.type,
          formInline.gateway,
          formInline.channel,
          formInline.currencyFrom,
          formInline.currencyTo,
          formInline.status,
          sort.value,
          pageNumber.value,
          pageSize.value
        );
        reinitializeComponents();

        loading.value = false;

        console.log(transactionsRef);
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



      const copySlug = async (slug: string) => {
        try {
          await toClipboard(slug);
          ElMessage({
            showClose: true,
            message: 'Copy successfully!',
            type: "success"
          });
        } catch (e) {
          console.error(e)
        }
      };


      return {
        getIllustrationsPath,
        formInline,
        getData,
        loading,
        updatePageSize,
        updatePageNumber,
        transactionsRef,
        totalRef,
        pageNumberRef,
        pageSizeRef,
        DateTimeUtils,
        pageSize,
        pageNumber,
        copySlug

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
