
import Sidebar from 'components/sidebar/sidebar';
import AuthUserContext from '../../authentication/AuthUserContext'
import React, { useEffect, useState, useContext } from 'react'


const Root = () => {
  const authUser = useContext<any>(AuthUserContext)

  return (
    <>
      <div className='overflow-hidden  ml-0 sm:ml-[240px]'>
        <Sidebar/>
        <h1 className="text-lg font-bold	">
          Hello {authUser?.emp?.name}
        </h1>
      </div>
    </>
  );
};

export default Root;
