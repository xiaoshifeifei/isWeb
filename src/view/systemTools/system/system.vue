<template>
  <div class="system">
    <el-form
        ref="form"
        :model="config"
        label-width="320px"
    >
      <!--  System start  -->
      <el-collapse v-model="activeNames">
        <el-collapse-item
          :title="t('view.systemTools.system.systemConfig')"
          name="1"
        >
          <el-form-item :label="t('view.systemTools.system.portValue')">
            <el-input v-model.number="config.system.addr" />
          </el-form-item>
          <el-form-item :label="t('view.systemTools.system.dbType')">
            <el-select
                v-model="config.system['db-type']"
                style="width:100%"
            >
              <el-option value="mysql" />
              <el-option value="pgsql" />
            </el-select>
          </el-form-item>
          <el-form-item :label="t('view.systemTools.system.ossType')">
            <el-select
                v-model="config.system['oss-type']"
                style="width:100%"
            >
              <el-option value="local" />
              <el-option value="qiniu" />
              <el-option value="tencent-cos" />
              <el-option value="aliyun-oss" />
              <el-option value="huawei-obs" />
              <el-option value="cloudflare-r2" />
            </el-select>
          </el-form-item>
          <el-form-item :label="t('view.systemTools.system.blockMultiSignOn')">
            <el-checkbox v-model="config.system['use-multipoint']">{{ t('general.enable') }}</el-checkbox>
          </el-form-item>
          <el-form-item :label="t('view.systemTools.system.enableRedis')">
            <el-checkbox v-model="config.system['use-redis']">{{ t('general.enable') }}</el-checkbox>
          </el-form-item>
          <el-form-item :label="t('view.systemTools.system.ipLimitCount')">
            <el-input-number v-model.number="config.system['iplimit-count']" />
          </el-form-item>
          <el-form-item :label="t('view.systemTools.system.ipLimitTime')">
            <el-input-number v-model.number="config.system['iplimit-time']" />
          </el-form-item>
          <el-tooltip
            :content="t('view.systemTools.system.globalRoutePrefixNote')"
            placement="top-start"
          >
            <el-form-item :label="t('view.systemTools.system.globalRoutePrefix')">
              <el-input v-model="config.system['router-prefix']" />
            </el-form-item>
          </el-tooltip>
        </el-collapse-item>
        <el-collapse-item
          :title="t('view.systemTools.system.jwtSignature')"
          name="2"
        >
          <el-form-item :label="t('view.systemTools.system.jwtSignature')">
            <el-input v-model="config.jwt['signing-key']" />
          </el-form-item>
          <el-form-item :label="t('view.systemTools.system.expirartionSec')">
            <el-input v-model="config.jwt['expires-time']" />
          </el-form-item>
          <el-form-item :label="t('view.systemTools.system.bufferPeriodSec')">
            <el-input v-model="config.jwt['buffer-time']" />
          </el-form-item>
          <el-form-item :label="t('view.systemTools.system.issuer')">
            <el-input v-model="config.jwt.issuer" />
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item
          :title="t('view.systemTools.system.zapLogConfig')"
          name="3"
        >
          <el-form-item :label="t('view.systemTools.system.level')">
            <el-input v-model.number="config.zap.level" />
          </el-form-item>
          <el-form-item :label="t('view.systemTools.system.output')">
            <el-input v-model="config.zap.format" />
          </el-form-item>
          <el-form-item :label="t('view.systemTools.system.logPrefix')">
            <el-input v-model="config.zap.prefix" />
          </el-form-item>
          <el-form-item :label="t('view.systemTools.system.logFolder')">
            <el-input v-model="config.zap.director" />
          </el-form-item>
          <el-form-item :label="t('view.systemTools.system.encodeLevel')">
            <el-input v-model="config.zap['encode-level']" />
          </el-form-item>
          <el-form-item :label="t('view.systemTools.system.stackName')">
            <el-input v-model="config.zap['stacktrace-key']" />
          </el-form-item>
          <el-form-item :label="t('view.systemTools.system.logRetentionTime')">
            <el-input v-model.number="config.zap['retention-day']" />
          </el-form-item>
          <el-form-item :label="t('view.systemTools.system.showLine')">
            <el-checkbox v-model="config.zap['show-line']" />
          </el-form-item>
          <el-form-item :label="t('view.systemTools.system.outputConsole')">
            <el-checkbox v-model="config.zap['log-in-console']" />
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item
          :title="t('view.systemTools.system.redisAdminDBConfig')"
          name="4"
        >
          <el-form-item :label="t('view.systemTools.system.storehouse')">
            <el-input v-model.number="config.redis.db" />
          </el-form-item>
          <el-form-item :label="t('view.systemTools.system.address')">
            <el-input v-model="config.redis.addr" />
          </el-form-item>
          <el-form-item :label="t('view.systemTools.system.password')">
            <el-input v-model="config.redis.password" />
          </el-form-item>
        </el-collapse-item>

        <el-collapse-item
            :title="t('view.systemTools.system.mongoDbConfig')"
            name="14"
        >
          <el-form-item :label="t('view.systemTools.system.collectionName')">
            <el-input v-model="config.mongo.coll" />
          </el-form-item>
          <el-form-item :label="t('view.systemTools.system.options')">
            <el-input v-model="config.mongo.options" />
          </el-form-item>
          <el-form-item :label="t('view.systemTools.system.dbName')">
            <el-input v-model="config.mongo.database" />
          </el-form-item>
          <el-form-item :label="t('view.systemTools.system.userName')">
            <el-input v-model="config.mongo.username" />
          </el-form-item>
          <el-form-item :label="t('view.systemTools.system.password')">
            <el-input v-model="config.mongo.password" />
          </el-form-item>
          <el-form-item :label="t('view.systemTools.system.minimumConnectionPool')">
            <el-input v-model="config.mongo['min-pool-size']" />
          </el-form-item>
          <el-form-item :label="t('view.systemTools.system.maximumConnectionPool')">
            <el-input v-model="config.mongo['max-pool-size']" />
          </el-form-item>
          <el-form-item :label="t('view.systemTools.system.socketTimeout')">
            <el-input v-model="config.mongo['socket-timeout-ms']" />
          </el-form-item>
          <el-form-item :label="t('view.systemTools.system.connectionTimeout')">
            <el-input v-model="config.mongo['socket-timeout-ms']" />
          </el-form-item>
          <el-form-item :label="t('view.systemTools.system.enableZapLog')">
            <el-checkbox v-model="config.mongo['is-zap']" />
          </el-form-item>
          <el-form-item label="hosts">
            <template v-for="(item,k) in config.mongo.hosts">
              <div
                  v-for="(_,k2) in item"
                  :key="k2"
              >
                <el-form-item
                    :key="k+k2"
                    :label="k2"
                >
                  <el-input v-model="item[k2]" />
                </el-form-item>
              </div>
            </template>
          </el-form-item>
        </el-collapse-item>

        <el-collapse-item
          :title="t('view.systemTools.system.emailConfig')"
          name="5"
        >
          <el-form-item :label="t('view.systemTools.system.recipientEmail')">
            <el-input
              v-model="config.email.to"
              :placeholder="t('view.systemTools.system.emailNote')"
            />
          </el-form-item>
          <el-form-item :label="t('view.systemTools.system.port')">
            <el-input v-model.number="config.email.port" />
          </el-form-item>
          <el-form-item :label="t('view.systemTools.system.emailSender')">
            <el-input v-model="config.email.from" />
          </el-form-item>
          <el-form-item label="Host">
            <el-input v-model="config.email.host" />
          </el-form-item>
          <el-form-item :label="t('view.systemTools.system.enableSSL')">
            <el-checkbox v-model="config.email['is-ssl']" />
          </el-form-item>
          <el-form-item label="Secret">
            <el-input v-model="config.email.secret" />
          </el-form-item>
          <el-form-item :label="t('view.systemTools.system.testEmail')">
            <el-button @click="email">{{ t('view.systemTools.system.testEmail') }}</el-button>
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item
          :title="t('view.systemTools.system.verCodeConfig')"
          name="7"
        >
          <el-form-item :label="t('view.systemTools.system.charLength')">
            <el-input v-model.number="config.captcha['key-long']" />
          </el-form-item>
          <el-form-item :label="t('view.systemTools.system.imageWidth')">
            <el-input v-model.number="config.captcha['img-width']" />
          </el-form-item>
          <el-form-item :label="t('view.systemTools.system.imageHeight')">
            <el-input v-model.number="config.captcha['img-height']" />
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item
          :title="t('view.systemTools.system.dbConfig')"
          name="9"
        >
          <template v-if="config.system['db-type'] === 'mysql'">
            <el-form-item :label="t('view.systemTools.system.userName')">
              <el-input v-model="config.mysql.username" />
            </el-form-item>
            <el-form-item :label="t('view.systemTools.system.password')">
              <el-input v-model="config.mysql.password" />
            </el-form-item>
            <el-form-item :label="t('view.systemTools.system.address')">
              <el-input v-model="config.mysql.path" />
            </el-form-item>
            <el-form-item :label="t('view.systemTools.system.dbName')">
              <el-input v-model="config.mysql['db-name']" />
            </el-form-item>
            <el-form-item :label="t('view.systemTools.system.prefix')">
              <el-input v-model="config.mysql['refix']" />
            </el-form-item>
            <el-form-item :label="t('view.systemTools.system.pluralTable')">
              <el-switch v-model="config.mysql['singular']" />
            </el-form-item>
            <el-form-item :label="t('view.systemTools.system.engine')">
              <el-input v-model="config.mysql['engine']" />
            </el-form-item>
            <el-form-item :label="t('view.systemTools.system.maxIdleConns')">
              <el-input v-model.number="config.mysql['max-idle-conns']" />
            </el-form-item>
            <el-form-item :label="t('view.systemTools.system.maxOpenConns')">
              <el-input v-model.number="config.mysql['max-open-conns']" />
            </el-form-item>
            <el-form-item :label="t('view.systemTools.system.enableZapLog')">
              <el-checkbox v-model="config.mysql['log-zap']" />
            </el-form-item>
            <el-form-item :label="t('view.systemTools.system.logMode')">
              <el-input v-model="config.mysql['log-mode']" />
            </el-form-item>
          </template>
          <template v-if="config.system['db-type'] === 'pgsql'">
            <el-form-item :label="t('view.systemTools.system.userName')">
              <el-input v-model="config.pgsql.username" />
            </el-form-item>
            <el-form-item :label="t('view.systemTools.system.password')">
              <el-input v-model="config.pgsql.password" />
            </el-form-item>
            <el-form-item :label="t('view.systemTools.system.address')">
              <el-input v-model="config.pgsql.path" />
            </el-form-item>
            <el-form-item :label="t('view.systemTools.system.dbName')">
              <el-input v-model="config.pgsql.dbname" />
            </el-form-item>
            <el-form-item :label="t('view.systemTools.system.prefix')">
              <el-input v-model="config.pgsql['refix']" />
            </el-form-item>
            <el-form-item :label="t('view.systemTools.system.pluralTable')">
              <el-switch v-model="config.pgsql['singular']" />
            </el-form-item>
            <el-form-item :label="t('view.systemTools.system.engine')">
              <el-input v-model="config.pgsql['engine']" />
            </el-form-item>
            <el-form-item :label="t('view.systemTools.system.maxIdleConns')">
              <el-input v-model.number="config.pgsql['max-idle-conns']" />
            </el-form-item>
            <el-form-item :label="t('view.systemTools.system.maxOpenConns')">
              <el-input v-model.number="config.pgsql['max-open-conns']" />
            </el-form-item>
            <el-form-item :label="t('view.systemTools.system.enableZapLog')">
              <el-checkbox v-model="config.pgsql['log-zap']" />
            </el-form-item>
            <el-form-item :label="t('view.systemTools.system.logMode')">
              <el-input v-model="config.pgsql['log-mode']" />
            </el-form-item>
          </template>
        </el-collapse-item>

        <el-collapse-item
          :title="t('view.systemTools.system.ossConfig')"
          name="10"
        >
          <template v-if="config.system['oss-type'] === 'local'">
            <h2>{{ t('view.systemTools.system.localFileConfig') }}</h2>
            <el-form-item :label="t('view.systemTools.system.localFilePath')">
              <el-input v-model="config.local.path" />
            </el-form-item>
          </template>
          <template v-if="config.system['oss-type'] === 'qiniu'">
            <h2>qiniu上传配置</h2>
            <el-form-item label="存储区域">
              <el-input v-model="config.qiniu.zone" />
            </el-form-item>
            <el-form-item label="空间名称">
              <el-input v-model="config.qiniu.bucket" />
            </el-form-item>
            <el-form-item label="CDN加速域名">
              <el-input v-model="config.qiniu['img-path']" />
            </el-form-item>
            <el-form-item label="是否使用https">
              <el-checkbox v-model="config.qiniu['use-https']">{{ t('general.enable') }}</el-checkbox>
            </el-form-item>
            <el-form-item label="accessKey">
              <el-input v-model="config.qiniu['access-key']" />
            </el-form-item>
            <el-form-item label="secretKey">
              <el-input v-model="config.qiniu['secret-key']" />
            </el-form-item>
            <el-form-item label="上传是否使用CDN上传加速">
              <el-checkbox v-model="config.qiniu['use-cdn-domains']">{{ t('general.enable') }}</el-checkbox>
            </el-form-item>
          </template>
          <template v-if="config.system['oss-type'] === 'tencent-cos'">
            <h2>腾讯云COS上传配置</h2>
            <el-form-item label="存储桶名称">
              <el-input v-model="config['tencent-cos']['bucket']" />
            </el-form-item>
            <el-form-item label="所属地域">
              <el-input v-model="config['tencent-cos'].region" />
            </el-form-item>
            <el-form-item label="secretID">
              <el-input v-model="config['tencent-cos']['secret-id']" />
            </el-form-item>
            <el-form-item label="secretKey">
              <el-input v-model="config['tencent-cos']['secret-key']" />
            </el-form-item>
            <el-form-item label="路径前缀">
              <el-input v-model="config['tencent-cos']['path-prefix']" />
            </el-form-item>
            <el-form-item label="访问域名">
              <el-input v-model="config['tencent-cos']['base-url']" />
            </el-form-item>
          </template>
          <template v-if="config.system['oss-type'] === 'aliyun-oss'">
            <h2>阿里云OSS上传配置</h2>
            <el-form-item label="区域">
              <el-input v-model="config['aliyun-oss'].endpoint" />
            </el-form-item>
            <el-form-item label="accessKeyId">
              <el-input v-model="config['aliyun-oss']['access-key-id']" />
            </el-form-item>
            <el-form-item label="accessKeySecret">
              <el-input v-model="config['aliyun-oss']['access-key-secret']" />
            </el-form-item>
            <el-form-item label="存储桶名称">
              <el-input v-model="config['aliyun-oss']['bucket-name']" />
            </el-form-item>
            <el-form-item label="访问域名">
              <el-input v-model="config['aliyun-oss']['bucket-url']" />
            </el-form-item>
          </template>
          <template v-if="config.system['oss-type'] === 'huawei-obs'">
            <h2>华为云Obs上传配置</h2>
            <el-form-item label="路径">
              <el-input v-model="config['hua-wei-obs'].path" />
            </el-form-item>
            <el-form-item label="存储桶名称">
              <el-input v-model="config['hua-wei-obs'].bucket" />
            </el-form-item>
            <el-form-item label="区域">
              <el-input v-model="config['hua-wei-obs'].endpoint" />
            </el-form-item>
            <el-form-item label="accessKey">
              <el-input v-model="config['hua-wei-obs']['access-key']" />
            </el-form-item>
            <el-form-item label="secretKey">
              <el-input v-model="config['hua-wei-obs']['secret-key']" />
            </el-form-item>
          </template>
          <template v-if="config.system['oss-type'] === 'cloudflare-r2'">
            <h2>Cloudflare R2上传配置</h2>
            <el-form-item label="路径">
              <el-input v-model="config['cloudflare-r2'].path" />
            </el-form-item>
            <el-form-item label="存储桶名称">
              <el-input v-model="config['cloudflare-r2'].bucket" />
            </el-form-item>
            <el-form-item label="Base URL">
              <el-input v-model="config['cloudflare-r2']['base-url']" />
            </el-form-item>
            <el-form-item label="Account ID">
              <el-input v-model="config['cloudflare-r2']['account-id']" />
            </el-form-item>
            <el-form-item label="Access Key ID">
              <el-input v-model="config['cloudflare-r2']['access-key-id']" />
            </el-form-item>
            <el-form-item label="Secret Access Key">
              <el-input v-model="config['cloudflare-r2']['secret-access-key']" />
            </el-form-item>
          </template>

        </el-collapse-item>

        <el-collapse-item
          :title="t('view.systemTools.system.excelUploadConfig')"
          name="11"
        >
          <el-form-item :label="t('view.systemTools.system.excelDir')">
            <el-input v-model="config.excel.dir" />
          </el-form-item>
        </el-collapse-item>

        <el-collapse-item
          :title="t('view.systemTools.system.autoCodeConfig')"
          name="12"
        >
          <el-form-item :label="t('view.systemTools.system.autoRestart')">
            <el-checkbox v-model="config.autocode['transfer-restart']" />
          </el-form-item>
          <el-form-item :label="t('view.systemTools.system.projectRootPath')">
            <el-input
                v-model="config.autocode.root"
                disabled
            />
          </el-form-item>
          <el-form-item :label="t('view.systemTools.system.backendCodePath')">
            <el-input v-model="config.autocode['transfer-restart']" />
          </el-form-item>
          <el-form-item :label="t('view.systemTools.system.backendApiPath')">
            <el-input v-model="config.autocode['server-api']" />
          </el-form-item>
          <el-form-item :label="t('view.systemTools.system.backendInitPath')">
            <el-input v-model="config.autocode['server-initialize']" />
          </el-form-item>
          <el-form-item :label="t('view.systemTools.system.backendModelPath')">
            <el-input v-model="config.autocode['server-model']" />
          </el-form-item>
          <el-form-item :label="t('view.systemTools.system.backendRequestPath')">
            <el-input v-model="config.autocode['server-request']" />
          </el-form-item>
          <el-form-item :label="t('view.systemTools.system.backendRouterPath')">
            <el-input v-model="config.autocode['server-router']" />
          </el-form-item>
          <el-form-item :label="t('view.systemTools.system.backendServicePath')">
            <el-input v-model="config.autocode['server-service']" />
          </el-form-item>
          <el-form-item :label="t('view.systemTools.system.frontendCodePath')">
            <el-input v-model="config.autocode.web" />
          </el-form-item>
          <el-form-item :label="t('view.systemTools.system.frontendApiPath')">
            <el-input v-model="config.autocode['web-api']" />
          </el-form-item>
          <el-form-item :label="t('view.systemTools.system.frontendFormPath')">
            <el-input v-model="config.autocode['web-form']" />
          </el-form-item>
          <el-form-item :label="t('view.systemTools.system.frontendTablePath')">
            <el-input v-model="config.autocode['web-table']" />
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item
          :title="t('view.systemTools.system.i18n')"
          name="14"
        >
          <el-form-item :label="t('view.systemTools.system.langFilesPath')">
            <el-input v-model="config.language.dir" />
          </el-form-item>
          <el-form-item :label="t('view.systemTools.system.language')">
            <el-input v-model="config.language.language" />
          </el-form-item>
        </el-collapse-item>
      </el-collapse>
    </el-form>
    <div class="mt-4">
      <el-button
        type="primary"
        @click="update"
      >{{ t('view.systemTools.system.updateNow') }}</el-button>
      <el-button
        type="primary"
        @click="reload"
      >{{ t('view.systemTools.system.restartService') }}</el-button>
    </div>
  </div>
