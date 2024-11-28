# Bus-Ticket-Management

1. Authentication APIs

(1) registration
    method : post
    api endpiint : https://bus-ticket-management.vercel.app/api/v1/auth/register   
    you can register a new account with this paylod
name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user",
        enum: ["admin", "user"],
},


(2) login : 
    method : POST
    api endpoint : https://bus-ticket-management.vercel.app/api/v1/auth/auth/login  
    you can login a new account with this paylod  email and password

(3) logout : 
    method : GET
    api endpoint : https://bus-ticket-management.vercel.app/api/v1/auth/auth/logout   
    you can logout a new account.

2. Admin APIs

(1) Add a new bus 
        method : POST
        api endpoint : https://bus-ticket-management.vercel.app/api/v1/admin/bus
        only admin can access this api endpoint when admin login than he can upload a bus information with this payload : 

    busName : {
        type : String,
        required : true,
        unique : true
    },
    totalSeats : {
        type : Number,
        required : true
    },
    route : {
        type : [String],
        required : true
    },
    departureTime : {
        type : Date,
        required : true
    }

(2) Update bus 
        method : PUT
        api endpoint : https://bus-ticket-management.vercel.app/api/v1/admin/bus/:id
        only admin can access this api endpoint when admin login than he can update a bus information with this payload : 

    busName : {
        type : String,
        required : true,
        unique : true
    },
    totalSeats : {
        type : Number,
        required : true
    },
    route : {
        type : [String],
        required : true
    },
    departureTime : {
        type : Date,
        required : true
    }

(3) Delete bus 
    method : DELETE
    api endpoint : https://bus-ticket-management.vercel.app/api/v1/admin/bus/:id
    only admin can access this api endpoint when admin login than he can delete a bus information with id

(4) Upload new Ticket
    method : POST
    api endpoint : https://bus-ticket-management.vercel.app/api/v1/admin/ticket
    only admin can access this api endpoint when admin login than he can upload a new ticket for a specific bus and time payload :
    busId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    seatNumber: {
        type: String,
        required: true,
        unique: true
    },
    ticketPrice : {
        type: String,
        required: true
    },
    busDeparatureTime : {
        type: Date,
        required: true
    }

(5) Update ticket information.
    method : PUT
    api endpoint : https://bus-ticket-management.vercel.app/api/v1/admin/ticket/:id
    only admin can access this api endpoint when admin login than he can update a new ticket for this payload :
    busId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    seatNumber: {
        type: String,
        required: true,
        unique: true
    },
    ticketPrice : {
        type: String,
        required: true
    },
    busDeparatureTime : {
        type: Date,
        required: true
    }

(6)  Delete a ticket.
    method : DELETE
    api endpoint : https://bus-ticket-management.vercel.app/api/v1/admin/ticket/:id
    only admin can access this api endpoint when admin login than he can delete ticket.


3. User APIs

(1) View all available buses : 
    method : GET
    api endpoint : https://bus-ticket-management.vercel.app/api/v1/tickets
    user can view all available buses


(2) View available tickets for specific buses and time periods : 
    method : GET
    api endpoint : https://bus-ticket-management.vercel.app/api/v1/tickets
    user can  available tickets for specific buses and time periods this payload 
    {
        "id" : "674691a4b0a084ae670cacba"
        "busId": "674691a4b0a084ae670cacba",
        "startTime": "2024-11-27T00:00:00.000Z",
        "endTime": "2024-11-27T23:59:59.999Z"
    }


(3) View available tickets for specific buses and time periods and user purchase : 
    method : GET
    api endpoint : https://bus-ticket-management.vercel.app/api/v1/tickets/purchase
    user can  available tickets for specific buses and time periods this payload and purchase tickets
    {
        "id" : "674691a4b0a084ae670cacba"
        "busId": "674691a4b0a084ae670cacba",
        "startTime": "2024-11-27T00:00:00.000Z",
        "endTime": "2024-11-27T23:59:59.999Z"
    }