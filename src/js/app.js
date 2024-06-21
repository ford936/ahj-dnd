import State from './state';
import Card from './components/card';
import CardMove from './components/cardMove';

const container = document.querySelector('.main-container');
const state = new State();
const card = new Card(container);
const cardMove = new CardMove();

window.addEventListener('unload', () => {
  state.saveState(container);
});

window.addEventListener('load', () => {
  state.loadState();
  state.showCards(container);
});

container.addEventListener('mouseover', (e) => {
  card.showCardRemoveBtn(e.target);
});

card.cardRemoveBtn.addEventListener('click', (e) => {
  card.removeCard(e.target);
});

card.addCardBtns.forEach((addCardBtn) => {
  addCardBtn.addEventListener('click', (e) => {
    card.hideAddCardBtn(e.target);
  });
});

card.addNewCardCancelBtns.forEach((addNewCardCancelBtn) => {
  addNewCardCancelBtn.addEventListener('click', (e) => {
    card.hideAddCardContainer(e.target);
  });
});

card.addNewCardBtns.forEach((addNewCardBtn) => {
  addNewCardBtn.addEventListener('click', (e) => {
    card.addNewCard(e.target);
  });
});

const onMouseMove = (e) => {
  cardMove.moveCard(e);
};

const onMouseUp = () => {
  cardMove.dropCard();
  document.removeEventListener('mouseup', onMouseUp);
  document.removeEventListener('mousemove', onMouseMove);
};

container.addEventListener('mousedown', (e) => {
  if (e.target.classList.contains('card')) {
    cardMove.selectCard(e);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);
  }
});
