import React from 'react';

export const SpritItem = ({ title, icons }) => {
  return (
    <div className='container-fluid d-flex align-items-center justify-content-between p-3 dashboard-by-categories-sprit-item'>
      <div>
        <b>{title}</b>
      </div>
      <div className='dashboard-by-categories-sprit-item-icons'>
        {icons == "star" ?
          <><i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i></> : null}
        {icons == "heart" ?
          <><i class="fa-solid fa-heart"></i>
            <i class="fa-solid fa-heart"></i>
            <i class="fa-solid fa-heart"></i>
            <i class="fa-solid fa-heart"></i>
            <i class="fa-solid fa-heart"></i></> : null}
        {icons == "energy" ?
          <><i class="fa-solid fa-battery-empty"></i>
            <i class="fa-solid fa-battery-quarter"></i>
            <i class="fa-solid fa-battery-half"></i>
            <i class="fa-solid fa-battery-three-quarters"></i>
            <i class="fa-solid fa-battery-full"></i></> : null}
        {icons == "balance" ?
          <>
            <i class="fa-solid fa-face-sad-tear"></i>
            <i class="fa-solid fa-face-frown"></i>
            <i class="fa-solid fa-face-meh"></i>
            <i class="fa-solid fa-face-smile-beam"></i>
            <i class="fa-solid fa-face-kiss-wink-heart"></i></> : null}
      </div>
    </div>
  )
}
