# Make sure Docker images are tagged with latest + git sha (because kubernetes won't update if we redeploy latest only) 
# Build and tag /client
docker build -t gtntaz/microservices-client:latest -t gtntaz/microservices-client:$SHA -f ./client/Dockerfile ./client
# Build and tag /server
docker build -t gtntaz/microservices-server:latest -t gtntaz/microservices-server:$SHA -f ./server/Dockerfile ./server
# Build and tag /worker
docker build -t gtntaz/microservices-worker -t gtntaz/microservices-worker:$SHA -f ./worker/Dockerfile ./worker

# Push to Docker registry
docker push gtntaz/microservices-client:latest
docker push gtntaz/microservices-server:latest
docker push gtntaz/microservices-worker:latest

docker push gtntaz/microservices-client:$SHA
docker push gtntaz/microservices-server:$SHA
docker push gtntaz/microservices-worker:$SHA

# Set up kubernetes
kubectl apply -f k8s

# Set k8s deployments
kubectl set image deployments/client-deployment client=gtntaz/microservices-client:$SHA
kubectl set image deployments/server-deployment server=gtntaz/microservices-server:$SHA
kubectl set image deployments/worker-deployment worker=gtntaz/microservices-worker:$SHA