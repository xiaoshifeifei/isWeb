<template>
  <div>
    <div class="gva-search-box">
      <el-form ref="searchForm" :inline="true" :model="searchInfo">
        <el-form-item
          :label="t('tableColumn.placeholder') + t('tableColumn.time')"
        >
          <el-date-picker
            :style="{ width: '250px' }"
            v-model="searchInfo.day"
            type="date"
            :disabled-date="disabledDate"
            placeholder="请选择时间"
            @change="handleDateChange"
            :shortcuts="shortcuts"
            :size="size"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="search" @click="onSubmit">
            {{ t("general.search") }}
          </el-button>
          <el-button icon="refresh" @click="onReset">
            {{ t("general.reset") }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="gva-table-box">
      <el-table
        border
        ref="multipleTable"
        :data="tableData"
        @selection-change="handleSelectionChange"
        highlight-current-row
        :header-cell-style="{
          backgroundColor: '#217E8C',
          Color: '#FFF',
        }"
        :row-class-name="tableRowClassName"
      >
        <!-- <el-table-column
          align="center"
          min-width="90"
          :label="t('tableColumn.days')"
          prop="day"
        >
        </el-table-column> -->
        <el-table-column
          align="center"
          min-width="90"
          label="站点ID"
          prop="siteId"
        >
          <template #default="scope">
            {{ scope.row.siteId === 0 ? "Total" : scope.row.siteId }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="一日在线人数"
          min-width="120"
          prop="oneDay"
        >
        </el-table-column>

        <el-table-column
          align="center"
          min-width="120"
          label="次留率（%）"
          prop="oneDayRatio"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="三日在线人数"
          min-width="120"
          prop="threeDay"
        >
        </el-table-column>

        <el-table-column
          align="center"
          min-width="120"
          label="三日留存率（%）"
          prop="threeDayRatio"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="七日在线人数"
          min-width="120"
          prop="sevenDay"
        >
        </el-table-column>

        <el-table-column
          align="center"
          min-width="120"
          label="七日留存率（%）"
          prop="sevenDayRatio"
        >
        </el-table-column>
      </el-table>
      <div class="gva-pagination">
        <el-pagination
          :current-page="page"
          :page-size="pageSize"
          :page-sizes="[10, 30, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
    </div>
    <el-drawer
      v-if="dialogFormVisible"
      v-model="dialogFormVisible"
      size="100%"
      append-to-body
      :before-close="closeDialog"
      :show-close="false"
    >
      <template #header>
        <div class="flex justify-between items-center">
          <span class="text-lg">{{ dialogTitle }}</span>
          <div>
            <el-button @click="closeDialog">
              {{ t("components.commandMenu.close") }}
            </el-button>
          </div>
        </div>
      </template>

      <el-form
        class="myForm"
        ref="apiForm"
        :model="form"
        :rules="rules"
        label-width="120px"
      >
        <el-row class="w-full">
          <el-col :span="12">
            <el-form-item :label="t('tableColumn.days')">
              <el-input v-model="form.day" readonly autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="t('tableColumn.bet')">
              <el-input v-model="form.bet" readonly autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="w-full">
          <el-col :span="12">
            <el-form-item :label="t('tableColumn.win')">
              <el-input v-model="form.win" readonly autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="t('tableColumn.winLoss')">
              <el-input v-model="form.winLoss" readonly autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <template v-for="(item, key, index) in form.items" :key="index">
          <div class="nameKey">{{ key }}：</div>
          <div class="temple">
            <div v-for="(item1, key1, index1) in item" :key="index1">
              <div v-if="key1 !== 'origins'" class="temp1">
                <el-form-item :label="t(`tableColumn.${key1}`)">
                  <el-input v-model="item[key1]" readonly autocomplete="off" />
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="origin">
            <div v-for="(item1, key1, index1) in item" :key="index1">
              <div v-if="key1 === 'origins'">
                <div class="nameKey1 pose">
                  {{ t(`tableColumn.${key1}`) }}：
                </div>
                <div v-for="(item2, key2, index2) in item[key1]" :key="index2">
                  <div class="nameKey1" v-if="key2 === 'level'">
                    {{ t(`tableColumn.levels`) }}：
                  </div>
                  <div class="nameKey1" v-else>
                    {{ t(`tableColumn.${key2}`) }}：
                  </div>
                  <div class="temple">
                    <div
                      v-for="(item3, key3, index3) in item[key1][key2]"
                      :key="index3"
                    >
                      <div class="temp1">
                        <el-form-item :label="t(`tableColumn.${key3}`)">
                          <el-input
                            v-model="item[key1][key2][key3]"
                            readonly
                            autocomplete="off"
                          />
                        </el-form-item>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </el-form>
    </el-drawer>
  </div>
</template>
  
  <script setup>
import { getAccountRetained } from "@/api/userInfo";
import { ElMessage } from "element-plus";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import dayjs from "dayjs";
import { useI18n } from "vue-i18n"; // added by mohamed hassan to support multilanguage
const { t } = useI18n(); // added by mohamed hassan to support multilanguage
const router = useRouter();
const route = useRoute();

defineOptions({
  name: "userInfo",
});

const page = ref(1);
const total = ref(0);
const pageSize = ref(10);
const tableData = ref([]);
const searchInfo = ref({});
const form = ref({});
const dialogFormVisible = ref(false);

const shortcuts = [
  {
    text: "Today",
    value: () => {
      const start = new Date();
      return start;
    },
  },
  {
    text: "Yesterday",
    value: () => {
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24);
      return start;
    },
  },
];

