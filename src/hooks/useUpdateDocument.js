import { useState, useEffect, useReducer } from "react";
import {db} from '../firebase/Config'
import { updateDoc, doc} from "firebase/firestore";

const initialState = {
    loading: null,
    error: null
}

const updateReducer = (state, action) => {
    switch(action.type){

        case "LOADING": 
            return{loading:true, error:null}
        case "UPDATED_DOC":
            return{loading:false, error:null}
        case "ERROR":
            return{loading:false, error: action.payload}
        default: 
            return state
    }

}

export const useUpdateDocument = (docCollection) => {

    const [response, dispath] = useReducer(updateReducer, initialState)

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false)

    const checkCancellBeforeDispath = (action) => {
        if(!cancelled){
            dispath(action)
        }
    }

    const updateDocument = async(id, data) => {
        checkCancellBeforeDispath({
            type: "LOADING"
        })


        try {
            
            const docRef = await doc(db, docCollection, id)

            const updatedDocument = await updateDoc(docRef, data)
            

            checkCancellBeforeDispath({
                type: "UPDATED_DOC",
                payload: updatedDocument
            })

        } catch (error) {
            
            checkCancellBeforeDispath({
                type:"ERROR",
                payload: error.message
            })

        }
    }

    useEffect(() => {
        return () => setCancelled(true)
    },[])
    

    return{updateDocument, response}
}

