export function postJob(data){
    return {
        type: "CREATED_JOB_SUCCESS",
        jobCreated: true,
        jobData: {
            id: data.id,
            description: data.description,
            phone: data.phone,
            ownerId: data.ownerId
        }
    }
} 

export function failedJob(descriptionError, phoneError){
    return {
        type: "CREATED_JOB_FAILED",
        descriptionError: descriptionError,
        phoneError: phoneError
    }
} 