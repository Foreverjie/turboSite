package server

import (
	"context"
	"sync"

	"github.com/gofrs/uuid"

	authPb "github.com/foreverjie/turboSite/apps/goBack/proto/auth"
)

// Backend implements the protobuf interface
type Backend struct {
	mu    *sync.RWMutex
	users []*authPb.User
}

// New initializes a new Backend struct.
func New() *Backend {
	return &Backend{
		mu: &sync.RWMutex{},
	}
}

// AddUser adds a user to the in-memory store.
func (b *Backend) AddUser(ctx context.Context) (*authPb.User, error) {
	b.mu.Lock()
	defer b.mu.Unlock()

	user := &authPb.User{
		Id: uuid.Must(uuid.NewV4()).String(),
	}
	b.users = append(b.users, user)

	return user, nil
}

// ListUsers lists all users in the store.
func (b *Backend) ListUsers(_ *authPb.ListUsersRequest, srv authPb.AuthService_ListUsersServer) error {
	b.mu.RLock()
	defer b.mu.RUnlock()

	for _, user := range b.users {
		err := srv.Send(user)
		if err != nil {
			return err
		}
	}

	return nil
}

// GetUser get user by id 
func (b *Backend) GetUser(ctx context.Context, req *authPb.GetUserRequest) (*authPb.User, error) {
	b.mu.Lock()
	defer b.mu.Unlock()

	return nil, nil
}

//
func (b *Backend) SignIn(ctx context.Context, req *authPb.SignInRequest) (*authPb.SignInResponse, error) {
	b.mu.Lock()
	defer b.mu.Unlock()

	return nil, nil
}

//
func (b *Backend) SignUp(ctx context.Context, req *authPb.RegisterRequest) (*authPb.RegisterResponse, error) {
	b.mu.Lock()
	defer b.mu.Unlock()

	return nil, nil
}

func (b *Backend) UpdateUser(ctx context.Context, req *authPb.User) (*authPb.User, error) {
	b.mu.Lock()
	defer b.mu.Unlock()

	return nil, nil
}
