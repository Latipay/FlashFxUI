import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import store from "@/store";
import { Mutations, Actions } from "@/store/enums/StoreEnums";
import JwtService from "@/core/services/JwtService";
import { Merchant } from "@/views/merchants/Merchant.model";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/internationalPayout/internationalPayout",
    component: () => import("@/layout/Layout.vue"),
    children: [

      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/Dashboard.vue")
      },
      {
        path: "/senders/senders",
        name: "senders",
        component: () => import("@/views/senders/Senders.vue")
      },
      {
        path: "/recipients/recipients",
        name: "recipients",
        component: () => import("@/views/recipients/Recipients.vue")
      },
      {
        path: "/recipients/recipients/:id",
        name: "recipientDetail",
        component: () => import("@/views/recipients/RecipientDetail.vue"),
        props: (route) => {
          const id = Number(route.params.id) || 0;
          return { id };
        },
        meta: { requiresAuth: true },
      },

      {
        path: "/internationalPayout/internationalPayout",
        name: "internationalPayout",
        component: () => import("@/views/internationalPayout/InternationalPayout.vue")
      },
      {
        path: "/merchants/merchants",
        name: "merchants",
        component: () => import("@/views/merchants/Merchants.vue")
      },
      {
        path: "/merchants/merchants/:id",
        name: "merchantDetail",
        component: () => import("@/views/merchants/MerchantDetail.vue"),
        props: (route) => {
          const id = Number(route.params.id) || 0;
          return { id };
        },
        meta: { requiresAuth: true },
      },
      {
        path: "/transactions/transactions",
        name: "transactions",
        component: () => import("@/views/transactions/Transactions.vue")
      },

      {
        path: "/externalFinance/merchantSettlement/merchantSettlement",
        name: "merchantSettlement",
        component: () => import("@/views/externalFinance/merchantSettlement/MerchantSettlement.vue")
      },
      {
        path: "/externalFinance/merchantSettlement/merchantSettlementRecord",
        name: "merchantSettlementRecord",
        component: () => import("@/views/externalFinance/merchantSettlement/MerchantSettlementRecord.vue"),
      },
      {
        path: "/externalFinance/walletAdjustment/walletAdjustment",
        name: "walletAdjustment",
        component: () => import("@/views/externalFinance/walletAdjustment/WalletAdjustment.vue")
      },
      {
        path: "/externalFinance/walletAdjustment/addWalletAdjustment",
        name: "addWalletAdjustment",
        component: () => import("@/views/externalFinance/walletAdjustment/AddWalletAdjustment.vue")
      },
      {
        path: "/externalFinance/walletStatement/walletStatement",
        name: "walletStatement",
        component: () => import("@/views/externalFinance/walletStatement/WalletStatement.vue")
      },
      {
        path: "/externalFinance/pricingPlan/pricingPlan",
        name: "pricingPlan",
        component: () => import("@/views/externalFinance/pricingPlan/PricingPlan.vue")
      },

      {
        path: "/internalFinance/accountSource/accountSource",
        name: "accountSource",
        component: () => import("@/views/internalFinance/accountSource/AccountSource.vue")
      },
      {
        path: "/internalFinance/ledger/ledger",
        name: "ledger",
        component: () => import("@/views/internalFinance/ledger/Ledger.vue")
      },
      {
        path: "/internalFinance/ledger/ledger/:id",
        name: "ledgerDetail",
        component: () => import("@/views/internalFinance/ledger/LedgerDetail.vue"),
        props: (route) => {
          const id = Number(route.params.id) || 0;
          return { id };
        },
        meta: { requiresAuth: true },
      },
      {
        path: "/internalFinance/accountSource/accountSource/:id",
        name: "accountSourceDetail",
        component: () => import("@/views/internalFinance/accountSource/AccountSourceDetail.vue"),
        props: (route) => {
          const id = Number(route.params.id) || 0;
          return { id };
        },
        meta: { requiresAuth: true },
      },
      {
        path: "/internalFinance/accounts/accounts",
        name: "accounts",
        component: () => import("@/views/internalFinance/accounts/Accounts.vue")
      },
      {
        path: "/internalFinance/accounts/accounts/:id",
        name: "accountDetail",
        component: () => import("@/views/internalFinance/accounts/AccountDetail.vue"),
        props: (route) => {
          const id = Number(route.params.id) || 0;
          return { id };
        },
        meta: { requiresAuth: true },
      },
      {
        path: "/internalFinance/manualOrders/manualOrders",
        name: "manualOrders",
        component: () => import("@/views/internalFinance/manualOrders/ManualOrders.vue")
      },
      {
        path: "/internalFinance/manualOrders/manualOrders/:id",
        name: "manualOrdersDetail",
        component: () => import("@/views/internalFinance/manualOrders/ManualOrdersDetail.vue"),
        props: (route) => {
          const id = String(route.params.id) || "";
          return { id };
        },
        meta: { requiresAuth: true },
      },
      {
        path: "/internalFinance/accountStatement/accountStatement",
        name: "accountStatement",
        component: () => import("@/views/internalFinance/accountStatement/AccountStatement.vue")
      },
      {
        path: "/internalFinance/apar/apar",
        name: "apar",
        component: () => import("@/views/internalFinance/apar/APAR.vue")
      },
      {
        path: "/users/users",
        name: "users",
        component: () => import("@/views/users/Users.vue")
      },
      {
        path: "/users/users/:id",
        name: "usersDetail",
        component: () => import("@/views/users/UsersDetail.vue"),
        props: (route) => {
          const id = Number(route.params.id) || 0;
          return { id };
        },
        meta: { requiresAuth: true },
      },
      {
        path: "/journal/journal",
        name: "journal",
        component: () => import("@/views/journal/Journal.vue")
      }


    ]
  },
  {
    path: "/",
    component: () => import("@/components/page-layouts/Auth.vue"),
    children: [
      {
        path: "/sign-in",
        name: "sign-in",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignIn.vue")
      },
      {
        path: "/sign-up",
        name: "sign-up",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignUp.vue")
      },
      {
        path: "/password-reset",
        name: "password-reset",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/PasswordReset.vue")
      }
    ]
  },
  {
    // the 404 route, when none of the above matches
    path: "/404",
    name: "404",
    component: () => import("@/views/crafted/authentication/Error404.vue")
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/views/crafted/authentication/Error500.vue")
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404"
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  // reset config to initial state
  store.commit(Mutations.RESET_LAYOUT_CONFIG);

  // store.dispatch(Actions.VERIFY_AUTH, { access_token: JwtService.getToken() });

  const isAuth = store.getters.isUserAuthenticated;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !isAuth) {
    next("/sign-in");
  } else {
    // Scroll page to top on every route change
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);

    next();
  }


});

