import request from "@/utils/request";

export function fetchList(query) {
  return request({    
    url: "https://cnodejs.org/api/v1/topics",
    method: "get",
    params: query    
  });
}

export function fetchDetail(id) {
  return request({
    url: `https://cnodejs.org/api/v1/topic/${id}`,
    method: "get"   
  });
}

export function fetchAuthorDetail(username) {
  return request({
    url: `https://cnodejs.org/api/v1/user/${username}`,
    method:'get'
  })
}
