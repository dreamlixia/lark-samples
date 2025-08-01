const myKey = 'bbb14aaee65f2563d5a375adb1eb1b61';

const taiciAPI = 'https://apis.tianapi.com/dialogue/index';
const tiangouAPI = 'https://apis.tianapi.com/tiangou/index';
const zhananAPI = 'https://apis.tianapi.com/zhanan/index';

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

// // 使用示例
// getMovieDialogue()
//   .then(result => console.log("最终结果:", result))
//   .catch(error => console.error("处理错误:", error));

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