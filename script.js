const boxes = Array.from(document.getElementsByClassName('box'));  //all box store in arrays
    const resetBtn = document.getElementById('resetBtn');
    resetBtn.addEventListener('click', reset);
    let headerText = document.getElementById('header-text');  //
    const areas = [null, null, null, null, null, null, null, null, null];
    const o_text = "o";
    const x_text = "x";
    let currentPlayer = o_text;  //strat with O
    let winBoxesIds = [];      //collect the box id

    function bindClickEvent() {
      boxes.forEach(box => {         //for each box
        box.addEventListener('click', handleBoxClick);       //click for the box
      })
    }

    bindClickEvent();   //call the function

    function handleBoxClick(e) {
      if(winBoxesIds.length > 0){        //ones we done game(great has print) after we can enter any value
        return
      }
      const id = e.target.id;
      if (!areas[id]) {
        areas[id] = currentPlayer;
        e.target.innerHTML = currentPlayer;

        if (hasPlayerWon(currentPlayer)) {
          headerText.innerHTML = `${currentPlayer} Great!!`;    //header txt change
          headerText.style.background = 'lightgreen';    //if the match all box chnage the color and txt will be great
          changeWinBoxesBg();
          return
        }
        currentPlayer = currentPlayer === o_text ? x_text : o_text;   //o next x print
      }


    }

    function hasPlayerWon(cPlayer){
      if(areas[0] === cPlayer){
        if(areas[1]===cPlayer && areas[2]===cPlayer){
          winBoxesIds = [0,1,2];     //id are 
          return true;
        }
        if(areas[3]===cPlayer && areas[6]===cPlayer){
          winBoxesIds = [0,3,6];
          return true;
        }
        if(areas[4]===cPlayer && areas[8]===cPlayer){
          winBoxesIds = [0,4,8];
          return true;
        }
      }
      if(areas[4] === cPlayer){
        if(areas[1]===cPlayer && areas[7]===cPlayer){
          winBoxesIds = [4,1,7];
          return true;
        }
        if(areas[2]===cPlayer && areas[6]===cPlayer){
          winBoxesIds = [4,2,6];
          return true;
        }
        if(areas[3]===cPlayer && areas[5]===cPlayer){
          winBoxesIds = [4,3,5];
          return true;
        }
      }
      if(areas[8] === cPlayer){
        if(areas[7]===cPlayer && areas[6]===cPlayer){
          winBoxesIds = [8,7,6];
          return true;
        }
        if(areas[5]===cPlayer && areas[2]===cPlayer){
          winBoxesIds = [8,5,1];
          return true;
        }
      }
    }

    function changeWinBoxesBg(){
      winBoxesIds.forEach(id=>{      //if the id same change the color
        boxes[id].style.background = 'lightgreen'
      })
      boxes.forEach(box=>{
        box.style.cursor = 'not-allowed'
      })
    }

    function reset() {
      winBoxesIds = [];
      areas.forEach((val, index)=>{
        areas[index] = null;
      })
      boxes.forEach(box=>{
        box.innerHTML = '';
        box.style.background = '';
        box.style.cursor = 'pointer'
      })
      headerText.innerHTML = "Let's play..";
      headerText.style.background = "";
      currentPlayer = o_text;
    }
  