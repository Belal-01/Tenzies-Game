import React from "react"
const NumBox = (prop) => {
 const styles ={
    backgroundColor:prop.isHelled&&"rgba(89, 227, 145, 1)"
  }
  return (
    <div className="container__numbers__box" style={styles} onClick={()=>prop.updatState(prop.id)}>
      {prop.value}
    </div>
  )
}

export default NumBox
