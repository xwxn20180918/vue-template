import { COLOR_TYPE } from '../common/js/config'
import { isObject } from '../common/js/utils'
import eventBus from './utils/eventBus'

const handleConfig = function(config, type) {
  let c = {
    title: '提示',
    message: '信息',
    type
  }
  if (isObject(config)) {
    c = Object.assign(c, config)
  } else {
    c.message = config
  }
  return c
}

const notify = {
  default(config) {
    eventBus.$notify(handleConfig(config))
  },
  succ(config) {
    eventBus.$notify(handleConfig(config, COLOR_TYPE.SUCCESS))
  },
  warn(config) {
    eventBus.$notify(handleConfig(config, COLOR_TYPE.WARNING))
  },
  info(config) {
    eventBus.$notify(handleConfig(config, COLOR_TYPE.INFO))
  },
  err(config) {
    eventBus.$notify(handleConfig(config, COLOR_TYPE.ERROR))
  }
};

export default notify
