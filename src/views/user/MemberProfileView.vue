<template>
  <div class="container min-vh-100 my-5">
    <h2>會員中心</h2>
    <Loading v-if="isLoading" />
    <div v-else class="info p-2 mt-5">
      <div class="infoBox">
        <el-tabs tabPosition="top" style="height: 200px; width: 100%" class="demo-tabs">
          <el-tab-pane label="名稱"
            ><span>{{ userInfo.userName }}</span>
            <el-button
              type="primary"
              :icon="Edit"
              circle
              class="ms-5"
              @click="nameComfirm = true"
            />
          </el-tab-pane>
          <el-tab-pane label="信箱"
            ><span class="email">{{ userInfo.email }}</span
            ><el-button
              type="primary"
              :icon="Edit"
              circle
              class="ms-5"
              @click="emailComfirm = true"
          /></el-tab-pane>
          <el-tab-pane label="密碼"
            ><span>*********</span
            ><el-button
              type="primary"
              :icon="Edit"
              circle
              class="ms-5"
              @click="passwordComfirm = true"
          /></el-tab-pane>
          <el-tab-pane label="生日"
            ><span>{{ myBirthdate }}</span
            ><el-button
              type="primary"
              :icon="Edit"
              circle
              class="ms-5"
              @click="birthdateComfirm = true"
          /></el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
  <el-dialog
    v-model="nameComfirm"
    title="輸入新的會員名稱"
    width="90vw"
    :style="{ maxWidth: '500px' }"
  >
    <el-form :model="newUserName">
      <el-form-item>
        <el-input v-model="newUserName" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="nameComfirm = false">取消</el-button>
        <el-button type="primary" @click="saveUserName"> 更新 </el-button>
      </div>
    </template>
  </el-dialog>
  <el-dialog
    v-model="nameComfirm"
    title="輸入新的會員信箱"
    width="90vw"
    :style="{ maxWidth: '500px' }"
  >
    <el-form :model="newUserEmail">
      <el-form-item>
        <el-input v-model="newUserEmail" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="emailComfirm = false">取消</el-button>
        <el-button type="primary" @click="saveUserEmail"> 更新 </el-button>
      </div>
    </template>
  </el-dialog>
  <el-dialog
    v-model="nameComfirm"
    title="輸入新的會員名稱"
    width="90vw"
    :style="{ maxWidth: '500px' }"
  >
    <el-form :model="newUserPassword">
      <el-form-item>
        <el-input v-model="newUserPassword" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="passwordComfirm = false">取消</el-button>
        <el-button type="primary" @click="saveUserPassword"> 更新 </el-button>
      </div>
    </template>
  </el-dialog>
  <el-dialog
    v-model="nameComfirm"
    title="輸入新的會員名稱"
    width="90vw"
    :style="{ maxWidth: '500px' }"
  >
    <el-form :model="newUserBirthdate">
      <el-form-item>
        <el-input v-model="newUserBirthdate" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="birthdateComfirm = false">取消</el-button>
        <el-button type="primary" @click="saveUserBirthdate"> 更新 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import Loading from '@/components/Loading.vue';
import { Iphone, Location, OfficeBuilding, Tickets, Edit, User } from '@element-plus/icons-vue';

const AuthStore = useAuthStore();
const { userInfo } = storeToRefs(AuthStore);
const myBirthdate = computed(() => new Date(userInfo.value.birthdate).toLocaleDateString());
const isLoading = ref(false);

const size = ref('default');

const blockMargin = computed(() => {
  const marginMap = {
    large: '32px',
    default: '28px',
    small: '24px',
  };
  return {
    marginTop: marginMap[size.value] || marginMap.default,
  };
});

const nameComfirm = ref(false);
const emailComfirm = ref(false);
const passwordComfirm = ref(false);
const birthdateComfirm = ref(false);

const newUserName = ref('');
const newUserEmail = ref('');
const newUserPassword = ref('');
const newUserBirthdate = ref('');

const formLabelWidth = ref('120px');

const saveUserName = async () => {
  await AuthStore.updateUserName(newUserName.value);
  nameComfirm.value = false;
};

const saveUserBirthdate = async () => {
  await AuthStore.updateUserBirthdate(newUserBirthdate.value);
  birthdateInputBox.value = false;
};

const saveUserEmail = async () => {
  await AuthStore.updateUserEmail(newUserEmail.value);
  emailInputBox.value = false;
};

const saveUserPassword = async () => {
  await AuthStore.updateUserPassword(newUserPassword.value);
  passwordInputBox.value = false;
};

onMounted(async () => {
  if (!userInfo.value.id) {
    isLoading.value = true;
    await AuthStore.getUserInfo();
    isLoading.value = false;
  }
});
</script>

<style scoped>
.el-tabs {
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  align-items: center;
}

el-dialog {
  max-width: 300px;
}
.el-descriptions {
  margin-top: 20px;
}
.el-tab-pane span {
  font-weight: 900;
  font-size: 30px;
}
.el-tab-pane {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.el-tab-pane .email {
  font-size: 15px;
}

h2 {
  display: flex;
  justify-content: center;
  /* border: 3px solid #3fd0a4ed; */
  /* border-radius: 10px; */
}
.info {
  display: flex;
  justify-content: center;
  max-width: 100vw;
}
.infoBox {
  border: 3px solid #a8ae32;
  border-radius: 10px;
  height: auto;
  padding: 10px;
  width: 95%;
  max-width: 500px;
}
</style>
