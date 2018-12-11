import MessagePoolModel from '../models/message-pool.model'
import { DEFAULT_POOL_TAG, LOCAL_MODE } from '../config/constant'

// Singleton Mode
let __instance = (function () {
  let instance;
  return (newInstance) => {
    if (newInstance) instance = newInstance;
    return instance;
  }
}());

export default class BarrageService {

  constructor(props) {
		if (__instance()) return __instance();
    //按自己需求实例化
    // default pool
    this.config = {
      mode: LOCAL_MODE,
      ...props
    }
    
    this.messagePool = {
      [DEFAULT_POOL_TAG] : new MessagePoolModel({tag:DEFAULT_POOL_TAG,lanes:props.lanes})
    }
	  __instance(this);
  }
  
  pushMessage ({pool, lane, message}) {
    pool = pool || DEFAULT_POOL_TAG
    this.messagePool[pool].insert(message)
  }

}
