<template>
  <!--begin::Toolbar-->
  <!--<div class="toolbar" id="kt_toolbar">-->
    <!--begin::Container-->
    <!--<div-->
      <!--id="kt_toolbar_container"-->
      <!--:class="{-->
        <!--'container-fluid': toolbarWidthFluid,-->
        <!--'container-xxl': !toolbarWidthFluid,-->
      <!--}"-->
      <!--class="d-flex flex-stack"-->
    <!--&gt;-->
      <!--begin::Page title-->
      <!--<div-->
        <!--data-kt-swapper="true"-->
        <!--data-kt-swapper-mode="prepend"-->
        <!--data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}"-->
        <!--class="page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0"-->
      <!--&gt;-->
        <!--&lt;!&ndash;begin::Title&ndash;&gt;-->
        <!--&lt;!&ndash;<h1 class="d-flex align-items-center text-dark fw-bolder my-1 fs-3">&ndash;&gt;-->
          <!--&lt;!&ndash;{{ title }}&ndash;&gt;-->
        <!--&lt;!&ndash;</h1>&ndash;&gt;-->
        <!--&lt;!&ndash;end::Title&ndash;&gt;-->

        <!--<span-->
          <!--v-if="breadcrumbs"-->
          <!--class="h-20px border-gray-200 border-start mx-4"-->
        <!--&gt;</span>-->

        <!--&lt;!&ndash;begin::Breadcrumb&ndash;&gt;-->
        <!--<ul-->
          <!--v-if="breadcrumbs"-->
          <!--class="breadcrumb breadcrumb-separatorless fw-bold fs-7 my-1"-->
        <!--&gt;-->
          <!--<li class="breadcrumb-item pe-3">-->
            <!--<router-link to="/dashboard" class="text-muted text-hover-primary">-->
              <!--Home-->
            <!--</router-link>-->
          <!--</li>-->
          <!--<li class="breadcrumb-item">-->
            <!--<span class="bullet bg-gray-200 w-5px h-2px"></span>-->
          <!--</li>-->
          <!--<template v-for="(item, index) in breadcrumbs" :key="index">-->
            <!--<li class="breadcrumb-item text-muted">-->
              <!--{{ item }}-->
            <!--</li>-->
            <!--<li class="breadcrumb-item">-->
              <!--<span class="bullet bg-gray-200 w-5px h-2px"></span>-->
            <!--</li>-->
          <!--</template>-->
          <!--<li class="breadcrumb-item pe-3 text-dark">-->
            <!--{{ title }}-->
          <!--</li>-->
        <!--</ul>-->
        <!--&lt;!&ndash;end::Breadcrumb&ndash;&gt;-->
      <!--</div>-->
      <!--end::Page title-->

      <!--begin::Actions-->
      <!--<div class="d-flex align-items-center py-1">-->
        <!--&lt;!&ndash;begin::Wrapper&ndash;&gt;-->
        <!--<div class="me-4">-->
          <!--&lt;!&ndash;begin::Menu&ndash;&gt;-->
          <!--<a-->
            <!--href="#"-->
            <!--class="btn btn-sm btn-flex btn-light btn-active-primary fw-bolder"-->
            <!--data-kt-menu-trigger="click"-->
            <!--data-kt-menu-placement="bottom-end"-->
            <!--data-kt-menu-flip="top-end"-->
          <!--&gt;-->
            <!--<span class="svg-icon svg-icon-5 svg-icon-gray-500 me-1">-->
              <!--<inline-svg src="media/icons/duotune/general/gen031.svg" />-->
            <!--</span>-->
            <!--Filter-->
          <!--</a>-->

          <!--&lt;!&ndash;<Dropdown1></Dropdown1>&ndash;&gt;-->
          <!--&lt;!&ndash;end::Menu&ndash;&gt;-->
        <!--</div>-->
        <!--&lt;!&ndash;end::Wrapper&ndash;&gt;-->

        <!--&lt;!&ndash;begin::Button&ndash;&gt;-->
        <!--<a-->
          <!--href="#"-->
          <!--class="btn btn-sm btn-primary"-->
          <!--data-bs-toggle="modal"-->
          <!--data-bs-target="#kt_modal_create_app"-->
          <!--id="kt_toolbar_primary_button"-->
        <!--&gt;-->
          <!--Create-->
        <!--</a>-->
        <!--&lt;!&ndash;end::Button&ndash;&gt;-->
      <!--</div>-->
      <!--end::Actions-->
    <!--</div>-->
    <!--end::Container-->
  <!--</div>-->
  <!--end::Toolbar-->
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Dropdown1 from "@/components/dropdown/Dropdown1.vue";
import { toolbarWidthFluid } from "@/core/helpers/config";

export default defineComponent({
  name: "KToolbar",
  props: {
    breadcrumbs: Array,
    title: String,
  },
  components: {

  },
  setup() {
    return {
      toolbarWidthFluid,
    };
  },
});
</script>
