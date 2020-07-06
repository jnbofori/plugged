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
            // console.log('creating jobs failed', action)
            return {
                ...state,
                titleErrorMessage: action.titleError,
                descriptionErrorMessage: action.descriptionError,
                locationErrorMessage: action.locationError,
                phoneErrorMessage: action.phoneError,
                deadlineErrorMessage: action.deadlineError
            }
        case "CLEAR_ERROR_MESSAGE":
            return {
                ...state,
                titleErrorMessage: action.titleError,
                descriptionErrorMessage: action.descriptionError,
                locationErrorMessage: action.locationError,
                phoneErrorMessage: action.phoneError,
                deadlineErrorMessage: action.deadlineError
            }
        case "SET_JOBS":
            // console.log('fetching jobs action', action);
            return {
                ...state,
                availableJobs: action.allJobs,
                usersJobs: action.usersOwnJobs
            }
        case "SET_USER_JOBS":
            // console.log('fetching jobs action', action);
            return {
                ...state,
                usersJobs: action.usersOwnJobs
            }
        case "DELETE_JOB":
            // console.log('fetching jobs action', action);
            return {
                usersJobs: state.usersJobs.filter(job => job.id !== action.jobId)
            }
        default:
            return state
    }
}