import { inject } from "vue";
import { setLoadingKey, unsetLoadingKey } from "@/providers/injection-keys";

export async function useLoading(loadingFunction: () => Promise<unknown>) {
  const setLoading = inject<() => void>(setLoadingKey);
  const unsetLoading = inject<() => void>(unsetLoadingKey);

  if (!setLoading || !unsetLoading) {
    throw new Error(
      "Loader function can only be called in children of the App component"
    );
  }

  try {
    setLoading();
    await loadingFunction();
  } finally {
    unsetLoading();
  }
}
