<template>
  <div class="card" style="margin-bottom: 15px;margin-top: -25px">
    <div class="card-header">
      <h3 class="card-title">AP / AR</h3>
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
               label-width="auto">
        <el-form-item label="Wallet ID">
          <el-input v-model="formInline.walletID" placeholder="Settlement ID"></el-input>
        </el-form-item>
        <el-form-item label="Transaction ID">
          <el-input v-model="formInline.transactionID" placeholder="Merchant ID"></el-input>
        </el-form-item>
        <el-form-item label="Created Date">
          <div class="demo-date-picker">
            <div class="block">

              <el-date-picker
                      v-model="formInline.createdDate"
                      type="daterange"
                      range-separator="To"
                      start-placeholder="Start date"
                      end-placeholder="End date"
              >
              </el-date-picker>
            </div>
          </div>
        </el-form-item>

        <!--<el-form-item>-->
        <!--<el-button type="primary" @click="onSubmit" :icon="Search">Search</el-button>-->
        <!--</el-form-item>-->
        <!--<el-form-item>-->
        <!--<el-button @click="onSubmit" :icon="Search">Reset</el-button>-->
        <!--</el-form-item>-->
      </el-form>
      <el-button @click="onSubmit" :icon="Search" size="small" style="float: right;">Reset</el-button>
      <el-button type="primary" @click="onSubmit" :icon="Search" size="small"
                 style="float: right;margin-right: 10px">Search
      </el-button>

    </div>
  </div>

  <el-table :data="tableData" style="width: 100%" height="550" size="default">
    <el-table-column  prop="adjustID" label="Adjust ID" width="150"/>
    <el-table-column  prop="transactionId" label="Transaction ID" width="150"/>
    <el-table-column prop="walletID" label="Wallet ID" width="120"/>
    <el-table-column prop="availableBalance" label="Available Balance" width="160"/>
    <el-table-column prop="unavailableBalance" label="Unavailable Balance" width="170"/>
    <el-table-column prop="amount" label="Amount" width="120"/>
    <el-table-column prop="currency" label="Currency" width="120"/>

    <el-table-column prop="createdDate" label="Processed Date" width="140"/>


  </el-table>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
import { Actions } from "../../../store/enums/StoreEnums";
import { getIllustrationsPath } from "../../../core/helpers/assets";
import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";
import { ref } from "vue";
import { reactive } from "vue";


const formInline = reactive({
  walletID: "",
  transactionID: "",
  createdDate: ""
});

const onSubmit = () => {
  console.log("submit!");
};

const tableData = ref([
  {

    adjustID:"1110",
    transactionId: "T000031312312",

    walletID: "W000002437",
    availableBalance: "3222",
    unavailableBalance: "111",
    amount: "3.01",
    currency: "NZD",
    createdDate: "2023-11-11 11:11:11"
  },
  {
    adjustID:"1110",
    transactionId: "T000031312312",

    walletID: "W000002437",
    availableBalance: "3222",
    unavailableBalance: "111",
    amount: "3.01",
    currency: "NZD",
    createdDate: "2023-11-11 11:11:11"
  },
  {
    adjustID:"1110",
    transactionId: "T000031312312",

    walletID: "W000002437",
    availableBalance: "3222",
    unavailableBalance: "111",
    amount: "3.01",
    currency: "NZD",
    createdDate: "2023-11-11 11:11:11"
  },
  {
    adjustID:"1110",
    transactionId: "T000031312312",

    walletID: "W000002437",
    availableBalance: "3222",
    unavailableBalance: "111",
    amount: "3.01",
    currency: "NZD",
    createdDate: "2023-11-11 11:11:11"
  }
]);


export default defineComponent({
  name: "merchantSettlement",
  components: {},
  setup() {
    const store = useStore();

    onMounted(() => {


      setCurrentPageTitle("Merchant Settlement");
    });


    return {
      getIllustrationsPath,
      formInline,
      onSubmit,
      tableData
    };
  },
});
</script>
