We have chosen to work with

- NodeJs -> It gives high performance due to event driven approach. Web-development or making REST API 
            using nodejs provides high scalability. Also, it has large community of user so finding supoprting softwares is easier.

- ExpressJs -> Open source, easy to use for making server side applications by organising into MVC  
            structure. Widely supported by active user base and easy to findd supporting softwares.
            
- MongoDB -> NoSQL database provides flexibility for the schma structure and is more scalable than SQL 
             system. It is easier to query and store data on.

ASSUMPTIONS:
    - LOGIN: Assume that the random secret required for generation of authetication token is stored
             is stored securely at the server side for verification purposes.
    
    - ROUTING: Assume that the messages delivered to the rest API are already routed by the TCP server.
    Hence, we don't listen to TCP server.

    - FILENAME FOR VIDEOS: Assume that the video files delivered by the dash cams comes in small chunks of
            say 5 minutes video chunk. And when an alarm message is triggered then dashcam sends us say chunks of past 30 minutes files named automatically in format IMEI_timestampOfAlarm_1.mp4, 
            IMEI_timestampOfAlarm_2.mp4 ... . This will help to relate the filenames to the alarm incident and will be easier to query later if needed to query as per the timestamp or as per alarm.

    - We assume that user data is already stored. And when the login is generated then the dashcam stores an authetication token which expires after 6 hours. For every other API call dashcam needs to send the token as the query parameter which is then verified by the isAuth middleware before giving access to the API call. 

    - We assume that whenever UI sends request for some infomation it also sends the page number in the query to support for the pagination. Pagination will help fetched limited number of data there by decreasing the load of the server.
