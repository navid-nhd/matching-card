<template>
  <main class="wrapper">
    <div class="py-4">
      <img
        src="../../public/images/header.png"
        alt=""
        class="mx-auto block w-80"
      />
    </div>
    <TransitionGroup tag="section" class="game-board" name="shuffle-card">
      <Card
        v-for="card in cardLists"
        :key="card.id"
        :data="card"
        @cardSelection="cardFlip"
        :timer="timer"
      />
    </TransitionGroup>
    <div class="button-wrapper">
      <button @click="restartGame()" class="button">
        Restart
        <img src="../../public/images/restart-arrow.png" alt="" class="w-7" />
      </button>
      <!-- <button class="button">Play</button> -->
      <div class="py-5 text-4xl">{{ timer }}</div>
    </div>
    <div class="text-2xl">{{ status }}</div>
  </main>
</template>

<script setup>
import { nanoid } from "nanoid";
import Card from "@/components/Card.vue";
import { ref, watch, computed, onMounted } from "vue";
import _ from "lodash";

const cardItems = [
  "daco",
  "skeleton",
  "babyGhost",
  "bat",
  "cat",
  "bat-2",
  "sausage",
  "vampire-cat",
];
const cardLists = ref([]);
const userSelection = ref([]);
const timer = ref("-- : --");

cardItems.forEach((item) => {
  cardLists.value.push({
    value: item,
    id: nanoid(),
    visible: false,
    position: null,
    matched: false,
  });

  cardLists.value.push({
    value: item,
    id: nanoid(),
    visible: false,
    position: null,
    matched: false,
  });
});
const shuffleCards = () => {
  cardLists.value = _.shuffle(cardLists.value);
};
cardLists.value = cardLists.value.map((card, index) => {
  return {
    ...card,
    position: index,
  };
});

const restartGame = () => {
  shuffleCards();
  cardLists.value = cardLists.value.map((card, index) => {
    return {
      ...card,
      visible: false,
      matched: false,
      position: index,
    };
  });
};
const cardFlip = (param) => {
  cardLists.value[param.position].visible = true;

  if (userSelection.value[0]) {
    // not to be clicked on one card twice
    if (userSelection.value[0].position === param.position) {
      return;
    } else {
      userSelection.value[1] = param;
    }
  } else {
    userSelection.value[0] = param;
  }
};
watch(
  userSelection,
  (currentVal) => {
    if (currentVal.length == 2) {
      const cardOne = currentVal[0];
      const cardTwo = currentVal[1];
      if (cardOne.faceValue == cardTwo.faceValue) {
        cardLists.value[cardOne.position].matched = true;
        cardLists.value[cardTwo.position].matched = true;
      } else {
        setTimeout(() => {
          cardLists.value[cardOne.position].visible = false;
          cardLists.value[cardTwo.position].visible = false;
        }, 1000);
      }
      userSelection.value.length = 0;
    }
  },
  { deep: true }
);

const remainingPairs = computed(() => {
  const remainingCards = cardLists.value.filter(
    (card) => card.matched === false
  ).length;

  return remainingCards / 2;
});
const status = computed(() => {
  if (remainingPairs.value === 0) {
    return "Player Won!";
  } else {
    return `Remained : ${remainingPairs.value}`;
  }
});
onMounted(() => {
  restartGame();
});
</script>
<style scoped>
.wrapper {
  @apply text-center;
}
.game-board {
  @apply grid grid-cols-4 grid-rows-4 justify-center gap-4 grid-cols-gameCard grid-rows-gameCard;
}
.button {
  @apply bg-orange-500 hover:bg-orange-600 my-7 py-3 px-4 rounded-lg font-medium text-2xl flex mx-auto gap-3 items-center;
}
.button-wrapper {
  /* @apply flex justify-center items-center; */
}

/* ANIMATION for transition group */
.shuffle-card-move {
  @apply transition-all duration-1000 ease-in-out;
}
</style>
