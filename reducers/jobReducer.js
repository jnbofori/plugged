import jobModel from '../models/jobModel';

const initialState = {
    availableJobs: [],
    usersJobs: []
}

export default (state=initialState, action) => {
    switch(action.type){
        case "CREATED_JOB_SUCCESS":
            const newJob = new jobModel(
                action.jobData.id,
                action.jobData.description,
                action.jobData.phone,
                action.jobData.ownerId
                 )
                // console.log("new job", newJob);

            return {
                ...state,
                availableJobs: state.availableJobs.concat(newJob),
                usersJobs: state.usersJobs.concat(newJob)
            }
        case "CREATED_JOB_FAILED":
            // console.log('creating jobs failed', action);
            
            return {
                ...state,
                descriptionErrorMessage: action.descriptionError,
                phoneErrorMessage: action.phoneError
            }
        default:
            return state
    }
}