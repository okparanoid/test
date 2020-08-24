const itemsContainer = document.querySelector('.container');
const items = itemsContainer.querySelectorAll('.item');

function changeItemText(item) {
  const subtitle = item.querySelector('.card__subtitle');
  const text = item.querySelector('.item-is-selected__text');
  text.style.display = 'block';
  changeText(subtitle, text);
}

function changeText(subtitle, text) {
  if (subtitle.textContent == 'с фуа-гра') {
    text.textContent = 'Печень утки разварная с артишоками.';
  } else if (subtitle.textContent == 'с рыбой') {
    text.textContent = 'Головы щучьи с чесноком да свежайшая сёмгушка.'
  } else if (subtitle.textContent == 'с курой') {
    text.textContent = 'Филе из цыплят с трюфелями в бульоне'
  }
}

function hoverCard(card) {
  const pretitle = card.querySelector('.card__pretitle');
  const hoverMarkup = `<p class="card__hover">Котэ не одобряет?</p>`;
  card.insertAdjacentHTML('afterbegin', hoverMarkup);
  pretitle.classList.add('card__pretitle-hover');
}

function makeCardSelected(item) {
  const card = item.querySelector('.card');
  card.classList.add('card-is-selected');
  item.querySelector('.item__text').style.display = 'none';
  item.querySelector('.item__weight').style.background = '#C71585';
  changeItemText(item);
}

function makeCardDefault(item) {
  const card = item.querySelector('.card');
  item.querySelector('.item-is-selected__text').style.display = 'none';
  item.querySelector('.item__text').style.display = 'block';
  item.querySelector('.item__weight').style.background = '#00BFFF';
  card.removeChild(card.querySelector('.card__hover'));
  card.querySelector('.card__pretitle').classList.remove('card__pretitle-hover');
}

function makeCardDisabled(item) {
  const taste = item.querySelector('.card__subtitle').textContent;
  item.querySelector('.card').classList.add('card-is-disabled');
  item.querySelector('.item-is-disabled__text').style.display = 'block';
  item.querySelector('.item-is-disabled__text').textContent = `Печалька, ${taste} закончился.`;
  item.querySelector('.item__text').textContent = '';
  item.querySelector('.item__weight').style.background = '#696969';
}

function selectCard(event) {
  const item = event.target.closest('.item');
  if (event.target.classList.contains('card-is-selected')) {
    event.target.classList.remove('card-is-selected');
    makeCardDefault(item);
  } else if ((event.target.classList.contains('card') || event.target.classList.contains('card__link')) && !event.target.classList.contains('card-is-disabled')) {
    const card = item.querySelector('.card');
    card.mouseout = makeCardSelected(item);
    card.mouseover = hoverCard(card);
  }
}

items.forEach((item) => {
  if (item.classList.contains('item-is-disabled')) {
    makeCardDisabled(item);
  }
});

itemsContainer.addEventListener('click', selectCard);


