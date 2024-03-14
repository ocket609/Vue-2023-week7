<!-- eslint-disable vue/require-v-for-key -->
<template>
  <h2>訂單</h2>
  <div class="container">
    <table class="table mt-4">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>訂單編號</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="item in orders" :key="item.id">
          <tr v-if="orders.length" :class="{ 'text-secondary':!item.is_paid }">
            <!-- 購買時間 -->
            <td>{{ $filters.date(item.create_at) }}</td>
            <!-- Email -->
            <td>{{ item.user.email }}</td>
            <!-- 訂單編號 -->
            <td>{{ item.id }}</td>
            <!-- 購買款項 -->
            <td>
              <p>共 {{ item.num }} 項</p>
              <ul>
                <li v-for="i in item.products" :key="i.id">
                  {{ i.product.title }} / 數量：{{ i.product.unit }}
                </li>
              </ul>
            </td>
            <!-- 應付金額 -->
            <td>{{ item.total }}</td>
            <!-- 是否付款 -->
            <td>
              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  :id="`paidSwitch${item.id}`"
                  v-model="item.is_paid"
                  @change="updatePaid(item)" >
                <label
                  class="form-check-label"
                  :for="`paidSwitch${item.id}`">
                  <span v-if="item.is_paid">已付款</span>
                  <span v-else>未付款</span>
                </label>
              </div>
            </td>
            <!-- 編輯 -->
            <td>
              <div class="btn-group">
                <button class="btn btn-outline-primary btn-sm" type="button" @click.prevent="openModal(item)">檢視</button>
                <button class="btn btn-outline-danger btn-sm" type="button" @click.prevent="delOpenModel(item)">刪除</button>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <!-- Modal -->
    <!-- 傳入子元件 OrderModal -->
    <OrderModal
      ref="orderModal"
      :order="tempOrder"
      @update-paid="updatePaid">
    </OrderModal>
    <!-- ref="orderModal" 用於抓取該元件 -->
    <!-- :order="tempOrder" 將父元件的訂單資訊內容傳入子元件 -->
    <!-- @update-paid="updatePaid" 則是用於監聽子元件的 update-paid 函式 -->

    <!-- 傳入子元件 DelModal -->
    <DelModal
      ref="delModal"
      :item="tempOrder"
      @del-item="delOrder">
    </DelModal>
    <!-- ref="delModal" 用於抓取該元件 -->
    <!-- :item="tempOrder" 將父元件的訂單資訊內容傳入子元件 -->
    <!-- -- -- -- -->
    <!-- 參考老師DEMO -->
    <!-- <div id="delOpenModel" ref="delOpenModel" class="modal fade" tabindex="-1"
                aria-labelledby="delOpenModelLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 id="delOpenModelLabel" class="modal-title">
              <span>刪除</span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            是否刪除
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-danger" @click="delOrder">
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div> -->
  </div>
  <RouterView></RouterView>
</template>

<script>
import axios from 'axios'
import OrderModal from '../../components/OrderModal.vue'
import DelModal from '../../components/DelModal.vue'

const { VITE_URL, VITE_NAME } = import.meta.env

export default {
  data () {
    return {
      orders: {},
      tempOrder: {},
      currentPage: 1,
      pagination: {}
    }
  },
  components: {
    OrderModal,
    DelModal
  },
  methods: {
    // 取得訂單
    getOrder (currentPage = 1) {
      const url = `${VITE_URL}/api/${VITE_NAME}/admin/orders?page=${currentPage}`
      // 當前頁面
      this.currentPage = currentPage
      axios
        .get(url)
        .then((res) => {
          console.log(res.data.orders)
          this.orders = res.data.orders
          this.pagination = res.data.pagination
        })
        .catch((err) => {
          console.log(err.response.data.message)
        })
    },
    openModal (item) {
      // 鈕觸發 openModal 函式後，將當前訂單資訊重新賦值給 tempOrder
      this.tempOrder = { ...item }
      // 宣告一個 orderComponent 變數用於抓取子元件 orderModal
      const orderComponent = this.$refs.orderModal
      // 並調用 openModal 函式開啟 modal
      orderComponent.openModal()
    },
    updatePaid (item) {
      const url = `${VITE_URL}/api/${VITE_NAME}/admin/order/${item.id}`
      const paid = {
        is_paid: item.is_paid
      }
      axios
        .put(url, { data: paid })
        .then((res) => {
          console.log(res.data.orders)
          // 串接 API 成功後，同樣宣告一個 orderComponent 變數並調用 hideModal 函式關閉 modal
          const orderComponent = this.$refs.orderModal
          orderComponent.hideModal()

          // 重新取得訂單資料更新畫面
          this.getOrder(this.currentPage)
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },
    delOpenModel (item) {
      // 鈕觸發 openModal 函式後，將當前訂單資訊重新賦值給 tempOrder
      this.tempOrder = { ...item }
      // 宣告一個 delComponent 變數用於抓取子元件
      const delComponent = this.$refs.delModal
      // 並調用 openModal 函式開啟 modal
      delComponent.openModal()
    },
    delOrder () {
      const url = `${VITE_URL}/api/${VITE_NAME}/admin/order/${this.tempOrder.id}`
      axios
        .delete(url)
        .then((res) => {
          const delComponent = this.$refs.delModal
          delComponent.hideModal()
          // 重新取得訂單資料更新畫面
          this.getOrder(this.currentPage)
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    }
    /* delOrder () {
      const url = `${VITE_URL}/api/${VITE_NAME}/admin/order/${this.tempOrder.id}`
      axios
        .delete(url, {
          data: this.tempOrder
        })
        .then((res) => {
          console.log(res.data)
          // 重新取得列表
          this.getOrder()
          // 新增成功後關閉 Modal
          const delComponent = this.$refs.delModal
          delComponent.hideModal()
        })
        .catch((err) => {
          console.log(err)
          alert(err.data.message)
        })
    } */
  },
  mounted () {
    this.getOrder()
  }
}
</script>

<style></style>
