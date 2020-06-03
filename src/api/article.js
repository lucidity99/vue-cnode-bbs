import request from "@/utils/request";

export function fetchList(query) {

  return request({ 
   
    url: "https://cnodejs.org/api/v1/topics",
    method: "get",
    params: query
    
  });
}

export function fetchDetail() {
  return request({
    url: "https://cnodejs.org/api/v1/topic/5e16978581adfe260207a8c1",
   // url: `https://cnodejs.org/api/v1/topic/${id}`,
    method: "get"   
  });
}
