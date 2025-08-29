const myKey = 'bbb14aaee65f2563d5a375adb1eb1b61';

const taiciAPI = 'https://apis.tianapi.com/dialogue/index';
const tiangouAPI = 'https://apis.tianapi.com/tiangou/index';
const zhananAPI = 'https://apis.tianapi.com/zhanan/index';
const fenfangAPI= 'https://api.suyanw.cn/api/Ridicule.php?msg=5';

// 使用 Fetch API 重写请求
// 经典台词
export const getMovieDialogue = async () => {
  try {
    const response = await fetch(taiciAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({ key: myKey })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const tianapi_data = await response.json();
    
    // 调试输出
    // console.log("完整API响应:", tianapi_data);
    // console.log("dialogue字段值:", tianapi_data?.result?.dialogue || 'null-');

    if (tianapi_data.code === 200) {
      return `${tianapi_data?.result?.dialogue || ''}，[来源: ${tianapi_data?.result?.source || '未知'}]`;
    } else {
      return `API返回错误: ${tianapi_data.msg}`;
    }
  } catch (error) {
    console.error("请求失败:", error);
    return "获取台词失败，请稍后重试";
  }
}

// 舔狗日记
export const getTianGouContent = async () => {
  try {
    const response = await fetch(tiangouAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({ key: myKey })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const tianapi_data = await response.json();
    
    // 调试输出
    // console.log("完整API响应:", tianapi_data);
    // console.log("content字段值:", tianapi_data?.result?.content || 'null-');

    if (tianapi_data.code === 200) {
      return `${tianapi_data?.result?.content || ''}`;
    } else {
      return `API返回错误: ${tianapi_data.msg}`;
    }
  } catch (error) {
    console.error("请求失败:", error);
    return "获取舔狗日记失败，请稍后重试";
  }
} 

// 渣男语录
export const getZhaNanContent = async () => {
  try {
    const response = await fetch(zhananAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({ key: myKey })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const tianapi_data = await response.json();
    
    // 调试输出
    // console.log("完整API响应:", tianapi_data);
    // console.log("content字段值:", tianapi_data?.result?.content || 'null-');

    if (tianapi_data.code === 200) {
      return `${tianapi_data?.result?.content || ''}`;
    } else {
      return `API返回错误: ${tianapi_data.msg}`;
    }
  } catch (error) {
    console.error("请求失败:", error);
    return "获取渣男语录失败，请稍后重试";
  }
} 

// 口吐芬芳
export const getfenfangContent = async () => {
  try {
    const response = await fetch(fenfangAPI, {
      method: 'get',
      // headers: {
      //   'Content-Type': 'application/x-www-form-urlencoded'
      // },
      // body: new URLSearchParams({ key: myKey })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const tianapi_data = await response.text();
    console.log('tianapi_data =', tianapi_data);

    return tianapi_data;
  } catch (error) {
    console.error("请求失败:", error);
    return "获取芬芳失败，请稍后重试";
  }
} 

// LLM
export const getLLMApiContent = async () => {
  try {
    
  } catch (error) {
    console.error("请求失败:", error);
    return "调用LLM失败，请稍后重试";
  }
}