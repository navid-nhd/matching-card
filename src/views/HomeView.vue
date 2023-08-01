<template>
  <main class="wrapper">
    <h1 class="py-1">Matching Card Game</h1>
    <TransitionGroup tag="section" class="game-board" name="shuffle-card">
      <Card
        v-for="card in cardLists"
        :key="card.id"
        :data="card"
        @cardSelection="cardFlip"
      />
    </TransitionGroup>
    <button @click="restartGame()" class="button">Restart</button>
    <div>{{ status }} - {{ remainingPairs }}</div>
  </main>
</template>

<script setup>
import { nanoid } from "nanoid";
import Card from "@/components/Card.vue";
import { ref, watch, computed, onMounted } from "vue";
import _ from "lodash";

const cardItems = [1, 2, 3, 4, 5, 6, 7, 8];
const cardLists = ref([]);
const userSelection = ref([]);

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
  @apply bg-orange-400 my-5 py-3 px-4 rounded-lg;
}

/* ANIMATION for transition group */
.shuffle-card-move {
  @apply transition-all duration-1000 ease-in-out;
}
</style>
