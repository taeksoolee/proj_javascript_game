/**
 * 
 * @param {string} str 
 * @returns {number}
 */
const removePxStr = (str) => parseInt(str.replace(/px/, ''));

/**
 * 
 * @param {number} num
 * @returns {string}
 */
const addPxStr = (num) => num + 'px'


let snailCnt = 0;
function createSnailImg(name) {
  snailCnt++;
  if(!name) {
    name = 'snail' + snailCnt;
  }
  
  const nameLabel = document.createElement('label');
  nameLabel.innerText = name;
  nameLabel.style.height = '20px';
  nameLabel.style.position = 'absolute';

  const img = document.createElement('img');
  img.src = './images/snail.png';
  img.width = 30;
  img.height = 30;
  img.style.marginTop = '20px';

  const container = document.createElement('div');
  container.appendChild(nameLabel);
  container.appendChild(img);

  return container;
}

function createRailContainer() {
  const div = document.createElement('div');
  div.style.width = '500px';
  div.style.height = '50px';
  div.style.padding = '5px';
  div.style.margin = '5px';
  div.style.backgroundColor = '#bdc9de';

  const goallineWrapper = document.createElement('div');
  goallineWrapper.style.position = 'relative';
  div.appendChild(goallineWrapper);

  const goalline = document.createElement('div');
  goalline.style.position = 'absolute';
  goalline.style.left = '470px';
  goalline.style.width = '1px';
  goalline.style.height = '50px';
  goalline.style.backgroundColor = 'red';
  goallineWrapper.appendChild(goalline);

  return div;
}

const playground = document.querySelector('#playground');
const snails = [];
function registEntrySnail(name) {
  const snail = createSnailImg(name);
  const rail = createRailContainer();

  rail.appendChild(snail);
  playground.appendChild(rail);

  snails.push(snail);
}

const step = 2;
function go(index) {
  let paddingLeft = snails[index].style.paddingLeft;
  if(paddingLeft) {
    console.log(removePxStr(paddingLeft));
    paddingLeft = `${step + removePxStr(paddingLeft)}px`;  
  } else {
    paddingLeft = `${step}px`;
  }

  snails[index].style.paddingLeft = paddingLeft;

  return [index, removePxStr(paddingLeft)];
}


const GOAL = 470;
const playBtn = document.querySelector('#playBtn');
const stopBtn = document.querySelector('#stopBtn');
const winnerBox = document.querySelector('#winnerBox');
function play() {
  playBtn.disabled = true;

  let moving = [0, 0];

  const id = setInterval(() => {
    const selectedIdx = Math.floor(Math.random() * snailCnt);
    moving = go(selectedIdx);
    if(moving[1] > GOAL) {
      clearInterval(id);
      resetBtn.disabled = false;
      
      const winner = snails[moving[0]].children[0].innerText;
      winnerBox.innerText = `우승자 : ${winner}`
    }
  }, 1);
}

function reset() {
  resetBtn.disabled = true;
  winnerBox.innerText = '';

  snails.forEach(snail => {
    snail.style.paddingLeft = '0px';
  });

  playBtn.disabled = false;
}

function app() {
  registEntrySnail('');
  registEntrySnail('');
  registEntrySnail('');
  registEntrySnail('');
  registEntrySnail('');
  registEntrySnail('이택수');
}

app();