export default router;


// {
//   path: "/dashboard",
//     name: "dashboard",
//   component: () => import("@/views/Dashboard.vue"),
// },
// {
//   path: "/builder",
//     name: "builder",
//   component: () => import("@/views/Builder.vue"),
// },
// {
//   path: "/crafted/pages/profile",
//     name: "profile",
//   component: () => import("@/components/page-layouts/Profile.vue"),
//   children: [
//   {
//     path: "overview",
//     name: "profile-overview",
//     component: () =>
//       import("@/views/crafted/pages/profile/Overview.vue"),
//   },
//   {
//     path: "projects",
//     name: "profile-projects",
//     component: () =>
//       import("@/views/crafted/pages/profile/Projects.vue"),
//   },
//   {
//     path: "campaigns",
//     name: "profile-campaigns",
//     component: () =>
//       import("@/views/crafted/pages/profile/Campaigns.vue"),
//   },
//   {
//     path: "documents",
//     name: "profile-documents",
//     component: () =>
//       import("@/views/crafted/pages/profile/Documents.vue"),
//   },
//   {
//     path: "connections",
//     name: "profile-connections",
//     component: () =>
//       import("@/views/crafted/pages/profile/Connections.vue"),
//   },
//   {
//     path: "activity",
//     name: "profile-activity",
//     component: () =>
//       import("@/views/crafted/pages/profile/Activity.vue"),
//   },
// ],
// },
// {
//   path: "/crafted/pages/wizards/horizontal",
//     name: "horizontal-wizard",
//   component: () => import("@/views/crafted/pages/wizards/Horizontal.vue"),
// },
// {
//   path: "/crafted/pages/wizards/vertical",
//     name: "vertical-wizard",
//   component: () => import("@/views/crafted/pages/wizards/Vertical.vue"),
// },
// {
//   path: "/crafted/account",
//     name: "account",
//   component: () => import("@/views/crafted/account/Account.vue"),
//   children: [
//   {
//     path: "overview",
//     name: "account-overview",
//     component: () => import("@/views/crafted/account/Overview.vue"),
//   },
//   {
//     path: "settings",
//     name: "account-settings",
//     component: () => import("@/views/crafted/account/Settings.vue"),
//   },
// ],
// },
// {
//   path: "/apps/customers/getting-started",
//     name: "apps-customers-getting-started",
//   component: () => import("@/views/apps/customers/GettingStarted.vue"),
// },
// {
//   path: "/apps/customers/customers-listing",
//     name: "apps-customers-listing",
//   component: () => import("@/views/apps/customers/CustomersListing.vue"),
// },
// {
//   path: "/apps/customers/customer-details",
//     name: "apps-customers-details",
//   component: () => import("@/views/apps/customers/CustomerDetails.vue"),
// },
// {
//   path: "/subscriptions/getting-started",
//     name: "subscriptions-getting-started",
//   component: () =>
//   import("@/views/apps/subscriptions/GettingStarted.vue"),
// },
// {
//   path: "/subscriptions/subscription-list",
//     name: "subscriptions-subscription-list",
//   component: () =>
//   import("@/views/apps/subscriptions/SubscriptionList.vue"),
// },
// {
//   path: "/subscriptions/add-subscription",
//     name: "subscriptions-add-subscription",
//   component: () =>
//   import("@/views/apps/subscriptions/AddSubscription.vue"),
// },
// {
//   path: "/subscriptions/view-subscription",
//     name: "subscriptions-view-subscription",
//   component: () =>
//   import("@/views/apps/subscriptions/ViewSubscription.vue"),
// },
// {
//   path: "/apps/calendar",
//     name: "apps-calendar",
//   component: () => import("@/views/apps/Calendar.vue"),
// },
// {
//   path: "/apps/chat/private-chat",
//     name: "apps-private-chat",
//   component: () => import("@/views/apps/chat/Chat.vue"),
// },
// {
//   path: "/apps/chat/group-chat",
//     name: "apps-group-chat",
//   component: () => import("@/views/apps/chat/Chat.vue"),
// },
// {
//   path: "/apps/chat/drawer-chat",
//     name: "apps-drawer-chat",
//   component: () => import("@/views/apps/chat/DrawerChat.vue"),
// },
// {
//   path: "/crafted/modals/general/invite-friends",
//     name: "modals-general-invite-friends",
//   component: () =>
//   import("@/views/crafted/modals/general/InviteFriends.vue"),
// },
// {
//   path: "/crafted/modals/general/view-user",
//     name: "modals-general-view-user",
//   component: () => import("@/views/crafted/modals/general/ViewUsers.vue"),
// },
// {
//   path: "/crafted/modals/general/upgrade-plan",
//     name: "modals-general-upgrade-plan",
//   component: () =>
//   import("@/views/crafted/modals/general/UpgradePlan.vue"),
// },
// {
//   path: "/crafted/modals/general/share-and-earn",
//     name: "modals-general-share-and-earn",
//   component: () =>
//   import("@/views/crafted/modals/general/ShareAndEarn.vue"),
// },
// {
//   path: "/crafted/modals/forms/new-target",
//     name: "modals-forms-new-target",
//   component: () => import("@/views/crafted/modals/forms/NewTarget.vue"),
// },
// {
//   path: "/crafted/modals/forms/new-card",
//     name: "modals-forms-new-card",
//   component: () => import("@/views/crafted/modals/forms/NewCard.vue"),
// },
// {
//   path: "/crafted/modals/forms/new-address",
//     name: "modals-forms-new-address",
//   component: () => import("@/views/crafted/modals/forms/NewAddress.vue"),
// },
// {
//   path: "/crafted/modals/forms/create-api-key",
//     name: "modals-forms-create-api-key",
//   component: () =>
//   import("@/views/crafted/modals/forms/CreateApiKey.vue"),
// },
// {
//   path: "/crafted/modals/wizards/two-factor-auth",
//     name: "modals-wizards-two-factor-auth",
//   component: () =>
//   import("@/views/crafted/modals/wizards/TwoFactorAuth.vue"),
// },
// {
//   path: "/crafted/modals/wizards/create-app",
//     name: "modals-wizards-create-app",
//   component: () => import("@/views/crafted/modals/wizards/CreateApp.vue"),
// },
// {
//   path: "/crafted/modals/wizards/create-account",
//     name: "modals-wizards-create-account",
//   component: () =>
//   import("@/views/crafted/modals/wizards/CreateAccount.vue"),
// },
// {
//   path: "/crafted/widgets/lists",
//     name: "widgets-list",
//   component: () => import("@/views/crafted/widgets/Lists.vue"),
// },
// {
//   path: "/crafted/widgets/statistics",
//     name: "widgets-statistics",
//   component: () => import("@/views/crafted/widgets/Statistics.vue"),
// },
// {
//   path: "/crafted/widgets/charts",
//     name: "widgets-charts",
//   component: () => import("@/views/crafted/widgets/Charts.vue"),
// },
// {
//   path: "/crafted/widgets/mixed",
//     name: "widgets-mixed",
//   component: () => import("@/views/crafted/widgets/Mixed.vue"),
// },
// {
//   path: "/crafted/widgets/tables",
//     name: "widgets-tables",
//   component: () => import("@/views/crafted/widgets/Tables.vue"),
// },
// {
//   path: "/crafted/widgets/feeds",
//     name: "widgets-feeds",
//   component: () => import("@/views/crafted/widgets/Feeds.vue"),
// },
