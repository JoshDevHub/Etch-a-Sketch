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
  const getRandomInt = (maxNumber) => Math.floor(Math.random() * maxNumber);
  const randomHue = getRandomInt(360);
  const saturation = getRandomInt(100);
  const lightness = getRandomInt(100);
  return `hsl(${randomHue}, ${saturation}%, ${lightness}%)`;
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

const createItems = (sideSize = 16) => {
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
  const sideSize = Math.sqrt(gridItemArray.length);
  gridContainer.style['grid-template-columns'] = `repeat(${sideSize}, 1fr)`;
};

const items = createItems();
populateGrid(items);

const resetButton = document.querySelector('.reset-button');

const validateGridSize = (size) => {
  let sizeToCheck = parseInt(size);
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
  // Forces the size to an even number so items fit grid nicely
  return (sizeToCheck % 2 === 0 ? sizeToCheck : sizeToCheck - 1);
};

const resetBtnClickHandler = () => {
  const userInput = prompt('Enter a new size between 16 and 100');

  // Allows user to cancel reset
  if (userInput === null) return;

  const newGridSize = validateGridSize(userInput);
  gridContainer.replaceChildren();
  const newItems = createItems(newGridSize);
  populateGrid(newItems);
};

resetButton.addEventListener('click', resetBtnClickHandler);
