import { useRouter, RouteLocationRaw } from "vue-router";
import { defaultHomePath } from "@/router/constant";
enum Path {
  // 404页面 无页面
  notFound = "/404",
}
export default function () {
  const router = useRouter();
  // push
  const push = (path: RouteLocationRaw) => router.push(path);
  return {
    router,
    push,
    ToNotFound: () => push(Path.notFound),
    toHome: () => push(defaultHomePath),
  };
}
