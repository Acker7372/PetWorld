<template>
  <!-- Button trigger modal -->
  <div class="container min-vh-100 d-flex flex-column justify-content-between">
    <div class="d-flex flex-column justify-content-center">
      <button
        type="button"
        class="btn btn-primary mb-2 mt-2"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        ＋製作遺失協尋資訊卡
      </button>
      <LostPetCard />
    </div>

    <div v-if="lostPetData.length > 0" class="d-flex justify-content-center">
      <Pagination />
    </div>
  </div>

  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">寵物遺失資訊填寫</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitForm" class="needs-validation" novalidate>
            <div class="mb-3">
              <label for="pet-name" class="form-label">寵物照片</label>
              <input
                type="file"
                class="form-control"
                id="pet-image"
                @change="handleFileUpload"
                required
              />
              <div class="invalid-feedback">請上傳寵物圖片！</div>
            </div>
            <div class="mb-3">
              <label for="pet-name" class="form-label">寵物名稱</label>
              <input
                type="text"
                maxlength="10"
                class="form-control"
                id="pet-name"
                v-model="form.petName"
                required
              />
              <div class="invalid-feedback">請輸入寵物名稱！</div>
            </div>
            <div class="mb-3">
              <label for="pet-type" class="form-label">寵物種類</label>
              <select class="form-select" id="pet-type" v-model="form.petType" required>
                <option value="">選擇種類</option>
                <option value="貓">貓</option>
                <option value="狗">狗</option>
                <option value="其他">其他</option>
              </select>
              <div class="invalid-feedback">請選擇種類！</div>
            </div>
            <div class="mb-3">
              <label for="pet-breed" class="form-label">品種</label>
              <input
                type="text"
                maxlength="10"
                class="form-control"
                id="pet-breed"
                v-model="form.petBreed"
                required
              />
              <div class="invalid-feedback">請輸入寵物品種！</div>
            </div>
            <div class="mb-3">
              <label for="pet-color" class="form-label">毛色</label>
              <input
                type="text"
                maxlength="10"
                class="form-control"
                id="pet-color"
                v-model="form.petColor"
                required
              />
              <div class="invalid-feedback">請輸入寵物毛色！</div>
            </div>
            <div class="mb-3">
              <label for="lost-date" class="form-label">遺失日期</label>
              <input
                type="date"
                class="form-control"
                id="lost-date"
                v-model="form.lostDate"
                required
              />
              <div class="invalid-feedback">請選擇遺失日期！</div>
            </div>
            <div class="mb-3">
              <label for="lost-area" class="form-label">遺失縣市</label>
              <select class="form-select" id="lost-area" v-model="form.lostArea" required>
                <option value="">選擇縣市</option>
                <option value="台北市">台北市</option>
                <option value="新北市">新北市</option>
                <option value="基隆市">基隆市</option>
                <option value="宜蘭縣">宜蘭縣</option>
                <option value="桃園縣">桃園縣</option>
                <option value="新竹縣">新竹縣</option>
                <option value="新竹市">新竹市</option>
                <option value="苗栗縣">苗栗縣</option>
                <option value="台中市">台中市</option>
                <option value="彰化縣">彰化縣</option>
                <option value="南投縣">南投縣</option>
                <option value="雲林縣">雲林縣</option>
                <option value="嘉義縣">嘉義縣</option>
                <option value="嘉義市">嘉義市</option>
                <option value="台南市">台南市</option>
                <option value="高雄市">高雄市</option>
                <option value="屏東縣">屏東縣</option>
                <option value="花蓮縣">花蓮縣</option>
                <option value="台東縣">台東縣</option>
                <option value="澎湖縣">澎湖縣</option>
                <option value="金門縣">金門縣</option>
                <option value="連江縣">連江縣</option>
                <!-- 其他地區選項... -->
              </select>
              <div class="invalid-feedback">請選擇遺失縣市！</div>
            </div>
            <div class="mb-3">
              <label for="lost-Address" class="form-label">遺失地址</label>
              <input
                type="text"
                class="form-control"
                id="lost-Address"
                v-model="form.lostAddress"
                required
                maxlength="100"
              />
              <div class="invalid-feedback">請輸入遺失地址！</div>
            </div>
            <div class="mb-3">
              <label for="contact-number" class="form-label">聯絡電話</label>
              <input
                type="tel"
                class="form-control"
                id="contact-number"
                pattern="0[2-9][0-9]{7,8}"
                maxlength="10"
                v-model="form.contactNumber"
                @input="checkPhoneNumber"
                required
              />
              <div class="invalid-feedback">請輸入有效的電話號碼！</div>
            </div>
            <div class="mb-3">
              <label for="notes" class="form-label">備註（限制50字）</label>
              <textarea
                class="form-control"
                id="notes"
                rows="3"
                v-model="form.notes"
                maxlength="50"
              ></textarea>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
              <button type="submit" class="btn btn-primary">送出</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useAnimalsStore } from '@/stores/animals';
import { storeToRefs } from 'pinia';
import axios from 'axios';
import Modal from 'bootstrap/js/dist/modal';
import Pagination from '@/components/Pagination.vue';
import LostPetCard from '@/components/LostPetCard.vue';

const AnimalStore = useAnimalsStore();
const { data, lostPetData, isLoading } = storeToRefs(AnimalStore);
let modalInstance = null;

const form = ref({
  petName: '',
  petType: '',
  petBreed: '',
  petColor: '',
  lostDate: '',
  lostArea: '',
  lostAddress: '',
  contactNumber: '',
  notes: '',
  petImage: '',
});

const isInvalid = ref({
  petName: false,
  petType: false,
  petBreed: false,
  petColor: false,
  lostDate: false,
  lostArea: false,
  lostAddress: false,
  contactNumber: false,
  petImage: false,
});

const submitForm = async () => {
  // 檢查所有欄位
  for (const key in form.value) {
    if (key === 'notes') continue;
    isInvalid.value[key] = !form.value[key];
  }

  // 如果所有欄位都有效，則處理表單提交的邏輯
  if (!Object.values(isInvalid.value).includes(true)) {
    try {
      const imageFile = form.value.petImage;
      const response = await AnimalStore.saveLostPet(form.value, imageFile);
      console.log('Response:', response);
      alert('遺失資訊已送出！');
      modalInstance.hide();
      document.querySelector('.modal-backdrop').remove();
      await AnimalStore.getLostPetData();
      data.value = lostPetData.value;
    } catch (error) {
      console.error('Error:', error);
      alert('遺失資訊送出失敗！');
    }
  } else {
    // 如果有無效的欄位，則阻止表單提交並顯示錯誤訊息
    event.preventDefault();
    // 強制驗證所有欄位
    var forms = document.getElementsByClassName('needs-validation');
    Array.prototype.filter.call(forms, function (form) {
      form.classList.add('was-validated');
    });
  }
  // for (const key in form.value) {
  //   form.value[key] = '';
  // }
};

const handleFileUpload = (event) => {
  form.value.petImage = event.target.files[0];
};

if (data.value !== lostPetData.value) {
  isLoading.value = true;
  data.value = lostPetData.value;
  isLoading.value = false;
}

onMounted(async () => {
  try {
    isLoading.value = true;
    const modalElement = document.getElementById('exampleModal');
    modalInstance = new Modal(modalElement);
    await AnimalStore.getLostPetData();
    data.value = lostPetData.value;
    isLoading.value = false;
  } catch (error) {
    console.error('LostPetFinderView.vue onMounted error:', error);
  }
});
</script>

<style scoped>
.is-invalid {
  border-color: #dc3545;
}
.invalid-feedback {
  color: #dc3545;
}
</style>
