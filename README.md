# Appointment API

> This API has been deployed on Heroku in a free plan. The Heroku's container, called dynos, enter in a sleep mode after 30 minutes of no usage. So, it has a good chance that the dyno is sleeping in your first try, it will cause a delay on your first request.

> This API is build to manage appointment for patients. It uses JWT between all request to validate authenticy and store hashed passwords on database. After login, the API response contain a JWT token to be used on all request's headers as **"x-access-token": "received-jwt-token"**

> This doc cover the success request. Proper information if either bad request or invalid data is sent on the response, in those cases.

> Appointments must be created between 08 AM and 5 PM.

# API base URL
    https://appointment-api-fq.herokuapp.com/api

# ENDPOINTS

    /employer

## POST /newemployer -- create a new employer

**Use query params called master=secret to perform this action**(not a huge secret, right?)

req -  https://appointment-api-fq.herokuapp.com/api/employer/newemployer?master=secret

    {
        "name": "user",
        "password": "newuser",
        "email": "user@user.com"   
    }

res

    {
        "message": "New employer created"
    }

## POST /login -- perform login

req - https://appointment-api-fq.herokuapp.com/api/employer/login

    {
        "email": "user@user.com",
        "password": "newuser"
    }

res

    {
        "auth": true,
        "JWTtoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZnJlZXVzZXIuY29tIiwibmFtZSI6InVzZXIiLCJpZCI6OSwiaWF0IjoxNjU3NjQwMzQ4LCJleHAiOjE2NTc2ODM1NDh9.H4O307Rxl1Tp2CZNK0yVCTTTxtQbTLC3QQLWeaDILPg",
        "user": "user@freeuser.com"
    }

--- 

> ***FOR ALL THE REQUESTS AHEAD, THE JWT TOKEN MUST BE INCLUDE IN THE HEADER AS***
>
> "x-access-token":"received-jwt-token"

---

    /patient

## GET /patient/:phone -- get patient data by its phone

req - https://appointment-api-fq.herokuapp.com/api/patient/patient/999888777

res

    {
        "data": {
            "id": 2,
            "name": "Gituser",
            "phone": "999888777"
        }
    }

## POST /newpatient -- create a new patient

req - https://appointment-api-fq.herokuapp.com/api/patient/newpatient

    {
        "name": "Gituser",
        "phone": "999888777"
    }

res

    {
        "message": {
            "id": 2,
            "name": "Gituser",
            "phone": "999888777"
        }
    }

---   
    /appointment

## GET /bydate -- get all apointments of a specified day

req - https://appointment-api-fq.herokuapp.com/api/appointment/bydate

    {
        "date": "2022-07-19T17:53:06.932Z"
    }

res

    {
        "message": [
            {
                "id": 11,
                "type": "psychologist",
                "authorId": 1,
                "date": "2022-07-19T13:00:00.000Z"
                },
            {
                "id": 10,
                "type": "psychologist",
                "authorId": 2,
                "date": "2022-07-19T17:00:00.000Z"
            }
        ]
}

## GET /bypatient -- get all appointments of a specified patient

req - https://appointment-api-fq.herokuapp.com/api/appointment/bypatient

    {
       "authorId": "2"
    }

res

    {
        "message": [
            {
                "id": 10,
                "type": "psychologist",
                "authorId": 2,
                "date": "2022-07-19T17:00:00.000Z"
            }
        ]
    }

## GET /:id -- get an appointment by its id

req - https://appointment-api-fq.herokuapp.com/api/appointment/6

res

    {
        "message": {
            "id": 6,
            "type": "cardio",
            "authorId": 1,
            "date": "2022-07-17T05:59:00.000Z"
        }
    }

## POST /newappointment -- create a new appointment

req - https://appointment-api-fq.herokuapp.com/api/appointment/newappointment

    {
        "authorId": "2",
        "type": "psychologist",
        "date": "2022-07-19T17:00:00.000Z"
    }

res

    {
       "message": "New appointment created"
    }

## PUT /:id -- update an appointment using its id

req - https://appointment-api-fq.herokuapp.com/api/appointment/2

    {
        "type": "cardiologist"
    }

res

    {
        "message": {
            "id": 2,
            "type": "cardiologist",
            "authorId": 1,
            "date": "2022-07-14T14:00:00.000Z"
        }
    }

## DELETE /:id -- delete an appointment using its id

req - https://appointment-api-fq.herokuapp.com/api/appointment/2

res

    {
        "message": "Appointment has been deleted"
    }

--- 

