import React from 'react'

export default function ListHeader({items}) {
  return (
    <div style={{
        display:"flex"
    }}>
      {items.map((item,index)=>{
        return(
            <div key={`header-item-${index}`} style={{flexGrow:1,justifyContent:"center",display:"flex"}}>
                {item}
            </div>
        )
      })}
    </div>
  )
}
