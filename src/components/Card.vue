<template>
  <div class="card relative" :class="flippedStyles" @click="flipCard">
    <div class="face front-face">{{ data.value }} - {{ data.matched }}</div>
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
  transition: all 500ms ease-in;
  transform-style: preserve-3d;
  border-radius: 12px;
}
.face {
  border-radius: 12px;
  color: white;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  backface-visibility: hidden;
}
.front-face {
  background-color: rgb(228, 204, 153);
  transform: rotateY(180deg);
}
.back-face {
  background-color: rgb(108, 210, 167);
  background-image: url("../../public/images/image-3.jpg");
  background-repeat: repeat;
}
.flipped {
  transform: rotateY(180deg);
}
</style>