const dataGet = (dateStr) => {
  let date = new Date(dateStr);
  let formattedDate =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    date.getDate().toString().padStart(2, "0") +
    " ";
  return formattedDate;
};

const seeFunc = async (row) => {
  let rows = JSON.parse(JSON.stringify(row));
  rows.day = dataGet(rows.day);
  form.value = rows;
  dialogFormVisible.value = true;
};
const handleDateChange = () => {
  if (searchInfo.value.day) {
    const stamp = new Date(searchInfo.value.day).getTime();
    const beijingTime = new Date(stamp).toISOString();
    searchInfo.value.day = beijingTime;
  }
};
const closeDialog = () => {
  initForm();
  dialogFormVisible.value = false;
};
const apiForm = ref(null);
const initForm = () => {
  apiForm.value.resetFields();
  form.value = {};
};
const onReset = () => {
  searchInfo.value = {};
};
// 搜索
const disabledDate = (time) => {
  return time.getTime() > Date.now();
};

const onSubmit = () => {
  page.value = 1;
  pageSize.value = 10;
  if (!searchInfo.value.day) {
    const stamp = new Date().getTime();
    const beijingTime = new Date(stamp).toISOString();
    searchInfo.value.day = beijingTime;
  }
  getTableData();
};

// 分页
const handleSizeChange = (val) => {
  pageSize.value = val;
  // getTableData();
};

const handleCurrentChange = (val) => {
  page.value = val;
  // getTableData();
};

// 查询
const getTableData = async () => {
  const table = await getAccountRetained({
    page: page.value,
    pageSize: pageSize.value,
    ...searchInfo.value,
  });
  if (table.code === 0) {
    tableData.value = table.data;
    total.value = table.data.total;
    page.value = table.data.page;
    pageSize.value = table.data.pageSize;
  }
};
const init = async () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // 月份从0开始，需要加1
  const day = currentDate.getDate();
  const dataSrc = year + "-" + month + "-" + day + " 00:00:00";
  const stamp = new Date(dataSrc).getTime();
  const beijingTime = new Date(stamp).toISOString();
  searchInfo.value.day = beijingTime;
  getTableData();
};
init();
// 批量操作
const handleSelectionChange = (val) => {
  if (val.length > 0) {
    let arr = [];
    val.forEach((item) => {
      arr.push(item.accountId);
    });
  }
};
const multipleTable = ref(null);

const tableRowClassName = ({ row, rowIndex }) => {
  if (rowIndex == 0) {
    return "warning-row";
  }
  if (rowIndex % 2 == 0) {
    return "warnBg";
  } else {
    return "";
  }
};
</script>
<style scoped lang="scss">
:deep(.el-table tr th .cell) {
  color: #fff !important;
}
:deep(.el-table .warnBg) {
  background-color: #c7e4ea;
  color: #000;
}

:deep(.el-table .warning-row) {
  background-color: #75c0c3 !important;
  color: #fff !important;
  font-weight: 700;
}
:deep(.el-table__body tr:hover > td) {
  background-color: #6dc58b !important;
}
:deep(.el-table__body tr.current-row > td) {
  background-color: #6dc58b !important;
}
</style>
  
  <style scoped lang="scss">
.warning {
  color: #dc143c;
}
.myForm {
  width: 70%;
  padding-bottom: 50px;
  margin: auto;
}
.nameKey {
  color: #000;
  font-weight: 700;
  font-size: 16px;
  margin: 20px 0;
}
.nameKey1 {
  color: #999;
  font-weight: 600;
  font-size: 14px;
  // margin: 10px 0;
}
.temple {
  display: flex;
  justify-content: flex-start;
}

.temp1 {
  width: 100%;
}
.origin {
  width: calc(100% - 50px);
  padding-left: 50px;
  margin-bottom: 30px;
}
.pose {
  // margin-left: -50px;
  color: #666;
}
</style>
  