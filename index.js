const gridContainer = document.querySelector('.grid-container');

const itemMouseoverHandler = (event) => {
  event.target.style['background-color'] = 'gray';
};

const itemMouseoutHandler = (event) => {
  event.target.style['background-color'] = '';
};

const createItems = () => {
  const itemArray = [];
  for (let i = 0; i < 256; i++) {
    let newItem = document.createElement('div');
    newItem.addEventListener('mouseover', itemMouseoverHandler);
    newItem.addEventListener('mouseout', itemMouseoutHandler);
    newItem.classList.add('grid-container__item');
    itemArray.push(newItem);
  }
  return itemArray;
};

const populateGrid = (gridItemArray) => {
  for (let i = 0; i < gridItemArray.length; i++) {
    gridContainer.appendChild(gridItemArray[i]);
  }
};

gridContainer.style['grid-template-columns'] = 'repeat(16, 1fr)';
const items = createItems();
populateGrid(items);
