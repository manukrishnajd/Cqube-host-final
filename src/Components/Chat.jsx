import React, { useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';

import { Button } from '.';
import { chatData } from '../Data/dummy';
import { useStateContext } from '../Contexts/ContextProvider';
import { addbranch } from '../service/apiService';
import { FaCodeBranch } from 'react-icons/fa';

const Branch = () => {
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();
const [branch, setbranch]=useState()
const handleChange=(event)=>{
setbranch({[event.target.name]:event.target.value})
}

const handlesubmit=(e)=>{
  e.preventDefault()
  setbranch(branch)
  addbranch(branch)
  console.log(branch);
}

  return (
    <div className="nav-item absolute right-5 md:right-52 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="font-semibold text-lg dark:text-gray-200">Branch Add</p>
          <button type="button" className="text-white  text-xs rounded p-1 px-2 bg-orange">
            5 New
          </button>
        </div>
        <Button
          icon={<MdOutlineCancel/>}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
        <Button
          title="Add branch"
          dotColor="#03C9D7"
          customFunc={() => handleClick("chat")}
          color={currentColor}
          icon={<FaCodeBranch/>}
        />
      <form onSubmit={handlesubmit}>

      <input type="text" placeholder='branch' name="name"  onChange={handleChange} id="" />
      <input type="submit" name="" id=""/>
      </form>
    </div>
  );
};

export default Branch;