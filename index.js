const gridContainer = document.querySelector('.grid-container');

let gridSize = 16;

const validateGridSize = (size) => {
  let sizeToCheck = size;
  while (
    !Number.isInteger(sizeToCheck) ||
    sizeToCheck < 16 ||
    sizeToCheck > 100
  ) {
    sizeToCheck = parseInt(
      prompt(
        "You've entered an invalid size. Please enter a value between 16 and 100"
      )
    );
  }
  gridSize = sizeToCheck % 2 === 0 ? sizeToCheck : sizeToCheck - 1;
};

const itemMouseoverHandler = (event) => {
  event.target.style['background-color'] = 'gray';
};

const itemMouseoutHandler = (event) => {
  event.target.style['background-color'] = '';
};

const createItems = (sideSize) => {
  const totalItems = sideSize ** 2;
  const itemArray = [];
  for (let i = 0; i < totalItems; i++) {
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
  gridContainer.style['grid-template-columns'] = `repeat(${gridSize}, 1fr)`;
};

const items = createItems(gridSize);
populateGrid(items);

const resetButton = document.querySelector('.reset-button');

const resetBtnClickHandler = () => {
  gridContainer.replaceChildren();
  gridSize = parseInt(prompt('Enter a new size between 16 and 100'));
  validateGridSize(gridSize);
  const newItems = createItems(gridSize);
  populateGrid(newItems);
};

resetButton.addEventListener('click', resetBtnClickHandler);
