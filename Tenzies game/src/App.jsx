import '/App.css';
import React from 'react';
import NumBox from './components/NumBox';
import {nanoid} from '../node_modules/nanoid';
import Confetti from 'react-confetti';


const App = () => {
  const [DieArrayNumbers,setDieArrayNumbers] = React.useState(()=>declearTheState())
  const [Tenzies ,setTenzies] = React.useState(false)


  React.useEffect(()=>{
   let allHelled = DieArrayNumbers.every(Die => Die.isHelled)
   const firstValue = DieArrayNumbers[0].value
   let allsameValue = DieArrayNumbers.every(Die => Die.value ===firstValue)
    if(allHelled&&allsameValue){
      console.log("finished")
      setTenzies(true)
    }
  },[DieArrayNumbers])

function declearTheState(){
  const alldocNums = []
  for(let i = 0 ;i<10; i++){
    const ranNum = Math.random()
    const intNum = parseInt(ranNum*6)+1
    alldocNums.push({value:intNum
                    ,isHelled:false,
                     id:nanoid()}) 
  }
  return alldocNums
}
function updateTheState(id){
  const newArray = []
  DieArrayNumbers.forEach((box)=>{
    if(box.id===id){
      box.isHelled=!box.isHelled
      newArray.push(box)
    }else{
      newArray.push(box)
    }
  })
  setDieArrayNumbers(newArray)
}
 function rolButton(){
  Tenzies?setDieArrayNumbers(()=>declearTheState()):
  setDieArrayNumbers(prevDies =>prevDies.map(die=>{
    return die.isHelled?die:{value:parseInt(Math.random()*6+1)
      ,isHelled:false,
       id:nanoid()}
  }))
  setTenzies(false)
 }

const allNumBoxes = DieArrayNumbers.map((box)=><NumBox {...box}
                                                      updatState={updateTheState}
                                                         key = {box.id}
                                                      />)
//console.log(allNumBoxes)


  return (
    <>
        <div className="confetti-container">
          {Tenzies&& <Confetti
            width={1200}
            height={600}
            numberOfPieces={200} 
            style={{marginLeft: '20px'}}
          />}
        </div>
   
      <div className="container__black">
        <div className="container__white">
          <h1>Tenzies</h1>
          <p>
            Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
          </p>
          <div className="container__numbers">    
              {allNumBoxes}       
          </div>

        <div className="button-container">
          <button onClick={()=>rolButton()}>{Tenzies?"New Game" :"Roll"}</button>
        </div>
        </div>
      </div>
    </>
  )
}

export default App

