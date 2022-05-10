# just-us

Blockchain based social app for the privacy of the people!


## backend build instructions
-(note: only tested on WSL 2 ubuntu and ubuntu 18.02LTS, need linux environment to run)
-first pull just-us repo
-pull fabric-samples repo using command 'curl -sSL https://bit.ly/2ysbOFE | bash -s'
-move my-simple-offchain inside fabric-samples folder
-run command databaseSetup.sh executable inside my-simple-offchain using sudo
-run start.sh from within my-simple-offchain
-follow build instructions from output of start.sh
