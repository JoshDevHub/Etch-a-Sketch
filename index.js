const gridContainer = document.querySelector('.grid-container');

const createItems = () => {
  const itemArray = [];
  for (let i = 0; i < 256; i++) {
    let newItem = document.createElement('div');
    newItem.classList.add('grid-container__item')
    itemArray.push(newItem);
  }
  return itemArray;
}

const populateGrid = (gridItemArray) => {
  for (let i = 0; i < gridItemArray.length; i++) {
    gridContainer.appendChild(gridItemArray[i]);
  }
}

gridContainer.style['grid-template-columns'] = 'repeat(16, 1fr)';
const items = createItems();
populateGrid(items);