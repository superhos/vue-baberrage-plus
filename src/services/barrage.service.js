import { from, bufferTime } from "rxjs";

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
	  __instance(this);
  }

  count () {
    return from([1,2,3,4,5]).bufferTime(1000)
  }
  
}
