import { createApp } from "vue";
import App from "./App.vue";
import { InputNumber, Select, SelectOption, Input} from 'ant-design-vue';



/*
TIP: To get started with clean router change path to @/router/clean.ts.
 */
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import i18n from "@/core/plugins/i18n";
import Table from 'ant-design-vue/lib/table';
import Grid from 'ant-design-vue/lib/grid';
import Layout from 'ant-design-vue/lib/layout';
import Button from 'ant-design-vue/lib/button';
import Popconfirm from 'ant-design-vue/lib/popconfirm';
import Popover from 'ant-design-vue/lib/popover';
import Tooltip from 'ant-design-vue/lib/tooltip';
import VueExcelXlsx from "vue-excel-xlsx";


//imports for app initialization
import ApiService from "@/core/services/ApiService";
import { initApexCharts } from "@/core/plugins/apexcharts";
import { initInlineSvg } from "@/core/plugins/inline-svg";
import { initVeeValidate } from "@/core/plugins/vee-validate";
import "ant-design-vue/dist/antd.css";

import "@/core/plugins/prismjs";
import "bootstrap";

const app = createApp(App);

app.use(store);
app.use(router);
app.use(ElementPlus);
app.use(Table, Grid, Layout,Button,Popconfirm,Tooltip,Popover);


ApiService.init(app);
initApexCharts(app);
initInlineSvg(app);
initVeeValidate();

app.use(i18n);
app.use(VueExcelXlsx);
app.use(Input,InputNumber,Select,SelectOption);



app.mount("#app");


