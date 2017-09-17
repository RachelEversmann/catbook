//
import React, { Component } from 'react';
var Upload= (props) => (
  <div className='Upload'>   
    <form id='uploadForm' 
      action='http://localhost:3000/upload' 
      method='post' 
      encType="multipart/form-data">
        "Cat's name"
        <input type='text' name='user'/>
        "Cat's status"
        <input type='text' name='status'/>
        "Cat's photo"
        <input type="file" name="catPic" />
        <input type='submit' value='Upload!' />
    </form>
  </div>
)
export default Upload

