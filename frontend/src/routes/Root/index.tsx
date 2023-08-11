
import AuthUserContext from '../../authentication/AuthUserContext'
import React, { useEffect, useState, useContext } from 'react'


const Root = () => {
  const authUser = useContext<any>(AuthUserContext)

  return (
    <>
    <h1 className="text-lg font-bold	">
      Hello {authUser?.name}
    </h1>
    </>
  );
};

export default Root;
