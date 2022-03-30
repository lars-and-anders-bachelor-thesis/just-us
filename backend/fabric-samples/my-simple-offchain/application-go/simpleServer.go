package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"path/filepath"

	"github.com/gorilla/mux"

	//	"bufio"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"os"
	"strings"

	"github.com/hyperledger/fabric-sdk-go/pkg/core/config"
	"github.com/hyperledger/fabric-sdk-go/pkg/gateway"
	//"reflect"
)

var err error
var db *OffchainDB
var network *gateway.Network
var contract *gateway.Contract

//var contract *gateway.Contract

type Asset struct {
	Data string `json:"data"`
	//        Depth           int     `json:"depth"`
	Owner    string `json:"owner"`
	PostDate string `json:"postDate"`
	Poster   string `json:"poster"`
	PostId   string `json:"postId"`
	//Status          int     `json:"status"`
}

func handleRequests() {
	r := mux.NewRouter().StrictSlash(true)
	r.HandleFunc("/Posts", getAllPosts)
	r.HandleFunc("/Post", createPost).Methods("POST")
	log.Fatal(http.ListenAndServe(":8080", r))
}

func getAllPosts(w http.ResponseWriter, r *http.Request) {
	log.Println("--> Endpoint Hit: getAllPosts")
	log.Println("--> Evaluate Transaction: GetAllAssets")
	//finn alle posts du kan se for en bruker
	//		network, err := configNet()
	/* 		contract := network.GetContract("basic")
	res, err := contract.EvaluateTransaction("GetAllAssets")
	if err != nil {
		log.Fatalf("Failed to evaluate transaction: %v", err)
	} */
	w.WriteHeader(http.StatusCreated)
	w.Header().Set("Content-Type", "application/json")
	//create db function for fetching full posts from database
	_, result := db.ReadAllData()
	finalResult, _ := json.Marshal(result)
	w.Write(finalResult)

}

func createPost(w http.ResponseWriter, r *http.Request) {
	log.Println("--> Endpoint Hit: createPost")
	body, _ := ioutil.ReadAll(r.Body)
	var post Asset
	json.Unmarshal(body, &post)
	post.PostId = hashTxn(post.Data)
	post.PostDate = "today"
	post.Poster = post.Owner
	log.Printf("received data: %v", post.Data)
	_, err := contract.EvaluateTransaction("CreateAsset", post.PostId, post.Owner, post.Poster, post.PostDate)
	if err != nil {
		log.Fatalf("Failed to evaluate transaction: %v", err)
	}
	err = db.InsertData(post.PostId, post.Data)
	if err != nil {
		log.Printf("%v\n", err)
		return
	}
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
	// store the data along with its hash in the database
	result, err := contract.EvaluateTransaction("GetAllAssets")
	if err != nil {
		log.Fatalf("Failed to evaluate transaction: %v", err)
	}
	_, res := db.ReadAllData()
	log.Print(len(*res))
	if len(*res) == 0 {
		initData := &[10]Asset{}
		err = json.Unmarshal(result, initData)
		log.Printf("creating list?")
		if err != nil {
			log.Fatalf("oinkers, anders failed! %v", err)
		}
		err = initDb(initData)
	}

	handleRequests()
	//fmt.Println("network type : ",  reflect.TypeOf(contract))

	//log.Println("--> Submit Transaction: InitLedger")
	//result, err := contract.SubmitTransaction("InitLedger")
	//if err != nil {
	//	log.Fatalf("Failed to Submit transaction: %v", err)
	//}
	//log.Println(string(result))

	//log.Println("--> Evaluate Transaction: GetAllAssets")
	//result, err = contract.EvaluateTransaction("GetAllAssets")
	//if err != nil {
	//	log.Fatalf("Failed to evaluate transaction: %v", err)
	//}
	//log.Println(string(result))
	//reader := bufio.NewReader(os.Stdin)

	// start the main idea: take the hash of data, store the hash on chain and data along with its hash in database.

	//	for i := 0; i < 5; i++ {
	//		log.Println("Please enter:  owner name, data to store")
	//		userInput, err := reader.ReadString('\n')
	//		if err != nil {
	//			return
	//		}
	// remove the delimeter from the string
	//		userInput = strings.TrimSuffix(userInput, "\n")
	// store the data along with its hash in the database
	//		owner, data := intData(userInput)
	//		ID := hashTxn(data)
	//		err = db.InsertData(ID, data)
	//		if err!= nil {
	//			log.Printf("%v\n", err)
	//			return
	//		}
	//
	//		log.Println("--> Submit Transaction to on chain!")
	//		result, err = contract.SubmitTransaction("CreateAsset", ID, owner)
	//		if err != nil {
	//			log.Fatalf("Failed to Submit transaction: %v", err)
	//		}
	//		log.Println("Asset is created: ", string(result))

	//		log.Println("--> Evaluate Transaction on chain!")
	//		result, err = contract.EvaluateTransaction("ReadAsset", ID)
	//		if err != nil {
	//			log.Fatalf("Failed to evaluate transaction: %v", err)
	//		}
	//		log.Printf("Transaction %s, is verfied!\n", string(result))
	//	}

	//	err = db.ReadAllData()
	//	if err!= nil {
	//		log.Printf("%v", err)
	//		return
	//	}

	//	log.Println("Verifying data stored in Database and linked to chain;\nPlease provid Transaction ID:")
	//	txid, err := reader.ReadString('\n')
	//	if err != nil {
	//		return
	//	}
	//	txid = strings.TrimSuffix(txid, "\n")
	//	verifyTxn(txid, contract, db)

	//	log.Println("============ Done ============")
}

func initDb(initData *[10]Asset) error {
	for _, val := range initData {
		ID := hashTxn(val.PostId)
		log.Printf(ID)
		err = db.InsertData(ID, "Id cumque voluptas quasi accusantium veniam qui. hilsen "+val.Owner)
		log.Printf("fail here?")
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
	result, err := contract.EvaluateTransaction("ReadAsset", txid)
	if err != nil {
		log.Fatalf("Failed to evaluate transaction: %v", err)
	}
	log.Printf("Transaction %s, is verfied!\n", string(result))
	err = db.ReadData(txid)
	if err != nil {
		log.Printf("%v", err)
		return
	}
	log.Printf("Transaction connection to database is verified!\n")
}
