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
	ForwardingHistory []string `json: "forwardingHistory"`
	Owner             string   `json:"owner"`
	PostId            string   `json:"postId"`
	SharingHistory    []string `json: "sharingHistory"`
	//PostDate string `json:"postDate"`
	//Poster   string `json:"poster"`
	//	Status		int	`json:"status"`
}

//type Post struct {
//	PostId string `json: "postId"`
//	SharingList string `json: "sharingList`
//}

type Profile struct {
	Followers        []string `json:"followers"`
	PendingFollowers []string `json:"pendingFollowers"`
	Posts            []Asset  `json:"posts"`
	Username         string   `json: "username"`
}

//
//type memberType int
//
//const (
//	follower memberType = iota
//	blocked
//	pending
//)
//
////set sharing privileges for each individual user?
//type channelMember struct {
//	memberId string
//	membership memberType
//}
//
//add init function? populate with example posts?

// init function neccessary for adding chaincode to peers. TODO: why neccessary, remove?
func (s *SmartContract) InitLedger(ctx contractapi.TransactionContextInterface) error {
	/* assets := []Asset{}

	for _, asset := range assets {
		profileJson, err := json.Marshal(asset)
		if err != nil {
			return err
		}

		err = ctx.GetStub().PutState(asset.PostId, assetJSON)
		if err != nil {
			return fmt.Errorf("failed to put to world state. %v", err)
		}
	} */

	return nil
}

// CreatePost issues a new asset to the world state with given details.
func (s *SmartContract) CreatePost(ctx contractapi.TransactionContextInterface, postId string, userId string, sharingHistory []string) error {
	//id, err := ctx.GetClientIdentity().GetID()
	exists, err := s.PostExists(ctx, userId, postId)
	if err != nil {
		return err
	}
	if exists {
		return fmt.Errorf("the asset %s already exists", postId)
	}
	if sharingHistory == nil {
		sharingHistory = make([]string, 0)
	}
	//sharingHistory = append(sharingHistory, userId)

	forwardingHistory := make([]string, 0)

	asset := Asset{
		ForwardingHistory: forwardingHistory,
		Owner:             userId,
		PostId:            postId,
		SharingHistory:    sharingHistory,
	}
	profile, err := s.ReadProfile(ctx, userId)
	if err != nil {
		return err
	}
	profile.Posts = append(profile.Posts, asset)
	profileJson, err := json.Marshal(profile)
	return ctx.GetStub().PutState(userId, profileJson)
}

func (s *SmartContract) SharePost(ctx contractapi.TransactionContextInterface, owner string, postId string, userId string) error {
	//id, err := ctx.GetClientIdentity().GetID()
	exists, err := s.PostExists(ctx, userId, postId)
	if err != nil {
		return err
	}
	if exists {
		return fmt.Errorf("the asset %s already exists", userId)
	}
	profile, err := s.ReadProfile(ctx, owner)
	var post Asset
	var index int
	for i, item := range profile.Posts {
		if item.PostId == postId {
			post = item
			index = i
		}
	}
	post.SharingHistory = append(post.ForwardingHistory, userId)

	// TODO: create sharing restriction after a certain number of sharing ops
	sharingHistory := make([]string, 0)
	s.CreatePost(ctx, postId, userId, sharingHistory)
	profile.Posts[index] = post
	profileJson, err := json.Marshal(profile)
	return ctx.GetStub().PutState(userId, profileJson)
}

// ReadPost returns the asset stored in the world state with given id.
func (s *SmartContract) ReadPost(ctx contractapi.TransactionContextInterface, userId string, postId string) (*Asset, error) {
	/* 	assetJSON, err := ctx.GetStub().GetState(id)
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
	   	} */
	profileJson, err := ctx.GetStub().GetState(userId)
	if err != nil {
		return nil, fmt.Errorf("failed to read from world state: %v", err)
	}
	var profile Profile
	json.Unmarshal(profileJson, &profile)
	for _, item := range profile.Posts {
		if item.PostId == postId {
			return &item, nil
		}
	}
	return nil, fmt.Errorf("post not found")
}

func (s *SmartContract) ReadProfile(ctx contractapi.TransactionContextInterface, id string) (*Profile, error) {
	profileJson, err := ctx.GetStub().GetState(id)
	if err != nil {
		return nil, fmt.Errorf("failed to read from world state: %v", err)
	}
	if profileJson == nil {
		return nil, fmt.Errorf("the profile %s does not exist", id)
	}

	var profile Profile
	err = json.Unmarshal(profileJson, &profile)
	if err != nil {
		return nil, err
	}

	return &profile, nil
}

//create profile if profile does not already exist
func (s *SmartContract) CreateProfile(ctx contractapi.TransactionContextInterface, id string) error {
	//Abandoning using clientidentity for the moment, difficult to test
	//id, err := ctx.GetClientIdentity().GetID()
	exists, err := s.ProfileExists(ctx, id)
	if err != nil {
		return err
	}
	if exists {
		return fmt.Errorf("the profile %s already exists", id)
	}
	profile := &Profile{
		Followers:        make([]string, 0),
		PendingFollowers: make([]string, 0),
		Posts:            make([]Asset, 0),
		Username:         id,
	}
	profileJson, err := json.Marshal(&profile)
	return ctx.GetStub().PutState(id, profileJson)
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
/* func (s *SmartContract) DeleteAsset(ctx contractapi.TransactionContextInterface, id string) error {
	exists, err := s.PostExists(ctx, id, postId)
	if err != nil {
		return err
	}
	if !exists {
		return fmt.Errorf("the asset %s does not exist", id)
	}

	return ctx.GetStub().DelState(id)
} */

// PostExists returns true when asset with given ID exists in world state
func (s *SmartContract) PostExists(ctx contractapi.TransactionContextInterface, id string, postId string) (bool, error) {
	profileJson, err := ctx.GetStub().GetState(id)
	if err != nil {
		return false, fmt.Errorf("failed to read from world state: %v", err)
	}
	var profile Profile
	json.Unmarshal(profileJson, &profile)
	for _, item := range profile.Posts {
		if item.PostId == postId {
			return true, nil
		}
	}
	return false, nil
}

func (s *SmartContract) ProfileExists(ctx contractapi.TransactionContextInterface, id string) (bool, error) {
	profileJson, err := ctx.GetStub().GetState(id)
	if err != nil {
		return false, fmt.Errorf("failed to read from world state: %v", err)
	}
	return profileJson != nil, nil
}

//figure out functions for changing state of assets such that they can be tracked
// TransferAsset updates the owner field of asset with given id in world state.
/* func (s *SmartContract) TransferAsset(ctx contractapi.TransactionContextInterface, id string, newOwner string) error {
	asset, err := s.ReadPost(ctx, id)
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
/* func (s *SmartContract) GetAllPosts(ctx contractapi.TransactionContextInterface) ([]*Asset, error) {
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
} */
