import { useRouter } from "vue-router";
import settings from "~/settings";
export default function () {
  const router = useRouter();
  // push
  const push = (path) => router.push(path).catch(() => {});
  return {
    router,
    push,
    ToNotFound: () => push('/404'),
    toHome: () => push(settings.defaultHomePath),
  };
}
