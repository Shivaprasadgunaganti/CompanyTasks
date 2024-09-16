import React from 'react'

export const Pagination = ({aa,xx,yy}) => {
  const res= Math.ceil(yy/xx)
  const arr=[]

  for(let i =1;i<=res;i++){
    arr.push(<button key={i} onClick={()=>aa(i)}>{i}</button>)
  }
  return (
<>{arr}</>
  )
}
