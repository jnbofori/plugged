class jobModel {
    constructor(id, title, description, location, phone, deadline, ownerId, firstName, lastName, profilePic){
        this.id = id;
        this.title = title;
        this.description = description;
        this.location = location;
        this.phone = phone;
        this.deadline = deadline;
        this.ownerId =ownerId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.profilePic = profilePic;
    }
}

export default jobModel;