import { ref } from "vue";

export default function useRequest(fun, options) {
  const { onSuccess, onCatch } = options ?? {};
  const requestLoading = ref(false);
  const run = (...params) => {
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
