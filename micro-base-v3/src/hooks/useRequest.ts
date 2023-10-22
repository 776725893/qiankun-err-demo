import { ref } from "vue";
import type { Ref } from "vue";
type TApiFun<TData, TParams extends Array<any>> = (
  ...params: TParams
) => Promise<TData>;
type AutoRequestResult<TData, TParams extends Array<any>> = {
  requestLoading: Ref<boolean>;
  run: TApiFun<TData, TParams>;
};
interface AutoRequestOptions<T> {
  // 接口调用成功时的回调
  onSuccess?: (data: T) => unknown | Promise<unknown>;
  // 接口调用失败时的回调
  onCatch?: (err: Error) => unknown | Promise<unknown>;
}

export default function useAutoRequest<
  TData,
  TParams extends Array<any> = Array<any>
>(
  fun: TApiFun<TData, TParams>,
  options?: AutoRequestOptions<TData>
): AutoRequestResult<TData, TParams> {
  const { onSuccess, onCatch } = options ?? {};
  const requestLoading = ref(false);
  const run: TApiFun<TData, TParams> = (...params) => {
    requestLoading.value = true;
    return fun(...params)
      .then(async (res) => {
        onSuccess && (await onSuccess(res));
        return res;
      })
      .catch(async (err) => {
        onCatch && (await onCatch(err));
        throw new Error(err);
      })
      .finally(() => {
        requestLoading.value = false;
      });
  };
  return { requestLoading, run };
}
