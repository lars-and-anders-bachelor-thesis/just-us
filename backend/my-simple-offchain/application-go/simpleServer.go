package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gorilla/mux"

	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"strings"

	"github.com/hyperledger/fabric-sdk-go/pkg/core/config"
	"github.com/hyperledger/fabric-sdk-go/pkg/gateway"
)

var err error
var db *OffchainDB
var network *gateway.Network
var contract *gateway.Contract

type Post struct {
	Data           string   `json:"data"`
	Owner          string   `json:"owner"`
	PostId         string   `json:"postId"`
	SharingHistory []string `json:"sharingHistory"`
}

type Profile struct {
	FollowedUsers    []string `json: followedUsers`
	Followers        []string `json:"followers"`
	PendingFollowers []string `json:"pendingFollowers"`
	Posts            []Post   `json:"posts"`
	Username         string   `json: "username"`
}

type Login struct {
	Username string `json: "username"`
	Password string `json: "password"`
}

type UserQuery struct {
	UserId  string `json:"userId"`
	QueryId string `json: "queryId"`
	PostId  string `json: postId`
}

func handleRequests() {
	r := mux.NewRouter().StrictSlash(true)
	//	r.HandleFunc("/Posts", getAllPosts)
	r.HandleFunc("/Profile", getProfile).Queries("username", "{username}").Methods("GET")
	r.HandleFunc("/Post", createPost).Methods("POST")
	r.HandleFunc("/User", signUp).Methods("POST")
	r.HandleFunc("/Posts", getAllPosts).Queries("username", "{username}").Methods("GET")
	r.HandleFunc("/Users/Search", searchUser).Methods("POST")
	r.HandleFunc("/User/Follow", followUser).Methods("POST")
	r.HandleFunc("/User/AcceptFollow", acceptFollower).Methods("POST")
	r.HandleFunc("/History/{username}/{postId}", getHistory).Methods("GET")
	r.HandleFunc("/Post/Share", sharePost).Methods("POST")
	log.Fatal(http.ListenAndServe(":8080", r))
}

func sharePost(w http.ResponseWriter, r *http.Request) {
	log.Println("--> endpoint hit: sharepost")
	body, _ := ioutil.ReadAll(r.Body)

	var shareRequest UserQuery
	json.Unmarshal(body, &shareRequest)
	log.Printf("trying to share post from %v to %v", shareRequest.QueryId, shareRequest.UserId)
	_, err := contract.SubmitTransaction("SharePost", shareRequest.QueryId, shareRequest.PostId, shareRequest.UserId)
	if err != nil {
		log.Printf("Failed to submit transaction: %v", err)
	}
	w.WriteHeader(http.StatusAccepted)
}

