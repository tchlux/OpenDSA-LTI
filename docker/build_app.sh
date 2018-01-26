echo Building opendsa-lti_app image ...
docker build -t opendsa/opendsa-lti_app:1.0.0 . -f Dockerfile_app

sleep 1
echo Pushing opendsa-lti_app image ...
docker push opendsa/opendsa-lti_app:1.0.0