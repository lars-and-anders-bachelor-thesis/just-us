package chaincode_test

import (
	"encoding/json"
	"testing"

	"github.com/hanifff/fabric-samples/my-off-cc/chaincode-go/chaincode"
	"github.com/hanifff/fabric-samples/my-off-cc/chaincode-go/chaincode/mocks"
	"github.com/hyperledger/fabric-chaincode-go/shim"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
	"github.com/stretchr/testify/require"
)

//go:generate counterfeiter -o mocks/transaction.go -fake-name TransactionContext . transactionContext
type transactionContext interface {
	contractapi.TransactionContextInterface
}

//go:generate counterfeiter -o mocks/chaincodestub.go -fake-name ChaincodeStub . chaincodeStub
type chaincodeStub interface {
	shim.ChaincodeStubInterface
}

func TestCreateProfile(t *testing.T) {
	chaincodeStub := &mocks.ChaincodeStub{}
	transactionContext := &mocks.TransactionContext{}
	transactionContext.GetStubReturns(chaincodeStub)
	userId := "anders ringen"

	chaincodeStub.GetStateReturns(nil, nil)
	smartContract := chaincode.SmartContract{}
	err := smartContract.CreateProfile(transactionContext, userId)
	require.NoError(t, err)

	chaincodeStub.GetStateReturns([]byte{}, nil)
	err = smartContract.CreateProfile(transactionContext, userId)
	require.EqualError(t, err, "the profile anders ringen already exists")
}

func TestCreatePost(t *testing.T) {
	chaincodeStub := &mocks.ChaincodeStub{}
	transactionContext := &mocks.TransactionContext{}
	transactionContext.GetStubReturns(chaincodeStub)
	userProfileJson := createProfile()
	smartContract := chaincode.SmartContract{}

	chaincodeStub.GetStateReturns(userProfileJson, nil)
	err := smartContract.CreatePost(transactionContext, "post2", "knutis", "knutis")
	require.NoError(t, err)

	err = smartContract.CreatePost(transactionContext, "post1", "knutis", "knutis")
	require.EqualError(t, err, "the asset post1 already exists")

	chaincodeStub.GetStateReturns(nil, nil)
	err = smartContract.CreatePost(transactionContext, "post2", "knutis", "knutis")
	require.EqualError(t, err, "user knutis does not exist")
}

func TestReadPost(t *testing.T) {
	chaincodeStub := &mocks.ChaincodeStub{}
	transactionContext := &mocks.TransactionContext{}
	transactionContext.GetStubReturns(chaincodeStub)
	userProfileJson := createProfile()
	smartContract := chaincode.SmartContract{}

	chaincodeStub.GetStateReturns(userProfileJson, nil)
	_, err := smartContract.ReadPost(transactionContext, "id", "post1")
	require.NoError(t, err)

	_, err = smartContract.ReadPost(transactionContext, "id", "post2")
	require.EqualError(t, err, "post not found")
}

func TestFollowProfile(t *testing.T) {
	chaincodeStub := &mocks.ChaincodeStub{}
	transactionContext := &mocks.TransactionContext{}
	transactionContext.GetStubReturns(chaincodeStub)
	userProfileJson := createProfile()
	smartContract := chaincode.SmartContract{}

	chaincodeStub.GetStateReturns(userProfileJson, nil)
	err := smartContract.FollowProfile(transactionContext, "anders", "jorban")
	require.NoError(t, err)

	err = smartContract.FollowProfile(transactionContext, "lars", "lars")
	require.EqualError(t, err, "users cannot follow themselves")

	err = smartContract.FollowProfile(transactionContext, "anders", "lars")
	require.EqualError(t, err, "user anders already following user lars")
}

func TestAcceptFollower(t *testing.T) {
	chaincodeStub := &mocks.ChaincodeStub{}
	transactionContext := &mocks.TransactionContext{}
	transactionContext.GetStubReturns(chaincodeStub)
	userProfileJson := createProfile()
	smartContract := chaincode.SmartContract{}

	chaincodeStub.GetStateReturns(userProfileJson, nil)
	err := smartContract.AcceptFollower(transactionContext, "knutis", "josh")
	require.NoError(t, err)
}

func TestReadAllPosts(t *testing.T) {
	chaincodeStub := &mocks.ChaincodeStub{}
	transactionContext := &mocks.TransactionContext{}
	transactionContext.GetStubReturns(chaincodeStub)
	userProfileJson := createProfile()
	smartContract := chaincode.SmartContract{}

	chaincodeStub.GetStateReturns(userProfileJson, nil)
	_, err := smartContract.GetAllPosts(transactionContext, "anders")
	require.NoError(t, err)
}

func createProfile() []byte {
	post := chaincode.Post{
		Owner:          "knutis",
		PostId:         "post1",
		SharingHistory: make([]string, 0),
	}
	userProfile := chaincode.Profile{
		Followers:        make([]string, 0),
		FollowedUsers:    []string{"lars"},
		PendingFollowers: []string{"josh"},
		Posts:            []chaincode.Post{post},
		Username:         "anders",
	}
	userProfileJson, _ := json.Marshal(userProfile)

	return userProfileJson
}
