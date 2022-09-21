<template>
    <div class="card" style="margin-bottom: 15px;margin-top: -25px">
        <div class="card-header">
            <h3 class="card-title">Partner Ledger</h3>
            <div class="card-toolbar">

                <!--<el-button size="small" round type="primary" plain>All</el-button>-->
                <!--<el-button size="small" type="text"><span style="color: gray">Bank</span></el-button>-->
                <!--<el-button size="small" type="text"><span style="color: gray">Channel Fiat</span></el-button>-->
                <!--<el-button size="small" type="text"><span style="color: gray">Channel DigitalWallet</span></el-button>-->
                <!--<el-button  size="small" plain style="border-radius: 75%"><img alt="Logo" src="media/icons/lp/icon-download.png" style="width: 17px;height: 17px"/></el-button>-->

                <!--<a href="#" class="btn btn-icon btn-outline-default  h-35px w-35px btn-outline"-->
                   <!--style="border-radius: 50%;margin-left: 10px"-->
                <!--&gt;-->
                    <!--<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"-->
                         <!--class="bi bi-download" viewBox="0 0 16 16">-->
                        <!--<path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>-->
                        <!--<path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>-->
                    <!--</svg>-->
                <!--</a>-->
            </div>
        </div>
        <!--<div class="card-body">-->
            <!--<el-form :inline="true" :model="formInline" class="demo-form-inline" size="small" :label-position="'right'"-->
                     <!--label-width="auto" ref="searchForm">-->
                <!--<el-form-item label="Name" prop="name">-->
                    <!--<el-input v-model="formInline.name" placeholder="Name"></el-input>-->
                <!--</el-form-item>-->
                <!--&lt;!&ndash;<el-form-item label="Region">&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-select v-model="formInline.region" placeholder="Select a region">&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-option label="All" value=""></el-option>&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-option label="Asia-Pacific" value="Asia-Pacific"></el-option>&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-option label="International" value="International"></el-option>&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-option label="Channel DigitalWallet" value="ChannelCrypto"></el-option>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-select>&ndash;&gt;-->
                <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->

                <!--<el-form-item label="Country" prop="country" >-->
                    <!--<el-select v-model="formInline.country" placeholder="Country">-->

                        <!--<el-option  v-for="item in countries"-->
                                <!--:key="item" :label="item.name" :value="item.code" >-->
                        <!--</el-option>-->
                    <!--</el-select>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="Type" prop="type" >-->
                    <!--<el-select v-model="formInline.type" placeholder="Select a type">-->
                        <!--<el-option label="All" value=""></el-option>-->
                        <!--<el-option label="Bank" value="Bank"></el-option>-->
                        <!--<el-option label="Channel Fiat" value="ChannelFiat"></el-option>-->
                        <!--<el-option label="Channel DigitalWallet" value="ChannelCrypto"></el-option>-->
                    <!--</el-select>-->
                <!--</el-form-item>-->



            <!--</el-form>-->
            <!--<el-button @click="resetFormFields" :icon="Search" size="small" style="float: right;">Reset</el-button>-->
            <!--<el-button type="primary" @click="onSubmitSearchForm" :icon="Search" size="small"-->
                       <!--style="float: right;margin-right: 10px">Search-->
            <!--</el-button>-->

        <!--</div>-->
    </div>


    <el-table :data="accountSourcesRef" style="width: 100%" height="550" size="default" v-loading="loading">
        <el-table-column   width="15"/>

        <el-table-column  prop="name" label="Name" width="200">
            <template #default="accountSource">

                <router-link :to="{ name: 'ledgerDetail', params: { id: '1'}}"
                >
                    {{accountSource.row.name}}
                </router-link>
            </template>
        </el-table-column>
        <el-table-column  prop="type" label="Type" width="170">
            <template #default="accountSource">

                <span class="badge badge-light-primary">{{accountSource.row.type}}</span>
                  <!--{{accountSource.row.type === 'ChannelCrypto' ? 'ChannelDigitalWallet' : accountSource.row.type}}-->
            </template>
        </el-table-column>


        <!--<el-table-column prop="region" label="Region" width="120"/>-->
        <el-table-column prop="country" label="Country" width="140"/>
        <el-table-column prop="" label="Supported Currencies" width="200"/>

        <el-table-column prop="availableBalance" label="Available Balance" width="250"/>
        <el-table-column prop="unavailableBalance" label="U/A Balance" width="250"/>
        <!--<el-table-column fixed="right" label="Action" width="120">-->
            <!--<template #default="record">-->


                <!--<router-link :to="{ name: 'accountSourceDetail', params: { id: record.row.id, accountSource: record.row } }"-->

                <!--&gt;-->
                    <!--<el-button type="text">Edit</el-button>-->
                <!--</router-link>-->


            <!--</template>-->
        <!--</el-table-column>-->
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
  import { getIllustrationsPath } from "../../../core/helpers/assets";
  import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";
  import { ref } from "vue";
  import { reactive } from "vue";
  import { EnumsConstant } from "@/store/enums/constants";
  import { reinitializeComponents } from "@/core/plugins/keenthemes";
  import { getAccountSourcesRequest } from "@/latipay/apis/services/AccountSourcesService";





  export default defineComponent({
    name: "ledger",
    components: {},
    setup() {
      const store = useStore();


      const name = ref<string | null>(null);
      const type = ref<string | null>(null);
      const country = ref<string | null>(null);
      const region = ref<string | null>(null);
      const sort = ref<string | null>(null);
      const pageNumber = ref(1);
      const pageSize = ref(20);

      const loading = ref(false);
      const countries = EnumsConstant.CountryCode;


      const formInline = reactive({
        type: "",
        region: "",
        country: "",
        name: ""
      });

      const {
        accountSourcesRef,
        totalRef,
        pageNumberRef,
        pageSizeRef,
        getAccountSources
      } = getAccountSourcesRequest();


      const getData = async () => {
        loading.value = true;

        // await updateQueries();
        await getAccountSources(
          formInline.type,
          formInline.region,
          formInline.country,
          formInline.name,

          sort.value,
          pageNumber.value,
          pageSize.value
        );
        reinitializeComponents();

        loading.value = false;

        console.log(accountSourcesRef);
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
        accountSourcesRef,
        totalRef,
        pageNumberRef,
        pageSizeRef,
        name,
        type,
        region,
        country,

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
