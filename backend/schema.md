# npx prisma migrate dev --name init


### need a database schema for the following json

{
    src: string,
    dest: string,

    transportations: [

         {  name: string ,
            waypoints: [
                {
                    description:[
                        {   
                            latitude:
                            longitude:
                            geojson: 
                        }
                    ],

                    medium: String,
                    time: 
                    cost: int
                }
            ],

            comment: 
            score: 
        }
    ]
}


Example: 

{
    src: Dhaka,
    dest: Saint Martin,
    transportations:[
        {
            name: bus + ferry
            waypoints:[
                {
                    description: [
                        {  
                            latitude: 23,
                            longitude: 24,
                            geojson: a json object containing multiple things
                        },
                        {  
                            latitude: 23,90,
                            longitude: 24,90,
                            geojson: a json object containing multiple things
                        }
                    ],

                    time: 6-7 hours,
                    medium : bus,
                    cost: 750 tk
                },
                {
                    description: [
                        {   name: string,
                            latitude: 23,90,
                            longitude: 24,90,
                            geojson: a json object containing multiple things
                        },
                        {   name: string,
                            latitude: 23,
                            longitude: 24,
                            geojson: a json object containing multiple things
                        }
                    ],
                    time: ,
                    medium: ,
                    cost: 
                },
            ] ,

            comment: ,
            score:  ,
        },

        {
            name: truck + bike,
            ...........
        }
    ]
}