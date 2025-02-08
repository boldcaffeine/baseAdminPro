import {
  onMounted,
  onBeforeUnmount,
  onActivated,
  onDeactivated,
  ref,
  type Ref,
} from "vue";
import { debounce } from "@/utils";

export default function useResizeHandler(
  chartRef: Ref<{ resize: () => void } | null>
) {
  const sidebarElm = ref<HTMLElement | null>(null);

  const resizeHandler = debounce(() => {
    if (chartRef.value) {
      // @ts-ignore
      chartRef.value.resize({
        animation: {
          duration: 300,
          easing: "ease",
        },
      });
    }
  }, 100);

  const sidebarResizeHandler = (e: TransitionEvent) => {
    if (e.propertyName === "width") {
      resizeHandler();
    }
  };

  const initResizeEvent = () => {
    window.addEventListener("resize", resizeHandler);
  };

  const destroyResizeEvent = () => {
    window.removeEventListener("resize", resizeHandler);
  };

  const initSidebarResizeEvent = () => {
    sidebarElm.value = document.getElementsByClassName(
      "sidebar-container"
    )[0] as HTMLElement | null;
    if (sidebarElm.value) {
      sidebarElm.value.addEventListener("transitionend", sidebarResizeHandler);
    }
  };

  const destroySidebarResizeEvent = () => {
    if (sidebarElm.value) {
      sidebarElm.value.removeEventListener(
        "transitionend",
        sidebarResizeHandler
      );
    }
  };

  onMounted(() => {
    initResizeEvent();
    initSidebarResizeEvent();
  });

  onBeforeUnmount(() => {
    destroyResizeEvent();
    destroySidebarResizeEvent();
  });

  // Handle keep-alive scenarios
  onActivated(() => {
    initResizeEvent();
    initSidebarResizeEvent();
  });

  onDeactivated(() => {
    destroyResizeEvent();
    destroySidebarResizeEvent();
  });

  return {
    resizeHandler,
  };
}
