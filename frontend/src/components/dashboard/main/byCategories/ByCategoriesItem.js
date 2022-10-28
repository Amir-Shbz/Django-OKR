import React from 'react'

export const ByCategoriesItem = ({placeholder, index}) => {

  function typing() {
    document.getElementsByClassName('dashboard-by-categories-item-icons')[index].style.display = '';
  }

  function exitTyping() {
    document.getElementsByClassName('dashboard-by-categories-item-icons')[index].style.display = 'none';
  }
  return (
    <div className='container-fluid d-flex align-items-center justify-content-between p-3 dashboard-by-categories-item'>
      <div>
        <span>+</span>
        <input onClick={typing} onBlur={exitTyping} placeholder={placeholder}/>
      </div>
      <div className='dashboard-by-categories-item-icons' style={{ display: 'none' }}>
        <i class="fa-solid fa-link-slash" data-toggle="tooltip" data-placement="top" title="link objectives"></i>
        <i class="fa-solid fa-clock" data-toggle="tooltip" data-placement="top" title="due date"></i>
        <i class="fa-solid fa-paperclip" data-toggle="tooltip" data-placement="top" title="add attachment"></i>
        <i class="fa-solid fa-at" data-toggle="tooltip" data-placement="top" title="mention somebody"></i>
        <i class="fa-solid fa-hashtag" data-toggle="tooltip" data-placement="top" title="add #tag"></i>
        <i class="fa-solid fa-eye" data-toggle="tooltip" data-placement="top" title="toggle item property"></i>
        <i class="fa-solid fa-face-smile" data-toggle="tooltip" data-placement="top" title="add emoji"></i>
      </div>
    </div>
  )
}
