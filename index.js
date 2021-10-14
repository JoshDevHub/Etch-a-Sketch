// Logic & Event Handlers for Drawing on the Canvas
const randomColorButton = document.querySelector('.random-mode');
const colorInput = document.querySelector('input');

let drawColor = 'gray';

const updateColor = (event) => (drawColor = event.srcElement.value);

colorInput.addEventListener('change', updateColor);

const toggleRandomColorMode = () => {
  randomColorButton.classList.toggle('random-mode--true');
};

randomColorButton.addEventListener('click', toggleRandomColorMode);

const getRandomHSLColor = () => {
  const randomHue = Math.floor(Math.random() * 360);
  return `hsl(${randomHue}, 50%, 50%)`;
};

const drawOnMouseoverHandler = (event) => {
  if (randomColorButton.classList.contains('random-mode--true')) {
    event.target.classList.add('grid-container__item--drawn');
    event.target.style.setProperty('--draw-color', getRandomHSLColor());
  } else {
    event.target.classList.add('grid-container__item--drawn');
    event.target.style.setProperty('--draw-color', drawColor);
  }
};

// Logic & Event Handlers for Creating and Reseting the Grid
const gridContainer = document.querySelector('.grid-container');

let gridSideSize = 16;

const createItems = (sideSize) => {
  const totalItems = sideSize ** 2;
  const itemArray = [];
  for (let i = 0; i < totalItems; i++) {
    let newItem = document.createElement('div');
    newItem.addEventListener('mouseover', drawOnMouseoverHandler, {
      once: true,
    });
    newItem.classList.add('grid-container__item');
    itemArray.push(newItem);
  }
  return itemArray;
};

const populateGrid = (gridItemArray) => {
  for (let i = 0; i < gridItemArray.length; i++) {
    gridContainer.appendChild(gridItemArray[i]);
  }
  gridContainer.style['grid-template-columns'] = `repeat(${gridSideSize}, 1fr)`;
};

const items = createItems(gridSideSize);
populateGrid(items);

const resetButton = document.querySelector('.reset-button');

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
  gridSideSize = sizeToCheck % 2 === 0 ? sizeToCheck : sizeToCheck - 1;
};

const resetBtnClickHandler = () => {
  gridContainer.replaceChildren();
  const userInput = parseInt(prompt('Enter a new size between 16 and 100'));
  validateGridSize(userInput);
  const newItems = createItems(gridSideSize);
  populateGrid(newItems);
};

resetButton.addEventListener('click', resetBtnClickHandler);
