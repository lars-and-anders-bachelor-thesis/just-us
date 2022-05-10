# just-us

Blockchain based social app for the privacy of the people!


## backend build instructions
prerequisites: mysql, docker

- (note: only tested on WSL 2 ubuntu and ubuntu 18.02LTS, need linux environment to run)
- first clone just-us repo
- clone fabric-samples repo and binaries using command 'curl -sSL https://bit.ly/2ysbOFE | bash -s' from within backend folder in just-us
	- in WSL 2, make sure docker desktop is running as well as WSL 2 integration being turned on in docker desktop
- move my-simple-offchain inside fabric-samples folder
- run command databaseSetup.sh executable inside my-simple-offchain using sudo
- run start.sh from within my-simple-offchain
- follow build instructions from output of start.sh