func getProfile(w http.ResponseWriter, r *http.Request) {
	log.Println("--> Endpoint hit: getProfile")
	v := r.URL.Query()
	username := v.Get("username")

	log.Printf("requesting profile for user %v", username)
	profileJson, err := contract.EvaluateTransaction("ReadProfile", username)
	var profile Profile
	if err != nil {
		log.Printf("failed to evaluate chaincode: %v", err)
		w.WriteHeader(http.StatusNotFound)
	}
	err = json.Unmarshal(profileJson, &profile)
	if err != nil {
		log.Printf("error marshaling/unmarshaling profile: %v", err)
	}
	profileJson, err = json.Marshal(profile)
	if err != nil {
		log.Printf("error marshaling/unmarshaling profile: %v", err)
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(profileJson)
}

func getHistory(w http.ResponseWriter, r *http.Request) {
	log.Printf("--> endpoint hit: getHistory")
	v := mux.Vars(r)
	username := v["username"]
	postId := v["postId"]
	log.Printf("parameters: %v and %v", username, postId)

	historyJson, err := contract.EvaluateTransaction("GenerateSharingTree", username, postId)
	if err != nil {
		fmt.Printf("Error evaluating transaction: %v", err)
	}
	var completeHistory []Post
	var uniqueHistory [][]string
	json.Unmarshal(historyJson, &completeHistory)
	uniqueHistory = append(uniqueHistory, completeHistory[0].SharingHistory)
	if len(completeHistory) > 1 {
		for i := range completeHistory {
			if i+1 < len(completeHistory) {
				if len(completeHistory[i].SharingHistory) != len(completeHistory[i+1].SharingHistory) {
					uniqueHistory = append(uniqueHistory, completeHistory[i+1].SharingHistory)
				}
			}
		}
	}
	uniqueHistoryJson, err := json.Marshal(uniqueHistory)
	if err != nil {
		log.Printf("error marshaling object: %v", err)
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(uniqueHistoryJson)
}

func followUser(w http.ResponseWriter, r *http.Request) {
	log.Println("--> Endpoint Hit: followUser")
	body, _ := ioutil.ReadAll(r.Body)

	var followRequest UserQuery
	json.Unmarshal(body, &followRequest)
	log.Printf("sending follow request from %v to %v", followRequest.UserId, followRequest.QueryId)
	_, err := contract.SubmitTransaction("FollowProfile", followRequest.UserId, followRequest.QueryId)
	if err != nil {
		log.Printf("Failed to submit transaction: %v", err)
	}

}

func searchUser(w http.ResponseWriter, r *http.Request) {
	log.Println("--> endpoint hit: searchUser")
	body, _ := ioutil.ReadAll(r.Body)

	var searchRequest UserQuery
	json.Unmarshal(body, &searchRequest)
	log.Printf("sending search request for user %v", searchRequest.QueryId)
	existsJson, err := contract.EvaluateTransaction("ProfileExists", searchRequest.QueryId)
	if err != nil {
		log.Printf("failed to evaluate transaction: %v", err)
	}
	var exists bool
	json.Unmarshal(existsJson, &exists)
	if !exists {
		w.WriteHeader(http.StatusNoContent)
	} else {
		w.WriteHeader(http.StatusFound)
	}
	w.Header().Set("Content-Type", "application/json")
	valJson, _ := json.Marshal(map[string]bool{"found": exists})
	w.Write(valJson)
}

func acceptFollower(w http.ResponseWriter, r *http.Request) {
	log.Println("--> endpoint hit: AcceptFollower")
	body, _ := ioutil.ReadAll(r.Body)

	var acceptRequest UserQuery
	json.Unmarshal(body, &acceptRequest)
	log.Printf("request accept follower %v to user %v", acceptRequest.QueryId, acceptRequest.UserId)
	_, err := contract.SubmitTransaction("AcceptFollower", acceptRequest.UserId, acceptRequest.QueryId)
	if err != nil {
		log.Printf("failed to submit transaction: %v", err)
	}
}

//func seeSharing() {}

func getAllPosts(w http.ResponseWriter, r *http.Request) {
	log.Println("--> Endpoint Hit: getAllPosts")
	log.Println("--> Evaluate Transaction: GetAllPosts")
	v := r.URL.Query()
	username := v.Get("username")
	postsJson, err := contract.EvaluateTransaction("GetAllPosts", username)
	if err != nil {
		log.Printf("Failed to evaluate transaction: %v", err)
	}
	var posts []Post
	json.Unmarshal(postsJson, &posts)
	var postData string
	for i, val := range posts {
		postData, err = db.ReadData(val.PostId)
		if err != nil {
			log.Printf("failed to read from db: %v", err)
		}
		log.Printf("post %v: %v", i, postData)
		posts[i].Data = postData
	}
	postsJson, err = json.Marshal(posts)
	if err != nil {
		log.Printf("failed to marshal post: %v", err)
	}
	w.WriteHeader(http.StatusCreated)
	w.Header().Set("Content-Type", "application/json")
	w.Write(postsJson)
}

func createPost(w http.ResponseWriter, r *http.Request) {
	log.Println("--> Endpoint Hit: createPost")
	body, _ := ioutil.ReadAll(r.Body)
	var post Post
	json.Unmarshal(body, &post)
	post.PostId = hashTxn(post.Data)
	log.Printf("received data: %v from user %v", post.Data, post.Owner)
	_, err := contract.SubmitTransaction("CreatePost", post.PostId, post.Owner, post.Owner) //, post.Poster, post.PostDate)
	if err != nil {
		log.Printf("Failed to submit transaction: %v", err)
	}
	err = db.InsertData(post.PostId, post.Data)
	if err != nil {
		log.Printf("%v\n", err)
	}
}

//TODO: check if user exists before adding + password protection
func signUp(w http.ResponseWriter, r *http.Request) {
	log.Println("--> Endpoint hit: signUp")
	body, _ := ioutil.ReadAll(r.Body)
	var loginInfo Login
	json.Unmarshal(body, &loginInfo)
	log.Printf("--> Sign up user %v", loginInfo.Username)
	_, err := contract.SubmitTransaction("CreateProfile", loginInfo.Username)
	if err != nil {
		log.Printf("failed to create profile: %v", err)
	}
	log.Printf("--> success!")
}

func main() {
	log.Println("============ Application starts ============")
	network, err = configNet()
	db, err = NewOffchainDB("ubuntu", "meme", "tcp", "127.0.0.1:3306", "offchain")
	if err != nil {
		log.Printf("Something went wrong while connectig to the database.\n%v", err)
		return
	}
	defer db.Conn.Close()
	contract = network.GetContract("basic")

	_, res := db.ReadAllData()
	log.Printf("Amounts of posts in db: %v", len(*res))
	if len(*res) == 0 {
		post1 := Post{
			Data:   "hello world!! this is my first post tee hee",
			Owner:  "anders",
			PostId: "1",
		}
		post2 := Post{
			Data:   "this is my second post, for all my followers!",
			Owner:  "anders",
			PostId: "2",
		}
		initData := []Post{post1, post2}
		log.Printf("creating list of test identities")
		err = initDb(initData)
		if err == nil {
			_, err = contract.SubmitTransaction("InitLedger")
			if err != nil {
				fmt.Errorf("error submitting chaincode transaction: %v", err)
			}
		} else {
			fmt.Errorf("there was an error initializing db: %v", err)
		}
	}

	handleRequests()
}

func initDb(initData []Post) error {
	for _, val := range initData {
		err = db.InsertData(val.PostId, val.Data)
		if err != nil {
			log.Printf("%v\n", err)
			return err
		}
	}
	return nil
}

// configNet initalizes and configures the network and identity.
func configNet() (*gateway.Network, error) {
	err := os.Setenv("DISCOVERY_AS_LOCALHOST", "true")
	if err != nil {
		log.Fatalf("Error setting DISCOVERY_AS_LOCALHOST environemnt variable: %v", err)
	}

	wallet, err := gateway.NewFileSystemWallet("wallet")
	if err != nil {
		log.Fatalf("Failed to create wallet: %v", err)
	}

	if !wallet.Exists("appUser") {
		err = populateWallet(wallet)
		if err != nil {
			log.Fatalf("Failed to populate wallet contents: %v", err)
		}
	}

	ccpPath := filepath.Join(
		"..",
		"..",
		"test-network",
		"organizations",
		"peerOrganizations",
		"org1.example.com",
		"connection-org1.yaml",
	)

	gw, err := gateway.Connect(
		gateway.WithConfig(config.FromFile(filepath.Clean(ccpPath))),
		gateway.WithIdentity(wallet, "appUser"),
	)
	if err != nil {
		log.Fatalf("Failed to connect to gateway: %v", err)
	}
	defer gw.Close()

	network, err := gw.GetNetwork("mychannel")
	if err != nil {
		log.Fatalf("Failed to get network: %v", err)
	}
	return network, nil
}

// populateWallet populates a wallet in case it is not configuered already.
func populateWallet(wallet *gateway.Wallet) error {
	log.Println("============ Populating wallet ============")
	credPath := filepath.Join(
		"..",
		"..",
		"test-network",
		"organizations",
		"peerOrganizations",
		"org1.example.com",
		"users",
		"User1@org1.example.com",
		"msp",
	)

	certPath := filepath.Join(credPath, "signcerts", "cert.pem")
	// read the certificate pem
	cert, err := ioutil.ReadFile(filepath.Clean(certPath))
	if err != nil {
		return err
	}

	keyDir := filepath.Join(credPath, "keystore")
	// there's a single file in this dir containing the private key
	files, err := ioutil.ReadDir(keyDir)
	if err != nil {
		return err
	}
	if len(files) != 1 {
		return fmt.Errorf("keystore folder should have contain one file")
	}
	keyPath := filepath.Join(keyDir, files[0].Name())
	key, err := ioutil.ReadFile(filepath.Clean(keyPath))
	if err != nil {
		return err
	}

	identity := gateway.NewX509Identity("Org1MSP", string(cert), string(key))

	return wallet.Put("appUser", identity)
}

// intData splittes the user input data
func intData(userInput string) (string, string) {
	splitData := strings.Split(userInput, ",")
	owner := splitData[0]
	data := splitData[1]
	return owner, data
}

// hashID hashes the data and returns the hash as ID
func hashTxn(data string) string {
	id_bytes := sha256.Sum256([]byte(data))
	ID := hex.EncodeToString(id_bytes[:])
	return ID
}

// verifyTxn verifies connection between a Transaction on chain and its data in database
func verifyTxn(txid string, contract *gateway.Contract, db *OffchainDB) {
	log.Printf("--> Evaluate Transaction!")
	result, err := contract.EvaluateTransaction("ReadPost", txid)
	if err != nil {
		log.Fatalf("Failed to evaluate transaction: %v", err)
	}
	log.Printf("Transaction %s, is verfied!\n", string(result))
	_, err = db.ReadData(txid)
	if err != nil {
		log.Printf("%v", err)
		return
	}
	log.Printf("Transaction connection to database is verified!\n")
}
