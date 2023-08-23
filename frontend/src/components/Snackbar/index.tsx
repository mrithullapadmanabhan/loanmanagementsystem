import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, {createContext,useState,useContext} from 'react'


const SnackbarContext= createContext<SnackbarContextType | undefined>(undefined);
type SnackbarContextType= (msg: String,type: String)=> void;

export const SnackbarProvider= (props: any) => {
    

    const showSnackBar= (msg: String,type: String)=>{
        switch(type){
            case "success": 
                toast.success(msg, {
                    position: toast.POSITION.BOTTOM_LEFT
                });
                break;

            case "error": 
                toast.error(msg, {
                    position: toast.POSITION.BOTTOM_LEFT
                });
                break;

            case "warn": 
                toast.warn(msg, {
                    position: toast.POSITION.BOTTOM_LEFT
                });
                break;

            case "info": 
                toast.info(msg, {
                    position: toast.POSITION.BOTTOM_LEFT
                });
                break;
        }
    }

    return (
        <SnackbarContext.Provider value={showSnackBar}>
            {props.children}
            <ToastContainer />
        </SnackbarContext.Provider>
    );
}

export const useSnackbar= ()=>{
    const context=useContext(SnackbarContext)
    if(!context){
        throw new Error("UseSnackbar must be used within snackbarprovider")
    }
    return context
}