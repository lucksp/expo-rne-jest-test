import { LoginResponse } from '../types';

export const userFixture: LoginResponse = {
  user: {
    id: 2830,
    'first-name': 'Cleetus',
    'last-name': 'Montgomery',
    email: 'test2830@email.com',
    'email-verified': false,
    'phone-number': '5555552802',
    'phone-number-verified': true,
    'avatar-url':
      'https://s3.amazonaws.com/1e32ae53-681d-5071-a07d-4c1086107477_w640_h640.jpg',
    'average-rating': 4.9,
    'identification-status': 'verified',
    'credit-balance': -4958795,
    'unread-message-count': 547,
    'app-login': true,
    'driver-cup-opt-in': true,
    'suspended-at': null,
  },
  profiles: [
    {
      'profile-id': 15649,
      'organization-id': 15649,
      name: 'Dom Up',
      type: 'business',
      role: 'owner',
      'default-billing-method-id': 18270,
      default: false,
      'ach-enabled': true,
      'driver-can-start-pickup': true,
      'book-with-purchase-order': false,
      'driver-assignment': {
        'organization-id': 0,
        'reservation-id': 0,
        'fleet-number': '',
      },
    },
    {
      'profile-id': 41506,
      'organization-id': 40968,
      name: 'Fluid Fleet Services',
      type: 'business',
      role: 'admin',
      'default-billing-method-id': 21719,
      default: true,
      'ach-enabled': true,
      'driver-can-start-pickup': true,
      'book-with-purchase-order': true,
      'driver-assignment': {
        'organization-id': 0,
        'reservation-id': 0,
        'fleet-number': '',
      },
    },
  ],
  token:
    // noboost
    'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjMyNjU2MjIsImp0aSI6IjI4MzAifQ.njL10QGvtffmBomDOIyookqY4s3Az8ZitzIKIYUuGc8aeIX3gPDL1V5UzqzJFAxcUyS-KKyUiLyAOrwNCwEeTg',
};
