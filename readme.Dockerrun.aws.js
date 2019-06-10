// This file is for documenting how the Dockerrun.aws.json file works only.
// This file is not actually used or ran anywhere.
{
  // Specify version of AWS EB Dockerrun
  "AWSEBDockerrunVersion": 2,
    // Since we're using multiple containers, we need to define them invidividually
    "containerDefinitions": [
      {
        // We'll use the same naming convention we're using in Travis and Dockerfiles
        "name": "client",
        // This is pointing to a build image on DockerHub
        "image": "gtntaz/microservices-client",
        // Shortcut name to the container, similar to how it's defined in docker-compose
        "hostname": "client",
        // If the container crashes keep the other containers running
        "essential": false,
        // Elastic Beanstalk requires specifying how much memory to allocate to the container
        "memory": 128
      },
      // ...
      {
        "name": "server",
        "image": "gtntaz/microservices-server",
        "hostname": "api", // Since we remapped the server to api due to nginx constraints, we have to specify it here
        "essential": false,
        "memory": 128
      },
      // ...
      {
        "name": "nginx",
        "image": "gtntaz/microservices-nginx",
        // If this container crashes, we want to shut down the whole app
        // Since nginx is doing the routing, the app won't work without it
        "essential": true,
        "memory": 128,
        // Generic port mapping, following values that are defined in docker-compose
        "portMappings": [
          {
            "hostPort": 80,
            "containerPort": 80
          }
        ],
        // The nginx container has to talk to two microservices. This forms that link
        // Note that it's using thhe "name" key, not the "hostname"
        "links": [
          "client",
          "server"
        ]
      }
    ]
}