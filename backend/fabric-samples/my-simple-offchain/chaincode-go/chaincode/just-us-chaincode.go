package chaincode

// branch test
import (
	"encoding/json"
	"fmt"

	//        "time"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// SmartContract provides functions for managing an Asset
type SmartContract struct {
	contractapi.Contract
}

type Asset struct {
	//	Depth		int	`json:"depth"`
	Owner    string `json:"owner"`
	PostDate string `json:"postDate"`
	Poster   string `json:"poster"`
	PostId   string `json:"postId"`
	//	Status		int	`json:"status"`
}

//add init function? populate with example posts?
// init function neccessary for adding chaincode to peers. TODO: why neccessary, remove?
func (s *SmartContract) InitLedger(ctx contractapi.TransactionContextInterface) error {
	assets := []Asset{
		{PostId: "hash of the data", Owner: "Hanif", PostDate: "this will be a date soon, use time package?", Poster: "lars"},
		{PostId: "also a hash, this is easy", Owner: "amish Ringen", PostDate: "will this be date? what is easier", Poster: "Amish Ringen (this will probably be an id or somehting"},
		{PostId: "hashbrown1", Owner: "Amish Ringen", PostDate: "today", Poster: "Amish Ringen"},
		{PostId: "hashbrown2", Owner: "Amish Ringen", PostDate: "today", Poster: "Amish Ringen"},
		{PostId: "hashbrown3", Owner: "Amish Ringen", PostDate: "today", Poster: "Amish Ringen"},
		{PostId: "hashbrown4", Owner: "Amish Ringen", PostDate: "today", Poster: "Amish Ringen"},
		{PostId: "hashbrown5", Owner: "Amish Ringen", PostDate: "today", Poster: "Amish Ringen"},
		{PostId: "hashbrown6", Owner: "Amish Ringen", PostDate: "today", Poster: "Amish Ringen"},
		{PostId: "hashbrown7", Owner: "Amish Ringen", PostDate: "today", Poster: "Amish Ringen"},
		{PostId: "hashbrown8", Owner: "Amish Ringen", PostDate: "today", Poster: "Amish Ringen"},
	}

	for _, asset := range assets {
		assetJSON, err := json.Marshal(asset)
		if err != nil {
			return err
		}

		err = ctx.GetStub().PutState(asset.PostId, assetJSON)
		if err != nil {
			return fmt.Errorf("failed to put to world state. %v", err)
		}
	}

	return nil
}

// CreateAsset issues a new asset to the world state with given details.
func (s *SmartContract) CreateAsset(ctx contractapi.TransactionContextInterface, id string, owner string, poster string,
	postDate string) error {
	//create key here or in application?
	exists, err := s.AssetExists(ctx, id)
	if err != nil {
		return err
	}
	if exists {
		return fmt.Errorf("the asset %s already exists", id)
	}
	asset := Asset{
		//		Depth:		depth,
		Owner:    owner,
		PostDate: postDate,
		Poster:   poster,
		PostId:   id,
		//		Status:		status,
	}
	assetJSON, err := json.Marshal(asset)
	if err != nil {
		return err
	}

	return ctx.GetStub().PutState(id, assetJSON)
}

// ReadAsset returns the asset stored in the world state with given id.
func (s *SmartContract) ReadAsset(ctx contractapi.TransactionContextInterface, id string) (*Asset, error) {
	assetJSON, err := ctx.GetStub().GetState(id)
	if err != nil {
		return nil, fmt.Errorf("failed to read from world state: %v", err)
	}
	if assetJSON == nil {
		return nil, fmt.Errorf("the asset %s does not exist", id)
	}

	var asset Asset
	err = json.Unmarshal(assetJSON, &asset)
	if err != nil {
		return nil, err
	}

	return &asset, nil
}

//func (s *SmartContract) UpdateAsset(ctx contractapi.TransactionContextInterface, id string, poster string) error {
//	exists, err := s.AssetExists(ctx, id)
//	if err != nil {
//		return err
//	}
//	if !exists {
//		return fmt.Errorf("the asset %s does not exist", id)
//	}

// overwriting original asset with new asset
//	asset := Asset{
//                Depth: 		depth,
//                Owner:          owner,
//                PostDate:       postDate,
//                Poster:         poster,
//                PostId:             id,
//                Status:         status,
//        }
//
//	assetJSON, err := json.Marshal(asset)
//	if err != nil {
//		return err
//	}
//
//	return ctx.GetStub().PutState(id, assetJSON)
//}
//
// DeleteAsset deletes an given asset from the world state.
func (s *SmartContract) DeleteAsset(ctx contractapi.TransactionContextInterface, id string) error {
	exists, err := s.AssetExists(ctx, id)
	if err != nil {
		return err
	}
	if !exists {
		return fmt.Errorf("the asset %s does not exist", id)
	}

	return ctx.GetStub().DelState(id)
}

// AssetExists returns true when asset with given ID exists in world state
func (s *SmartContract) AssetExists(ctx contractapi.TransactionContextInterface, id string) (bool, error) {
	assetJSON, err := ctx.GetStub().GetState(id)
	if err != nil {
		return false, fmt.Errorf("failed to read from world state: %v", err)
	}

	return assetJSON != nil, nil
}

//figure out functions for changing state of assets such that they can be tracked
// TransferAsset updates the owner field of asset with given id in world state.
/* func (s *SmartContract) TransferAsset(ctx contractapi.TransactionContextInterface, id string, newOwner string) error {
	asset, err := s.ReadAsset(ctx, id)
	if err != nil {
		return err
	}

	asset.Owner = newOwner
	assetJSON, err := json.Marshal(asset)
	if err != nil {
		return err
	}

	return ctx.GetStub().PutState(id, assetJSON)
} */

// GetAllAssets returns all assets found in world state
func (s *SmartContract) GetAllAssets(ctx contractapi.TransactionContextInterface) ([]*Asset, error) {
	// range query with empty string for startKey and endKey does an
	// open-ended query of all assets in the chaincode namespace.
	resultsIterator, err := ctx.GetStub().GetStateByRange("", "")
	if err != nil {
		return nil, err
	}
	defer resultsIterator.Close()

	var assets []*Asset
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return nil, err
		}

		var asset Asset
		err = json.Unmarshal(queryResponse.Value, &asset)
		if err != nil {
			return nil, err
		}
		assets = append(assets, &asset)
	}

	return assets, nil
}
