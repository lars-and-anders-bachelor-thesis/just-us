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
	err := smartContract.CreatePost(transactionContext, "post2", "knutis", make([]string, 0))
	require.NoError(t, err)

	err = smartContract.CreatePost(transactionContext, "post1", "knutis", make([]string, 0))
	require.EqualError(t, err, "the asset post1 already exists")
}

/* func TestSharePost(t *testing.T) {
	chaincodeStub := &mocks.ChaincodeStub{}
	transactionContext := &mocks.TransactionContext{}
	transactionContext.GetStubReturns(chaincodeStub)
	userProfileJson := createProfile()
	smartContract := chaincode.SmartContract{}


	chaincodeStub.GetStateReturns(userProfileJson, nil)
	err := smartContract.SharePost()
} */

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
	err := smartContract.FollowProfile(transactionContext, "josh", "lars")
	require.NoError(t, err)
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

func createProfile() []byte {
	post := chaincode.Asset{
		ForwardingHistory: make([]string, 0),
		Owner:             "knutis",
		PostId:            "post1",
		SharingHistory:    make([]string, 0),
	}
	userProfile := chaincode.Profile{
		Followers:        make([]string, 0),
		PendingFollowers: []string{"josh"},
		Posts:            []chaincode.Asset{post},
		Username:         "anders",
	}
	userProfileJson, _ := json.Marshal(userProfile)

	return userProfileJson
}
