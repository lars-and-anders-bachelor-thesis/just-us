package chaincode_test

import (
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

	chaincodeStub.GetStateReturns(nil, nil)
	smartContract := chaincode.SmartContract{}
	err := smartContract.CreateProfile(transactionContext, "lars123")
	require.NoError(t, err)

	chaincodeStub.GetStateReturns([]byte{}, nil)
	err = smartContract.CreateProfile(transactionContext, "anders")
	require.EqualError(t, err, "the profile anders already exists")
}
