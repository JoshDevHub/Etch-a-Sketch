// Logic & Event Handlers for Drawing on the Canvas & Using Controls
const randomColorButton = document.querySelector('.controls__random-color');
const colorInput = document.querySelector('input');
const eraserButton = document.querySelector('.controls__eraser');

let drawColor = 'gray';
let randomColorMode = false;
let eraserMode = false;

const updateDrawColor = (event) => (drawColor = event.srcElement.value);
colorInput.addEventListener('change', updateDrawColor);

const toggleRandomColorMode = () => {
  randomColorButton.classList.toggle('random-mode--true');
  randomColorMode = !randomColorMode;
};
randomColorButton.addEventListener('click', toggleRandomColorMode);

const pencilIconClasses = ['fas', 'fa-pencil-alt'];
const eraserIconClasses = ['fas', 'fa-eraser'];

const toggleEraserBtnContent = () => {
  if (eraserMode) {
    eraserButton.textContent = 'Draw ';
    const eraserButtonIcon = document.createElement('span');
    eraserButtonIcon.classList.add(...pencilIconClasses);
    eraserButton.appendChild(eraserButtonIcon);
  } else {
    eraserButton.textContent = 'Eraser ';
    const eraserButtonIcon = document.createElement('span');
    eraserButtonIcon.classList.add(...eraserIconClasses);
    eraserButton.appendChild(eraserButtonIcon);
  }
};

const toggleEraserMode = () => {
  eraserMode = !eraserMode;
  toggleEraserBtnContent();
};

eraserButton.addEventListener('click', toggleEraserMode);

const getRandomHSLColor = () => {
  const getRandomInt = (maxNumber) => Math.floor(Math.random() * maxNumber);
  const randomHue = getRandomInt(360);
  return `hsl(${randomHue}, 50%, 50%)`;
};

const drawOnMouseoverHandler = (event) => {
  if (event.target.classList.contains('sketch-canvas__item--drawn')) return;
  if (randomColorMode) {
    event.target.classList.add('sketch-canvas__item--drawn');
    event.target.style.setProperty('--draw-color', getRandomHSLColor());
  } else {
    event.target.classList.add('sketch-canvas__item--drawn');
    event.target.style.setProperty('--draw-color', drawColor);
  }
};

const eraseOnMouseoverHandler = (event) => {
  if (eraserMode) {
    event.target.classList.remove('sketch-canvas__item--drawn');
  }
};

// Logic & Event Handlers for Creating and Resetting the Canvas Grid
const sketchCanvas = document.querySelector('.sketch-canvas');

const createItems = (sideSize = 16) => {
  const totalItems = sideSize ** 2;
  const itemsFragment = new DocumentFragment();
  for (let i = 0; i < totalItems; i++) {
    let newItem = document.createElement('div');
    newItem.addEventListener('mouseover', drawOnMouseoverHandler);
    newItem.addEventListener('mouseover', eraseOnMouseoverHandler);
    newItem.classList.add('sketch-canvas__item');
    itemsFragment.appendChild(newItem);
  }
  return itemsFragment;
};

const populateGrid = (gridFragment) => {
  const sideLength = Math.sqrt(gridFragment.childElementCount);
  sketchCanvas.appendChild(gridFragment);
  sketchCanvas.style['grid-template-columns'] = `repeat(${sideLength}, 1fr)`;
};

const items = createItems();
populateGrid(items);

const resetButton = document.querySelector('.controls__reset');

// Keeps user from entering grid designs that look bad or are too resource intensive.
const validateGridSize = (size) => {
  let sizeToCheck = parseInt(size);
  while (
    !Number.isInteger(sizeToCheck) ||
    sizeToCheck < 16 ||
    sizeToCheck > 64
  ) {
    sizeToCheck = parseInt(
      prompt(
        "You've entered an invalid size. Please enter a value between 16 and 64"
      )
    );
  }
  return sizeToCheck;
};

const resetBtnClickHandler = () => {
  const userInput = prompt('Enter a new size between 16 and 64');

  // Allows user to cancel reset
  if (userInput === null) return;

  const newGridSize = validateGridSize(userInput);
  sketchCanvas.replaceChildren();
  const newItems = createItems(newGridSize);
  populateGrid(newItems);
  if (eraserMode) toggleEraserMode();
};

resetButton.addEventListener('click', resetBtnClickHandler);
