<template>
    <el-alert style="margin-top: -35px"
              title="Wallet setup feature will be released in next version! Currently please contact IT team for help."
              type="warning" show-icon :closable="false"/>
    <div class="card" style="margin-bottom: 15px;margin-top: 10px;width: 100%;">
        <div class="card-header card-header-stretch">

            <div class="card-toolbar">
                <ul class="nav nav-tabs nav-line-tabs nav-stretch fs-5 border-0">

                    <li class="nav-item">
                        <a
                                class="nav-link "
                                data-bs-toggle="tab"
                                href="#balance"
                                :class="{ 'active' : isBalanceActive}"
                                :click="chooseProfile"
                        >Balance </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" :class="{ 'active' : isWalletActive}" :click="chooseWallet"
                           data-bs-toggle="tab" href="#wallet"
                        >Account(s)</a>
                    </li>
                    <li class="nav-item">
                        <a
                                class="nav-link "
                                data-bs-toggle="tab"
                                href="#profile"
                                :class="{ 'active' : isProfileActive}"
                                :click="chooseProfile"
                        >Merchant Info </a>
                    </li>
                    <li class="nav-item">
                        <a
                                class="nav-link "
                                data-bs-toggle="tab"
                                href="#risk"
                                :class="{ 'active' : isRiskActive}"
                                :click="chooseProfile"
                        >Risk&Compliance </a>
                    </li>
                    <li class="nav-item">
                        <a
                                class="nav-link "
                                data-bs-toggle="tab"
                                href="#setting"
                                :class="{ 'active' : isSettingActive}"
                                :click="chooseProfile"
                        >Merchant Setting </a>
                    </li>

                </ul>
            </div>
        </div>
        <div class="card-body">
            <div class="tab-content" id="myTabContent">
                <div
                        class="tab-pane fade"
                        id="balance"
                        role="tabpanel"
                        :class="{ 'active' : isBalanceActive, 'show' : isBalanceActive }"
                >

                    <!--<p v-for="item in groupedFiatWallets" :key="item.currency">{{item}}</p>-->
                    <el-descriptions :title="merchantRef ? merchantRef.name : ''" :column="1" direction="vertical" v-loading="loadingRef">
                      <el-descriptions-item label="Total Balance:">
                        <div>
                          <span class="bullet me-5"></span><span style="margin-right: 10px">Fiat</span>
                          <el-check-tag checked style="margin-right: 8px;background-color: #FAC213;color: #FEF9A7" v-for="item in groupedFiatWallets.filter(it => it.totolBalance!==0)" @click="showCurrencyWallet(item.currency)"
                                        :key="item.currency">${{" "+ item.totolBalance + " " + item.currency}}
                          </el-check-tag>
                        </div>
                        <br/>
                        <div>
                          <span class="bullet me-5"></span><span style="margin-right: 10px;">Crypto</span>
                          <!--<el-divider content-position="left">Crypto</el-divider>-->
                          <el-check-tag checked style="margin-right: 8px;background-color: #FAC213;color: #FEF9A7" v-for="item in groupedCryptoWallets.filter(it => it.totolBalance!==0)" @click="showCurrencyWallet(item.currency)"
                                        :key="item.currency">${{" "+ item.totolBalance + " " + item.currency}}
                          </el-check-tag>
                        </div>
                      </el-descriptions-item>
                        <el-descriptions-item label="Total Available Balance:">
                            <div>
                            <span class="bullet me-5"></span><span style="margin-right: 10px">Fiat</span>
                                <el-check-tag checked style="margin-right: 8px" v-for="item in groupedFiatWallets.filter(it => it.availableBalance!==0)" @click="showCurrencyWallet(item.currency)"
                                              :key="item.currency">${{" "+ item.availableBalance + " " + item.currency}}
                                </el-check-tag>
                            </div>
                            <br/>
                            <div>
                            <span class="bullet me-5"></span><span style="margin-right: 10px">Crypto</span>
                            <!--<el-divider content-position="left">Crypto</el-divider>-->
                                <el-check-tag checked style="margin-right: 8px" v-for="item in groupedCryptoWallets.filter(it => it.availableBalance!==0)" @click="showCurrencyWallet(item.currency)"
                                          :key="item.currency">${{" "+ item.availableBalance + " " + item.currency}}
                                </el-check-tag>
                            </div>
                        </el-descriptions-item>
                        <el-descriptions-item label="Total Reserve Balance:">
                            <div>
                                <span class="bullet me-5"></span><span style="margin-right: 10px">Fiat</span>
                                <el-check-tag  style="margin-right: 8px" v-for="item in groupedFiatWallets.filter(it => it.unavailableBalance!==0)" @click="showCurrencyWallet(item.currency)"
                                              :key="item.currency">${{" "+ item.unavailableBalance + " " + item.currency}}
                                </el-check-tag>
                            </div>
                            <br/>
                            <div>
                                <span class="bullet me-5"></span><span style="margin-right: 10px">Crypto</span>
                                <!--<el-divider content-position="left">Crypto</el-divider>-->
                                <el-check-tag  style="margin-right: 8px" v-for="item in groupedCryptoWallets.filter(it => it.unavailableBalance!==0)" :key="item.currency">${{" "+ item.unavailableBalance + " " + item.currency}} @click="showCurrencyWallet(item.currency)"
                                </el-check-tag>
                            </div>

                            <br/>
                            <i style="margin-top: 10px"><strong>Click one of currency tabs to view more</strong></i>

                        </el-descriptions-item>


                    </el-descriptions>


                    <h4 style="margin-top: 20px">{{currencyTab}} Account(s) </h4>


                    <el-table :data="balanceWalletsRef" style="width: 100%" height="600" size="default" v-loading="loadingRef">

                        <el-table-column fixed prop="id" label="Id" width="80"/>
                        <el-table-column prop="slug" label="Slug" width="250">

                            <template #default="props">
                                <div @click="copySlug(props.row.slug)">
                                    {{props.row.slug.toString().substring(0,18) +"... " }}
                                    <svg style="height: 16px;width: 16px;color: grey" viewBox="0 0 1024 1024"
                                         xmlns="http://www.w3.org/2000/svg" data-v-ba633cb8="">
                                        <path fill="currentColor"
                                              d="M768 832a128 128 0 0 1-128 128H192A128 128 0 0 1 64 832V384a128 128 0 0 1 128-128v64a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64h64z"></path>
                                        <path fill="currentColor"
                                              d="M384 128a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64H384zm0-64h448a128 128 0 0 1 128 128v448a128 128 0 0 1-128 128H384a128 128 0 0 1-128-128V192A128 128 0 0 1 384 64z"></path>
                                    </svg>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="Name" width="250"/>
                        <el-table-column prop="currency" label="currency" width="120"/>
                        <el-table-column prop="availableBalance" label="Available Balance" width="160"/>
                        <el-table-column prop="unavailableBalance" label="Unavailable Balance" width="170"/>
                        <el-table-column prop="enabled" label="Status" width="100" fixed="right">

                            <template #default="statusTag">
                                <!--<el-tag v-if="statusTag.row.enabled" class="ml-2" type="success" size="small">Active-->
                                <!--</el-tag>-->
                                <!--<el-tag v-if="!statusTag.row.enabled" class="ml-2" type="danger" size="small">Disabled-->
                                <!--</el-tag>-->

                                <span class="badge badge-light-success"
                                      v-if="statusTag.row.enabled === true">Active</span>
                                <span class="badge badge-light-danger"
                                      v-if="statusTag.row.enabled === false">Disabled</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                            v-model:currentPage="balancePageNumberRef"
                            :page-size="balancePageSizeRef"
                            :small="'small'"
                            :page-sizes="[20, 30, 40, 50]"
                            layout="total,sizes, prev, pager, next"
                            :total="balanceTotalRef"
                            style="float: right;margin-top: 10px"
                            background
                            @size-change="updateBalanceWalletPageSize"
                            @current-change="updateBalanceWalletPageNumber"
                    >
                    </el-pagination>


                </div>
                <div
                        class="tab-pane fade"
                        id="risk"
                        role="tabpanel"
                        :class="{ 'active' : isRiskActive, 'show' : isRiskActive }"
                >
                </div>
                <div
                        class="tab-pane fade"
                        id="setting"
                        role="tabpanel"
                        :class="{ 'active' : isSettingActive, 'show' : isSettingActive }"
                >
                </div>
                <div
                        class="tab-pane fade"
                        id="profile"
                        role="tabpanel"
                        :class="{ 'active' : isProfileActive, 'show' : isProfileActive }"
                >
                    <div v-if="merchantRef">
                        <h4>{{merchantRef.name}}</h4>


                    </div>
                    <div class="row g-5" style="margin-top: 15px">
                        <div class="col-lg-4">
                            <div class="card card-stretch shadow mb-5">
                                <div class="card-header">
                                    <h3 class="card-title">Allocation</h3>
                                </div>
                                <div class="card-body">Lorem Ipsum is simply dummy text</div>
                                <div class="card-footer">Footer</div>
                            </div>
                        </div>

                        <div class="col-lg-4">
                            <div class="card card-stretch-50 shadow mb-5">
                                <div class="card-header">
                                    <h3 class="card-title">Ongoing Check Point</h3>
                                </div>
                                <div class="card-body">Lorem Ipsum is simply dummy text</div>
                                <div class="card-footer">Footer</div>
                            </div>

                            <div class="card card-stretch-50 shadow mb-5">
                                <div class="card-header">
                                    <h3 class="card-title">Activation Control </h3>
                                </div>
                                <div class="card-body">Lorem Ipsum is simply dummy text</div>
                                <div class="card-footer">Footer</div>
                            </div>
                        </div>

                        <div class="col-lg-4">
                            <div class="card card-stretch-33 shadow mb-5">
                                <div class="card-header">
                                    <h3 class="card-title">Risk Profile</h3>
                                </div>
                                <div class="card-body">Lorem Ipsum is simply dummy text</div>
                                <div class="card-footer">Footer</div>
                            </div>

                            <div class="card card-stretch-33 shadow mb-5">
                                <div class="card-header">
                                    <h3 class="card-title">Transaction Monitoring </h3>
                                </div>
                                <div class="card-body">Lorem Ipsum is simply dummy text</div>
                                <div class="card-footer">Footer</div>
                            </div>

                            <div class="card card-stretch-33 shadow mb-5">
                                <div class="card-header">
                                    <h3 class="card-title">Owner</h3>
                                </div>
                                <div class="card-body">Lorem Ipsum is simply dummy text</div>
                                <div class="card-footer">Footer</div>
                            </div>

                        </div>
                    </div>
                    <div class="row g-5">

                        <div class="col-lg-4">
                            <div class="card card-stretch shadow mb-5">
                                <div class="card-header">
                                    <h3 class="card-title">Agent</h3>
                                </div>
                                <div class="card-body">Lorem Ipsum is simply dummy text</div>
                                <div class="card-footer">Footer</div>
                            </div>
                        </div>
                        <div class="col-lg-4">

                            <div class="card card-stretch shadow mb-5">
                                <div class="card-header">
                                    <h3 class="card-title">Pricing</h3>
                                </div>
                                <div class="card-body">Lorem Ipsum is simply dummy text</div>
                                <div class="card-footer">Footer</div>
                            </div>
                        </div>
                    </div>


                </div>

                <div class="tab-pane fade  " id="wallet" role="tabpanel"
                     :class="{ 'active' : isWalletActive, 'show':isWalletActive}">
                    <!--<router-link :to="{ name: 'accountSourceDetail', params: { id: 'add'}}"-->
                    <!--&gt;-->
                    <!--<el-button type="primary" size="small" style="margin-bottom: 10px">+ New</el-button>-->
                    <!--</router-link>-->

                    <h5>Operation Account</h5>
                    <div class="separator my-10"></div>
                    <h5>Transaction Account(s)</h5>
                    <el-table :data="walletsRef" style="width: 100%" height="550" size="default">
                        <el-table-column fixed prop="id" label="Id" width="80"/>
                        <el-table-column prop="slug" label="Slug" width="250">

                            <template #default="props">
                                <div @click="copySlug(props.row.slug)">
                                    {{props.row.slug.toString().substring(0,18) +"... " }}
                                    <svg style="height: 16px;width: 16px;color: grey" viewBox="0 0 1024 1024"
                                         xmlns="http://www.w3.org/2000/svg" data-v-ba633cb8="">
                                        <path fill="currentColor"
                                              d="M768 832a128 128 0 0 1-128 128H192A128 128 0 0 1 64 832V384a128 128 0 0 1 128-128v64a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64h64z"></path>
                                        <path fill="currentColor"
                                              d="M384 128a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64H384zm0-64h448a128 128 0 0 1 128 128v448a128 128 0 0 1-128 128H384a128 128 0 0 1-128-128V192A128 128 0 0 1 384 64z"></path>
                                    </svg>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="Name" width="250"/>
                        <el-table-column prop="availableBalance" label="Balance" width="140"/>
                        <el-table-column prop="unavailableBalance" label="U/N Balance" width="140"/>
                        <el-table-column prop="currency" label="Credit Currency" width="140">
                            <template #default="cc">
                                <span class="badge badge-light-primary">{{cc.row.currency}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="collectionCurrencies" label="Collection Currency" width="180">
                            <template #default="cc">
                                <!--<el-tag class="ml-2" size="small" v-for="item in cc.row.collectionCurrencies"-->
                                <!--:key="item" style="margin-right: 5px">-->
                                <!--<span>{{item}}</span>-->
                                <!--</el-tag>-->

                                <span class="badge badge-light-primary" v-for="item in cc.row.collectionCurrencies"
                                      :key="item" style="margin-right: 5px">{{item}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="settlementCurrencies" label="Settle Currency" width="140">
                            <template #default="sc">
                                <!--<el-tag class="ml-2" size="small" v-for="item in sc.row.settlementCurrencies"-->
                                <!--:key="item">-->
                                <!--<span>{{item}}</span>-->
                                <!--</el-tag>-->
                                <span class="badge badge-light-primary" v-for="item in sc.row.settlementCurrencies"
                                      :key="item" style="margin-right: 5px">{{item}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="gateways" label="APM" width="250">
                            <template #default="gatewaysArray">
                                <!--<el-tag class="ml-2" size="small" v-for="item in gatewaysArray.row.gateways"-->
                                <!--:key="item">-->
                                <!--<span>{{item}}</span>-->
                                <!--</el-tag>-->

                                <span class="badge badge-light-info" v-for="item in gatewaysArray.row.gateways"
                                      :key="item" style="margin-right: 5px">{{item}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="createdAt" label="Created At" width="250">
                            <template #default="createdDate">
                                {{ DateTimeUtils.parseDateTime(createdDate.row.createdAt) }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="enabled" label="Status" width="100" fixed="right">

                            <template #default="statusTag">
                                <!--<el-tag v-if="statusTag.row.enabled" class="ml-2" type="success" size="small">Active-->
                                <!--</el-tag>-->
                                <!--<el-tag v-if="!statusTag.row.enabled" class="ml-2" type="danger" size="small">Disabled-->
                                <!--</el-tag>-->

                                <span class="badge badge-light-success"
                                      v-if="statusTag.row.enabled === true">Active</span>
                                <span class="badge badge-light-danger"
                                      v-if="statusTag.row.enabled === false">Disabled</span>
                            </template>
                        </el-table-column>

                        <el-table-column prop="action" label="Action" fixed="right" width="80">
                            <template #default="wallet">
                                <el-dropdown>
                                    <!--<div style="font-size: 20px">-->

                                    <!--<el-icon><expand /></el-icon>-->

                                    <!--<expand style="width: 1em; height: 1em; margin-right: 8px" />-->
                                    <!--&lt;!&ndash;<span>&ndash;&gt;-->
                                    <!--&lt;!&ndash;<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ba633cb8=""><path fill="currentColor" d="M128 192h768v128H128V192zm0 256h512v128H128V448zm0 256h768v128H128V704zm576-352 192 160-192 128V352z"></path></svg>&ndash;&gt;-->
                                    <!--&lt;!&ndash;</span>&ndash;&gt;-->
                                    <!--</div>-->


                                    <span class="el-dropdown-link" style="display: flex;justify-content: center;"> <img
                                            src="media/icons/duotune/general/gen059.svg"
                                            style="width: 16px;height: 16px;" alt="img"/></span>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item disabled>Edit</el-dropdown-item>
                                            <el-dropdown-item @click="showStatement(wallet.row.id)"> Statement
                                            </el-dropdown-item>
                                            <el-dropdown-item @click="showAdjustment(wallet.row)">Adjustment
                                            </el-dropdown-item>
                                            <el-dropdown-item>Withdraw</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
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
                            style="float: right;margin-top: 10px"
                            @size-change="updatePageSize"
                            @current-change="updatePageNumber"
                            background
                    >
                    </el-pagination>
                </div>

            </div>
        </div>
    </div>
    <el-drawer
            v-model="statementDrawer"
            title="Wallet Statement"
            :direction="'rtl'"
            size="1500px"
            :before-close="handleClose"
    >
        <el-table :data="walletStatementsRef" style="width: 100%" height="600" size="default" v-loading="loadingRef">
            <el-table-column type="expand" fixed width="20">
                <template #default="walletStatement">
                    <p style="margin-left: 10px">Reason: <br/>{{ walletStatement.row.remarks }}</p>
                </template>
            </el-table-column>
            <el-table-column prop="id" label="ID" width="80"/>

            <el-table-column prop="merchantId" label="Merchant" width="250">
                <template #default="walletStatement">
                    {{walletStatement.row.merchant? (walletStatement.row.merchant.name +"-"+walletStatement.row.merchantId ):"-"}}
                </template>
            </el-table-column>
            <el-table-column prop="walletId" label="Wallet" width="250">
                <template #default="walletStatement">
                    {{walletStatement.row.wallet? (walletStatement.row.wallet.name +"-"+walletStatement.row.walletId):"-"}}
                </template>
            </el-table-column>
            <el-table-column prop="type" label="Type" width="130"/>
            <el-table-column prop="currency" label="currency" width="120"/>
            <el-table-column prop="balanceType" label="Change Balance" width="200"/>
            <el-table-column prop="amount" label="Change Amount" width="200"/>
            <el-table-column prop="availableBalance" label="Available Balance" width="160"/>
            <el-table-column prop="unavailableBalance" label="Unavailable Balance" width="170"/>
            <el-table-column prop="createdAt" label="Created At" width="250">
                <template #default="walletStatement">
                    {{ DateTimeUtils.parseDateTime(walletStatement.row.createdAt) }}
                </template>
            </el-table-column>

            <el-table-column prop="updatedAt" label="Updated At" width="250">
                <template #default="walletStatement">
                    {{ DateTimeUtils.parseDateTime(walletStatement.row.updatedAt) }}
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                v-model:currentPage="walletStatementPageNumberRef"
                :page-size="walletStatementPageSizeRef"
                :small="small"
                :page-sizes="[20, 30, 40, 50]"
                layout="total,sizes, prev, pager, next"
                :total="walletStatementTotalRef"
                style="float: right;margin-top: 10px"
                background
                @size-change="updateWalletStatementPageSize"
                @current-change="updateWalletStatementPageNumber"
        >
        </el-pagination>
    </el-drawer>

    <el-drawer
            v-model="adjustmentDrawer"
            title="Wallet Adjustment"
            :direction="'rtl'"
            size="800px"
            v-loading="loadingRef"
            :before-close="handleClose"
    >

        <div style="display: flex;justify-content: center;margin-bottom: 15px ">

            <div class="card card-flush"
                 style="width: 700px; border-color: lightgray;border-style:solid;border-width: 1px">

                <div class="card-body py-5">

                    <el-descriptions
                            class="margin-top"
                            :title="selectWallet? selectWallet.name :'-'"
                            :column="3"
                            v-loading="loadingRef"
                    >
                        <!--<template #extra>-->
                        <!--<button type="button" class="btn btn-sm btn-light-primary" @click="displayTransaction">-->
                        <!--Transaction history-->
                        <!--</button>-->
                        <!--</template>-->

                        <el-descriptions-item label="Wallet ID:"> {{selectWallet? selectWallet.id : "-"}}
                        </el-descriptions-item>
                        <el-descriptions-item label="Merchant ID:">{{selectWallet? selectWallet.merchantId : "-"}}
                        </el-descriptions-item>
                        <el-descriptions-item label="Available Balance:">
                            {{selectWallet? (selectWallet.availableBalance + " "+ selectWallet.currency): "-"}}
                        </el-descriptions-item>
                        <el-descriptions-item label="Unavailable Balance:">
                            {{selectWallet? (selectWallet.unavailableBalance + " " + selectWallet.currency):"-"}}
                        </el-descriptions-item>
                        <el-descriptions-item label="Status:">
                            <span class="badge badge-light-success" v-if="selectWallet.enabled">Active</span>
                            <span class="badge badge-light-danger" v-if="!selectWallet.enabled">Disabled</span>
                        </el-descriptions-item>
                    </el-descriptions>
                </div>
            </div>
        </div>

        <el-form ref="adjustFormRef" :model="adjustForm" label-width="170px" label-position="left"
                 v-loading="loadingRef"
                 style="width: 700px">

            <el-form-item label="Adjust Balance Type" required prop="balanceType">
                <el-select v-model="adjustForm.balanceType" placeholder="please select a type"
                           style="width: 100%">
                    <el-option label="Available Balance" value="Available"></el-option>
                    <el-option label="Unavailable Balance" value="Unavailable"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="Adjustment" required prop="amount">

                <el-input
                        v-model="adjustForm.amount"
                        placeholder="Please input a amount"
                        class="input-with-select"
                        type="number"
                >
                    <template #prepend>
                        <el-select v-model="adjustForm.adjustType" placeholder="Type" style="width: 130px;">
                            <el-option label="Increase" value="increase"></el-option>
                            <el-option label="Decrease" value="decrease"></el-option>

                        </el-select>
                    </template>
                    <template #append>
                        {{selectWallet? selectWallet.currency:"-"}}
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="Reason" required prop="reason">

                        <textarea
                                :rows="2"
                                type="textarea"
                                style="width: 100%"
                                placeholder="Please input the reason for adjustment"
                                class="el-textarea__inner"
                                v-model.lazy="adjustForm.reason"
                        >
                         </textarea>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="confirmAdjust">Confirm</el-button>
            </el-form-item>
        </el-form>


    </el-drawer>

</template>

<script lang="ts">
  import { defineComponent, onMounted, onUnmounted } from "vue";
  import { useStore } from "vuex";
  import { Actions } from "../../store/enums/StoreEnums";
  import { getIllustrationsPath } from "@/core/helpers/assets";
  import { getMerchantRequest } from "@/latipay/apis/services/MerchantsService";
  import { reactive } from "vue";
  import { unref, ref } from "vue";
  import { getWalletsRequest } from "@/latipay/apis/services/WalletsService";
  import { reinitializeComponents } from "@/core/plugins/keenthemes";
  import { DateTimeUtils } from "@/latipay/utils/DateTimeUtils";
  import { ElMessage } from "element-plus";
  import useClipboard from "vue-clipboard3";
  import { ArrowDown } from "@element-plus/icons-vue";
  import { ElMessageBox } from "element-plus";
  import {
    getWalletStatementsRequest,
    postWalletStatementRequest
  } from "@/latipay/apis/services/WalletStatementsService";
  import { PostWalletParameter } from "@/latipay/apis/models/walletStatement/WalletStatementsResponse";
  import { WalletsResponse } from "@/latipay/apis/models/wallet/WalletsResponse";
  import _ from "lodash";
  import { EnumsConstant } from "@/store/enums/constants";


  export class AdjustWallet {
    availableBalance = 0;
    createdAt = "";
    currency = "";
    enabled = true;
    id = 0;
    merchantId = 0;
    name = "";
    slug = "";
    unavailableBalance = 0;
    updatedAt = "";

  }


  class GroupWallet {
    currency = "";
    availableBalance = 0;
    unavailableBalance = 0;
    totolBalance = 0;
  }



  export default defineComponent({
    name: "merchantDetail",
    components: {},
    props: {
      id: Number
    },
    setup(props) {
      const store = useStore();
      const id = props.id ? props.id : 0;
      //
      const pageNumber = ref(1);
      const pageSize = ref(20);
      const pageBalanceNumber = ref(1);
      const pageBalanceSize = ref(20);
      const sort = ref<string | null>(null);
      const currencies = EnumsConstant.CurrencyCode;
      const fiatCurrencyCode = EnumsConstant.FiatCurrencyCode;
      const loading = ref(false);

      const isBalanceActive = ref(true);
      const isRiskActive = ref(false);
      const isSettingActive = ref(false);
      const isProfileActive = ref(false);
      const isWalletActive = ref(false);

      const statementDrawer = ref(false);
      const adjustmentDrawer = ref(false);

      const currencyTab = ref('NZD');
      const showStatementWallet = ref(1);
      let groupedFiatWallets: GroupWallet[] = [];
      let groupedShowFiatWallets: GroupWallet[] = [];
      let groupedCryptoWallets: GroupWallet[] = [];
      const { toClipboard } = useClipboard();
      const { errorRef, merchantRef, getMerchant } = getMerchantRequest();

      const adjustFormRef = ref();
      const loadingRef = ref(false);
      const selectWallet = ref(new AdjustWallet());
      const adjustForm = reactive({
        adjustType: "",
        balanceType: "",
        amount: "",
        reason: ""
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


      const fetchMerchant = async (id: number) => {
        loadingRef.value = true;
        await getMerchant(id);
        loadingRef.value = false;
      };

      const {
        walletsRef,
        totalRef,
        pageNumberRef,
        pageSizeRef,
        getWallets
      } = getWalletsRequest();

      const {
        walletsRef : balanceWalletsRef,
        totalRef : balanceTotalRef,
        pageNumberRef: balancePageNumberRef,
        pageSizeRef : balancePageSizeRef,
        getWallets : getBalanceWallets
      } = getWalletsRequest();


      const getData = async () => {
        loadingRef.value = true;

        // await updateQueries();
        await getWallets(
          id,
          null,
          sort.value,
          pageNumber.value,
          pageSize.value
        );
        reinitializeComponents();

        loadingRef.value = false;

        console.log(walletsRef.value);


        // groupedWallets = _.groupBy(walletsRef.value, wallet => wallet.currency);

        reinitializeComponents();

        await showFiatCrypto();
        // groupedFiatWallets = (Object.entries(groupedWallets) as unknown as Array<String>).filter(it => currencies.includes(it[0]));
        console.log(groupedFiatWallets);
      };

      const getBalanceData = async () => {
        loadingRef.value = true;

        // await updateQueries();
        await getBalanceWallets(
          id,
          currencyTab.value,
          sort.value,
          pageBalanceNumber.value,
          pageBalanceSize.value
        );
        reinitializeComponents();

        loadingRef.value = false;

        console.log(balanceWalletsRef.value);



      };

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

      const updateWalletStatementPageSize = async (val: number) => {
        console.log(`${val} items per page`);
        walletStatementPageSizeRef.value = val;
        await getTransactionsData(showStatementWallet.value);
      };
      const updateWalletStatementPageNumber = async (val: number) => {
        console.log(`current page: ${val}`);
        walletStatementPageNumberRef.value = val;
        await getTransactionsData(showStatementWallet.value);
      };

      const updateBalanceWalletPageSize = async (val: number) => {
        console.log(`${val} items per page`);
        balancePageSizeRef.value = val;
        await getBalanceData();
      };
      const updateBalanceWalletPageNumber = async (val: number) => {
        console.log(`current page: ${val}`);
        balancePageNumberRef.value = val;
        await getBalanceData();
      };

      const showCurrencyWallet = async (currency: string) => {
        console.log(currency);
        currencyTab.value = currency;

        await getBalanceData();
      };


      const chooseProfile = async () => {
        isProfileActive.value = true;
        isWalletActive.value = false;
        isBalanceActive.value = false;
        isRiskActive.value = false;
        isSettingActive.value = false;
        reinitializeComponents();

      };
      const chooseWallet = async () => {
        isProfileActive.value = false;
        isWalletActive.value = true;
        isBalanceActive.value = false;
        isRiskActive.value = false;
        isSettingActive.value = false;
        reinitializeComponents();
      };
      const chooseBalance = async () => {
        isProfileActive.value = false;
        isWalletActive.value = false;
        isBalanceActive.value = true;
        isRiskActive.value = false;
        isSettingActive.value = false;
        reinitializeComponents();

      };
      const chooseRisk = async () => {
        isProfileActive.value = false;
        isWalletActive.value = false;
        isBalanceActive.value = false;
        isRiskActive.value = true;
        isSettingActive.value = false;
        reinitializeComponents();

      };
      const chooseSetting = async () => {
        isProfileActive.value = false;
        isWalletActive.value = false;
        isBalanceActive.value = false;
        isRiskActive.value = false;
        isSettingActive.value = true;
        reinitializeComponents();

      };


      onMounted(async () => {
        // setCurrentPageTitle("Merchant " + props.id);
        await fetchMerchant(id);
        await getData();
        await getBalanceData();


      });

      const showFiatCrypto = async () => {

        loadingRef.value = true;
        let groupedWallets = _.mapValues(_.groupBy(walletsRef.value, "currency"),
          clist => clist.map(car => _.omit(car, "currency")));
        console.log(Object.entries(groupedWallets));

        if (Object.entries(groupedWallets) !== []) {
          for (let i in Object.entries(groupedWallets)) {


            if (fiatCurrencyCode.map(it => it.code).includes(Object.entries(groupedWallets)[i][0])) {
              console.log(Object.entries(groupedWallets)[i][0]);

              let newFiatWallet = new GroupWallet();
              newFiatWallet.currency = Object.entries(groupedWallets)[i][0];
              newFiatWallet.availableBalance = Object.entries(groupedWallets)[i][1].map(it => it.availableBalance).reduce((partialSum, a) => partialSum + a, 0);
              newFiatWallet.unavailableBalance = Object.entries(groupedWallets)[i][1].map(it => it.unavailableBalance).reduce((partialSum, a) => partialSum + a, 0);
              console.log(newFiatWallet);
              newFiatWallet.totolBalance = newFiatWallet.availableBalance + newFiatWallet.unavailableBalance
              groupedFiatWallets.push(newFiatWallet);


            } else {

              let newCryptoWallet = new GroupWallet();
              newCryptoWallet.currency = Object.entries(groupedWallets)[i][0];
              newCryptoWallet.availableBalance = Object.entries(groupedWallets)[i][1].map(it => it.availableBalance).reduce((partialSum, a) => partialSum + a, 0);
              newCryptoWallet.unavailableBalance = Object.entries(groupedWallets)[i][1].map(it => it.unavailableBalance).reduce((partialSum, a) => partialSum + a, 0);
              console.log(newCryptoWallet);
              newCryptoWallet.totolBalance = newCryptoWallet.availableBalance + newCryptoWallet.unavailableBalance
              groupedCryptoWallets.push(newCryptoWallet);
            }
          }
        }
        reinitializeComponents();
        loadingRef.value = false;
        groupedShowFiatWallets = groupedFiatWallets;
      }

      const copySlug = async (slug: string) => {
        try {
          await toClipboard(slug);
          ElMessage({
            showClose: true,
            message: "Copy successfully!",
            type: "success"
          });
        } catch (e) {
          console.error(e);
        }
      };

      const showStatement = async (val: number) => {

        statementDrawer.value = true;
        showStatementWallet.value = val;
        await getTransactionsData(val);
      };

      const showAdjustment = async (wallet: WalletsResponse) => {
        adjustmentDrawer.value = true;
        loadingRef.value = true;

        console.log(wallet);
        selectWallet.value.availableBalance = wallet.availableBalance;
        selectWallet.value.currency = wallet.currency;
        selectWallet.value.unavailableBalance = wallet.unavailableBalance;
        selectWallet.value.enabled = wallet.enabled;
        selectWallet.value.id = wallet.id;
        selectWallet.value.merchantId = wallet.merchantId;
        selectWallet.value.name = wallet.name;

        loadingRef.value = false;

        console.log(selectWallet);

      };


      const handleClose = (done: () => void) => {
        ElMessageBox.confirm("Are you sure you want to close this?")
          .then(() => {
            done();
          })
          .catch(() => {
            // catch error
          });
      };

      const calculateSum = async (i) => {

        console.log("343");
        console.log(i);
        if (i) {
          // for () ;

          console.log("343");

        }
      };

      const {
        walletStatementsRef,
        totalRef: walletStatementTotalRef,
        pageNumberRef: walletStatementPageNumberRef,
        pageSizeRef: walletStatementPageSizeRef,
        getWalletStatements
      } = getWalletStatementsRequest();

      const getTransactionsData = async (val) => {
        loadingRef.value = true;

        // await updateQueries();
        await getWalletStatements(
          null,
          val,
          null,
          null,

          sort.value,
          walletStatementPageNumberRef.value,
          walletStatementPageSizeRef.value
        );
        reinitializeComponents();

        loadingRef.value = false;

        console.log(walletStatementsRef);
      };


      const confirmAdjust = async () => {

        console.log("123213");
        const form = unref(adjustFormRef);
        if (!form) {
          return;
        }
        try {

          await form.validate();
          console.log(adjustForm);
          if (+adjustForm.amount <= 0) {
            failAlert("Input amount must be larger than 0.");

          } else if(!adjustForm.adjustType){
            failAlert("Please select increase or decrease");


          } else {

            let newAdjust = new PostWalletParameter();
            newAdjust.balanceType = adjustForm.balanceType;
            newAdjust.merchantId = +selectWallet.value.merchantId;
            newAdjust.walletId = +selectWallet.value.id;
            if (adjustForm.adjustType === "increase") {
              newAdjust.amount = +adjustForm.amount;
            } else if (adjustForm.adjustType === "decrease") {
              newAdjust.amount = +adjustForm.amount * -1;
            }
            newAdjust.remarks = adjustForm.reason;

            await postAdjustData(newAdjust);

          }
        } catch (err) {
          console.log(err);
        }

      };
      const { postErrorRef, postWalletStatement } = postWalletStatementRequest();
      const postAdjustData = async (data: PostWalletParameter) => {
        loadingRef.value = true;
        await postWalletStatement(data);

        if (!postErrorRef.value) {
          loadingRef.value = false;

          successAlert("Adjust wallet balance successfully!");

          adjustForm.adjustType = "";
          adjustForm.amount = "";
          adjustForm.balanceType = "";
          adjustForm.reason = "";
          selectWallet.value = new AdjustWallet();
          adjustmentDrawer.value = false;
          await getData();

          const form = unref(adjustFormRef);
          await form.clearValidate();

        } else {
          failAlert("Something wrong happened! Please have a check.");
          loadingRef.value = false;
        }


      };


      return {
        getIllustrationsPath,
        loadingRef,
        merchantRef,
        errorRef,
        getData,
        walletsRef,
        totalRef,
        pageNumberRef,
        pageSizeRef,
        balancePageNumberRef,
        balancePageSizeRef,
        balanceTotalRef,
        DateTimeUtils,
        updatePageSize,
        updatePageNumber,
        isProfileActive,
        isWalletActive,
        isBalanceActive,
        isRiskActive,
        isSettingActive,
        chooseProfile,
        chooseWallet,
        copySlug,
        handleClose,
        statementDrawer,
        showStatement,
        walletStatementTotalRef,
        walletStatementPageNumberRef,
        walletStatementPageSizeRef,
        updateWalletStatementPageSize,
        updateWalletStatementPageNumber,
        walletStatementsRef,
        adjustmentDrawer,
        adjustForm,
        confirmAdjust,
        showAdjustment,
        selectWallet,
        adjustFormRef,
        chooseBalance,
        chooseRisk,
        chooseSetting,
        groupedFiatWallets,
        groupedCryptoWallets,
        currencies,
        fiatCurrencyCode,
        groupedShowFiatWallets,
        showFiatCrypto,
        currencyTab,
        showCurrencyWallet,
        updateBalanceWalletPageSize,
        updateBalanceWalletPageNumber,
        showStatementWallet,
        balanceWalletsRef,


      };

    },
    data() {
      return {};
    },
    methods: {
      async resetFormFields() {




        (this.$refs["adjustFormRef"] as any).resetFields();
      }



    }

  });
</script>
<style scoped>
    .example-showcase .el-dropdown-link {
        cursor: pointer;
        color: var(--el-color-primary);
        display: flex;
        align-items: center;
    }

    .input-with-select .el-input-group__prepend {
        background-color: var(--el-fill-color-blank);
    }

    #something {
        display: none;
    }

    #something:target {
        display: block;
    }

</style>
