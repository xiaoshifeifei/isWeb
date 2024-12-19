import service from "@/utils/request";

// 获取用户列表
export const getAccountList = (params) => {
  return service({
    url: "/account/getAccounts",
    method: "get",
    params,
  });
};