</template>

<script setup>
import { getSystemConfig, setSystemConfig } from '@/api/system'
import { emailTest } from '@/api/email'
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n' // added by mohamed hassan to support multilanguage

const { t } = useI18n() // added by mohamed hassan to support multilanguage

defineOptions({
  name: 'Config'
})

const activeNames = reactive([])
const config = ref({
  system: {
    'iplimit-count': 0,
    'iplimit-time': 0
  },
  jwt: {},
  mysql: {},
  pgsql: {},
  excel: {},
  autocode: {},
  redis: {},
  mongo: {
    coll: '',
    options: '',
    database: '',
    username: '',
    password: '',
    'min-pool-size': '',
    'max-pool-size': '',
    'socket-timeout-ms': '',
    'connect-timeout-ms': '',
    'is-zap': '',
    hosts: [
      {
        host: '',
        port: ''
      }
    ]
  },
  qiniu: {},
  'tencent-cos': {},
  'aliyun-oss': {},
  'hua-wei-obs': {},
  'cloudflare-r2': {},
  captcha: {},
  zap: {},
  local: {},
  email: {},
  timer: {
    detail: {}
  },
  language: {}
})

const initForm = async() => {
  const res = await getSystemConfig()
  if (res.code === 0) {
    config.value = res.data.config
  }
}
initForm()
const reload = () => {}
const update = async() => {
  const res = await setSystemConfig({ config: config.value })
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: t('view.systemTools.system.configSetupSuccess')
    })
    await initForm()
  }
}
const email = async() => {
  const res = await emailTest()
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: t('view.systemTools.system.emailSentSuccess')
    })
    await initForm()
  } else {
    ElMessage({
      type: 'error',
      message: t('view.systemTools.system.emailSentError')
    })
  }
}

</script>

<style lang="scss">
.system {
  @apply bg-white p-9 rounded dark:bg-slate-900;
  h2 {
    @apply p-2.5 my-2.5 text-lg shadow;
  }
}
</style>
