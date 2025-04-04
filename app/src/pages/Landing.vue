<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { draw } from "@/lib/landingAnimation";
import debounce from "debounce";
import { onMounted, Ref, ref } from "vue";
import { RouterLink } from "vue-router";

const canvas = ref<HTMLCanvasElement | null>(null);

const resize = (window: Window, canvas: Ref<HTMLCanvasElement | null>) => {
  if (!canvas.value || !window) return;
  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;
};

onMounted(() => {
  if (!canvas.value) return;
  const ctx = canvas.value?.getContext("2d");
  if (!ctx) return;

  resize(window, canvas);

  const animation = window.requestAnimationFrame(() =>
    draw(window, ctx, canvas.value!)
  );

  window.addEventListener(
    "resize",
    debounce(() => resize(window, canvas), 500)
  );

  return () => {
    window.cancelAnimationFrame(animation);
    window.removeEventListener("resize", () => resize(window, canvas));
  };
});
</script>

<template>
  <div
    class="absolute flex flex-nowrap justify-start items-center flex-row-reverse w-full h-fit p-4"
  >
    <RouterLink to="/auth/login">
      <Button>Login</Button>
    </RouterLink>
  </div>
  <canvas
    ref="canvas"
    class="-z-50 h-screen w-screen block absolute top-0 left-0 blur-3xl border border-muted canvas"
  ></canvas>

  <div class="flex justify-center items-center h-full">
    <div class="text-center">
      <svg
        height="160"
        stroke-width="2"
        class="title-line stroke-primary fill-primary"
        width="100%"
      >
        <text
          x="50%"
          dominant-baseline="middle"
          text-anchor="middle"
          y="50%"
          class="title text-[10rem] font-bold"
        >
          PGA
        </text>
      </svg>
      <p class="text-4xl text-black desc">Plateforme de Gestion Associative</p>
      <RouterLink to="/auth/register">
        <Button
          variant="outline"
          class="mt-4 bg-transparent border-black text-xl hover:bg-black hover:text-white getStarted"
          >Get Started</Button
        >
      </RouterLink>
    </div>
  </div>
</template>

<style>
@keyframes canvas {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fadeInTitle {
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }
  33% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes fadeInDesc {
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }
  33% {
    transform: translateY(-20px);
    opacity: 0;
  }
  66% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes fadeInGetStarted {
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }
  66% {
    transform: translateY(-20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.title {
  animation: fadeInTitle 0.75s ease-in-out;
}

.desc {
  animation: fadeInDesc 0.75s ease-in-out;
}

.getStarted {
  animation: fadeInGetStarted 0.75s ease-in-out;
}

.title-line {
  stroke-dasharray: 950;
  stroke-dashoffset: 950;
  animation: dash 2.5s ease-in-out forwards, filling 2.5s ease-in-out forwards;
}

.canvas {
  animation: canvas 2.5s ease-in-out;
}

@keyframes dash {
  to {
    stroke-dasharray: 0;
    stroke-dashoffset: 0;
  }
}

@keyframes filling {
  0%,
  85% {
    fill-opacity: 0;
  }
  100% {
    fill-opacity: 1;
  }
}
</style>
