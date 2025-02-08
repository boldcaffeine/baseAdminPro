import request from "@/utils/request";


interface SearchUserResponse {
  id: number;
  name: string;
  email: string;
  [key: string]: any; // 如果返回数据有其他未知字段
}

export function searchUser(name: string): Promise<SearchUserResponse> {
  return request({
    url: "/vue-element-admin/search/user",
    method: "get",
    params: { name },
  });
}

// 定义交易列表的查询参数和返回类型
interface TransactionListQuery {
  page: number;
  limit: number;
  [key: string]: any; // 允许额外查询参数
}

interface Transaction {
  id: number;
  date: string;
  amount: number;
  status: string;
  [key: string]: any; // 如果返回数据有其他未知字段
}

interface TransactionListResponse {
  total: number;
  items: Transaction[];
}

export function transactionList(query: TransactionListQuery): Promise<TransactionListResponse> {
  return request({
    url: "/vue-element-admin/transaction/list",
    method: "get",
    params: query,
  });
}