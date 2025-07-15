import { api } from "../../config/api";
import{GET_ALL_PLOTS_SUCCESS,
    GET_ALL_PLOTS_FAILURE,
    GET_USERS_PLOT_SUCCESS,
    GET_USERS_PLOT_FAILURE,
    USER_LIKE_PLOT_SUCCESS,
    USER_LIKE_PLOT_FAILURE,
    FIND_PLOT_BY_ID_SUCCESS,
    FIND_PLOT_BY_ID_FAILURE,
    PLOT_CREATE_SUCCESS,
    PLOT_CREATE_FAILURE,
    REPLOT_SUCCESS,
    REPLOT_FAILURE,
    LIKE_PLOT_SUCCESS,
    LIKE_PLOT_FAILURE,
    PLOT_DELETE_SUCCESS,
    PLOT_DELETE_FAILURE,
    COLLECT_SUCCESS,
    COLLECT_FAILURE,
    VIEW_PLOT_SUCCESS,
    VIEW_PLOT_FAILURE,
    GET_USERS_PLOTS_SUCCESS,
    GET_USERS_PLOTS_FAILURE,
    GET_USER_PLOTS_SUCCESS,
    GET_USER_PLOTS_FAILURE

} from "./ActionType"
import { toast } from "react-toastify";


export const getAllPlots =()=>async(dispatch)=>{
    try{
        const {data} = await api.get("/api/plots/");
        console.log("get all plot: ",data)
        dispatch({type:GET_ALL_PLOTS_SUCCESS,payload:data})

    }catch(error){

        console.log("catch error  - ",error)
        dispatch({type:GET_ALL_PLOTS_FAILURE,payload:error.message})

    }
}

export const getUserPlots =(userId)=>async(dispatch)=>{
    try{
        const {data} = await api.get(`/api/plots/user/${userId}`);
        console.log("get User Plots : ",data)
        dispatch({type:GET_USER_PLOTS_SUCCESS,payload:data})

    }catch(error){
        console.log("catch error  - ",error)
        dispatch({type:GET_USER_PLOTS_FAILURE,payload:error.message})
    }
}

export const findPlotsByLikeContainUser=(userId)=>async(dispatch)=>{
    try{
        const {data} = await api.get(`/api/plots/user/${userId}/likes`);
        console.log("user Like plots : ",data)
        dispatch({type:USER_LIKE_PLOT_SUCCESS,payload:data})

    }catch (error){
        console.log("catch error - ",error);
        dispatch({type:USER_LIKE_PLOT_FAILURE,payload:error.message})

    }
}


export const findPlotsById=(plotId)=>async(dispatch)=>{
    try{
        const {data} = await api.get(`/api/plots/${plotId}`);
        console.log("find plot by id: ",data)
        dispatch({type:FIND_PLOT_BY_ID_SUCCESS,payload:data})

    }catch (error){
        console.log("catch error - ",error);
        dispatch({type:FIND_PLOT_BY_ID_FAILURE,payload:error.message})

    }
}

export const createPlot =(plotData)=>async(dispatch)=>{
    try{
         const {data} = await api.post(`/api/plots/create`,plotData);
         console.log("created plot: ",data)
         dispatch({type:PLOT_CREATE_SUCCESS,payload:data})
         toast.success("Plot complete!");

    }catch(error){
        console.log("catch error - ",error)
        dispatch({type:PLOT_CREATE_FAILURE,payload:error.message})
         toast.error(error.response?.data?.message)
    }
}

export const replot =(plotData)=>async(dispatch)=>{
    try{
         const {data} = await api.post(`/api/plots/replot`,plotData);
         console.log("replot : ",data)
         dispatch({type:REPLOT_SUCCESS,payload:data})
         toast.success("Replot complete!");

    }catch(error){
        console.log("catch error - ",error)
        dispatch({type:REPLOT_FAILURE,payload:error.message})
         toast.error(error.response?.data?.message)
    }
}

// export const collect =(plotId)=>async(dispatch)=>{
//     try{
//          const {data} = await api.put(`/api/plots/${plotId}/collect`);
//          console.log("Collect : ",data)
//          dispatch({type:COLLECT_SUCCESS,payload:data})
         

//     }catch(error){
//         console.log("catch error - ",error)
//         dispatch({type:COLLECT_FAILURE,payload:error.message})
//          toast.error(error.response?.data?.message)
//     }
// }

// export const likePlot =(plotId)=>async(dispatch)=>{
//     try{
//          const {data} = await api.post(`/api/${plotId}/like`);
//          console.log("like plot: ",data)
//          dispatch({type:LIKE_PLOT_SUCCESS,payload:data})

//     }catch(error){
//         console.log("catch error - ",error)
//         dispatch({type:LIKE_PLOT_FAILURE,payload:error.message})
//          toast.error(error.response?.data?.message)
//     }
// }

export const collect = (plotId, callback) => async (dispatch) => {
  try {
    const { data } = await api.put(`/api/plots/${plotId}/collect`);
    console.log("Collect : ", data);
    dispatch({ type: COLLECT_SUCCESS, payload: data });
    if (callback) callback(); // ✅ trigger refetch if provided
  } catch (error) {
    console.log("catch error - ", error);
    dispatch({ type: COLLECT_FAILURE, payload: error.message });
    toast.error(error.response?.data?.message);
  }
};

export const likePlot = (plotId, callback) => async (dispatch) => {
  try {
    const { data } = await api.post(`/api/${plotId}/like`);
    console.log("like plot: ", data);
    dispatch({ type: LIKE_PLOT_SUCCESS, payload: data });
    if (callback) callback(); // ✅ trigger refetch if provided
  } catch (error) {
    console.log("catch error - ", error);
    dispatch({ type: LIKE_PLOT_FAILURE, payload: error.message });
    toast.error(error.response?.data?.message);
  }
};


export const  deletePlot =(plotId)=>async(dispatch)=>{
    try{
         const {data} = await api.delete(`/api/plot/${plotId}`);
         console.log("delete plot : ",data)
         dispatch({type:PLOT_DELETE_SUCCESS,payload:plotId})

    }catch(error){
        console.log("catch error - ",error)
        dispatch({type:PLOT_DELETE_FAILURE,payload:error.message})
    }
}

export const viewPlot = (plotId) => async (dispatch) => {
  try {
    const { data } = await api.put(`/api/plots/${plotId}/view`);
    console.log("Viewed Plot: ", data);
    dispatch({ type: VIEW_PLOT_SUCCESS, payload: data }); // ✅ send back updated plot

  } catch (error) {
    console.log("catch error - ", error);
    dispatch({ type: VIEW_PLOT_FAILURE, payload: error.message });
  }
};
