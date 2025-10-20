// @ts-ignore
/* eslint-disable */
import request from "@/request";

/** testDownloadFile GET /jay/file/test/download/ */
export async function testDownloadFileUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.testDownloadFileUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<any>("/jay/file/test/download/", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** testUploadFile POST /jay/file/test/upload */
export async function testUploadFileUsingPost(
  body: {},
  file?: File,
  options?: { [key: string]: any }
) {
  const formData = new FormData();

  if (file) {
    formData.append("file", file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === "object" && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ""));
        } else {
          formData.append(
            ele,
            new Blob([JSON.stringify(item)], { type: "application/json" })
          );
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<API.BaseResponseString_>("/jay/file/test/upload", {
    method: "POST",
    data: formData,
    requestType: "form",
    ...(options || {}),
  });
}
