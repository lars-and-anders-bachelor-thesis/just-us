# Just Us: A Blockchain-based Privacy-friendly Social Network

## Backend Build Instructions

For the frontend build instructions, go [here.](https://github.com/lars-and-anders-bachelor-thesis/just-us/tree/frontend)
(note: only tested on WSL 2 ubuntu and ubuntu 18.02LTS, need linux environment to run)

### Prerequisites: 

**`Mysql`**, **`Docker`** and **`Docker-Compose`** needs to be installed on your computer. 


### Step-by-step build

1. Clone the Just Us repository
2. Clone fabric-samples repository and binaries using the following command from within the just-us folder:
```bash
curl -sSL https://bit.ly/2ysbOFE | bash -s
```
In WSL 2, make sure Docker Desktop is running as well as the WSL 2 integration being turned on in Docker Desktop.

3. Move my-simple offchain inside fabric-samples folder.

4. Run the following command inside the backend folder:
```bash
sudo ./databaseSetup.sh
```
If you get a Mysql error, run the following command and try again:
```bash
sudo service mysql start
```
5. Navigate to the my-simple-offchain folder and run the following command:
```bash
start.sh
```
6. Follow build instructions from output of start.sh
<!-- - first clone just-us repo
- clone fabric-samples repo and binaries using command 'curl -sSL https://bit.ly/2ysbOFE | bash -s' from within backend folder in just-us
	- in WSL 2, make sure docker desktop is running as well as WSL 2 integration being turned on in docker desktop
- move my-simple-offchain inside fabric-samples folder
- run command databaseSetup.sh executable inside backend folder using sudo
	- if you get mysql error, run command 'sudo service mysql start' and try again
- run start.sh from within my-simple-offchain
- follow build instructions from output of start.sh -->
