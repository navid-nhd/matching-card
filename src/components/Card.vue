<template>
  <div class="card relative" :class="flippedStyles" @click="flipCard">
    <div class="face front-face">
      <img
        :src="`../../public/icon-set/${data.value}.png`"
        class="w-full h-full"
      />
    </div>
    <div class="face back-face"></div>
  </div>
</template>
<script setup>
import { computed } from "vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["cardSelection"]);
const flipCard = () => {
  emit("cardSelection", {
    position: props.data.position,
    faceValue: props.data.value,
    matched: props.data.matched,
  });
};
const flippedStyles = computed(() => {
  return props.data.visible ? "flipped" : "";
});
</script>
<style scoped>
.card {
  @apply transition-all duration-500 ease-in rounded-xl;
  transform-style: preserve-3d;
}
.face {
  @apply rounded-xl text-white w-full h-full absolute left-0;
  backface-visibility: hidden;
}
.front-face {
  @apply bg-orange-300 p-5;
  transform: rotateY(180deg);
}
.back-face {
  @apply bg-[url('../../public/images/image-3.jpg')] bg-no-repeat;
}
.flipped {
  transform: rotateY(180deg);
}
</style>
