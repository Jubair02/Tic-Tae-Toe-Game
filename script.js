const X_CLASS='x'
const CIRCLE_CLASS='circle'
const WINNING_COMBINATION = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const cellElements=document.querySelectorAll('[data-cell]')
const board=document.getElementById('board')
const winningMessageElement=document.getElementById('winningMessage')
const winningMessageTextElement= document.querySelector('[data-winning-message-text]')
const restartButton= document.getElementById('restartButton')
let circleTurn 


startGame()
restartButton.addEventListener('click',startGame)

function startGame(){
    circleTurn=false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click',handleClick)
        cell.addEventListener('click', handleClick , { once: true})
    
    })
    setboardHoverClass()
    winningMessageElement.classList.remove('show')
    
}

function handleClick(e) {
    //placemark
    //check for win
    // Cheack for Draw
   

    const cell=e.target
    const currentClass =circleTurn ? CIRCLE_CLASS :X_CLASS
    placeMark(cell,currentClass)

    if(checkwin(currentClass)){
    endGame(false)

    } else if (isDraw())
    {
        endGame(true)
          
    }
    else{
        swapTurns()
        setboardHoverClass()
    }
    

}

function endGame(draw){
    if(draw){
        winningMessageTextElement.innerText = 'Draw!'

    } else {
       winningMessageTextElement.innerText =` ${circleTurn ? "O's" : "X"} wins!`
        
    }
    winningMessageElement.classList.add('show')

}
function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || 
        cell.classList.contains(CIRCLE_CLASS)
    })
}


function placeMark(cell,currentClass){
    cell.classList.add(currentClass)
}
// Switch Turns
function swapTurns() {
    circleTurn=!circleTurn
}

function setboardHoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)

    if(circleTurn){
        board.classList.add(CIRCLE_CLASS)
    } else{
        board.classList.add(X_CLASS)
    }

}
function checkwin(currentClass) {
    return WINNING_COMBINATION.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

//Dark-Light Mode
const toggleSwitch =document.querySelector('input[type="checkbox"]');
const toggleIcon = document.getElementById('toggle-icon');

//Dark Mode Styles

const darkmode=()=>{
    toggleIcon.children[0].textContent="Dark Mode"
    toggleIcon.children[1].classList.replace('fa-sun','fa-moon');
  
}
//Light Mode Styles
const lightmode=()=>{
    toggleIcon.children[0].textContent="Light Mode"
    toggleIcon.children[1].classList.replace('fa-moon','fa-sun');
    
}

//Switch Theme Dynamically
const switchTheme=(event)=>{
    if(event.target.checked){
        document.documentElement.setAttribute('data-theme','dark');
        darkmode();
      
       
    } else {
        document.documentElement.setAttribute('data-theme','light')
        lightmode();
     
    }
   
}

toggleSwitch.addEventListener('change',switchTheme);

//Check Local Storage
const currentTheme= localStorage.getItem('theme');
if(currentTheme){
    document.documentElement.setAttribute('data-theme', currentTheme);
    if(currentTheme ==='dark'){
        toggleSwitch.checked=true;
        darkmode();
    }
}



