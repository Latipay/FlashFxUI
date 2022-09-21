<template>
  <div
    class="bg-lp d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed"
    :style="{
      backgroundImage: 'url(' + getIllustrationsPath('lp-bg.png') + ')',
    }"
  >
    <!--begin::Content-->
    <div class="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
      <!--begin::Logo-->
      <a href="#" class="mb-12">
        <img alt="Logo" src="media/logos/cfg-flashfx.png" class="h-90px" />
      </a>
      <!--end::Logo-->

      <router-view></router-view>
    </div>
    <!--end::Content-->

    <!--begin::Footer-->
    <div class="d-flex flex-center flex-column-auto p-10">
      <!--begin::Links-->
      <div class="d-flex align-items-center fw-bold fs-6">
        <span class="text-muted text-hover-primary px-2">
          Latitude Technologies Limited ©2022
        </span>

        <!--<a href="#" class="text-muted text-hover-primary px-2">Contact</a>-->

        <!--<a href="#" class="text-muted text-hover-primary px-2">Contact Us</a>-->
      </div>
      <!--end::Links-->
    </div>
    <!--end::Footer-->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import { getIllustrationsPath } from "@/core/helpers/assets";

export default defineComponent({
  name: "auth",
  components: {},
  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch(Actions.ADD_BODY_CLASSNAME, "bg-body");
    });

    onUnmounted(() => {
      store.dispatch(Actions.REMOVE_BODY_CLASSNAME, "bg-body");
    });

    return {
      getIllustrationsPath,
    };
  },
});
</script>

<style scoped>
.bg-lp {
  background-size: cover;
  background-position: center;
}
</style>
